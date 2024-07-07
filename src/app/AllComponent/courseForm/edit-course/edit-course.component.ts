import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {  FormBuilder, Validators, FormGroup,FormControl, FormArray } from '@angular/forms';
import { CourseService } from '../course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material/snack-bar';
import { courseForm } from '../../../models/coursemodels';
import * as moment from 'moment';
import { SchoolService } from '../../schoonameForm/school.service'
@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {
  id: any;
  Forms: FormGroup;
  Forms2: FormGroup;
  selectFormControl = new FormControl('', Validators.required);
  items: FormArray;
  myarr = []
  schoolName_arr = []
  constructor(private snackBar: MatSnackBar, private courseService: CourseService, private schoolService:SchoolService,
    private formBuilder: FormBuilder,private route:ActivatedRoute, private router: Router,private devModels: courseForm ) { }
    calculate(){
      let f = this.Forms2.controls['noOfOficer'].value
      let g = this.Forms2.controls['noOfSailor'].value
      let h = this.Forms2.controls['noOfInterService'].value
      let i = this.Forms2.controls['noOfCivilian'].value
      let j = this.Forms2.controls['noOfForeigner'].value
      let k = this.Forms2.controls['noOfCadet'].value
      let l = this.Forms2.controls['noOfMidShipman'].value
      let m = this.Forms2.controls['noOfForeignStudent'].value
      this.Forms2.controls['noOfCandidates'].setValue(f+g+ h+i+j+k+l + m)
    }
  ngOnInit(): void {
    this.schoolService.getAll().subscribe(detdata =>{
      this.schoolName_arr = detdata as any
    })
    this.Forms = this.devModels.modelForms;
    //this.items = this.Forms.get('items') as FormArray
    this.Forms.reset();
    this.Forms2 = this.devModels.modelForms2;
    this.items = this.Forms2.get('items') as FormArray
    

    this.Forms2.controls['startDate'].valueChanges.subscribe(value => {
      let f = this.Forms2.controls['startDate'].value
      let g = this.Forms2.controls['endDate'].value
      this.Forms2.controls['duration'].setValue(moment(g).diff(moment(f), 'days'))
      console.log("val-",f,g);
    });
    this.Forms2.controls['endDate'].valueChanges.subscribe(value => {
      let f = this.Forms2.controls['startDate'].value
      let g = this.Forms2.controls['endDate'].value
      this.Forms2.controls['duration'].setValue(moment(g).diff(moment(f), 'days'))
      console.log("val-",f,g);
    });
    let end = this.Forms2.get('endDate');
    let start = this.Forms2.get('startDate');
    let desk = this.Forms2.get('schoolName');
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log("update id--" + params['id']);

      this.courseService.getbycourseid(this.id).subscribe((data) => {
        console.log("this.Forms.value---",data);

          this.Forms2.patchValue(data);
          end.setValue(moment(data.endDate).format('YYYY-MM-DD'))
          start.setValue(moment(data.startDate).format('YYYY-MM-DD'))
          desk.setValue(data.schoolName)

          /*this.myarr.push({
            courseName: dval.courseName,
            schoolName: dval.schoolName,
            noOfCandidates: dval. noOfCandidates,
            duration: dval.duration,
            startDate: moment(dval.startDate).format('YYYY-MM-DD'),
            endDate: moment(dval.endDate).format('YYYY-MM-DD'),
            remarks: dval.remarks,
            type: dval.type,
            noOfOficer: dval.noOfOficer,
            noOfSailor: dval.noOfSailor,
            noOfInterService: dval.noOfInterService,
            noOfCivilian:dval.noOfCivilian,
            noOfForeigner: dval.noOfForeigner,
            noOfCadet: dval.noOfCadet,
            noOfMidShipman: dval.noOfMidShipman,
            noOfForeignStudent: dval.noOfForeignStudent
          })*/
        
        //this.myarr = data

      });
 
    })

    this.Forms2.controls['noOfOficer'].valueChanges.subscribe(value => {
      this.calculate()
    });
    this.Forms2.controls['noOfSailor'].valueChanges.subscribe(value => {
      this.calculate()
    });
    this.Forms2.controls['noOfInterService'].valueChanges.subscribe(value => {
      this.calculate()
    });
    this.Forms2.controls['noOfCivilian'].valueChanges.subscribe(value => {
      this.calculate()
    });
    this.Forms2.controls['noOfForeigner'].valueChanges.subscribe(value => {
      this.calculate()
    });
    this.Forms2.controls['noOfCadet'].valueChanges.subscribe(value => {
      this.calculate()
    });
    this.Forms2.controls['noOfMidShipman'].valueChanges.subscribe(value => {
      this.calculate()
    });
    this.Forms2.controls['noOfForeignStudent'].valueChanges.subscribe(value => {
      this.calculate()
    });
  }
  async FormSubmit() {
    if(!this.Forms2.get('schoolName').value){
      this.snackBar.open('Please specify School Name', "Remove", {
        duration: 6000,
        verticalPosition: 'top',
        panelClass: ['blue-snackbar']
      });
      return
    }

    {
        let myobj = {
          schoolName: this.Forms.get('schoolName').value,
          items: this.myarr
        }
        console.log(myobj)
        //console.log("yhi.forms- ", this.Forms.value,formValue.items)
        try {
          await this.courseService.update(this.id,this.Forms2.value).subscribe(
            data => {
              console.log("post req successfull");
              this.snackBar.open('Data Added Successfully', "Remove", {
                duration: 6000,
                verticalPosition: 'top',
                panelClass: ['blue-snackbar']
              });
              this.router.navigate(["/courseCalender"]);
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
  addItem(): void {
    /*if(this.Forms.get('items').value[this.Forms.get('items').value.length - 1]. courseName && 
    this.Forms.get('items').value[this.Forms.get('items').value.length - 1].startDate && 
    this.Forms.get('items').value[this.Forms.get('items').value.length - 1].endDate){
      console.log("its not empty")
      this.items = this.Forms.get('items') as FormArray;
      this.myarr = this.Forms.get('items').value
      this.items.push(this.devModels.createItem());
      console.log("yhi.forms- ", this.Forms.value,this.Forms.get('items').value)
    }*/
    if(this.Forms2.get('courseName').value && this.Forms2.get('startDate').value && this.Forms2.get('noOfCandidates').value != 0){
      this.myarr.push({
        courseName: this.Forms2.get('courseName').value,
        noOfCandidates: this.Forms2.get('noOfCandidates').value,
        duration: this.Forms2.get('duration').value,
        startDate: this.Forms2.get('startDate').value,
        endDate: this.Forms2.get('endDate').value,
        remarks: this.Forms2.get('remarks').value,
        type: this.Forms2.get('type').value,
        noOfOficer: this.Forms2.get('noOfOficer').value,
        noOfSailor: this.Forms2.get('noOfSailor').value,
        noOfInterService: this.Forms2.get('noOfInterService').value,
        noOfCivilian: this.Forms2.get('noOfCivilian').value,
        noOfForeigner: this.Forms2.get('noOfForeigner').value,
        noOfCadet: this.Forms2.get('noOfCadet').value,
        noOfMidShipman: this.Forms2.get('noOfMidShipman').value,
      })
      this.Forms2.controls['noOfOficer'].setValue(0)
      this.Forms2.controls['noOfSailor'].setValue(0)
      this.Forms2.controls['noOfInterService'].setValue(0)
      this.Forms2.controls['noOfCivilian'].setValue(0)
      this.Forms2.controls['noOfForeigner'].setValue(0)
      this.Forms2.controls['noOfCadet'].setValue(0)
      this.Forms2.controls['noOfMidShipman'].setValue(0)
      this.Forms2.controls['remarks'].setValue('')
      this.Forms2.controls['noOfCandidates'].setValue(0)
      this.Forms2.controls['courseName'].setValue('')
      this.Forms2.controls['startDate'].setValue('')
      this.Forms2.controls['endDate'].setValue('')
      this.Forms2.controls['duration'].setValue(0)
      //this.Forms2.reset();
    }


  }

  remove(i:number) {
    {
      this.myarr.splice(i,1)//.removeAt(i);
    }
  }

}
