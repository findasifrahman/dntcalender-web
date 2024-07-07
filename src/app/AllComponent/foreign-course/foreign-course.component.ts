import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA, ViewChild, ViewEncapsulation, ElementRef, 
  ChangeDetectorRef, ChangeDetectionStrategy,ViewChildren, AfterViewInit, QueryList} from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import {ForeignCourceService } from '../foreignForm/foreign-cource.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SchoolService } from '../schoonameForm/school.service'
// Import library module
import { NgxSpinnerService } from "ngx-spinner";
import { EventInput, Calendar, sliceEvents} from '@fullcalendar/core'; 
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular'; // useful for typechecking

import  timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list'; 
import interactionPlugin from '@fullcalendar/interaction'; 
import Tooltip from 'tooltip.js'; 
import * as moment from 'moment';
import {MatDialog} from '@angular/material/dialog';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-foreign-course',
  templateUrl: './foreign-course.component.html',
  styleUrls: ['./foreign-course.component.scss']
})
export class ForeignCourseComponent implements OnInit {
  
  options: any;
  courseModel: any  =[];

  colorarr = ["dodgerblue","red","green", "orange", "blue", "whitesmoke"]
  simpleSnackBarRef: any;
  Forms: any;
  info
  schoolName
  //@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  displayedColumns: string[] = ['courseName','noOfCandidates','noOfOficer','noOfSailor','noOfInterService','noOfCivilian','noOfCadet','noOfMidShipman','start','end','duration'];
  displayedColumns2: string[] = ['courseName','noOfCandidates','noOfSailor','noOfInterService','noOfCivilian','noOfMidShipman','start','end','duration'];


  selectedItem
  countryName_arr = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"]
 
  numofOfficer = 0
  numofSoldier = 0
  numofCivilian = 0
  numofInterService = 0
  numofForeigner = 0
  numofCadet = 0
  numofMidShipman = 0
  numofForeignStudent = 0
  totalTrainee = 0
  date1
  headerhide = true
  AllElement: MatTableDataSource<any>;
  AllElement2: MatTableDataSource<any>;
  constructor(private snackBar: MatSnackBar, private courseservice: ForeignCourceService ,
    private cdf: ChangeDetectorRef, private schoolService:SchoolService,
   public dialog: MatDialog,private modalService: NgbModal,private router:Router,
   private spinner: NgxSpinnerService) { }

   public doFilter = (value: string) => {
    this.AllElement.filter = value.trim().toLocaleLowerCase();
  }
  public doFilter1 = (value: string) => {
    this.AllElement2.filter = value.trim().toLocaleLowerCase();
  }
   ngAfterViewInit() {
   // this.AllElement.paginator = this.paginator.toArray()[0];
   // this.AllElement2.paginator = this.paginator.toArray()[1];
  }
  ngOnInit(): void {
    let rr = new Date();
    this.date1 = rr
    let tempall = []
    let tempall2 = []
    let cadetTemp = []

    this.courseservice.getAll().subscribe(data =>{
      this.courseservice.getAllDetails().subscribe(detdata =>{
        console.log("detaildata-", detdata)

        detdata.map((detval,detind)=>{
          
        this.courseModel.push({
          title: detval.countryName,//data.find(x=>x.id  == detval.courseId).schoolName,//detval.courseName,
          date:  moment(detval.startDate).format('DD-MM-YYYY'),//format('YYYY-MM-DD'),
          start: moment(detval.startDate).format('YYYY-MM-DD'),
          end: moment(detval.endDate).add(0, 'days').format('YYYY-MM-DD'),
          endDate: moment(detval.endDate).format('DD-MM-YYYY'),//format('YYYY-MM-DD'),
          color: this.colorarr[(detind+1)%5],
          courseName:detval.courseName,
          noOfCandidates: detval.noOfCandidates,
          id: detval.id,
          courseId: detval.courseId,
          remarks: detval.remarks,
          duration: detval.duration,
          type: detval.type,
          noOfOficer: detval.noOfOficer,
          noOfSailor: detval.noOfSailor,
          noOfCivilian: detval.noOfCivilian,
          noOfInterService: detval.noOfInterService,
          noOfForeigner: detval.noOfForeigner,
          noOfCadet: detval.noOfCadet,
          noOfMidShipman: detval.noOfMidShipman,
          noOfForeignStudent: detval.noOfForeignStudent,
          countryName: detval.countryName
        })
         if(detdata.length-1 == detind){
          let rr = new Date().getTime() 
          console.log(" moment().format('YYYY-MM-DD')-",moment(new Date()).format('YYYY-MM-DD'), this.courseModel)
          let myarr = this.courseModel.filter(x=> moment(new Date()).isBetween(moment(x.start), moment(x.end),undefined, '[]'))//x.date == moment().format('YYYY-MM-DD'))
          console.log("myarr-", this.AllElement)
          myarr.map((allval,index)=>{
            this.totalTrainee = this.totalTrainee + allval.noOfOficer + allval.noOfSailor + allval.noOfCivilian +
            allval.noOfInterService + allval.noOfForeigner + allval.noOfCadet + allval.noOfMidShipman

            this.numofOfficer = this.numofOfficer + allval.noOfOficer
            this.numofSoldier = this.numofSoldier + allval.noOfSailor
            this.numofCivilian = this.numofCivilian + allval.noOfCivilian

            this.numofInterService = this.numofInterService + allval.noOfInterService

            this.numofForeigner = this.numofForeigner + allval.noOfForeigner
            this.numofCadet = this.numofCadet + allval.noOfCadet

            this.numofMidShipman = this.numofMidShipman + allval.noOfMidShipman
            this.numofForeignStudent = this.numofForeignStudent + allval.noOfForeignStudent
            if(allval.noOfOficer > 0){
              tempall.push(allval)
            }else if(allval.noOfCadet > 0){
              cadetTemp.push(allval)
            }
            else{
              tempall2.push(allval)
            }
            if(index == myarr.length - 1){
              this.AllElement = new MatTableDataSource(tempall.concat(cadetTemp) as any);
              //this.AllElement.paginator = this.paginator;
              this.AllElement2 = new MatTableDataSource(tempall2 as any); // other

              //this.AllElement2.paginator = this.paginator;
              this.AllElement.paginator = this.paginator.toArray()[0];
              this.AllElement2.paginator = this.paginator.toArray()[1];

              //this.AllElement = tempall as any
              //this.AllElement2 = tempall2 as any
            }
          }) 
            console.log("arr finished--", this.courseModel)

          }
        })
        
      })
    })

  }
  selectChanged(event){
    this.selectedItem = event
    console.log("this.selected--", this.selectedItem, this.selectedItem.includes("null"))
  }
  yesterClick(){
    let rr = new Date(new Date().setDate(new Date().getDate()-1));
    this.date1 = rr

  }

