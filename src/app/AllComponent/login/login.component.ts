import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
// Import library module
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  simpleSnackBarRef: any;
  Forms: any;
  constructor(private snackBar: MatSnackBar, private logservice: LoginService,
    private formBuilder: FormBuilder,private router:Router,private spinner: NgxSpinnerService) { }

    ngOnInit() {
      this.Forms = this.formBuilder.group({
        username: ["", Validators.required],
        password: ["", Validators.required],
        requestorigin: ["desktop"],
        uniqueid: [null]
      });
    }

    async FormSubmit() {
      
      this.spinner.show();
      this.Forms.controls['requestorigin'].setValue('desktop');
      const formValue = this.Forms.value;
      await this.logservice.submit(formValue).subscribe(response => {
        //this.spinner.hide();
        console.log("<any>response-", <any>response)
        if(<any>response.error){
          this.spinner.hide();
          this.snackBar.open(<any>response.error,"Undo",{
            duration: 6000,
            verticalPosition: 'top',
            panelClass: ['red-snackbar']
          });
          return
        }
        console.log("<any>response-",<any>response)
        let token = (<any>response).token;
        localStorage.setItem("jwt", token);
        localStorage.setItem("userDetails", JSON.stringify((<any>response).userdata))
        console.log(token);
        //console.log("re4sponse",response);
        /////////
        //console.log("responsedata.devobj--",response.devobject)

        //this.props.devicedataPropAdd(newrespdata)//responseData.devobject)
        //////////////

        console.log("this.logservice.getrole()-",this.logservice.getrole());
        this.snackBar.open('Congratulations. Logged in Successfully', "Remove", {
          duration: 6000,
          verticalPosition: 'top',
          panelClass: ['blue-snackbar']
        });
        this.router.navigate(["/home"])//,{devobj: JSON.stringify(response.devobject.map(({ uid }) => uid))  }]);
      }, err => {
        console.log(err.error.error)
        console.log(err.error)
        this.spinner.hide();
        this.snackBar.open('Wrong -- ' + err.error.error,"Undo",{
          duration: 6000,
          verticalPosition: 'top',
          panelClass: ['red-snackbar']
        });
      });
    }
}
