

import { NgxSpinnerModule } from "ngx-spinner";

import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './AllComponent/login/login.component';
import { LogoutComponent } from './AllComponent/logout/logout.component';
//import { HomeComponent} from './AllComponent/home/home.component';
//import { CourseCalenderComponent} from './AllComponent/course-calender/course-calender.component';

import {  ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedmodulesModule } from './commonmodule/sharedmodule/sharedmodules.module';

import { SharedComponentmoduleModule  } from './sharedComponentModule/shared-componentmodule.module';
import { ChartsModule } from 'ng2-charts';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import timeGrigPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'; // a plugin

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGrigPlugin,
  listPlugin
]);
@NgModule({
  declarations: [
    AppComponent, LoginComponent, LogoutComponent, //HomeComponent, 
    //CourseCalenderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,ReactiveFormsModule, FormsModule,SharedmodulesModule,
    SharedComponentmoduleModule,ChartsModule,NgxSpinnerModule,
    FullCalendarModule // register FullCalendar with you app

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
