import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import {  FormBuilder, Validators, FormGroup,FormControl, FormArray } from '@angular/forms';
import { SchoolService } from '../school.service';
import { Router,ActivatedRoute } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material/snack-bar';
import { courseForm } from '../../../models/coursemodels';


@Component({
  selector: 'app-edit-school',
  templateUrl: './edit-school.component.html',
  styleUrls: ['./edit-school.component.scss']
})
export class EditSchoolComponent implements OnInit {
  Forms: FormGroup;
  id: any;
  constructor(private snackBar: MatSnackBar, private schoolService: SchoolService,private route:ActivatedRoute,
    private formBuilder: FormBuilder, private router: Router,private devModels: courseForm ) { }

  ngOnInit(): void {
    this.Forms = this.devModels.modelForms;
    //this.items = this.Forms.get('items') as FormArray
    this.Forms.reset();
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log("update id--" + params['id']);
      this.schoolService.getbyid(this.id).subscribe((data) => {
        this.Forms.patchValue(data);
      });
    })
  }
  async FormSubmit() {
    const formValue = this.Forms.value;
    try {
      await this.schoolService.update(this.id,formValue).subscribe(
        data => {
          console.log("post req successfull");
          this.snackBar.open('Data Added Successfully', "Remove", {
            duration: 6000,
            verticalPosition: 'top',
            panelClass: ['blue-snackbar']
          });
          this.router.navigate(["/listSchool"]);
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
