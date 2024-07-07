import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {  FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
import { TemplateService } from '../template.service';
import { Router } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material/snack-bar';
import { teemplateForm } from '../../../models/templateForm';
import * as moment from 'moment';

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.scss']
})
export class AddTemplateComponent implements OnInit {
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
  constructor(private addEventService: TemplateService,private snackBar: MatSnackBar,
    private formBuilder: FormBuilder, private router: Router,private devModels: teemplateForm ) { }

  ngOnInit(): void {
    this.Forms = this.devModels.modelForms;
    this.Forms.reset();
    this.Forms2 = this.devModels.modelForms2;
    this.Forms2.reset();
  }
  addItem(){
    if(this.Forms2.get('activity').value ){
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
    }else{
      let myobj = {
        ddayevent: this.Forms.get('ddayevent').value,
        color: this.Forms.get('color').value,
        items: this.myarr
      }
      console.log(myobj)
    
      try {
        await this.addEventService.Add(myobj).subscribe(
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
  remove(i:number) {
    //if(i!== 0)
    {
      this.myarr.splice(i,1)//.removeAt(i);
    }
  }

}
