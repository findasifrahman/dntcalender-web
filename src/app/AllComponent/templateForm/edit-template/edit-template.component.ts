import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {  FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
import { TemplateService } from '../template.service';
import { Router, ActivatedRoute  } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material/snack-bar';
import { teemplateForm } from '../../../models/templateForm';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.scss']
})
export class EditTemplateComponent implements OnInit {
  id: any;
  Forms: FormGroup;
  Forms2: FormGroup;
  myarr = []
  selectFormControl = new FormControl('', Validators.required);
  Backup_Day = [
    {desk: "DDNT",id:1},
    {desk: "SOTI",id:2},
    {desk: "SOTII",id:3},
    {desk: "OICTDEC",id:4},
    {desk: "PA",id:5}
  ]
  constructor(private addEventService: TemplateService,private snackBar: MatSnackBar,private route:ActivatedRoute,
    private formBuilder: FormBuilder, private router: Router,private devModels: teemplateForm ) { }
  compareFn(x, y): boolean {
    return x && y ? x.value === y.value : x === y;
    }
  ngOnInit(): void {
    this.Forms = this.devModels.modelForms;
    this.Forms.reset();
    this.Forms2 = this.devModels.modelForms2;
    this.Forms2.reset();

    
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log("update id--" + params['id']);
      this.addEventService.getbyid(this.id).subscribe((data) => {
        this.Forms.patchValue(data);
        this.Forms.controls['color'].setValue(data.color);
        console.log("this.Forms.value-",this.Forms.value);
      });
      this.addEventService.getbycourseid(this.id).subscribe((data) => {

        console.log("this.Forms.value---",data);
        
        this.myarr = data
        /*data.map(v=>{
          this.items.push(
            this.formBuilder.group({
              courseName: [v.courseName],
              noOfCandidates:[v.noOfCandidates],
              duration: [v.duration],
              startDate: [moment(v.startDate).format('YYYY-MM-DD')],
              endDate: [moment(v.endDate).format('YYYY-MM-DD')],
              remarks: [v.remarks]
            })
          );
        })*/

      });
    })

  }
  addItem(){
    if(this.Forms2.get('activity').value && this.Forms2.get('day').value != 0){
      this.myarr.push({
        day: this.Forms2.get('day').value,
        activity: this.Forms2.get('activity').value,
        notification: this.Forms2.get('notification').value
      })
      this.Forms2.reset();
    }
  }
  async FormSubmit(){
    if(!this.Forms.get('ddayevent').value){
      this.snackBar.open('Please specify Dday Event Name', "Remove", {
        duration: 6000,
        verticalPosition: 'top',
        panelClass: ['blue-snackbar']
      });
      return
    }
    if(this.myarr.length ==0){
      this.snackBar.open('Please Mention atleast one activity', "Remove", {
        duration: 6000,
        verticalPosition: 'top',
        panelClass: ['blue-snackbar']
      });
      return
    }else{
      let myobj = {
        ddayevent: this.Forms.get('ddayevent').value,
        color: this.Forms.get('color').value,
        items: this.myarr
      }
      console.log(myobj)
    
      try {
        await this.addEventService.update(this.id, myobj).subscribe(
          data => {
            console.log("post req successfull");
            this.snackBar.open('Data Added Successfully', "Remove", {
              duration: 6000,
              verticalPosition: 'top',
              panelClass: ['blue-snackbar']
            });
            this.router.navigate(["/listTemplate"]);
          },
          error => {
            console.log("error post", error);
            this.snackBar.open('Unsuccessfull', "Remove", {
              duration: 6000,
              verticalPosition: 'top',
              panelClass: ['red-snackbar']
            });
          }
        );

      }
      catch (err) {
      }
    }
  }
  compareCategoryObjects(object1: any, object2: any) {
    return object1 && object2 //&& object1.desk == object2.desk;
  }
  remove(i:number) {
    //if(i!== 0)
    {
      this.myarr.splice(i,1)//.removeAt(i);
    }
  }

}
