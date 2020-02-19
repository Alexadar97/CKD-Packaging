import { Component, OnInit, Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { WebService } from '../packservices/webservice';
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { IfObservable } from 'rxjs/observable/IfObservable';
declare var $;
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  emailvalidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+")){2,}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  numbervalidation = /^[0-9]+$/;
  alphaWithoutSpace = /^[a-zA-Z]+$/;
  alphanumeric = /^[a-zA-Z0-9]+$/;
  decimalnumber = /^(0|[1-9]\d*)(\.\d+)?$/;
  alphawithdot = /^[a-zA-Z. ]+$/;
  alpha = /^[A-Za-z\d\s]+$/;
  passwordvalidation = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  contactnmber = /^[0-9\-]+$/
  p1 = 1;
  p2 = 1;
  editUserForm: any;
  addUserForm: any;
  createteamForm: any;
  minDate: Date;
  roleid = 1;
  showteamtable = 3;
  editteamForm: any;

  private createUserapi = this.getdata.appconstant + 'createConfig';
  private listuserapi = this.getdata.appconstant + 'listConfig';
  private updateUserapi = this.getdata.appconstant + 'createConfig';
  private deleteusersapi = this.getdata.appconstant + 'listConfig/';

  constructor(private http: Http, private ref: ChangeDetectorRef, private getdata: WebService, private Formbuilder: FormBuilder, private router: Router, private makeapi: WebService, ) {
    this.addUserForm = Formbuilder.group({
      'auditnumber': [null, Validators.compose([Validators.required, Validators.pattern(this.alpha), Validators.minLength(3), Validators.maxLength(40)])]
    });
    this.editUserForm = Formbuilder.group({
      'auditnumber': [null, Validators.compose([Validators.required, Validators.pattern(this.alpha), Validators.minLength(3), Validators.maxLength(40)])],
    });
  }
  id: any;
  ngOnInit() {
    this.getAlluser();
  }

  allusers: any;
  getAlluser() {
    return this.makeapi.method(this.listuserapi, '', "get")
      .subscribe(data => {
        this.allusers = data;
      },
        Error => {
        });
  }

  editmodal(index) {
    this.editUserForm.reset();
    this.id = this.allusers[index].id;
    $("#Edit").modal('show')
    var getform = this.allusers[index];

    this.editUserForm.patchValue(getform);
  }
  addmodal() {
    this.addUserForm.reset()
    $("#Add").modal('show');
    var getform = this.addUserForm.value
    getform.roleid = 'select';
    this.addUserForm.patchValue(getform);
  }
  deletemodal() {
    if (this.checkfordelete != null) {
      $("#Delete").modal('show')
    }
    else {
      $("#selectuserdelete").modal('show')
    }
  }
  checkfordelete: any;
  checkAll(ischecked) {
    if (ischecked == true) {
      $('.checksingle:checkbox').prop('checked', true);
      var checkfordownload = $('.checksingle:checked').map(function () {
        return $(this).val();
      }).get();
      this.checkfordelete = checkfordownload;
    }
    else {
      $('.checksingle:checkbox').prop('checked', false);
      this.checkfordelete = [];
      console.log(this.checkfordelete)
    }
  }

  conformedituser() {
    if (this.editUserForm.invalid) {
      this.getdata.showNotification('bottom', 'right', 'Form Is Invalid !!', "danger");
      return false;
    }
    else {
      var getform = this.editUserForm.value;
      getform["id"] = this.id;
      return this.makeapi.method(this.updateUserapi, getform, "postjson")
        .subscribe(data => {
          if (data.status == 'Success') {
            $('#Edit').modal('hide');
            this.getdata.showNotification('bottom', 'right', 'Audit Number Updated Successfully !!', "success");
            this.getAlluser();
          }
          else {
          }
        },
          Error => {
          });
    }

  }

  confirmdelete() {
    for (var i = 0; i < this.checkfordelete.length; i++) {
      this.loopdelete(this.checkfordelete[i]);
    }
  }
  loopdelete(id) {
    return this.makeapi.method(this.deleteusersapi + id, '', "get")
      .subscribe(data => {
        $('#Delete').modal('hide');
        if (id == this.checkfordelete[this.checkfordelete.length - 1])
          this.getdata.showNotification('bottom', 'right', 'User(s) Deleted Successfully !!', "danger");
        this.getAlluser();
        this.checkAll(false)
      },
        Error => {
        });
  }

  conformadduser() {
    console.log(this.addUserForm.value)
    if (this.addUserForm.invalid) {
      this.getdata.showNotification('bottom', 'right', 'Form Is Invalid !!', "danger");
      return false;
    } else {
      var getform = this.addUserForm.value;
      delete getform.cpassword;
      return this.makeapi.method(this.createUserapi, getform, "postjson")
        .subscribe(data => {
          if (data.status == 'Success') {
            $('#Add').modal('hide');
            this.getdata.showNotification('bottom', 'right', 'Configuration Added Successfully !!', "success");
            this.getAlluser();
          }
          else {
            this.getdata.showNotification('bottom', 'right', 'audit already Taken,Please use different audit number !!', "danger");
          }
        },
          Error => {
          });
    }
  }

}
