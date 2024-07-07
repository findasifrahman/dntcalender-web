import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {  FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
import { AddEventService } from '../add-event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material/snack-bar';
import { eventForm } from '../../../models/eventmodels';
import * as moment from 'moment';
@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {
  id: any;
  Forms: FormGroup;
  selectFormControl = new FormControl('', Validators.required);

  constructor(private addEventService: AddEventService,private snackBar: MatSnackBar,private route:ActivatedRoute,
    private formBuilder: FormBuilder, private router: Router,private devModels: eventForm ) { }

  status1: boolean = false;
  Backup_Day = [
    {desk: "DDNT",id:1},
    {desk: "SOTI",id:2},
    {desk: "SOTII",id:3},
    {desk: "OICTDEC",id:4},
    {desk: "PA",id:5}
  ]
  ngOnInit() {
    this.Forms = this.devModels.modelForms;
    this.Forms.reset();
    let end = this.Forms.get('end');
    let start = this.Forms.get('start');
    let desk = this.Forms.get('color');
    let descri = this.Forms.get('description');
    let title = this.Forms.get('title');
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log("update id--" + params['id']);
      this.addEventService.getbyid(this.id).subscribe((data) => {
        console.log("edit data value is---",data)
        //this.Forms.patchValue(data);
        end.setValue(moment(data.end).format('YYYY-MM-DD'))
        start.setValue(moment(data.start).format('YYYY-MM-DD'))
        desk.setValue(data.color)
        descri.setValue(data.description)
        title.setValue(data.title)
        console.log("this.Forms.value-",this.Forms.value);
      });
    })
  }

  async FormSubmit() {
     const formValue = this.Forms.value;
     try {
       await this.addEventService.update(this.id, formValue).subscribe(
         data => {
           console.log("post req successfull");
           this.snackBar.open('Data Added Successfully', "Remove", {
             duration: 6000,
             verticalPosition: 'top',
             panelClass: ['blue-snackbar']
           });
           this.router.navigate(["/listEvent"]);
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
