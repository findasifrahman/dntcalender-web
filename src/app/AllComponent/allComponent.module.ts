import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent} from './home/home.component';

import { RoleGuard } from '../auth/role.guard';
import { AuthGuard } from '../auth/auth.guard';

import { SharedmodulesModule } from '../commonmodule/sharedmodule/sharedmodules.module';
//import { SharedComponentmoduleModule } from '../sharedComponentModule/shared-componentmodule.module';
import { SharedComponentmoduleModule  } from '../sharedComponentModule/shared-componentmodule.module';


import { AdminlayoutComponent } from '../commonLayout/adminlayout/adminlayout.component';


// Import library module
import { NgxSpinnerModule } from "ngx-spinner";
import { AddEventComponent } from './eventForm/add-event/add-event.component';

import { eventForm  } from '../models/eventmodels';
import { courseForm } from '../models/coursemodels';
import { teemplateForm } from '../models/templateForm'
import { employeemodelsform } from '../models/employeemodels'
import { schoolForm } from '../models/schoolmodels'
import { foreignCourseForm  } from '../models/foreigncoursemodels'

import { EditEventComponent } from './eventForm/edit-event/edit-event.component';
import { ListEventComponent } from './eventForm/list-event/list-event.component';
import { AddCourseComponent } from './courseForm/add-course/add-course.component';
import { EditCourseComponent } from './courseForm/edit-course/edit-course.component';
import { ListCourseComponent } from './courseForm/list-course/list-course.component';

import { AddTemplateComponent } from './templateForm/add-template/add-template.component';
import { EditTemplateComponent } from './templateForm/edit-template/edit-template.component';
import { ListTemplateComponent } from './templateForm/list-template/list-template.component';
import { AddUserComponent } from './newUser/add-user/add-user.component';
import { EditUserComponent } from './newUser/edit-user/edit-user.component';
import { ListUserComponent } from './newUser/list-user/list-user.component';
import { CourseCalenderComponent } from './course-calender/course-calender.component';

