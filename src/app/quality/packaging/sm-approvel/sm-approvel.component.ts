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
  selector: 'app-sm-approvel',
  templateUrl: './sm-approvel.component.html',
  styleUrls: ['./sm-approvel.component.css']
})
export class SmApprovelComponent implements OnInit {

  assets = "assets/img/selectimage.jpg";
  checkfordownload: any;
  emailvalidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+")){2,}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  numbervalidation = /^[0-9]+$/;
  alphaWithoutSpace = /^[a-zA-Z]+$/;
  alphanumeric = /^[a-zA-Z0-9]+$/;
  decimalnumber = /^(0|[1-9]\d*)(\.\d+)?$/;
  alphawithdot = /^[a-zA-Z. ]+$/;
  alpha = /^[A-Za-z\d\s]+$/;
  passwordvalidation = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

  rejectForm: any;
  SCMdatas: any;
  packdata: any;

  signoffsubmitedid: any;
  updatedby: any;


  p1 = 1;
  p2 = 1;
  sp: any;
  moh: any;
  plantcode: any;
  refno: any;

  private packagingapi = this.getdata.appconstant + 'packaging';
  private getSCMDataapi = this.getdata.appconstant + 'getSignOffByTeam';
  private signoffapi = this.getdata.appconstant + 'signoff';
  private searchSignOffapi = this.getdata.appconstant + 'searchSignOff';
  private getallteamapi = this.getdata.appconstant + 'listTeam';
  private IPLsignoffapi = this.getdata.appconstant + 'updateSignoffStatus';
  private statusapi = this.getdata.appconstant + 'signoffModal';
  private packagingdetailapi = this.getdata.appconstant + 'packaging/';

