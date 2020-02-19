import { Component, OnInit,Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { WebService } from '../packservices/webservice';
import { AuthGuard } from '../packservices/canactivate.service'
declare var $;
@Component({
  selector: 'app-mhe-approvel',
  templateUrl: './mhe-approvel.component.html',
  styleUrls: ['./mhe-approvel.component.css']
})
export class MheApprovelComponent implements OnInit {
  assets = "assets/img/selectimage.jpg";
  MHEdatas: any;
  checkfordownload: any;
  rejectForm: any;
  emailvalidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+")){2,}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  numbervalidation = /^[1-9]+$/;
  alphanumeric = /^[a-zA-Z0-9]+$/;
  decimalnumber = /^(0|[1-9]\d*)(\.\d+)?$/;
  alphawithdot = /^[a-zA-Z. ]+$/;
  alpha = /^[a-zA-Z]+$/;
  passwordvalidation = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  currentPage = 1;
  spocname;
  spocid
  p1 = 1;
  p2 = 1;
  p3 = 1;
  partnumber: any;
  partname: any;
  plantname: any;
  email: any;
  contact: any;
  refnumber: any;
  buyername: any;
  partlength: any;
  partwidth: any;
  partheight: any;
  partdia: any;
  partweight: any;
  partdimension: any;
  suppliercode: any;
  suppliername: any;
  variant: any;
  address: any;
  supEmail: any;
  contactperson: any;
  phonenumber: any;
  date: any;
  fax: any;
  packagingtype: any;
  packagingcode: any;
  collapsibleheight: any;
  piecespercontainer: any;
  packlength: any;
  packwidth: any;
  packheight: any;
  tareweight: any;
  pripacklength: any;
  pripackwidth: any;
  pripackheight: any;
  pritareweight: any;
  secondaryPackaging: any;
  boxesperlayer: any;
  loadquantity: any;
  nooflayers: any;
  noofboxes: any;
  noofcontainers: any;
  grossweight: any;
  partDetails: any;
  rpoil: any;
  vci: any;
  cpna: any;
  plantcode: any;
  rpoilspec: any;
  vcispec: any;
  nareason: any;
  twowaypallet: any;
  fourwaypallet: any;
  heattreated: any;
  fumigated: any;
  forklift: any;
  manual: any;
  others: any;
  trolley: any;
  supContact: any;
  sp: any;
  moh: any;
  refno: any;
  packdata: any;
  signoffsubmitedid: any;
  updatedby: any;
  rejecteddataArray = [];
  MHEdatashistory: any;
  MHEdatasrejection: any
  approvedbymhe: any;

  constructor(private getsession: AuthGuard, private http: Http, private ref: ChangeDetectorRef, private getdata: WebService, private Formbuilder: FormBuilder, private router: Router, private makeapi: WebService, ) {
    this.rejectForm = this.Formbuilder.group({
      remarks: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100),])]
    })
  }

  private packagingapi = this.getdata.appconstant + 'packaging';
  private getSignOffByTeamapi = this.getdata.appconstant + 'getSignOffByTeam';
  private signoffapi = this.getdata.appconstant + 'signoff';
  private searchSignOffapi = this.getdata.appconstant + 'searchSignOff';
  private getallteamapi = this.getdata.appconstant + 'listTeam';
  private reassignsignoffapi = this.getdata.appconstant + 'reassignSignOff';
  private statusapi = this.getdata.appconstant + 'signoffModal';
  private packagingdetailapi = this.getdata.appconstant + 'packaging/';
  private searchuserapi = this.getdata.appconstantdisc + 'searchDICVUser';
  private getSignOffapi = this.getdata.appconstant + 'getSignOff';


  approveprivilage: any;
  approverid: any;
  roleid: any;
  ngOnInit() {
    this.updatedby = this.getdata.session().name;
    this.roleid = this.getdata.session().id;
    this.approverid = this.getdata.session().id;
    this.approvedbymhe = this.updatedby

    if ((this.getdata.session().roleid == 6) || (this.getdata.session().roleid == 7)) {
      this.approveprivilage = false
    }
    this.getMHEdata();
  }
  getMHEdata() {
    var reqdata = "teamname=" + "MHE" + "&status=" + "pending" + "&approvedby=" + this.approverid;
    return this.makeapi.method(this.getSignOffByTeamapi, reqdata, "post")
      .subscribe(data => {
        this.MHEdatas = data;
        this.getMHEdatahistory();
      },
        Error => {
        });
  }
  getMHEdatahistory() {
    var reqdata = "teamname=" + "MHE" + "&status=" + "approvedorrejected" + "&approvedby=" + this.approverid;
    return this.makeapi.method(this.getSignOffByTeamapi, reqdata, "post")
      .subscribe(data => {
        this.MHEdatashistory = data;
        this.getMHEdatarejection();
      },
        Error => {
        });
  }
  getMHEdatarejection() {
    var reqdata = "teamname=" + "other" + "&status=" + "rejected" + "&approvedby=" + this.approverid;
    return this.makeapi.method(this.getSignOffByTeamapi, reqdata, "post")
      .subscribe(data => {
        this.MHEdatasrejection = data;
        document.getElementById('otherreassignhistory').removeAttribute("disabled");
        document.getElementById('approveDisabled').removeAttribute("disabled");
        document.getElementById('otherreassign').removeAttribute("disabled");
        document.getElementById('otherrejection').removeAttribute("disabled");
        document.getElementById('pendingreject').removeAttribute("disabled");
      },
        Error => {
        });
  }

  searchsignoff(keyvalue) {
    var searchapi;
    if (this.tabname == 'pending') {
      searchapi = this.searchSignOffapi + '?teamname=MHE&status=pending&partnumber=' + keyvalue
    }
    else if (this.tabname == 'approvedorrejected') {
      searchapi = this.searchSignOffapi + '?teamname=MHE&status=approvedorrejected&partnumber=' + keyvalue
    }
    else if (this.tabname == 'rejected') {
      searchapi = this.searchSignOffapi + '?teamname=other&status=rejected&partnumber=' + keyvalue
    }
    return this.makeapi.method(searchapi, '', "get")
      .subscribe(data => {
        if (this.tabname == 'pending') {
          this.MHEdatas = data;
        }
        else if (this.tabname == 'approvedorrejected') {
          this.MHEdatashistory = data;
        }
        else if (this.tabname == 'rejected') {
          this.MHEdatasrejection = data;
        }

      },
        Error => {
        });
  }



  modaldata: any;
  title: any
  npcm: any;
  viewreport(index, type) {

    $('#imgid1').attr('src', 'assets/img/plus.jpg');
    $('#imgid2').attr('src', 'assets/img/plus.jpg');
    $('#imgid3').attr('src', 'assets/img/plus.jpg');
    $('#imgid4').attr('src', 'assets/img/plus.jpg');
    $('#imgid5').attr('src', 'assets/img/plus.jpg');
    $('#imgid6').attr('src', 'assets/img/plus.jpg');

    if (type == 'pending') {
      return this.makeapi.method(this.packagingdetailapi + this.MHEdatas[index].id, "", "get")
        .subscribe(data => {
          this.modaldata = data;
          this.npcm = "false";
          this.moh = "false";
          this.rpoil = this.modaldata.packagingDetails.rpoil;
          this.vci = this.modaldata.packagingDetails.vci;
          this.cpna = this.modaldata.packagingDetails.cpna;

          this.twowaypallet = this.modaldata.packagingDetails.twowaypallet
          this.fourwaypallet = this.modaldata.packagingDetails.fourwaypallet
          this.heattreated = this.modaldata.packagingDetails.heattreated
          this.fumigated = this.modaldata.packagingDetails.fumigated
          this.forklift = this.modaldata.packagingDetails.forklift
          this.manual = this.modaldata.packagingDetails.manual
          this.others = this.modaldata.packagingDetails.handleOther
          console.log(this.rpoil + this.vci + this.cpna)

          if (this.modaldata.partimage != null) {
            $('#imgid1').attr('src', 'data:image/png;base64,' + this.modaldata.partimage)


          }
          if (this.modaldata.icimage1 != null) {
            $('#imgid2').attr('src', 'data:image/png;base64,' + this.modaldata.icimage1)



          }
          if (this.modaldata.icimage2 != null) {
            $('#imgid3').attr('src', 'data:image/png;base64,' + this.modaldata.icimage2)


          }
          if (this.modaldata.srpimage != null) {
            $('#imgid4').attr('src', 'data:image/png;base64,' + this.modaldata.srpimage)

          }
          if (this.modaldata.otherimage != null) {
            $('#imgid5').attr('src', 'data:image/png;base64,' + this.modaldata.otherimage)

          }
          if (this.modaldata.fpimage != null) {
            $('#imgid6').attr('src', 'data:image/png;base64,' + this.modaldata.fpimage)


          }
          if (this.modaldata.packagingDetails.rpoil == false &&
            this.modaldata.packagingDetails.vci == false &&
            this.modaldata.packagingDetails.cpna == false) {
            this.npcm = true;
          }
          if (this.modaldata.packagingDetails.forklift == false &&
            this.modaldata.packagingDetails.manual == false &&
            this.modaldata.packagingDetails.handleOther == false) {
            this.moh = "true";
          }
          $("#modalView").modal('show')
        });
    }
    else if (type == 'approve') {
      return this.makeapi.method(this.packagingdetailapi + this.MHEdatashistory[index].id, "", "get")
        .subscribe(data => {
          this.modaldata = data;
          this.npcm = "false";
          this.moh = "false";
          this.rpoil = this.modaldata.packagingDetails.rpoil;
          this.vci = this.modaldata.packagingDetails.vci;
          this.cpna = this.modaldata.packagingDetails.cpna;

          this.twowaypallet = this.modaldata.packagingDetails.twowaypallet
          this.fourwaypallet = this.modaldata.packagingDetails.fourwaypallet
          this.heattreated = this.modaldata.packagingDetails.heattreated
          this.fumigated = this.modaldata.packagingDetails.fumigated
          this.forklift = this.modaldata.packagingDetails.forklift
          this.manual = this.modaldata.packagingDetails.manual
          this.others = this.modaldata.packagingDetails.handleOther
          console.log(this.rpoil + this.vci + this.cpna)

          if (this.modaldata.partimage != null) {
            $('#imgid1').attr('src', 'data:image/png;base64,' + this.modaldata.partimage)


          }
          if (this.modaldata.icimage1 != null) {
            $('#imgid2').attr('src', 'data:image/png;base64,' + this.modaldata.icimage1)



          }
          if (this.modaldata.icimage2 != null) {
            $('#imgid3').attr('src', 'data:image/png;base64,' + this.modaldata.icimage2)


          }
          if (this.modaldata.srpimage != null) {
            $('#imgid4').attr('src', 'data:image/png;base64,' + this.modaldata.srpimage)

          }
          if (this.modaldata.otherimage != null) {
            $('#imgid5').attr('src', 'data:image/png;base64,' + this.modaldata.otherimage)

          }
          if (this.modaldata.fpimage != null) {
            $('#imgid6').attr('src', 'data:image/png;base64,' + this.modaldata.fpimage)


          }

          if (this.modaldata.packagingDetails.rpoil == false &&
            this.modaldata.packagingDetails.vci == false &&
            this.modaldata.packagingDetails.cpna == false) {
            this.npcm = true;
          }
          if (this.modaldata.packagingDetails.forklift == false &&
            this.modaldata.packagingDetails.manual == false &&
            this.modaldata.packagingDetails.handleOther == false) {
            this.moh = "true";
          }
          $("#modalView").modal('show')
        });
    }
    else if (type == 'rejection') {
      return this.makeapi.method(this.packagingdetailapi + this.MHEdatasrejection[index].id, "", "get")
        .subscribe(data => {
          this.modaldata = data;
          this.npcm = "false";
          this.moh = "false";
          this.rpoil = this.modaldata.packagingDetails.rpoil;
          this.vci = this.modaldata.packagingDetails.vci;
          this.cpna = this.modaldata.packagingDetails.cpna;

          this.twowaypallet = this.modaldata.packagingDetails.twowaypallet
          this.fourwaypallet = this.modaldata.packagingDetails.fourwaypallet
          this.heattreated = this.modaldata.packagingDetails.heattreated
          this.fumigated = this.modaldata.packagingDetails.fumigated
          this.forklift = this.modaldata.packagingDetails.forklift
          this.manual = this.modaldata.packagingDetails.manual
          this.others = this.modaldata.packagingDetails.handleOther
          console.log(this.rpoil + this.vci + this.cpna)

          if (this.modaldata.partimage != null) {
            $('#imgid1').attr('src', 'data:image/png;base64,' + this.modaldata.partimage)


          }
          if (this.modaldata.icimage1 != null) {
            $('#imgid2').attr('src', 'data:image/png;base64,' + this.modaldata.icimage1)



          }
          if (this.modaldata.icimage2 != null) {
            $('#imgid3').attr('src', 'data:image/png;base64,' + this.modaldata.icimage2)


          }
          if (this.modaldata.srpimage != null) {
            $('#imgid4').attr('src', 'data:image/png;base64,' + this.modaldata.srpimage)

          }
          if (this.modaldata.otherimage != null) {
            $('#imgid5').attr('src', 'data:image/png;base64,' + this.modaldata.otherimage)

          }
          if (this.modaldata.fpimage != null) {
            $('#imgid6').attr('src', 'data:image/png;base64,' + this.modaldata.fpimage)


          }



          if (this.modaldata.packagingDetails.rpoil == false &&
            this.modaldata.packagingDetails.vci == false &&
            this.modaldata.packagingDetails.cpna == false) {
            this.npcm = true;
          }
          if (this.modaldata.packagingDetails.forklift == false &&
            this.modaldata.packagingDetails.manual == false &&
            this.modaldata.packagingDetails.handleOther == false) {
            this.moh = "true";
          }
          $("#modalView").modal('show')
        });
    }


  }

  packsignofid: any
  teamname: any;
  teamname1: any;
  approve(e, id, packsignofid, partnumber, teamname, teamname1, subteam) {
    this.teamname1 = teamname1;
    this.teamname = teamname;
    this.errorsubteam = ''
    this.rejectForm.reset();
    if (e.target.value == "reject") {
      $("#Reject").modal('show');
      this.signoffsubmitedid = id;
      this.packsignofid = packsignofid;
    }
    else if (e.target.value == "approve") {
      this.smpartnumber = partnumber
      this.subteam1 = '';
      this.subteam2 = '';
      this.subteam3 = '';
      $("#Approve").modal('show')
      this.signoffsubmitedid = id;
      this.packsignofid = packsignofid;
    }
    else {
    }
  }

  makeNeutral() {
    document.getElementById('approveDisabledhistory').removeAttribute("disabled");

    document.getElementById('approveDisabled').removeAttribute("disabled");
    document.getElementById('otherreassign').removeAttribute("disabled");
    document.getElementById('otherrejection').removeAttribute("disabled");
    document.getElementById('pendingreject').removeAttribute("disabled");
    document.getElementById('otherreassignhistory').removeAttribute("disabled");


    $('#Reject').modal("hide");
    $("#Approve").modal('hide');
    $("#reassignasssignTeam").modal('hide');
    $('#reassignhistory').modal("hide");
    $("#Rejectreassign").modal('hide');

    $(".neutral").prop("checked", true)
    this.rejectForm.reset();
  }

  errorsubteam: any;
  confirmApprove() {
    if (this.smqsubteam1 == '' || this.subteam2 == '' || this.subteam3 == '') {
      this.errorsubteam = 'Please fill all fields'
    }
    else if (this.smqsubteam1.length < 3) {
      this.errorsubteam = 'SM Name must be greater than 3 characters'
    }
    else {
      document.getElementById('approveDisabled').setAttribute("disabled", "disabled");
      this.statusApproved();
    }
  }
  confirmApprovehistory() {
    if (this.subteam1 == '' || this.subteam2 == '' || this.subteam3 == '') {
      this.errorsubteam = 'Please fill all fields'
    }
    else if (this.subteam1.length < 3) {
      this.errorsubteam = 'SM Name must be greater than 3 characters'
    }
    else {
      document.getElementById('approveDisabledhistory').setAttribute("disabled", "disabled");
      this.statusApprovedhistory();
    }
  }
  statusApprovedhistory() {
    var reqdata = JSON.stringify({ "id": this.signoffsubmitedid, "teamname": "MHE", "status": "approved", "updatedby": this.updatedby, "approverid": this.approverid });
    return this.makeapi.method(this.signoffapi, reqdata, "postjson")
      .subscribe(data => {
        if (data.id == 0) {
          document.getElementById('approveDisabledhistory').removeAttribute("disabled");
          this.getdata.showNotification('bottom', 'right', 'Action already taken, refresh and try again', "danger");
        }
        else {
          $('#reassignhistory').modal("hide");
          $("#Approve").modal('hide')
          $(".neutral").prop("checked", true)
          this.getdata.showNotification('bottom', 'right', 'Approved Successfully!!', "Success");
          this.statusPending1history();
        }
      },
        Error => {
        });
  }

  statusPending1history() {
    var reqdata = JSON.stringify({ "approverid": this.smqapprovalid, "packsignoffid": this.packsignofid, "teamname": "SMQ", "status": "pending", "subteam": this.subteam1, "id": this.getsignoffid });
    return this.makeapi.method(this.signoffapi, reqdata, "postjson")
      .subscribe(data => {
        if (data.id == 0) {
          this.getdata.showNotification('bottom', 'right', 'Action already taken, refresh and try again', "danger");
        }
        else {
          this.statusPending2history();
        }
      },
        Error => {
        });
  }
  statusPending2history() {

    var reqdata = JSON.stringify({ "approverid": this.iplspocid, "packsignoffid": this.packsignofid, "teamname": "IPL", "subteam": this.subteam2, "id": this.iplgetsignoffid });
    console.log(reqdata)
    return this.makeapi.method(this.signoffapi, reqdata, "postjson")
      .subscribe(data => {
        if (data.id == 0) {
          this.getdata.showNotification('bottom', 'right', 'Action already taken, refresh and try again', "danger");
        }
        else {
          this.statusPending3history()
        }
      },
        Error => {
        });
  }
  statusPending3history() {
    var reqdata = JSON.stringify({ "approverid": this.productionspocid, "packsignoffid": this.packsignofid, "teamname": "production", "subteam": this.subteam3, "id": this.productiongetsignoffid });
    console.log(reqdata)
    return this.makeapi.method(this.signoffapi, reqdata, "postjson")
      .subscribe(data => {
        if (data.id == 0) {
          this.getdata.showNotification('bottom', 'right', 'Action already taken, refresh and try again', "danger");
        }
        else {
          document.getElementById('approveDisabledhistory').removeAttribute("disabled");
          this.viewstatusdataappRejHis(this.rejAppReassignId, 'type')
          this.getMHEdata();
        }
      },
        Error => {
        });
  }
  conformreject() {
    if (this.rejectForm.invalid) {
      this.getdata.showNotification('bottom', 'right', 'Remarks are invalid ', "danger");
      return false;
    }
    else {
      document.getElementById('pendingreject').setAttribute("disabled", "disabled");
      this.statusRejected();
    }
  }
  conformreassignreject() {
    if (this.rejectForm.invalid) {
      this.getdata.showNotification('bottom', 'right', 'Remarks are invalid ', "danger");
      return false;
    }
    else {
      document.getElementById('otherrejection').setAttribute("disabled", "disabled");
      this.statusreassignRejected();
    }
  }
  statusreassignRejected() {
    var reqdata = JSON.stringify({ "teamname": "MHE", "status": "rejected", "assignedtime": this.otherRejectionAssienedTime, "updatedby": this.updatedby, 'remarks': this.rejectForm.value.remarks, "packsignoffid": this.packsignofid, "approverid": this.approverid });
    return this.makeapi.method(this.signoffapi, reqdata, "postjson")
      .subscribe(data => {
        if (data.id == 0) {
          document.getElementById('otherrejection').removeAttribute("disabled");
          this.getdata.showNotification('bottom', 'right', 'Action already taken, refresh and try again', "danger");
        }
        else {
          $(".neutral").prop("checked", true)
          $('#Rejectreassign').modal("hide");
          this.getMHEdata();
          this.statusreassignMHERejected();
        }
      },
        Error => {
        });
  }
  statusreassignMHERejected() {
    var reqdata = JSON.stringify({ "id": this.signoffsubmitedid, "teamname": this.otherRejectRolename, "remarks": this.otherRejectTableRemarks, "updatedtime": this.otherRejectionAssienedTime, "status": "MHErejected", "updatedby": this.otherRejectionUpdatedBy, "packsignoffid": this.packsignofid, "teamname1": this.otherRejectteamname1, "subteam": this.otherRejectsubteam });
    return this.makeapi.method(this.signoffapi, reqdata, "postjson")
      .subscribe(data => {
        if (data.id == 0) {
          document.getElementById('otherrejection').removeAttribute("disabled");
          this.getdata.showNotification('bottom', 'right', 'Action already taken, refresh and try again', "danger");
        }
        else {
          $(".neutral").prop("checked", true)
          $('#Rejectreassign').modal("hide");
          this.getdata.showNotification('bottom', 'right', 'Rejected successfully!!', "danger");
          this.getMHEdata();
        }
      },
        Error => {
        });
  }
  statusdata = [1, 2, 3, 4, 5];
  viewstatus(id, type) {
    var reqdata = 'packmasterid=' + id;
    return this.makeapi.method(this.statusapi, reqdata, "post").subscribe(data => {
      this.statusdata = data;
      $("#viewstatus").modal('show')
    });
  }
  rejAppReassignId: any;
  statusdataappRejHis = [];
  viewstatusdataappRejHis(id, type) {
    this.rejAppReassignId = id;
    var reqdata = 'packmasterid=' + id;
    return this.makeapi.method(this.statusapi, reqdata, "post").subscribe(data => {
      this.statusdataappRejHis = data;
      $("#viewstatusdataappRejHis").modal('show')
    });
  }

  statusApproved() {
    var reqdata = JSON.stringify({ "id": this.signoffsubmitedid, "teamname": "MHE", "status": "approved", "updatedby": this.updatedby, "approverid": this.approverid, 'teamname1': this.teamname1, "subteam": this.updatedby });
    return this.makeapi.method(this.signoffapi, reqdata, "postjson")
      .subscribe(data => {
        if (data.id == 0) {
          document.getElementById('approveDisabled').removeAttribute("disabled");
          this.getdata.showNotification('bottom', 'right', 'Action already taken, refresh and try again', "danger");
        }
        else {
          $('#asssignTeam').modal("hide");
          $("#Approve").modal('hide')
          $(".neutral").prop("checked", true)
          this.getdata.showNotification('bottom', 'right', 'Approved Successfully!!', "Success");
          this.statusPending2();
        }
      },
        Error => {
        });
  }

  statusRejected() {
    var reqdata = JSON.stringify({ "id": this.signoffsubmitedid, "teamname": "MHE", "status": "rejected", "updatedby": this.updatedby, 'remarks': this.rejectForm.value.remarks, "packsignoffid": this.packsignofid, 'teamname1': this.teamname1, "subteam": this.updatedby, "approverid": this.approverid });
    return this.makeapi.method(this.signoffapi, reqdata, "postjson")
      .subscribe(data => {
        if (data.id == 0) {
          document.getElementById('pendingreject').removeAttribute("disabled");
          this.getdata.showNotification('bottom', 'right', 'Action already taken, refresh and try again', "danger");
        }
        else {
          $(".neutral").prop("checked", true)
          $('#Reject').modal("hide");
          this.getdata.showNotification('bottom', 'right', 'Rejected Successfully!!', "danger");
          this.getMHEdata();
        }
      },
        Error => {
        });
  }
  smqapprovalid: any;
  getsignoffid: any;
  smqteamname1: any;
  smqsubteam1: any;
  statusPending1() {
    var reqdata = JSON.stringify({ "approverid": this.smqapprovalid, "packsignoffid": this.packsignofid, "teamname": "SMQ", "status": "pending", "subteam": this.smqsubteam1, "id": this.getsignoffid, 'teamname1': this.smqteamname1 });
    return this.makeapi.method(this.signoffapi, reqdata, "postjson")
      .subscribe(data => {
        if (data.id == 0) {
          document.getElementById('approveDisabled').removeAttribute("disabled");
          this.getdata.showNotification('bottom', 'right', 'Action already taken, refresh and try again', "danger");
        }
        else {
          this.getMHEdata();
        }
      },
        Error => {
        });
  }

  statusPending2() {
    var reqdata = JSON.stringify({ "approverid": this.iplspocid, "packsignoffid": this.packsignofid, "teamname": "IPL", 'teamname1': this.subteam2, "subteam": this.iplspocname });
    console.log(reqdata)
    return this.makeapi.method(this.signoffapi, reqdata, "postjson")
      .subscribe(data => {
        if (data.id == 0) {
          document.getElementById('approveDisabled').removeAttribute("disabled");
          this.getdata.showNotification('bottom', 'right', 'Action already taken, refresh and try again', "danger");
        }
        else {
          this.statusPending3()
        }
      },
        Error => {
        });
  }
  statusPending3() {
    var reqdata = JSON.stringify({ "approverid": this.productionspocid, "packsignoffid": this.packsignofid, "teamname": "production", 'teamname1': this.subteam3, "subteam": this.productionspocname });
    console.log(reqdata)
    return this.makeapi.method(this.signoffapi, reqdata, "postjson")
      .subscribe(data => {
        if (data.id == 0) {
          document.getElementById('approveDisabled').removeAttribute("disabled");
          this.getdata.showNotification('bottom', 'right', 'Action already taken, refresh and try again', "danger");
        }
        else {
          this.statusPending1()
        }
      },
        Error => {
        });
  }
  subteam1 = ''
  subteam2 = ''
  subteam3 = ''
  smpartnumber: any;
  assignteam() {
    $('#asssignTeam').modal("show");
    this.getallteam()
    this.getallsmteam();
  }
  iplspocname: any;
  iplspocid: any;
  productionspocname: any;
  productionspocid: any
  changeteam1(team) {
    this.subteam1 = team;
  }
  changeteam2(id) {
    var get_obj = this.allteams.filter(function (el) {
      return (el.id === Number(id));
    });
    this.subteam2 = get_obj[0].teamname;
    this.iplspocname = get_obj[0].spocname;
    this.iplspocid = get_obj[0].spocid;

  // this.rejectedteam= "";
      // this.rejectapprovalid= "";
      // this.rejectpacksignofid= "";
      // this.rejectsubteam= "";
      // this. rejectid= "";
      // this.rejectteamname1= "";

      this.rejectteamname1 = get_obj[0].teamname;
      this.rejectsubteam = get_obj[0].spocname;
      this.rejectapprovalid = get_obj[0].spocid;






      this.rejectsubteam = get_obj[0].teamname;
      this.rejectsubteam = get_obj[0].spocname;
      this.rejectapprovalid = get_obj[0].spocid;

  }
  changeteam3(id) {
    var get_obj = this.allteams.filter(function (el) {
      return (el.id === Number(id));
    });
    this.subteam3 = get_obj[0].teamname;
    this.productionspocname = get_obj[0].spocname;
    this.productionspocid = get_obj[0].spocid


 // this.rejectedteam= "";
      // this.rejectapprovalid= "";
      // this.rejectpacksignofid= "";
      // this.rejectsubteam= "";
      // this. rejectid= "";
      // this.rejectteamname1= "";

      this.rejectteamname1 = get_obj[0].teamname;
      this.rejectsubteam = get_obj[0].spocname;
      this.rejectapprovalid = get_obj[0].spocid;

  }
  changeteamHistory(teamname, type) {
    if (type == 'IPL')
      this.subteamhistory = teamname
    else
      this.subteamhistory = teamname
  }
  allteams: any;
  getallteam() {
    return this.makeapi.method(this.getallteamapi, '', "get")
      .subscribe(data => {
        this.allteams = data;
      },
        Error => {
        });
  }
  subteamhistory = '';
  getallsmteam() {
    this.iplspocname = '';
    this.iplspocid = '';
    this.productionspocname = '';
    this.productionspocid = '';

    var reqdata = 'packmasterid=' + this.packsignofid + '&teamname=' + 'SMQ'
    return this.makeapi.method(this.getSignOffapi, reqdata, "post")
      .subscribe(data => {
        console.log(data)
        this.smqapprovalid = data.approverid;
        this.getsignoffid = data.id;
        this.smqsubteam1 = data.subteam;
        this.smqteamname1 = data.teamname1;
      },
        Error => {
        });
  }
  getallsmteamhistory() {
    var reqdata = 'packmasterid=' + this.packsignofid + '&teamname=' + 'SMQ'
    return this.makeapi.method(this.getSignOffapi, reqdata, "post")
      .subscribe(data => {
        console.log(data)
        this.smqapprovalid = data.approverid;
        this.getsignoffid = data.id;
        this.subteam1 = data.subteam;
      },
        Error => {
        });
  }
  iplapprovalid: any;
  iplgetsignoffid: any;
  productionapprovalid: any;
  productiongetsignoffid: any;
  getalliplteam() {
    this.iplspocname = '';
    this.iplspocid = '';

    var reqdata = 'packmasterid=' + this.packsignofid + '&teamname=' + 'IPL'
    return this.makeapi.method(this.getSignOffapi, reqdata, "post")
      .subscribe(data => {
        console.log(data)
        this.iplspocid = data.approverid;
        this.iplgetsignoffid = data.id;
        this.subteam2 = data.subteam;
      },
        Error => {
        });
  }
  getallproductionteam() {
    this.productionspocname = '';
    this.productionspocid = '';
    var reqdata = 'packmasterid=' + this.packsignofid + '&teamname=' + 'production'
    return this.makeapi.method(this.getSignOffapi, reqdata, "post")
      .subscribe(data => {
        console.log(data)
        this.productionspocid = data.approverid;
        this.productiongetsignoffid = data.id;
        this.subteam3 = data.subteam;
        $("#reassignhistory").modal('show')
      },
        Error => {
        });
  }
  rejectedteam: any;
  rejectapprovalid:any;
  rejectpacksignofid:any;
  rejectsubteam:any;
  rejectid:any;
  rejectteamname1:any;

  reassignnew(e, id, packsignofid, rolename, tableremarks, assigntime, updatedby, teamname1, subteam) {
    this.rejectedteam = "";
    this.errorsubteam = "";
    this.smqsubteam1 = "";
    this.subteam3 = "";
    this.subteam2 = "";

    this.rejectedteam= "";
    this.rejectapprovalid= "";
    this.rejectpacksignofid= "";
    this.rejectsubteam= "";
    this. rejectid= "";
    this.rejectteamname1= "";

    var reqdata = 'packmasterid=' + packsignofid;
    return this.makeapi.method(this.statusapi, reqdata, "post").subscribe(data => {
      for (var i = 0; i < data.length; i++) {
        if (data[i].status != null) {
          if ((data[i].status).toLowerCase() == 'rejected') {
            this.rejectedteam = data[i].teamname;
            this.rejectapprovalid = data[i].approverid
            this.rejectpacksignofid = data[i].packsignoffid;
            this.rejectsubteam = data[i].subteam;
            this.rejectid = data[i].id;

            this.rejectteamname1 = data[i].teamname1;;
            this.otherRejectionUpdatedBy = updatedby;

            $("#reassignasssignTeam").modal('show');
            this.signoffsubmitedid = id;
            this.packsignofid = packsignofid;
            this.getallteam()
            this.getallsmteam();
          }
        }
      }
    });


  }

  conformreasssign() {

    var reqdata;
    if (this.rejectedteam == 'SMQ') {
      if (this.smqsubteam1 == '') {
        this.errorsubteam = 'Please fill all fields'
      }
      else if (this.smqsubteam1.length < 3) {
        this.errorsubteam = 'SM Name must be greater than 3 characters'
      }
      else {
        reqdata = JSON.stringify({ "approverid":this.rejectapprovalid, "packsignoffid": this.rejectpacksignofid, "teamname": "SMQ", "status": "pending", "subteam": this.rejectsubteam, "id": this.rejectid, 'teamname1': this.rejectteamname1 });
      }
    }
    else if (this.rejectedteam == 'IPL') {
      if (this.subteam2 == '') {
        this.errorsubteam = 'Please fill all fields'
      }
      else {
        reqdata = JSON.stringify({ "approverid":this.rejectapprovalid, "packsignoffid": this.rejectpacksignofid,"teamname": "IPL", "status": "pending", "subteam": this.rejectsubteam, "id": this.rejectid, 'teamname1': this.rejectteamname1 });
      }
    }
    else {
      if (this.subteam3 == '') {
        this.errorsubteam = 'Please fill all fields'
      }
      else {
        reqdata = JSON.stringify({ "approverid":this.rejectapprovalid, "packsignoffid": this.rejectpacksignofid,"status": "pending", "teamname": "production", "subteam": this.rejectsubteam, "id": this.rejectid, 'teamname1': this.rejectteamname1 });
      }
    }
    document.getElementById('otherreassign').setAttribute("disabled", "disabled");
    console.log(reqdata)
    return this.makeapi.method(this.reassignsignoffapi, reqdata, "postjson")
      .subscribe(data => {
        if (data.id == 0) {
          document.getElementById('otherreassign').removeAttribute("disabled");
          this.getdata.showNotification('bottom', 'right', 'Action already taken, refresh and try again', "danger");
        }
        else {
          $(".neutral").prop("checked", true)
          $("#reassignasssignTeam").modal('hide');
          this.getdata.showNotification('bottom', 'right', 'Reassigned Successfully!!', "success");
          this.getMHEdata();
        }
      },
        Error => {
        });
  }
  otherRejectRolename: any;
  otherRejectTableRemarks: any;
  otherRejectionAssienedTime: any;
  otherRejectionUpdatedBy: any;
  otherRejectteamname1: any;
  otherRejectsubteam: any;

  reapprove(e, id, packsignofid, rolename, tableremarks, assigntime, updatedby, teamname1, subteam) {
    this.rejectedteam = "";
    this.errorsubteam = "";
    this.smqsubteam1 = "";
    this.subteam3 = "";
    this.subteam2 = "";

    this.otherRejectionAssienedTime = assigntime
    this.otherRejectRolename = rolename;
    this.otherRejectteamname1 = teamname1;
    this.otherRejectsubteam = subteam;

    this.otherRejectTableRemarks = tableremarks;
    this.otherRejectionUpdatedBy = updatedby;


    if (e.target.value == "reassign") {
      $("#reassignasssignTeam").modal('show');
      this.signoffsubmitedid = id;
      this.packsignofid = packsignofid;
      this.getallteam()
      this.getallsmteam();
    }
    else if (e.target.value == "reject") {
      $("#Rejectreassign").modal('show')
      this.signoffsubmitedid = id;
      this.packsignofid = packsignofid;
    }
    else {
    }
  }

  otherRejectteamnameshistory: any;
  otherRejectsubteamhistory: any;
  otherRejectionUpdatedByhistory: any;

  reapprovehistory(event, id, packsignoffid, updatedby, teamname, subteam) {
    this.errorsubteam = ''
    this.otherRejectsubteamhistory = subteam;
    this.otherRejectteamnameshistory = teamname;
    this.otherRejectionUpdatedByhistory = updatedby;
    this.signoffsubmitedid = id;
    this.packsignofid = packsignoffid;
    this.getallteam();
    this.getallsmteamhistory();
    this.getalliplteam();
    this.getallproductionteam();

  }

  conformreasssignhistory() {
    if (this.subteamhistory == '') {
      this.errorsubteam = 'Please fill all fields'
    }
    else if (this.subteamhistory.length < 3) {
      this.errorsubteam = 'Minimum 3 characters are required'
    }
    else {
      document.getElementById('otherreassignhistory').setAttribute("disabled", "disabled");
      var reqdata = JSON.stringify({ "id": this.signoffsubmitedid, "teamname": "MHE", "status": "approved", "updatedby": this.updatedby });
      return this.makeapi.method(this.signoffapi, reqdata, "postjson")
        .subscribe(data => {
          if (data.id == 0) {
            document.getElementById('otherreassignhistory').removeAttribute("disabled");
            this.getdata.showNotification('bottom', 'right', 'Action already taken, refresh and try again', "danger");
          }
          else {
            document.getElementById('otherreassignhistory').removeAttribute("disabled");
            $(".neutral").prop("checked", true)
            $("#reassignhistory").modal('hide');
            this.getdata.showNotification('bottom', 'right', 'Reassigned Successfully!!', "success");
            this.viewstatusdataappRejHis(this.signoffsubmitedid, 'type');
            this.getMHEdata();
          }
        },
          Error => {
          });
    }


    // return this.makeapi.method(this.reassignsignoffapi, reqdata, "post")
    //   .subscribe(data => {
    //     if (data.id == 0) {
    //       document.getElementById('otherreassignhistory').removeAttribute("disabled");
    //       this.getdata.showNotification('bottom', 'right', 'Action already taken, refresh and try again', "danger");
    //     }
    //     else {
    //       $(".neutral").prop("checked", true)
    //       $("#reassignhistory").modal('hide');
    //       this.getdata.showNotification('bottom', 'right', 'Reassigned Successfully!!', "success");
    //       this.getMHEdata();
    //     }
    //   },
    //     Error => {
    //     });
  }

  tabname = 'pending'
  pendingtab = 'show';
  historytab = 'notshow';
  othertab = 'notshow'
  changetab(status) {

    if (status == 'pending') {
      this.tabname = 'pending';

      this.pendingtab = 'show';
      this.historytab = 'notshow'
      this.othertab = 'notshow'
    }
    else if (status == 'rejectionhistory') {
      this.tabname = 'approvedorrejected';

      this.historytab = 'show'
      this.pendingtab = 'notshow';
      this.othertab = 'notshow'
    }
    else if (status == 'otherrejection') {
      this.tabname = 'rejected';

      this.othertab = 'show'
      this.pendingtab = 'notshow';
      this.historytab = 'notshow'
    }
  }
  leadernamelistsedit = [];
  totalsearchdataedit: any;
  leadernameedit(keyvalue) {
    if (this.leadernamelistsedit.indexOf(keyvalue) != -1) {
      this.smqsubteam1 = this.totalsearchdataedit[this.leadernamelistsedit.indexOf(keyvalue)].name;
      this.smqapprovalid = this.totalsearchdataedit[this.leadernamelistsedit.indexOf(keyvalue)].id;




      this.rejectapprovalid= this.totalsearchdataedit[this.leadernamelistsedit.indexOf(keyvalue)].id;
      this.rejectteamname1= this.totalsearchdataedit[this.leadernamelistsedit.indexOf(keyvalue)].id;

    }
    else {
      this.leadernamelistsedit = [];
      // this.smqapprovalid=keyvalue;
      let reqdata = "username=" + keyvalue
      return this.makeapi.method(this.searchuserapi, reqdata, "post")
        .subscribe(data => {
          this.smqsubteam1 = keyvalue;
          this.totalsearchdataedit = data
          for (var i = 0; i < data.length; i++)
            this.leadernamelistsedit[i] = data[i].shortid;
        },
          Error => {
          });
    }
  }
  }