import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import timeGrigPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { AddSchoolComponent } from './schoonameForm/add-school/add-school.component';
import { EditSchoolComponent } from './schoonameForm/edit-school/edit-school.component';
import { ListSchoolComponent } from './schoonameForm/list-school/list-school.component';
import { ForeignCourseComponent } from './foreign-course/foreign-course.component';
import { AddForeignCourseComponent } from './foreignForm/add-foreign-course/add-foreign-course.component';
import { EditForeignCourseComponent } from './foreignForm/edit-foreign-course/edit-foreign-course.component';
import { ListForeignCourseComponent } from './foreignForm/list-foreign-course/list-foreign-course.component'; // a plugin

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGrigPlugin,
  listPlugin
]);
const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full'
  },


  { path: '',component: AdminlayoutComponent ,children:[

    { path: '', //loadChildren: './settingsComponents/settingsComponents.module#settingsComponentModule'
      children:[
          { 
            path: 'home', component: HomeComponent,canActivate: [RoleGuard],
            data: {
              expectedRole: ['admin','user']
            }
          },
          
          {
            path: 'courseCalender', component: CourseCalenderComponent,canActivate: [RoleGuard],
            data: {
              expectedRole: ['admin', 'user']
            }
          },
          { 
            path: 'addEvent', component: AddEventComponent,canActivate: [RoleGuard],
            data: {
              expectedRole: ['admin', 'user']
            }
          },
          { 
            path: 'editEvent/:id',  component: EditEventComponent,canActivate: [RoleGuard],
            data: {
              expectedRole: ['admin', 'user']
            }
          },
          { 
            path: 'listEvent',  component: ListEventComponent,canActivate: [RoleGuard],
            data: {
              expectedRole: ['admin', 'user']
            }
          },

          { 
            path: 'addCourse', component: AddCourseComponent,canActivate: [RoleGuard],
            data: {
              expectedRole: ['admin', 'user']
            }
          },
          { 
            path: 'editCourse/:id',  component: EditCourseComponent,
          },
          { 
            path: 'listCourse',  component: ListCourseComponent,canActivate: [RoleGuard],
            data: {
              expectedRole: ['admin', 'user']
            }
          },

          { 
            path: 'addTemplate', component: AddTemplateComponent,canActivate: [RoleGuard],
            data: {
              expectedRole: ['admin', 'user']
            }
          },
          { 
            path: 'editTemplate/:id',  component: EditTemplateComponent,canActivate: [RoleGuard],
            data: {
              expectedRole: ['admin', 'user']
            }
          },
          { 
            path: 'listTemplate',  component: ListTemplateComponent,canActivate: [RoleGuard],
            data: {
              expectedRole: ['admin', 'user']
            }
          },

          { 
            path: 'addUser', component: AddUserComponent,canActivate: [RoleGuard],
            data: {
              expectedRole: ['admin']
            }
          },
          { 
            path: 'editUser/:id',  component:EditUserComponent,
          },
          { 
            path: 'listUser',  component: ListUserComponent,canActivate: [RoleGuard],
            data: {
              expectedRole: ['admin']
            }
          },

          { 
            path: 'addSchool', component: AddSchoolComponent,canActivate: [RoleGuard],
            data: {
              expectedRole: ['admin']
            }
          },
          { 
            path: 'editSchool/:id',  component: EditSchoolComponent,
          },
          { 
            path: 'listSchool',  component: ListSchoolComponent,canActivate: [RoleGuard],
            data: {
              expectedRole: ['admin']
            }
          },
          { 
            path: 'foreignCourse',  component: ForeignCourseComponent,canActivate: [RoleGuard],
            data: {
              expectedRole: ['admin', 'user']
            }
          },
          { 
            path: 'addForeign',  component: AddForeignCourseComponent,canActivate: [RoleGuard],
            data: {
              expectedRole: ['admin', 'user']
            }
          },
          { 
            path: 'editForeign/:id',  component: EditForeignCourseComponent,canActivate: [RoleGuard],
            data: {
              expectedRole: ['admin', 'user']
            }
          },
          { 
            path: 'listForeign',  component: ListForeignCourseComponent,canActivate: [RoleGuard],
            data: {
              expectedRole: ['admin', 'user']
            }
          }

        ],

      },
    ]
  }
]

@NgModule({
 declarations:[AdminlayoutComponent,HomeComponent, AddEventComponent, EditEventComponent, ListEventComponent,
   AddCourseComponent, EditCourseComponent, ListCourseComponent,
    AddTemplateComponent, EditTemplateComponent, ListTemplateComponent, AddUserComponent, EditUserComponent, 
    ListUserComponent, CourseCalenderComponent, AddSchoolComponent, EditSchoolComponent, ListSchoolComponent, 
    ForeignCourseComponent, AddForeignCourseComponent, EditForeignCourseComponent, ListForeignCourseComponent

  ],

  imports: [CommonModule,FormsModule,RouterModule.forChild(routes),SharedComponentmoduleModule,
    ReactiveFormsModule,HttpClientModule,SharedmodulesModule,NgxSpinnerModule,eventForm,foreignCourseForm,courseForm,schoolForm,
    employeemodelsform,teemplateForm , FullCalendarModule ],

  exports: [AdminlayoutComponent,HomeComponent,AddEventComponent,EditEventComponent, ListEventComponent,
    AddCourseComponent, EditCourseComponent, ListCourseComponent,
    AddTemplateComponent, EditTemplateComponent, ListTemplateComponent,AddUserComponent, EditUserComponent, 
    ListUserComponent, CourseCalenderComponent// LoginComponent,LogoutComponent,
    , AddSchoolComponent, EditSchoolComponent, ListSchoolComponent,ForeignCourseComponent,
    AddForeignCourseComponent, EditForeignCourseComponent, ListForeignCourseComponent
 ],
 providers: [AuthGuard,RoleGuard],
 schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class allComponentModule{}
