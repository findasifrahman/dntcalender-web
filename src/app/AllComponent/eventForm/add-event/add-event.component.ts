import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {  FormBuilder, Validators, FormGroup,FormControl } from '@angular/forms';
import { AddEventService } from '../add-event.service';
import { Router } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material/snack-bar';
import { eventForm } from '../../../models/eventmodels';
import * as moment from 'moment';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  Forms: FormGroup;
  selectFormControl = new FormControl('', Validators.required);
  template_arr = []
  template_list = []
  selectUndefinedOptionValue:any;
  selectedItem
  dday
  DayTemplateSubmitHide = true
  selectemitemtext = ""
  selectsearchval1
  selectedColor

  ddayExtendedName
  constructor(private addEventService: AddEventService,private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,private formBuilder: FormBuilder, private router: Router,
    private devModels: eventForm ) { }

  SelectvalChanged1(event){
    this.selectsearchval1 = event
    console.log("event-",event, this.selectsearchval1)
  }
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
    this.addEventService.getAllTemplate().subscribe((posts) => {
      this.template_arr = posts as any;
      //console.log(posts);
    });
    /*this.addEventService.getbytemplateid().subscribe((posts) => {
      this.template_list = posts as any;
    });*/
    this.Forms.controls['start'].valueChanges.subscribe(value => {
      //let f = this.Forms.controls['startDate'].value
      let g = this.Forms.controls['start'].value
      this.Forms.controls['end'].setValue(moment(g).format('YYYY-MM-DD'))  
      //console.log("val-",f,g);
    });

  }
  selectChanged(event){
    console.log(event)
    this.selectedItem = event
    this.selectedColor = this.template_arr.find(x=> x.ddayevent == this.selectsearchval1).color

  }
  TemplateSubmit(){
    this.spinner.show();
    setTimeout(function(){
      this.spinner.hide()
    }.bind(this),7000)
    console.log(" selectedItem",this.selectsearchval1 )//this.selectedItem)
    let obj = this.template_arr.find(x=> x.ddayevent == this.selectsearchval1)
    this.selectedColor = obj.color
    this.selectemitemtext = this.template_arr.find(x=> x.ddayevent == this.selectsearchval1).ddayevent
    this.addEventService.getbytemplateid(obj.id).subscribe((posts) => {
      this.template_list = posts as any;
      console.log("template List--", this.template_list)
      this.DayTemplateSubmitHide = false
      this.spinner.hide();
    },error => {
      this.snackBar.open('Unsuccessfull', "Remove", {
        duration: 6000,
        verticalPosition: 'top',
        panelClass: ['red-snackbar']
      });
      this.spinner.hide();
    })
  }
  DayTemplateSubmit(){
    let day = moment(this.dday).format('YYYY-MM-DD')
    console.log("dday-", moment(this.dday).format('YYYY-MM-DD'), this.ddayExtendedName)
    let ary = []
    if(!this.ddayExtendedName){
        this.spinner.show();
        let yy = this.template_list.map((mapval,index)=>{
          var new_date = moment(day, "YYYY-MM--DD").add('days',  mapval.day);
          mapval.start = moment(new_date).format('YYYY-MM-DD')
          mapval.end = moment(new_date).format('YYYY-MM-DD')
          mapval.color = this.selectedColor//"DDNT"
          mapval.description = mapval.activity
          mapval.notification = mapval.notification
          if(mapval.day > 0){
            mapval.title = this.selectemitemtext + " + " + mapval.day.toString()
          }else if( mapval.day == 0){
            mapval.title = this.selectemitemtext //+ " " + mapval.day.toString()
          }else{
            mapval.title = this.selectemitemtext + " " + mapval.day.toString()
          }
          delete mapval.id
          delete mapval.day
          delete mapval.templateId
          delete mapval.activity
          ary.push(mapval)
          if(this.template_list.length - 1 == index){
            console.log("ary--", ary)
            this.addEventService.bulkinsert(ary).subscribe((posts) => {
              this.template_list = posts as any;
              console.log("bulkinsert--", this.template_list)
              this.spinner.hide();
              this.router.navigate(["/home"]);
            });
          }
          return mapval
        })
    }
    else{
      this.spinner.show();
      let yy = this.template_list.map((mapval,index)=>{
        var new_date = moment(day, "YYYY-MM--DD").add('days',  mapval.day);
        mapval.start = moment(new_date).format('YYYY-MM-DD')
        mapval.end = moment(new_date).format('YYYY-MM-DD')
        mapval.color = this.selectedColor//"DDNT"
        mapval.description = mapval.activity
        mapval.notification = mapval.notification
        if(mapval.day > 0){
          mapval.title = this.ddayExtendedName + " " + this.selectemitemtext + " + " + mapval.day.toString()
        }else if( mapval.day == 0){
          mapval.title = this.ddayExtendedName + " " + this.selectemitemtext
        }else{
          mapval.title = this.ddayExtendedName + " " + this.selectemitemtext + " " + mapval.day.toString()
        }
        delete mapval.id
        delete mapval.day
        delete mapval.templateId
        delete mapval.activity
        ary.push(mapval)
        if(this.template_list.length - 1 == index){
          console.log("ary--", ary)
          this.addEventService.bulkinsert(ary).subscribe((posts) => {
            this.template_list = posts as any;
            console.log("bulkinsert--", this.template_list)
            this.spinner.hide();
            this.router.navigate(["/home"]);
          });
        }
        return mapval
      })
    }
    //console.log("yy-", yy)
  }
  async FormSubmit() {
     const formValue = this.Forms.value;
     try {
       await this.addEventService.Add(formValue).subscribe(
         data => {
           console.log("post req successfull");
           this.snackBar.open('Data Added Successfully', "Remove", {
             duration: 6000,
             verticalPosition: 'top',
             panelClass: ['blue-snackbar']
           });
           this.router.navigate(["/home"]);
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
