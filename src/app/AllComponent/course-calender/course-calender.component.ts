import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA, ViewChild, ViewEncapsulation, ElementRef, 
   ChangeDetectorRef, ChangeDetectionStrategy,ViewChildren, AfterViewInit, QueryList} from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import {CourseService } from '../courseForm/course.service';
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
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
const name = Calendar.name
@Component({
  selector: 'app-course-calender',
  templateUrl: './course-calender.component.html',
  styleUrls: ['./course-calender.component.scss']
})
export class CourseCalenderComponent implements OnInit {
  options: any;
  courseModel: any  =[];
  calendarOptions: CalendarOptions 

  colorarr = ["dodgerblue","red","green", "orange", "blue", "whitesmoke"]
  simpleSnackBarRef: any;
  Forms: any;
  info
  schoolName
  //@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  displayedColumns: string[] = ['courseName','noOfCandidates','noOfOficer','noOfSailor','noOfInterService','noOfCivilian','noOfCadet','noOfForeigner','noOfMidShipman','start','end','duration'];
  displayedColumnsName: string[] = ['courseName','noOfCandidates','noOfOficer','noOfSailor','noOfInterService','noOfCivilian','noOfCadet','noOfForeigner','start','end','duration'];
  displayedColumns2: string[] = ['courseName','noOfCandidates','noOfSailor','noOfInterService','noOfCivilian','noOfMidShipman','start','end','duration'];
  displayedColumns3: string[] = ['courseName','noOfCandidates','noOfForeigner','noOfSailor','noOfInterService','noOfCivilian','start','end','duration'];
  
  displayedColumns4: string[] = ['courseName','noOfCandidates','noOfForeignStudent','noOfSailor','noOfCivilian','noOfForeigner','noOfMidShipman','start','end','duration'];
  
