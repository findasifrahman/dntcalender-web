import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA,ElementRef, ViewChild, ViewEncapsulation,ChangeDetectorRef } from '@angular/core';

import { AddEventService } from '../eventForm/add-event.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { start } from '@popperjs/core';
const name = Calendar.name
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]

})
export class HomeComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  @ViewChild('calendar') myCal: ElementRef;
  @ViewChild('content') content: ElementRef
  closeResult: string;



  openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  calendarEvents: EventInput[] = [];
  calendarPlugins = [dayGridPlugin,  timeGridPlugin, interactionPlugin]
   //calendarApi: Calendar; 

   eventarr: []
   detail: any = []
  calendarOptions: CalendarOptions 
  options: any;
  eventsModel: any  =[];
  

  initialized = false
  simpleSnackBarRef: any;
  Forms: any;

  title = ""
  constructor(private snackBar: MatSnackBar, private addEventservice: AddEventService ,private cdf: ChangeDetectorRef,
    public dialog: MatDialog,private router:Router,private spinner: NgxSpinnerService,
    private modalService: NgbModal) { }

  ngOnInit() {
     setTimeout(function(){
      this.addEventservice.getAll().subscribe(data =>{
        data.map((mapval,index) =>{
          var colorname = "";
          if(mapval.color == "DDNT") { colorname = "dodgerblue";  }
          else if (mapval.color == "SOTI") { colorname = "red"; }
          else if (mapval.color == "SOTII") { colorname = "darkblue"; }
          else if (mapval.color == "OICTDEC") { colorname = "green"; }
          else if (mapval.color == "PA") { colorname = "orange"; }
          else{ colorname = mapval.colorname}
          this.detail.push({
            title: mapval.title ,
            date:  moment(mapval.start).format('YYYY-MM-DD'),
            start: moment(mapval.start).format('YYYY-MM-DD'),
            end: moment(mapval.end).format('YYYY-MM-DD'),
            color: colorname,
            description: mapval.description,
            id: mapval.id
          })
          if( mapval.description){
            this.eventsModel.push({
              title: mapval.title + ":" + mapval.description,
              date:  moment(mapval.start).format('YYYY-MM-DD'),
              start: moment(mapval.start).format('YYYY-MM-DD'),
              end: moment(mapval.end).format('YYYY-MM-DD'),
              color: colorname,
              description: mapval.description,
              id: mapval.id
            })
          }else{
            this.eventsModel.push({
              title: mapval.title,
              date:  moment(mapval.start).format('YYYY-MM-DD'),
              start: moment(mapval.start).format('YYYY-MM-DD'),
              end: moment(mapval.end).format('YYYY-MM-DD'),
              color: colorname,
              description: mapval.description,
              id: mapval.id
            })
          }
          console.log("evmodels--", this.eventsModel)
          if(data.length-1 == index){
            this.calendarOptions = {
              initialView: 'dayGridMonth',
              headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,listWeek,dayGrid'
              },
              dayMaxEvents: true, // allow "more" link when too many events
              
              views: {
                day: { // name of view
                  titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' },
                  fontSize: '50px'
                  // other view-specific options here
                }
              },
        
              events: this.eventsModel,
              eventClick: function(info) {
                  console.log("info-",info.event,this.eventsModel.find(x => x.id == info.event.id).description)
                 // this.eventsModel.find(x => x.id == info.event.id)
                  this.snackBar.open(    this.eventsModel.find(x => x.id == info.event.id).description, "Remove", {
                    duration: 6000,
                    verticalPosition: 'top',
                    panelClass: ['blue-snackbar']
                  });
              }.bind(this),
              dateClick: function(date) {
                console.log("day clicked..",date)
                this.title = moment(date.dateStr).format('DD MMMM, YYYY')
               /* this.calendarComponent
                .getApi()
                .changeView('dayGrid',date.dateStr);*/
                this.eventarr = this.detail.filter(x=> moment(date.dateStr).isBetween(moment(x.start), moment(x.end),undefined, '[]') || moment(x.start).isSame(moment(new Date(date.dateStr))) || moment(x.end).isSame(moment(new Date(date.dateStr)))    )//x.date == moment().format('YYYY-MM-DD'))
                this.modalService.open(this.content, { windowClass: 'dark-modal',size: 'xl' });

    
             }.bind(this),
        
            };
            this.cdf.detectChanges;
            this.initialized = true
          }
        })
      })
  
      this.options = {
        editable: true,
        /*customButtons: {
          myCustomButton: {
            text: 'custom!',
            // click: this.customFunction.bind(this)
            click: () => this.customFunction()
          }
        },*/
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        columnHeaderHtml: () => {
            return '<b>Friday!</b>';
        },
        plugins: [listPlugin,dayGridPlugin, interactionPlugin, timeGridPlugin]
      };
     }.bind(this),100)

  }

    ngAfterViewInit(){
      this.spinner.hide();
    }
    onEventRender(info: any) { 
      console.log('onEventRender', info.el); 
      const tooltip = new Tooltip(info.el, { 
        title: info.event.title, 
        placement: 'top-end', 
        trigger: 'hover', 
        container: 'body' 
      }); 
    } 
    handleDateClick(arg) {
      alert('date click! ' + arg.dateStr)
    }
    

 
  onDateClick(clickedDate: any) {
    console.log(clickedDate);
  }

  onEventClick(clickedEvent: any) {
    console.log(clickedEvent);
  }


}
