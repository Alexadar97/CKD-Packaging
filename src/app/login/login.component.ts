import { Component, OnInit, Injectable, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AuthGuard } from '../quality/packaging/packservices/canactivate.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatatransferService } from '../quality/packaging/packservices/datatransfer.service'
declare var $;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errormsg: any;
  loginForm: FormGroup;
  finalappcode: any;
  emailvalidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+")){2,}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  numbervalidation = /^[0-9,/]+$/;
  alphanumeric = /^[a-zA-Z0-9]+$/;
  alphawithdot = /^[a-zA-Z. ]+$/;
  decimalnumber = /^(0|[1-9]\d*)(\.\d+)?$/;

  constructor(private Formbuilder: FormBuilder, private router: Router,private AuthGuard: AuthGuard) {
    this.loginForm = Formbuilder.group({
      'name': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])],
      'username': [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
  }
 
 

login() {
  if (this.loginForm.invalid) {
    this.markFormGroupTouched(this.loginForm);
    $.notify("Mandatory Field is required!!!", "error");
    return false;
  }
  else{
  var getdata = this.loginForm.value;
  var name = getdata.name;
  var password = getdata.password;

  localStorage.setItem("user_type",name)


   if ( name =='Export' ) {
    //  this.DataService.signoffsheet = "signoffsheet"
    this.router.navigateByUrl('/dashboard/signoffsheet');
  }
  else if (name == 'Supplier' ) {
    // this.DataService.signoffsheetsupply = "signoffsheetsupply"
    this.router.navigateByUrl('/dashboard/Supplierlist');
  }
  else if (name == 'Enduser' ) {
    // this.getdata.signoffsheet = "signoffsheet"
    this.router.navigateByUrl('/dashboard/Enduserapproval');
  }
  else {
    this.errormsg = 'Invalid Username or Password';
  }


}
}

private markFormGroupTouched(formGroup: FormGroup) {
  (<any>Object).values(formGroup.controls).forEach(control => {
    control.markAsTouched();

    if (control.controls) {
      this.markFormGroupTouched(control);
    }
  });
}
}