  AllElement: MatTableDataSource<any>;
  AllElement2: MatTableDataSource<any>;
  AllElement3: MatTableDataSource<any>;
  //AllElement4: MatTableDataSource<any>;
  //@ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private snackBar: MatSnackBar, private courseservice: CourseService ,
     private cdf: ChangeDetectorRef, private schoolService:SchoolService,
    public dialog: MatDialog,private modalService: NgbModal,private router:Router,
    private spinner: NgxSpinnerService) { }

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  @ViewChild('content') content : ElementRef
  calendarEvents: EventInput[] = [];
  calendarPlugins = [dayGridPlugin,  timeGridPlugin, interactionPlugin]
  //calendarApi: Calendar; 
  initialized = false; 
  //calendarOptions: CalendarOptions 
  selectedItem
  schoollist
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

  public doFilter = (value: string) => {
    this.AllElement.filter = value.trim().toLocaleLowerCase();
  }
  public doFilter1 = (value: string) => {
    this.AllElement3.filter = value.trim().toLocaleLowerCase();
  }
  public doFilter2 = (value: string) => {
    this.AllElement2.filter = value.trim().toLocaleLowerCase();
  }
  selectChanged(event){
    this.selectedItem = event
    console.log("this.selected--", this.selectedItem, this.selectedItem.includes("null"))
  }
  yesterClick(){
    let rr = new Date(new Date().setDate(new Date().getDate()-1));
    this.date1 = rr
  }
  ngAfterViewInit() {
    this.AllElement.paginator = this.paginator.toArray()[0];
    this.AllElement2.paginator = this.paginator.toArray()[2];
    this.AllElement3.paginator = this.paginator.toArray()[1];
  }
  onPrint(){

  }
  onSubmit(){
    let myarr
    let tempall = []
    let tempall2 = []
    let tempall3 = []
    //let tempall4 = [] // foreign student
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
        this.AllElement3 = new MatTableDataSource(tempall3 as any);
        //this.AllElement4 = new MatTableDataSource(tempall4 as any);
        //this.AllElement2.paginator = this.paginator;
        this.AllElement.paginator = this.paginator.toArray()[0];
        this.AllElement2.paginator = this.paginator.toArray()[2];
        this.AllElement3.paginator = this.paginator.toArray()[1];
        //this.AllElement4.paginator = this.paginator.toArray()[1];
      }
    }else{
      console.log("golfing.............")
      myarr = this.courseModel.filter(x=>  moment(new Date(this.date1)).isBetween(moment(x.start), moment(x.end),undefined, '[]'))//x.date == moment().format('YYYY-MM-DD'))
      if(myarr.length == 0){
        this.AllElement = new MatTableDataSource(tempall as any);
        //this.AllElement.paginator = this.paginator;
        this.AllElement2 = new MatTableDataSource(tempall2 as any);
        this.AllElement3 = new MatTableDataSource(tempall3 as any);
        //this.AllElement4 = new MatTableDataSource(tempall4 as any);
        //this.AllElement2.paginator = this.paginator;
        this.AllElement.paginator = this.paginator.toArray()[0];
        this.AllElement2.paginator = this.paginator.toArray()[2];
        this.AllElement3.paginator = this.paginator.toArray()[1];
        //this.AllElement4.paginator = this.paginator.toArray()[3];
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
      }else if(allval.noOfForeigner > 0){
        tempall3.push(allval)
      }
      else{
        tempall2.push(allval)
      }
      if(index == myarr.length - 1){
        this.AllElement = new MatTableDataSource(tempall as any);
        //this.AllElement.paginator = this.paginator;
        this.AllElement2 = new MatTableDataSource(tempall2 as any);
        this.AllElement3 = new MatTableDataSource(tempall3 as any);
        //this.AllElement4 = new MatTableDataSource(tempall4 as any);
        //this.AllElement2.paginator = this.paginator;
        this.AllElement.paginator = this.paginator.toArray()[0];
        this.AllElement2.paginator = this.paginator.toArray()[2];
        this.AllElement3.paginator = this.paginator.toArray()[1];

        //this.AllElement4.paginator = this.paginator.toArray()[3];
        //this.AllElement = tempall as any
        //this.AllElement2 = tempall2 as any
      }
    })
  }
  ngOnInit(): void {  
    let rr = new Date();
    this.date1 = rr
    let tempall = []
    let tempall2 = []
    let tempall3 = []
    let cadetTemp = []
    //let tempall4 = []
    this.schoolService.getAll().subscribe(detdata =>{
      this.schoollist = detdata as any
    })
    this.courseservice.getAll().subscribe(data =>{
      //this.schoollist = data
      console.log("sclist",this.schoollist)
      this.courseservice.getAllDetails().subscribe(detdata =>{
        console.log("detaildata-", detdata)

        detdata.map((detval,detind)=>{
          
        this.courseModel.push({
          title: detval.schoolName,//data.find(x=>x.id  == detval.courseId).schoolName,//detval.courseName,
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
          schoolName: detval.schoolName
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
            else if(allval.noOfForeigner > 0){
              tempall3.push(allval)
            }else{
              tempall2.push(allval)
            }
            if(index == myarr.length - 1){
              this.AllElement = new MatTableDataSource(tempall.concat(cadetTemp) as any);
              //this.AllElement.paginator = this.paginator;
              this.AllElement2 = new MatTableDataSource(tempall2 as any); // other
              this.AllElement3 = new MatTableDataSource(tempall3 as any); // foreigner
              //this.AllElement4 = new MatTableDataSource(tempall4 as any);
              //this.AllElement2.paginator = this.paginator;
              this.AllElement.paginator = this.paginator.toArray()[0];
              this.AllElement2.paginator = this.paginator.toArray()[2];
              this.AllElement3.paginator = this.paginator.toArray()[1];
              //this.AllElement4.paginator = this.paginator.toArray()[1];
              //this.AllElement = tempall as any
              //this.AllElement2 = tempall2 as any
            }
          }) 
            console.log("arr finished--", this.courseModel)

            this.cdf.detectChanges;
            this.initialized = true
          }
        })
        
      })
    })


  }


  ////////////////
  allSelected=false;
  @ViewChild('select') select: MatSelect;

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
