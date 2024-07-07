import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SharedmodulesModule } from '../commonmodule/sharedmodule/sharedmodules.module';
import { SocialcontactcardComponent } from './socialcontactcard/socialcontactcard.component';
import { ThreecolmatgridComponent } from './threecolmatgrid/threecolmatgrid.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';


//import { FileSelectDirective } from 'ng2-file-upload';
import { FileUploadModule } from 'ng2-file-upload';

import { ProductviewcardComponent } from './productviewcard/productviewcard.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MattreeComponent } from './mattree/mattree.component';
import { StatComponent } from './stat/stat.component';
import { CardInfoComponent } from './card-info/card-info.component';
import { UserStatusComponent } from './user-status/user-status.component';


import { SelectSearchComponent } from './select-search/select-search.component';
@NgModule({
  declarations: [NavbarComponent, FooterComponent, SocialcontactcardComponent,
     ThreecolmatgridComponent, ConfirmationDialogComponent, 
     //FileSelectDirective,
     ProductviewcardComponent,
     SidenavComponent,StatComponent,
     MattreeComponent,
     CardInfoComponent,
     UserStatusComponent,
     SelectSearchComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedmodulesModule,
    FileUploadModule,
    FormsModule, ReactiveFormsModule
  ],
  entryComponents:[ConfirmationDialogComponent],
  exports:[NavbarComponent,FooterComponent,SocialcontactcardComponent,ThreecolmatgridComponent,
    ConfirmationDialogComponent,ProductviewcardComponent,SidenavComponent,
    MattreeComponent, StatComponent, CardInfoComponent, UserStatusComponent,SelectSearchComponent]
})
export class SharedComponentmoduleModule { }