  constructor(private getsession: AuthGuard, private http: Http, private ref: ChangeDetectorRef, private getdata: WebService, private Formbuilder: FormBuilder, private router: Router, private makeapi: WebService, ) {
    this.rejectForm = this.Formbuilder.group({
      remarks: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100),])]
    })
  }
  approveprivilage: any;
  approverid:any;
  ngOnInit() {
    this.getSCMdata();

    if ((this.getdata.session().roleid == 6) || (this.getdata.session().roleid == 7)) {
      this.approveprivilage = false
    }
    this.updatedby = this.getdata.session().name;
    this.approverid= this.getdata.session().id;

  }
  getSCMdata() {
    var reqdata = "teamname=" + "SMQ" + "&status=" + "pending" + "&approvedby=" + this.getsession.session().id;;
    return this.makeapi.method(this.getSCMDataapi, reqdata, "post")
      .subscribe(data => {
        this.SCMdatas = data
        this.getSCMdatahistory();
      },
        Error => {
        });
  }
  SCMdatashistory: any;
  getSCMdatahistory() {
    var reqdata = "teamname=" + "SMQ" + "&status=" + "approvedorrejected" + "&approvedby=" + this.getsession.session().id;
    return this.makeapi.method(this.getSCMDataapi, reqdata, "post")
      .subscribe(data => {
        this.SCMdatashistory = data;
        document.getElementById('approveDisabled').removeAttribute("disabled");
        document.getElementById('rejectDisable').removeAttribute("disabled");
      },
        Error => {
        });
  }

  // SCHPackagingId: any;
  searchsignoff(keyvalue) {
    var searchapi;
    if (this.tabname == 'pending') {
      searchapi = this.searchSignOffapi + '?teamname=SMQ&status=pending&partnumber=' + keyvalue
    }
    else if (this.tabname == 'approvedorrejected') {
      searchapi = this.searchSignOffapi + '?teamname=SMQ&status=approvedorrejected&partnumber=' + keyvalue
    }
    return this.makeapi.method(searchapi, '', "get")
      .subscribe(data => {
        if (this.tabname == 'pending') {
          this.SCMdatas = data;
        }
        else if (this.tabname == 'approvedorrejected') {
          this.SCMdatashistory = data;
        }
      },
        Error => {
        });
  }
  getpackingdata() {
    return this.makeapi.method(this.packagingapi, "", "get")
      .subscribe(data => {
        this.packdata = data
      },
        Error => {
        });
  }
  rpoil: any;
  vci: any;
  cpna: any;
  modaldata: any;
  title: any
  twowaypallet: any;
  fourwaypallet: any;
  heattreated: any;
  fumigated: any;
  forklift: any;
  manual: any;
  others: any;
  npcm: any;
  viewreport(index, type) {
    $('#imgid1').attr('src', 'assets/img/plus.jpg');
    $('#imgid2').attr('src', 'assets/img/plus.jpg');
    $('#imgid3').attr('src', 'assets/img/plus.jpg');
    $('#imgid4').attr('src', 'assets/img/plus.jpg');
    $('#imgid5').attr('src', 'assets/img/plus.jpg');
    $('#imgid6').attr('src', 'assets/img/plus.jpg');

    if (type == 'pending') {
      return this.makeapi.method(this.packagingdetailapi + this.SCMdatas[index].id, "", "get")
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
    else if (type = 'approve') {
      return this.makeapi.method(this.packagingdetailapi + this.SCMdatashistory[index].id, "", "get")
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
  teamname1:any;
  subteaqm:any;
  approve(e, id, packsignofid,teamname1,subteam) {
    this.teamname1=teamname1;
    this.subteam=subteam;
    this.rejectForm.reset();
    if (e.target.value == "reject") {
      $("#Reject").modal('show');
      this.signoffsubmitedid = id;
      this.packsignofid = packsignofid;
    }
    else if (e.target.value == "approve") {
      $("#Approve").modal('show')
      this.signoffsubmitedid = id;
      this.packsignofid = packsignofid;
    }
    else {
    }
  }


  makeNeutral() {
    document.getElementById('approveDisabled').removeAttribute("disabled");
    document.getElementById('rejectDisable').removeAttribute("disabled");
    $(".neutral").prop("checked", true)
    $('#Reject').modal("hide");
    $("#Approve").modal('hide')
    this.rejectForm.reset();
  }

  confirmApprove() {
    document.getElementById('approveDisabled').setAttribute("disabled", "disabled");
    this.statusApproved();
  }

  reject() {
    if (this.rejectForm.invalid) {
      this.getdata.showNotification('bottom', 'right', 'Remarks are invalid. ', "danger");
      return false;
    }
    else {
      document.getElementById('rejectDisable').setAttribute("disabled", "disabled");
      this.statusRejected();
    }
  }

  statusdata = [1, 2, 3, 4, 5];
  viewstatus(id) {
    var reqdata = 'packmasterid=' + id;
    return this.makeapi.method(this.statusapi, reqdata, "post")
      .subscribe(data => {
        this.statusdata = data;
        $("#viewstatus").modal('show')
      });
  }

  statusApproved() {
    var reqdata = JSON.stringify({ "id": this.signoffsubmitedid, "teamname": "SMQ", "status": "approved", "updatedby": this.updatedby,'teamname1':this.teamname1,
    'subteam':this.subteam,"approverid":this.approverid });
    return this.makeapi.method(this.signoffapi, reqdata, "postjson")
      .subscribe(data => {
        if (data.id == 0) {
          document.getElementById('approveDisabled').removeAttribute("disabled");
          this.getdata.showNotification('bottom', 'right', 'Action already taken, refresh and try again', "danger");
        }
        else {
          $("#Approve").modal('hide')
          $(".neutral").prop("checked", true)
          this.getdata.showNotification('bottom', 'right', 'Approved successfully!!', "success");
          this.statusIPLApproved();
        }

      },
        Error => {
        });
  }

  statusIPLApproved() {
    var reqdata = "packsignoffid=" + this.packsignofid + "&status=pending&teamname=IPL";
    return this.makeapi.method(this.IPLsignoffapi, reqdata, "post")
      .subscribe(data => {
        if (data.id == 0) {
          document.getElementById('approveDisabled').removeAttribute("disabled");
          this.getdata.showNotification('bottom', 'right', 'Action already taken, refresh and try again', "danger");
        }
        else {
          this.getSCMdata();
        }

      },
        Error => {
        });
  }

  statusRejected() {
    var reqdata = JSON.stringify({ "packsignoffid": this.packsignofid, "id": this.signoffsubmitedid, "teamname": "SMQ", "status": "rejected", "updatedby": this.updatedby, 'remarks': this.rejectForm.value.remarks,'teamname1':this.teamname1,"subteam": this.subteam,"approverid":this.approverid  });
    return this.makeapi.method(this.signoffapi, reqdata, "postjson")
      .subscribe(data => {
        $('#Reject').modal("hide");
        this.getdata.showNotification('bottom', 'right', 'Rejected successfully!!', "danger");
        this.getSCMdata();
      },
        Error => {
        });
  }
  statusPending() {
    var reqdata = JSON.stringify({ "packsignoffid": this.packsignofid, "teamname": "IPL", "status": "pending" });
    return this.makeapi.method(this.signoffapi, reqdata, "postjson")
      .subscribe(data => {
        $("#Approve").modal('hide')
        $(".neutral").prop("checked", true)
        this.getdata.showNotification('bottom', 'right', 'Approved successfully!!', "success");
        this.getSCMdata();
        this.getSCMdatahistory();
      },
        Error => {
        });
  }
  subteam = "Direct Online"
  assignteam() {
    this.getallteam()
    $('#asssignTeam').modal("show");
  }
  changeteam(team) {
    this.subteam = team
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
  }
}
