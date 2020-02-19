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
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  emailvalidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+")){2,}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  numbervalidation = /^[0-9]+$/;
  alphaWithoutSpace = /^[a-zA-Z]+$/;
  alphanumeric = /^[a-zA-Z0-9]+$/;
  decimalnumber = /^(0|[1-9]\d*)(\.\d+)?$/;
  alphawithdot = /^[a-zA-Z. ]+$/;
  alpha = /^[A-Za-z\d\s]+$/;
  passwordvalidation = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  contactnmber = /^[0-9\-+()\d\s]+$/
  p1 = 1;
  p2 = 1;
  editUserForm: any;
  addUserForm: any;
  createteamForm: any;
  minDate: Date;
  roleid: any;;
  editteamForm: any;
  createRoleForm: any
  private createUserapi = this.getdata.appconstant + 'createUser';
  private listuserapi = this.getdata.appconstant + 'listUsers';
  private updateUserapi = this.getdata.appconstant + 'createUser';
  private deleteusersapi = this.getdata.appconstant + 'deleteUser/';
  private searchuserapi = this.getdata.appconstantdisc + 'searchDICVUser';
  private createTeamapi = this.getdata.appconstant + 'createTeam';
  private getallteamapi = this.getdata.appconstant + 'listTeam';
  private deleteTeamapi = this.getdata.appconstant + 'deleteTeam/';
  private searchPartDataapi = this.getdata.appconstant + 'searchPartData';
  private createRoleapi = this.getdata.appconstant + 'createRole';
  private getallRoleapi = this.getdata.appconstant + 'listRole';



  constructor(private http: Http, private ref: ChangeDetectorRef, private getdata: WebService, private Formbuilder: FormBuilder, private router: Router, private makeapi: WebService, ) {
    this.addUserForm = Formbuilder.group({
      'name': [null, Validators.compose([Validators.required, Validators.pattern(this.alpha), Validators.minLength(3), Validators.maxLength(40)])],
      'email': [null, Validators.compose([Validators.required, Validators.pattern(this.emailvalidation)])],
      'shortid': [null, Validators.compose([Validators.required, Validators.pattern(this.alphanumeric), Validators.minLength(3), Validators.maxLength(40)])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
      'cpassword': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
      'phonenumber': [null, Validators.compose([Validators.required, Validators.pattern(this.contactnmber), Validators.minLength(10), Validators.maxLength(20)])],
      'roleid': ['1'],
      'teamname': ['select'],
      'teamid': [0]
    });
    this.editUserForm = Formbuilder.group({
      'name': [null, Validators.compose([Validators.required, Validators.pattern(this.alpha), Validators.minLength(3), Validators.maxLength(40)])],
      'email': [null, Validators.compose([Validators.required, Validators.pattern(this.emailvalidation)])],
      'shortid': [null, Validators.compose([Validators.required, Validators.pattern(this.alphanumeric), Validators.minLength(3), Validators.maxLength(40)])],
      'password': [null],
      // 'cpassword': [null, Validators.compose([Validators.required, Validators.minLength(8)], )],
      'phonenumber': [null, Validators.compose([Validators.required, Validators.pattern(this.contactnmber), Validators.minLength(10), Validators.maxLength(20)])],
      'roleid': ['1'],
      'teamname': ['select'],
      'teamid': [0]
    });
    this.createteamForm = Formbuilder.group({
      'roleid': ['3'],
      'teamname': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
      'l3username': [null, Validators.compose([Validators.required, Validators.pattern(this.alpha), Validators.minLength(3), Validators.maxLength(40)])],
      'l4username': [null, Validators.compose([Validators.required, Validators.pattern(this.alpha), Validators.minLength(3), Validators.maxLength(40)])],
      'l3userid': [null],
      'l4userid': [null],
      'spocname': [null],
      'spocid': [null],
    });
    this.editteamForm = Formbuilder.group({
      'id': [null],
      'roleid': ['3'],
      'teamname': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
      'l3username': [null, Validators.compose([Validators.required, Validators.pattern(this.alpha), Validators.minLength(3), Validators.maxLength(40)])],
      'l4username': [null, Validators.compose([Validators.required, Validators.pattern(this.alpha), Validators.minLength(3), Validators.maxLength(40)])],
      'l3userid': [null],
      'l4userid': [null],
      'spocname': [null],
      'spocid': [null],
    });
    this.createRoleForm = Formbuilder.group({
      'id': [null],
      'seq': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
      'rolename': [null, Validators.compose([Validators.required, Validators.pattern(this.alpha), Validators.minLength(3), Validators.maxLength(40)])],

    });
  }
  id: any;

  ngOnInit() {
    // this.getAlluser();
    this.getallteam();
    this.changeteamtab('all');
    this.getAllrole()
  }

  allusers: any;
  getAlluser() {
    return this.makeapi.method(this.listuserapi, '', "post")
      .subscribe(data => {
        this.allusers = data;
      },
        Error => {
        });
  }

  searchuser(keyvalue) {
    console.log(keyvalue)
    var reqdata = "&username=" + keyvalue
    return this.makeapi.method(this.searchuserapi, reqdata, "post")
      .subscribe(data => {
        this.allusers = data
      },
        Error => {
        });
  }
  teamid: any
  editmodal(index) {
    console.log("indeex" + index)
    document.getElementById('editDisabled').removeAttribute("disabled");
    this.editUserForm.reset();
    this.id = this.allusers[index].id;
    this.teamid = this.allusers[index].teamid;
    var getform = this.allusers[index];
    // getform["cpassword"] = this.allusers[index].password;
    this.editUserForm.patchValue(getform);
    console.log(this.editUserForm.value)
    // this.changeeditteam(this.allusers[index].teamname);
    this.changeroleeditonload(this.allusers[index].roleid);
    $("#Edit").modal('show')
  }
  addmodal() {
    document.getElementById('saveDisabled').removeAttribute("disabled");

    this.addUserForm.reset()
    $("#Add").modal('show');
    this.teamname = 'notshow'
    var getform = this.addUserForm.value
    getform.roleid = 'select';
    this.addUserForm.patchValue(getform);
    this.changeroleedit(1)
  }
  deletemodal() {
    if (this.checkfordelete == undefined || this.checkfordelete.length == 0) {
      $("#selectuserdelete").modal('show')
    }
    else {
      document.getElementById('deleteDisabled').removeAttribute("disabled");
      $("#Delete").modal('show')
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
      console.log(this.checkfordelete + 'falseczv')
    }
  }

  singlecheckboxval() {
    let importantval = $(".checksingle:checkbox:checked").map(function () {
      var getdata = this.value;
      return getdata;
    }).get();
    this.checkfordelete = importantval;
    $('#selectallcheckbox').prop('checked', false);
  }
  conformedituser() {
    if (this.editUserForm.invalid) {
      this.markFormGroupTouched(this.editUserForm);
      this.getdata.showNotification('bottom', 'right', 'Form Is Invalid !!', "danger");
      return false;
    }
    // else if (this.editUserForm.value.password != this.editUserForm.value.cpassword) {
    //   this.getdata.showNotification('bottom', 'right', 'Password and Confirm Password are Mis-matching,please recheck it !!', "danger");
    //   return false;
    // }
    else if (this.editUserForm.value.roleid == 'select') {
      this.getdata.showNotification('bottom', 'right', 'Role is required !!', "danger");
      return false;
    }
    else if ((this.editUserForm.value.roleid == '3' || this.editUserForm.value.roleid == '4' || this.editUserForm.value.roleid == '5') && (this.editUserForm.value.teamname == 'select')) {
      this.getdata.showNotification('bottom', 'right', 'Teamname is required !!', "danger");
      return false;
    }
    else {
      document.getElementById('editDisabled').setAttribute("disabled", "disabled");

      var getform = this.editUserForm.value;
      getform["id"] = this.id;
      // if(this.edituserteamname!=''){
      //       getform.teamname = this.edituserteamname;

      // }
      // getform["teamid"]=this.teamid;
      // delete getform.password;
      return this.makeapi.method(this.updateUserapi, getform, "postjson")
        .subscribe(data => {
          document.getElementById('editDisabled').removeAttribute("disabled");
          if (data.status == 'Success') {
            $('#Edit').modal('hide');
            this.getdata.showNotification('bottom', 'right', 'User Updated Successfully !!', "success");
            this.getAlluser();
          }
          else {
            this.getdata.showNotification('bottom', 'right', 'Short Id already Taken,Please use different Short Id !!', "danger");
          }
        },
          Error => {
          });
    }

  }

  conformadduser() {
    console.log(this.addUserForm.value)

    if (this.addUserForm.invalid) {
      this.markFormGroupTouched(this.addUserForm);
      this.getdata.showNotification('bottom', 'right', 'Form Is Invalid !!', "danger");
      return false;
    }

    else if (this.addUserForm.value.password != this.addUserForm.value.cpassword) {
      this.getdata.showNotification('bottom', 'right', 'Password and Confirm Password are Mis-matching,please recheck it !!', "danger");
      return false;
    }
    else if (this.addUserForm.value.roleid == 'select') {
      this.getdata.showNotification('bottom', 'right', 'Role is required !!', "danger");
      return false;
    }
    else if (((this.addUserForm.value.roleid != '1') || (this.addUserForm.value.roleid != '6') || (this.addUserForm.value.roleid != '7') || (this.addUserForm.value.roleid != '2')) && (this.addUserForm.value.teamname == undefined)) {
      this.getdata.showNotification('bottom', 'right', 'Team Name is required !!', "danger");
      return false;
    }
    else if ((this.addUserForm.value.roleid == '3' || this.addUserForm.value.roleid == '4' || this.addUserForm.value.roleid == '5') && (this.addUserForm.value.teamname == 'select')) {
      this.getdata.showNotification('bottom', 'right', 'Teamname is required !!', "danger");
      return false;
    }
    else {
      document.getElementById('saveDisabled').setAttribute("disabled", "disabled");
      var getform = this.addUserForm.value;
      delete getform.cpassword;
      return this.makeapi.method(this.createUserapi, getform, "postjson")
        .subscribe(data => {
          document.getElementById('saveDisabled').removeAttribute("disabled");
          if (data.status == 'Success') {
            $('#Add').modal('hide');
            this.getdata.showNotification('bottom', 'right', 'User Added Successfully !!', "success");
            this.getAlluser();
          }
          else {
            this.getdata.showNotification('bottom', 'right', 'Short Id already Taken,Please use different Short Id !!', "danger");
          }
        },
          Error => {
          });
    }
  }
  confirmdelete() {
    document.getElementById('deleteDisabled').setAttribute("disabled", "disabled");
    for (var i = 0; i < this.checkfordelete.length; i++) {
      this.loopdelete(this.checkfordelete[i]);
      if (i == (this.checkfordelete.length - 1)) {
        this.deleteuserbtnEnable()
      }
    }
  }
  deleteuserbtnEnable() {
    document.getElementById('deleteDisabled').removeAttribute("disabled");
  }

  loopdelete(id) {
    return this.makeapi.method(this.deleteusersapi + id, '', "get")
      .subscribe(data => {
        $('#Delete').modal('hide');
        if (id == this.checkfordelete[this.checkfordelete.length - 1])
          this.getdata.showNotification('bottom', 'right', 'User(s) Deleted Successfully !!', "danger");
        this.getAlluser();
        $('#selectallcheckbox').prop('checked', false);
      },
        Error => {
        });
  }

  teamname: any = 'notshow';
  changerole(role) {
    if (role == '3' && this.smqteam == 'false') {
      this.getdata.showNotification('bottom', 'right', 'Create SM Team To add user!!', "danger");
      return false
    }
    else if (role == '4' && this.iplteam == 'false') {
      this.getdata.showNotification('bottom', 'right', 'Create IPL Team To add user', "danger");
      return false

    }
    else if (role == '5' && this.prodteam == 'false') {
      this.getdata.showNotification('bottom', 'right', 'Create PRODUCTION Team To add user', "danger");
      return false
    }
    else if (role == '1') {
      var getform = this.addUserForm.value;
      getform.teamname = 'super admin';
      getform.roleid = role;
      getform.teamid = 0;
      this.addUserForm.patchValue(getform)
      this.teamname = 'notshow';
    }
    else if (role == '2') {
      var getform = this.addUserForm.value;
      getform.roleid = role;
      getform.teamname = 'MHE'
      getform.teamid = 0;
      this.addUserForm.patchValue(getform)
      this.teamname = 'notshow';
    }
    else if (role == '3') {
      var getform = this.addUserForm.value;
      getform.roleid = role;
      getform.teamname = 'select';
      this.addUserForm.patchValue(getform)
      this.teamname = 'smq';
    }
    else if (role == '4') {
      var getform = this.addUserForm.value;
      getform.roleid = role;
      getform.teamname = 'select';
      this.addUserForm.patchValue(getform)
      this.teamname = 'ipl';
    }
    else if (role == '5') {
      var getform = this.addUserForm.value;
      getform.roleid = role;
      getform.teamname = 'select';
      this.addUserForm.patchValue(getform)
      this.teamname = 'production';
    }
    else if (role == '6') {
      var getform = this.addUserForm.value;
      getform.roleid = role;
      getform.teamid = 0;
      getform.teamname = 'internal user';
      this.addUserForm.patchValue(getform)
      this.teamname = 'notshow';
    }
    else if (role == '7') {
      var getform = this.addUserForm.value;
      getform.roleid = role;
      getform.teamid = 0;
      getform.teamname = 'external user';
      this.addUserForm.patchValue(getform)
      this.teamname = 'notshow';
    }
  }
  addteam = 'select';
  edituserteamname = '';
  changeteam(index, teamname) {
    var get_obj = this.allteams.filter(function (el) {
      return (el.teamname === index);
    });
    // index=(get_obj[0].id );
    var getform = this.addUserForm.value;
    getform.teamid = get_obj[0].id;
    this.addUserForm.patchValue(getform)

    var getediform = this.editUserForm.value;
    var getediform = this.editUserForm.value;
    getediform.teamid = get_obj[0].id
    // console.log(this.allteams[index].teamname);
    // if(teamname=='smq' || teamname=='ipl' || teamname=='production'){
    //  this.edituserteamname=this.allteams[index].teamname
    // }
    // else{
    //   this.edituserteamname='';
    // }
    // getform.teamname = this.allteams[index].teamname;
    this.editUserForm.patchValue(getediform)

    // var getform = this.addUserForm.value;
    // getform.teamid = this.allteams[index].id;
    // getform.teamname = this.allteams[index].teamname;
    // this.addUserForm.patchValue(getform)

    // this.addteam = this.allteams[index].teamname
    console.log(this.editUserForm.value)

  }

  teamnameedit: any = 'notshow';
  changeroleeditonload(role) {
    if (role == '1') {
      var getform = this.editUserForm.value;
      getform.teamname = 'super admin';
      getform.roleid = role;
      this.editUserForm.patchValue(getform)
      this.teamnameedit = 'notshow';
    }
    else if (role == '2') {
      var getform = this.editUserForm.value;
      getform.roleid = role;
      getform.teamname = 'MHE';
      this.editUserForm.patchValue(getform)
      this.teamnameedit = 'notshow';
    }
    else if (role == '3') {
      var getform = this.editUserForm.value;
      getform.roleid = role;
      this.editUserForm.patchValue(getform)
      this.teamnameedit = 'smq';
    }
    else if (role == '4') {
      var getform = this.editUserForm.value;
      getform.roleid = role;
      this.editUserForm.patchValue(getform)
      this.teamnameedit = 'ipl';
    }
    else if (role == '5') {
      var getform = this.editUserForm.value;
      getform.roleid = role;
      this.editUserForm.patchValue(getform)
      this.teamnameedit = 'production';
    }
    else if (role == '6') {
      var getform = this.editUserForm.value;
      getform.roleid = role;
      getform.teamname = 'internal user';
      this.editUserForm.patchValue(getform)
      this.teamnameedit = 'notshow';
    }
    else if (role == '7') {
      var getform = this.editUserForm.value;
      getform.roleid = role;
      getform.teamname = 'external user';
      this.editUserForm.patchValue(getform)
      this.teamnameedit = 'notshow';
    }
  }
  changeroleedit(role) {

    if (role == '1') {
      var getform = this.editUserForm.value;
      getform.teamname = 'super admin';
      getform.roleid = role;
      getform.teamid = 0;
      this.editUserForm.patchValue(getform)
      this.teamnameedit = 'notshow';
    }
    else if (role == '2') {
      var getform = this.editUserForm.value;
      getform.roleid = role;
      getform.teamname = 'MHE';
      getform.teamid = 0;
      this.editUserForm.patchValue(getform)
      this.teamnameedit = 'notshow';
    }
    else if (role == '3') {
      var getform = this.editUserForm.value;
      getform.roleid = role;
      getform.teamname = 'select';
      this.editUserForm.patchValue(getform)
      this.teamnameedit = 'smq';
    }
    else if (role == '4') {
      var getform = this.editUserForm.value;
      getform.roleid = role;
      getform.teamname = 'select';
      this.editUserForm.patchValue(getform)
      this.teamnameedit = 'ipl';
    }
    else if (role == '5') {
      var getform = this.editUserForm.value;
      getform.roleid = role;
      getform.teamname = 'select';
      this.editUserForm.patchValue(getform)
      this.teamnameedit = 'production';
    }
    else if (role == '6') {
      var getform = this.editUserForm.value;
      getform.roleid = role;
      getform.teamid = 0;
      getform.teamname = 'internal user';
      this.editUserForm.patchValue(getform)
      this.teamnameedit = 'notshow';
    }
    else if (role == '7') {
      var getform = this.editUserForm.value;
      getform.roleid = role;
      getform.teamid = 0;
      getform.teamname = 'external user';
      this.editUserForm.patchValue(getform)
      this.teamnameedit = 'notshow';
    }
  }
  editteam: any;
  changeeditteam(team) {
    var getform = this.addUserForm.value;
    getform.teanid = team;
    this.addUserForm.patchValue(getform)
    this.addteam = team
  }
  datateams: any;
  changeteamtab(roleid) {
    this.roleid = roleid;
    if (roleid == 2) {
      this.datateams = this.mheteamdata;
    }
    else if (roleid == 3) {
      this.datateams = this.smqteamdata
    }
    else if (roleid == 4) {
      this.datateams = this.iplteamdata
    }
    else if (roleid == 5) {
      this.datateams = this.prodteamdata
    }
    else {
      this.datateams = this.allteams
    }
  }
  opencreateteam() {
    this.createteamForm.reset();
    var getform = this.createteamForm.value
    getform.roleid = '3'
    this.createteamForm.patchValue(getform)
    $("#createteam").modal('show');
  }
  deleteteamid: any;
  opendeleteteam(index) {
    if (this.roleid == 3) {
      this.deleteteamid = this.smqteamdata[index].id;
    }
    else if (this.roleid == 4) {
      this.deleteteamid = this.iplteamdata[index].id;
    }
    else if (this.roleid == 5) {
      this.deleteteamid = this.prodteamdata[index].id;
    }
    else {
      this.deleteteamid = this.allteams[index].id;
    }
    $("#Deleteteam").modal('show');
  }
  openeditteam(index) {
    console.log(this.roleid)

    var getform = this.editteamForm.value
    if (this.roleid == 2) {
      getform.id = this.mheteamdata[index].id
      getform.teamname = this.mheteamdata[index].teamname
      getform.roleid = this.mheteamdata[index].roleid
      getform.shortid = this.mheteamdata[index].shortid;
      getform.l3username = this.mheteamdata[index].l3username;
      getform.l4username = this.mheteamdata[index].l4username;
      getform.l3userid = this.mheteamdata[index].l3userid;
      getform.l4userid = this.mheteamdata[index].l4userid;
      getform.spocname = this.mheteamdata[index].spocname;
      getform.spocid = this.mheteamdata[index].spocid;
    }
    else if (this.roleid == 3) {
      getform.id = this.smqteamdata[index].id
      getform.teamname = this.smqteamdata[index].teamname
      getform.roleid = this.smqteamdata[index].roleid
      getform.shortid = this.smqteamdata[index].shortid;
      getform.l3username = this.smqteamdata[index].l3username;
      getform.l4username = this.smqteamdata[index].l4username;
      getform.l3userid = this.smqteamdata[index].l3userid;
      getform.l4userid = this.smqteamdata[index].l4userid;
      getform.spocname = this.smqteamdata[index].spocname;
      getform.spocid = this.smqteamdata[index].spocid;
    }
    else if (this.roleid == 4) {
      getform.id = this.iplteamdata[index].id
      getform.teamname = this.iplteamdata[index].teamname
      getform.roleid = this.iplteamdata[index].roleid
      getform.shortid = this.iplteamdata[index].shortid;
      getform.l3username = this.iplteamdata[index].l3username;
      getform.l4username = this.iplteamdata[index].l4username;
      getform.l3userid = this.iplteamdata[index].l3userid;
      getform.l4userid = this.iplteamdata[index].l4userid;
      getform.spocname = this.iplteamdata[index].spocname;
      getform.spocid = this.iplteamdata[index].spocid;
    }
    else if (this.roleid == 5) {
      getform.id = this.prodteamdata[index].id
      getform.teamname = this.prodteamdata[index].teamname
      getform.roleid = this.prodteamdata[index].roleid
      getform.shortid = this.prodteamdata[index].shortid;
      getform.l3username = this.prodteamdata[index].l3username;
      getform.l4username = this.prodteamdata[index].l4username;
      getform.l3userid = this.prodteamdata[index].l3userid;
      getform.l4userid = this.prodteamdata[index].l4userid;
      getform.spocname = this.prodteamdata[index].spocname;
      getform.spocid = this.prodteamdata[index].spocid;
    }
    else {
      getform.id = this.allteams[index].id
      getform.teamname = this.allteams[index].teamname
      getform.roleid = this.allteams[index].roleid
      getform.shortid = this.allteams[index].shortid;
      getform.l3username = this.allteams[index].l3username;
      getform.l4username = this.allteams[index].l4username;
      getform.l3userid = this.allteams[index].l3userid;
      getform.l4userid = this.allteams[index].l4userid;
      getform.spocname = this.allteams[index].spocname;
      getform.spocid = this.allteams[index].spocid;
    }
    this.editteamForm.patchValue(getform)
    $("#editteam").modal('show');
  }
  allteams: any;
  spocnameerror: any;
  conformcreateteam() {
    this.spocnameerror = ''
    if (!this.createteamForm.valid) {
      this.markFormGroupTouched(this.createteamForm);
      this.getdata.showNotification('bottom', 'right', 'Team name is invalid', "danger");
      return false;
    }
    else if ((this.createteamForm.value.roleid == 4 || this.createteamForm.value.roleid == 5) && (this.createteamForm.value.spocname == null || this.createteamForm.value.spocname.length < 3)) {
      this.spocnameerror = 'Min 3  characters required'
      return false;
    }
    else {
      if ((this.createteamForm.value.roleid != 4 && this.createteamForm.value.roleid != 5)) {
        var getform = this.createteamForm.value;
        delete getform.spocid;
        delete getform.spocname;
        return this.makeapi.method(this.createTeamapi, JSON.stringify(getform), "postjson")
          .subscribe(data => {
            if (data.status == 'Success') {
              this.spocnameerror = ''
              $("#createteam").modal('hide')
              this.getdata.showNotification('bottom', 'right', 'Team Created Successfully !!', "success");
              this.getallteam();
            }
            else {
            }
          },
            Error => {
            });
      }
      else {
        var getform = this.createteamForm.value;
        return this.makeapi.method(this.createTeamapi, JSON.stringify(getform), "postjson")
          .subscribe(data => {
            if (data.status == 'Success') {
              this.spocnameerror = ''
              $("#createteam").modal('hide')
              this.getdata.showNotification('bottom', 'right', 'Team Created Successfully !!', "success");
              this.getallteam();
            }
            else {
            }
          },
            Error => {
            });
      }

    }
  }
  confirmedttteam() {
    if (!this.editteamForm.valid) {
      this.markFormGroupTouched(this.editteamForm);
      this.getdata.showNotification('bottom', 'right', 'Team name is invalid', "danger");
      return false;
    }
    else if ((this.editteamForm.value.roleid == 4 || this.editteamForm.value.roleid == 5) && (this.editteamForm.value.spocname == null || this.editteamForm.value.spocname.length < 3)) {
      this.spocnameerror = 'Min 3  characters required'
      return false;
    }
    else {
      if ((this.editteamForm.value.roleid != 4 && this.editteamForm.value.roleid != 5)) {
        var getform = this.editteamForm.value;
        delete getform.spocid;
        delete getform.spocname;
        return this.makeapi.method(this.createTeamapi, JSON.stringify(getform), "postjson")
          .subscribe(data => {
            if (data.status == 'Success') {
              this.spocnameerror = ''
              $("#editteam").modal('hide');
              this.getdata.showNotification('bottom', 'right', 'Team Updated Successfully !!', "success");
              this.getallteam();

            }
            else {
            }
          },
            Error => {
            });
      }
      else {
        var getform = this.editteamForm.value;
        return this.makeapi.method(this.createTeamapi, JSON.stringify(getform), "postjson")
          .subscribe(data => {
            if (data.status == 'Success') {
              $("#editteam").modal('hide');
              this.getdata.showNotification('bottom', 'right', 'Team Updated Successfully !!', "success");
              this.getallteam();

            }
            else {
            }
          },
            Error => {
            });
      }

    }
  }
  smqteam: any;
  smqteamdata = [];
  iplteamdata = [];
  prodteamdata = [];
  iplteam: any;
  mheteam: any;
  prodteam: any;
  teamRoleIdArray = []
  mheteamdata = []
  getallteam() {
    this.smqteamdata = [];
    this.iplteamdata = [];
    this.prodteamdata = [];
    this.teamRoleIdArray = []
    this.mheteamdata = []

    return this.makeapi.method(this.getallteamapi, '', "post")
      .subscribe(data => {

        console.log(this.allteams)
        this.allteams = data;
        for (var i = 0; i < data.length; i++) {
          // this.allteamsarray[i]=data[i].teamname
          this.teamRoleIdArray.push(data[i].roleid)
          if (data[i].roleid == 2) {
            this.mheteamdata.push(data[i])
          }
          else if (data[i].roleid == 3) {
            this.smqteamdata.push(data[i])
          }
          else if (data[i].roleid == 4) {
            this.iplteamdata.push(data[i])
          }
          else if (data[i].roleid == 5) {
            this.prodteamdata.push(data[i])
          }
        }
        if ((this.teamRoleIdArray).indexOf(2) == -1) {
          this.mheteam = 'false';
          this.mheteamdata = []
        }
        else {
          this.mheteam = 'true'
        }
        if ((this.teamRoleIdArray).indexOf(3) == -1) {
          this.smqteam = 'false';
          this.smqteamdata = []
        }
        else {
          this.smqteam = 'true'
        }
        if ((this.teamRoleIdArray).indexOf(4) == -1) {
          this.iplteam = 'false';
          this.iplteamdata = []
        }
        else {
          this.iplteam = 'true'
        }
        if ((this.teamRoleIdArray).indexOf(5) == -1) {
          this.prodteam = 'false';
          this.prodteamdata = [];

        }
        else {
          this.prodteam = 'true'
        }
        this.changeteamtab(this.roleid)

      },
        Error => {
        });
  }
  confirmdeleteteam() {
    return this.makeapi.method(this.deleteTeamapi + this.deleteteamid, '', "get")
      .subscribe(data => {
        if (data.status == 'Delete Success') {
          $("#Deleteteam").modal('hide');
          this.getdata.showNotification('bottom', 'right', 'Team Deleted Successfully !!', "success");
          this.getallteam();
        }
        else {
        }
      },
        Error => {
        });
  }
  searchshow = 'true';
  showsearch() {
    if (this.searchshow == 'false') {
      this.searchshow = 'true';
    }
    else {
      this.searchshow = 'false';
    }
  }
  leadernamelists = [];
  totalsearchdata: any;
  leadername(keyvalue) {
    if (this.leadernamelists.indexOf(keyvalue) != -1) {
      // var finalreqdata = this.getdata.appconstant + "part/" + keyvalue
      // return this.makeapi.method(finalreqdata, '', "get")
      //   .subscribe(data => {
      var getform = this.createteamForm.value
      this.createteamForm.value.l3username = this.totalsearchdata[this.leadernamelists.indexOf(keyvalue)].name;
      getform.l3username = this.totalsearchdata[this.leadernamelists.indexOf(keyvalue)].name;
      this.createteamForm.value.l3userid = this.totalsearchdata[this.leadernamelists.indexOf(keyvalue)].id;
      getform.l3userid = this.totalsearchdata[this.leadernamelists.indexOf(keyvalue)].id

      this.createteamForm.patchValue(getform)
      // },
      //   Error => {
      //   });
    }
    else {
      this.leadernamelists = []
      let reqdata = "username=" + keyvalue
      return this.makeapi.method(this.searchuserapi, reqdata, "post")
        .subscribe(data => {
          this.totalsearchdata = data
          for (var i = 0; i < data.length; i++)
            this.leadernamelists[i] = data[i].shortid;
        },
          Error => {
          });
    }
  }
  totalsearchdatal4 = []
  leadernamelistsl4 = []
  leadernamel4(keyvalue) {
    if (this.leadernamelistsl4.indexOf(keyvalue) != -1) {
      // var finalreqdata = this.getdata.appconstant + "part/" + keyvalue
      // return this.makeapi.method(finalreqdata, '', "get")
      //   .subscribe(data => {
      var getform = this.createteamForm.value
      this.createteamForm.value.l4username = this.totalsearchdatal4[this.leadernamelistsl4.indexOf(keyvalue)].name;
      this.createteamForm.value.l4userid = this.totalsearchdatal4[this.leadernamelistsl4.indexOf(keyvalue)].id;



      getform.l4username = this.totalsearchdatal4[this.leadernamelistsl4.indexOf(keyvalue)].name;
      getform.l4userid = this.totalsearchdatal4[this.leadernamelistsl4.indexOf(keyvalue)].id;

      this.createteamForm.patchValue(getform)
      // },
      //   Error => {
      //   });
    }
    else {
      this.leadernamelistsl4 = []
      let reqdata = "username=" + keyvalue
      return this.makeapi.method(this.searchuserapi, reqdata, "post")
        .subscribe(data => {
          this.totalsearchdatal4 = data
          console.log(data)
          for (var i = 0; i < data.length; i++)
            this.leadernamelistsl4[i] = data[i].shortid;
        },
          Error => {
          });
    }
  }


  leadernamelistsedit = [];
  totalsearchdataedit: any;
  leadernameedit(keyvalue) {
    if (this.leadernamelistsedit.indexOf(keyvalue) != -1) {
      // var finalreqdata = this.getdata.appconstant + "part/" + keyvalue
      // return this.makeapi.method(finalreqdata, '', "get")
      //   .subscribe(data => {
      var getform = this.editteamForm.value
      this.editteamForm.value.l3username = this.totalsearchdataedit[this.leadernamelistsedit.indexOf(keyvalue)].name;
      getform.l3username = this.totalsearchdataedit[this.leadernamelistsedit.indexOf(keyvalue)].name;

      this.editteamForm.value.l3userid = this.totalsearchdataedit[this.leadernamelistsedit.indexOf(keyvalue)].id;
      getform.l3userid = this.totalsearchdataedit[this.leadernamelistsedit.indexOf(keyvalue)].id;

      this.editteamForm.patchValue(getform)
      // },
      //   Error => {
      //   });
    }
    else {
      this.leadernamelistsedit = []
      let reqdata = "username=" + keyvalue
      return this.makeapi.method(this.searchuserapi, reqdata, "post")
        .subscribe(data => {
          this.totalsearchdataedit = data
          for (var i = 0; i < data.length; i++)
            this.leadernamelistsedit[i] = data[i].shortid;
        },
          Error => {
          });
    }
  }
  totalsearchdatal4edit = []
  leadernamelistsl4edit = []
  leadernamel4edit(keyvalue) {
    if (this.leadernamelistsl4edit.indexOf(keyvalue) != -1) {
      // var finalreqdata = this.getdata.appconstant + "part/" + keyvalue
      // return this.makeapi.method(finalreqdata, '', "get")
      //   .subscribe(data => {
      var getform = this.editteamForm.value
      this.editteamForm.value.l4username = this.totalsearchdatal4edit[this.leadernamelistsl4edit.indexOf(keyvalue)].name;
      getform.l4username = this.totalsearchdatal4edit[this.leadernamelistsl4edit.indexOf(keyvalue)].name;

      this.editteamForm.value.l4userid = this.totalsearchdatal4edit[this.leadernamelistsl4edit.indexOf(keyvalue)].id;
      getform.l4userid = this.totalsearchdatal4edit[this.leadernamelistsl4edit.indexOf(keyvalue)].id;

      this.editteamForm.patchValue(getform)
      // },
      //   Error => {
      //   });
    }
    else {
      this.leadernamelistsl4edit = []
      let reqdata = "username=" + keyvalue
      return this.makeapi.method(this.searchuserapi, reqdata, "post")
        .subscribe(data => {
          this.totalsearchdatal4edit = data
          for (var i = 0; i < data.length; i++)
            this.leadernamelistsl4edit[i] = data[i].shortid;
        },
          Error => {
          });
    }
  }
  totalSpoclist = []
  Spocdatalist = []
  Spoclist(keyvalue) {
    if (this.Spocdatalist.indexOf(keyvalue) != -1) {
      // var finalreqdata = this.getdata.appconstant + "part/" + keyvalue
      // return this.makeapi.method(finalreqdata, '', "get")
      //   .subscribe(data => {
      var getform = this.createteamForm.value
      this.createteamForm.value.spocname = this.totalSpoclist[this.Spocdatalist.indexOf(keyvalue)].name;
      getform.spocname = this.totalSpoclist[this.Spocdatalist.indexOf(keyvalue)].name;

      this.createteamForm.value.spocid = this.totalSpoclist[this.Spocdatalist.indexOf(keyvalue)].id;
      getform.spocid = this.totalSpoclist[this.Spocdatalist.indexOf(keyvalue)].id;

      this.createteamForm.patchValue(getform)
      // },
      //   Error => {
      //   });
    }
    else {
      this.Spocdatalist = []
      let reqdata = "username=" + keyvalue
      return this.makeapi.method(this.searchuserapi, reqdata, "post")
        .subscribe(data => {
          this.totalSpoclist = data
          for (var i = 0; i < data.length; i++)
            this.Spocdatalist[i] = data[i].shortid;
        },
          Error => {
          });
    }
  }
  totalSpoclistedit = []
  Spocdatalistedit = []
  Spoclistedit(keyvalue) {
    if (this.Spocdatalistedit.indexOf(keyvalue) != -1) {
      // var finalreqdata = this.getdata.appconstant + "part/" + keyvalue
      // return this.makeapi.method(finalreqdata, '', "get")
      //   .subscribe(data => {
      var getform = this.editteamForm.value
      this.editteamForm.value.spocname = this.totalSpoclistedit[this.Spocdatalistedit.indexOf(keyvalue)].name;
      getform.spocname = this.totalSpoclistedit[this.Spocdatalistedit.indexOf(keyvalue)].name;
      this.editteamForm.value.spocid = this.totalSpoclistedit[this.Spocdatalistedit.indexOf(keyvalue)].id;
      getform.spocid = this.totalSpoclistedit[this.Spocdatalistedit.indexOf(keyvalue)].id;
      this.editteamForm.patchValue(getform)
      // },
      //   Error => {
      //   });
    }
    else {
      this.Spocdatalistedit = []
      let reqdata = "username=" + keyvalue
      return this.makeapi.method(this.searchuserapi, reqdata, "post")
        .subscribe(data => {
          this.totalSpoclistedit = data
          for (var i = 0; i < data.length; i++)
            this.Spocdatalistedit[i] = data[i].shortid;
        },
          Error => {
          });
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

  // role------
  modalname: any
  opencreaterole() {
    this.createRoleForm.reset()
    this.modalname = 'Add Role'
    $("#opencreateRoles").modal("show")
  }
  openeditRole(id, rolename, seq) {
    console.log(id)
    this.modalname = 'Edit Role'
    this.createRoleForm.reset()
    var getform = this.createRoleForm.value;
    getform.id = id
    getform.rolename = rolename
    getform.seq = seq
    this.createRoleForm.patchValue(getform);
    $("#opencreateRoles").modal("show");
  }
  conformcreateRole() {
    if (!this.createRoleForm.valid) {
      this.markFormGroupTouched(this.createRoleForm);
      this.getdata.showNotification('bottom', 'right', 'Role is invalid', "danger");
      return false;
    }

    var getform = this.createRoleForm.value;
    if (getform.id == null) {
      delete getform.id
    }
    return this.makeapi.method(this.createRoleapi, JSON.stringify(getform), "postjson")
      .subscribe(data => {
        if (data.status == 'Success') {

          $("#opencreateRoles").modal('hide')
          this.getdata.showNotification('bottom', 'right', 'Role added Successfully !!', "success");
          this.getAllrole();
        }
        else {
        }
      },
        Error => {
        });
  }
  allroles: any;
  getAllrole() {
    return this.makeapi.method(this.getallRoleapi, '', "post")
      .subscribe(data => {
        this.allroles = data;
      },
        Error => {
        });
  }

}


