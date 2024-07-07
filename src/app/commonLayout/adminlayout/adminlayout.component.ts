import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../AllComponent/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlayout',
  templateUrl: './adminlayout.component.html',
  styleUrls: ['./adminlayout.component.scss']
})
export class AdminlayoutComponent implements OnInit {
   hide:boolean;
   title = 'taskCalenderWeb';
   screenWidth: number;
   isShowSettingsli = false
   isShowSettings = true
   hideNav = false
   constructor(private readonly router: Router,private lservice: LoginService) {
     // set screenWidth on page load
     this.screenWidth = window.innerWidth;
     window.onresize = () => {
       // set screenWidth on screen size change
       this.screenWidth = window.innerWidth;
     };


   }
   ngAfterViewInit(){
    if(this.lservice.getrole() !== "admin"){
      console.log("user role is user man--------------")
      this.hideNav = false//true
      this.isShowSettingsli = true
    }
   }
  @Output() sideNavToggled = new EventEmitter<void>();

  toggleDisplaySettings() {
    this.isShowSettings = !this.isShowSettings;
  }

  ngOnInit() {}

  toggleSidebar() {
    this.sideNavToggled.emit();
  }

  onLoggedout() {
    localStorage.removeItem('isLoggedin');
    this.router.navigate(['/login']);
  }

}