  //////////////
  onSubmit(){
    let myarr
    let tempall = []
    let tempall2 = []
    let rr = this.selectedItem
    console.log('dat1--', this.date1, this.selectedItem)
  /*  if(this.selectedItem.includes("-- select")){
      this.selectedItem = null
      console.log("--selected null")
    }*/
    console.log('dat1--', this.date1, this.selectedItem, typeof rr)
    if(rr !== "null"){
      console.log("inside not null")
      myarr  = this.courseModel.filter(x=> this.selectedItem.includes(x.title) && moment(new Date(this.date1)).isBetween(moment(x.start), moment(x.end),undefined, '[]'))//x.date == moment().format('YYYY-MM-DD'))
      if(myarr.length == 0){
        this.AllElement = new MatTableDataSource(tempall as any);
        //this.AllElement.paginator = this.paginator;
        this.AllElement2 = new MatTableDataSource(tempall2 as any);
        //this.AllElement2.paginator = this.paginator;
        this.AllElement.paginator = this.paginator.toArray()[0];
        this.AllElement2.paginator = this.paginator.toArray()[1];
      }
    }else{
      console.log("golfing.............")
      myarr = this.courseModel.filter(x=>  moment(new Date(this.date1)).isBetween(moment(x.start), moment(x.end),undefined, '[]'))//x.date == moment().format('YYYY-MM-DD'))
      if(myarr.length == 0){
        this.AllElement = new MatTableDataSource(tempall as any);
        //this.AllElement.paginator = this.paginator;
        this.AllElement2 = new MatTableDataSource(tempall2 as any);

        //this.AllElement2.paginator = this.paginator;
        this.AllElement.paginator = this.paginator.toArray()[0];
        this.AllElement2.paginator = this.paginator.toArray()[1];

      }
    }//console.log("info--", info.event)
    this.schoolName = this.selectedItem
    this.numofOfficer = 0
    this.numofSoldier = 0
    this.numofCivilian = 0
    this.numofInterService = 0
    this.numofForeigner = 0
    this.numofCadet = 0
    this.numofMidShipman = 0
    this.numofForeignStudent = 0
    this.totalTrainee = 0
    myarr.map((allval,index)=>{

      this.totalTrainee = this.totalTrainee + allval.noOfOficer + allval.noOfSailor + allval.noOfCivilian +
      allval.noOfInterService + allval.noOfForeigner + allval.noOfCadet + allval.noOfMidShipman

      this.numofOfficer = this.numofOfficer + allval.noOfOficer

      this.numofSoldier = this.numofSoldier + allval.noOfSailor

      this.numofCivilian = this.numofCivilian + allval.noOfCivilian

      this.numofInterService = this.numofInterService + allval.noOfInterService

      this.numofForeigner = this.numofForeigner + allval.noOfForeigner

      this.numofCadet = this.numofCadet + allval.noOfCadet

      this.numofMidShipman = this.numofMidShipman + allval.noOfMidShipman

      this.numofForeignStudent = this.numofForeignStudent + allval.noOfForeignStudent
      if(allval.noOfOficer > 0){
        tempall.push(allval)
      }
      else{
        tempall2.push(allval)
      }
      if(index == myarr.length - 1){
        this.AllElement = new MatTableDataSource(tempall as any);
        //this.AllElement.paginator = this.paginator;
        this.AllElement2 = new MatTableDataSource(tempall2 as any);

        //this.AllElement2.paginator = this.paginator;
        this.AllElement.paginator = this.paginator.toArray()[0];
        this.AllElement2.paginator = this.paginator.toArray()[1];

      }
    })
  }
  ////////////////
  allSelected=false;
  @ViewChild('select') select: MatSelect;
  foods: any[] = [
   {value: 'steak-0', viewValue: 'Steak'},
   {value: 'pizza-1', viewValue: 'Pizza'},
   {value: 'tacos-2', viewValue: 'Tacos'}
 ];
 toggleAllSelection() {
   if (this.allSelected) {
     this.select.options.forEach((item: MatOption) => item.select());
   } else {
     this.select.options.forEach((item: MatOption) => item.deselect());
   }
 }
  optionClick() {
   let newStatus = true;
   this.select.options.forEach((item: MatOption) => {
     if (!item.selected) {
       newStatus = false;
     }
   });
   this.allSelected = newStatus;
 }
  //////////////////
}
