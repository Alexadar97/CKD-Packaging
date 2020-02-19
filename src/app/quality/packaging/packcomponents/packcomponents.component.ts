import { Component, OnInit, Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { WebService } from '.././packservices/webservice';
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { IfObservable } from 'rxjs/observable/IfObservable';
declare var $;
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { debug } from 'util';
@Component({
  selector: 'app-packcomponents',
  templateUrl: './packcomponents.component.html',
  styleUrls: ['./packcomponents.component.css']
})



export class PackcomponentsComponent implements OnInit {
  private getallRoleapi = this.getdata.appconstant + 'listRole';
  constructor(private http: Http, private ref: ChangeDetectorRef, private getdata: WebService, private Formbuilder: FormBuilder, private router: Router, private makeapi: WebService, ) {

  }
  user:any;
  ngOnInit() {
    // this.packaging();
    //COMMENTED TO ERROR
    // this.getAllrole()
    if(localStorage.getItem("user_type")=="Export")
    {
    console.log("user_type")
      this.route = "signoffsheet"
      this.Export = true
      this.Supplier = false
    }
    else if(localStorage.getItem("user_type")=="Supplier")  {
      this.route = "signoffsheetsupply"
      this.Export = false
      this.Supplier = true
    }
    else{
      this.route = ""
    }
   
   this.user= localStorage.getItem("user_type")
    console.log(localStorage.getItem("user_type"))
   
  }

  packarray: any;

  packaging() {
    this.packarray = [
      // { "path": "packdashboard", "title": "Dashboard", "class": "dashboard", icons: "fa fa-puzzle-piece" },
      // { "path": "signoffsheet", "title": "Sign off Sheet", "class": "", icons: "fa fa-th-large" },
      // { "path": "signoffreport", "title": "Sign off Report", "class": "signoffreport", icons: "fa fa-file-text" },
      // { "path": "detailreport", "title": "Detail Report", "class": "detailreport", icons: "fa fa-file-code-o" },
      // { "path": "mhe-approvel", icons: "fa fa-suitcase" },
      // { "path": "sm-approvel", icons: "fa fa-check-square" },
      // { "path": "ipl-approvel", icons: "fa fa-shield" },
      // { "path": "production", "title": "Production", "class": "", icons: "fa fa-cogs" },
      // { "path": "packaging-manuals", "title": "Packaging-Manuals", "class": "", icons: "fa fa-cubes" },
      // { "path": "user-management", "title": "User-Management", "class": "", icons: "fa fa-users" },
      // { "path": "configuration", "title": "Configuration", "class": "", icons: "fa fa-wrench" }
    ]
    console.log(this.packarray);
  }
  allroles: any;
  getAllrole() {
    return this.makeapi.method(this.getallRoleapi, '', "post")
      .subscribe(data => {
        this.allroles = data;
      },
        Error => {
          console.log(Error);
        });
  }
  route:any;
  Supplier = false
  Export = false
  sign(){
    localStorage.getItem("user_type")
    
    if(localStorage.getItem("user_type")=="Export")
    {
    console.log("user_type")
      this.route = "signoffsheet"
      this.Export = true
      this.Supplier = false
    }
    else if(localStorage.getItem("user_type")=="Supplier")
    {
    
      this.route = "signoffsheetsupply"
      this.Export = false
      this.Supplier = true
    }
    else{
      this.route = ""
    }
    console.log(localStorage.getItem("user_type"));
    
  }
  roleData(data){
    localStorage.setItem("roleListdata", JSON.stringify(data));
  }
}
