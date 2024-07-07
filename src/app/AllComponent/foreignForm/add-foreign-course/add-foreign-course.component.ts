import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup,FormControl, FormArray } from '@angular/forms';
import { ForeignCourceService } from '../foreign-cource.service';
import { SchoolService } from '../../schoonameForm/school.service'
import { Router } from '@angular/router';
import { __await } from 'tslib';
import { MatSnackBar } from '@angular/material/snack-bar';
import { foreignCourseForm } from '../../../models/foreigncoursemodels';
import * as moment from 'moment';
@Component({
  selector: 'app-add-foreign-course',
  templateUrl: './add-foreign-course.component.html',
  styleUrls: ['./add-foreign-course.component.scss']
})
export class AddForeignCourseComponent implements OnInit {
  Forms2: FormGroup;
  selectFormControl = new FormControl('', Validators.required);
  items: FormArray;
  myarr = []
  type_arr = ["officer","soldier"]
  countryName_arr = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"]
  constructor(private snackBar: MatSnackBar, private courseService: ForeignCourceService, private schoolService:SchoolService
    ,private formBuilder: FormBuilder, private router: Router,private devModels: foreignCourseForm ) { }
    calculate(){
      let f = this.Forms2.controls['noOfOficer'].value
      let g = this.Forms2.controls['noOfSailor'].value
      let h = this.Forms2.controls['noOfInterService'].value
      let i = this.Forms2.controls['noOfCivilian'].value
      let j = this.Forms2.controls['noOfForeigner'].value
      let k = this.Forms2.controls['noOfCadet'].value
      let l = this.Forms2.controls['noOfMidShipman'].value
      let m = this.Forms2.controls['noOfForeignStudent'].value
      
      this.Forms2.controls['noOfCandidates'].setValue(f+g+ h+i+j+k+l +m)
    }
  ngOnInit(): void {

    this.Forms2 = this.devModels.modelForms2;
    //this.Forms2.reset();

    this.Forms2.setValue({
      noOfOficer: 0, 
      noOfSailor: 0,
      noOfInterService: 0,
      noOfCivilian: 0,
      noOfForeigner:0,
      noOfCadet: 0,
      noOfMidShipman: 0,
      noOfForeignStudent: 0,
      countryName: "",
      remarks: "",
      courseName: "",
      type: "",
      duration: 0,
      noOfCandidates: 0,
      startDate: "",
      endDate: ""

    });

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
    /////////////////////////////////////////////////////////////////
    this.Forms2.controls['noOfOficer'].valueChanges.subscribe(value => {
      this.calculate()
    });
    this.Forms2.controls['noOfSailor'].valueChanges.subscribe(value => {
      this.calculate()
    });
    this.Forms2.controls['noOfForeignStudent'].valueChanges.subscribe(value => {
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
  }
  async FormSubmit() {
    if(!this.Forms2.get('countryName').value){
      this.snackBar.open('Please specify School  Name', "Remove", {
        duration: 6000,
        verticalPosition: 'top',
        panelClass: ['blue-snackbar']
      });
      return
    }
    /*if(this.myarr.length ==0){
      this.snackBar.open('Please Mention atleast one activity', "Remove", {
        duration: 6000,
        verticalPosition: 'top',
        panelClass: ['blue-snackbar']
      });
    }else*/
    {
        let myobj = {
          countryName: this.Forms2.get('countryName').value,
          items: this.myarr
        }
        console.log(myobj)
        //console.log("yhi.forms- ", this.Forms.value,formValue.items)
        try {
          await this.courseService.Add(this.Forms2.value).subscribe(
            data => {
              console.log("post req successfull");
              this.snackBar.open('Data Added Successfully', "Remove", {
                duration: 6000,
                verticalPosition: 'top',
                panelClass: ['blue-snackbar']
              });
              this.router.navigate(["/listForeign"]);
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



}
