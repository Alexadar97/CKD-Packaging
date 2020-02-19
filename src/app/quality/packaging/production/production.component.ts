import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
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
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit {

  assets = "assets/img/selectimage.jpg";
  productiondata: any;
  checkfordownload: any;
  submitedid: any;
  updatedby: any;
  rejectForm: any;
  emailvalidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+")){2,}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  numbervalidation = /^[0-9]+$/;
  alphaWithoutSpace = /^[a-zA-Z]+$/;
  alphanumeric = /^[a-zA-Z0-9]+$/;
  decimalnumber = /^(0|[1-9]\d*)(\.\d+)?$/;
  alphawithdot = /^[a-zA-Z. ]+$/;
  alpha = /^[A-Za-z\d\s]+$/;
  passwordvalidation = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

  currentPage = 1;


  p1 = 1;
  p2 = 1;
  sp: any;
  moh: any;
  plantcode: any;
  refno: any;

  packdata: any;
  signoffsubmitedid: any;

  private getproductionDataapi = this.getdata.appconstant + 'getSignOffByTeam';
  private signoffapi = this.getdata.appconstant + 'signoff';
  private packagingapi = this.getdata.appconstant + 'packaging';
  private searchSignOffapi = this.getdata.appconstant + 'searchSignOff';
  private statusapi = this.getdata.appconstant + 'signoffModal';
  private packagingdetailapi = this.getdata.appconstant + 'packaging/';

  constructor(private getsession: AuthGuard, private http: Http, private ref: ChangeDetectorRef, private getdata: WebService, private Formbuilder: FormBuilder, private router: Router, private makeapi: WebService, ) {
    this.rejectForm = this.Formbuilder.group({
      remarks: [null, Validators.compose([Validators.required,  Validators.minLength(3), Validators.maxLength(100),])]
    })
  }

  approveprivilage: any;
  approverid:any;
  ngOnInit() {
    this.getProduction();
    if ((this.getdata.session().roleid == 6) || (this.getdata.session().roleid == 7)) {
      this.approveprivilage = false
    }
    else{
      this.approveprivilage = true
    }
    this.updatedby = this.getdata.session().name;
    this.approverid= this.getdata.session().id;


  }
  getProduction() {
    var reqdata = "teamname=" + "production" + "&status=" + "pending" + "&approvedby=" + this.getsession.session().id;
    return this.makeapi.method(this.getproductionDataapi, reqdata, "post")
      .subscribe(data => {
        this.productiondata = data
        this.getProductionhistory();
      },
        Error => {
        });
  }
  productiondatahistory: any;
  getProductionhistory() {
    var reqdata = "teamname=" + "production" + "&status=" + "approvedorrejected" + "&approvedby=" + this.getsession.session().id;
    return this.makeapi.method(this.getproductionDataapi, reqdata, "post")
      .subscribe(data => {
        this.productiondatahistory = data;
        document.getElementById('approveDisabled').removeAttribute("disabled");
        document.getElementById('rejectDisable').removeAttribute("disabled");
      },
        Error => {
        });
  }
  searchsignoff(keyvalue) {
    var searchapi;
    if(this.tabname == 'pending') {
      searchapi=this.searchSignOffapi + '?teamname=production&status=pending&partnumber=' + keyvalue
    }
     else if(this.tabname == 'approvedorrejected'){
      searchapi=this.searchSignOffapi + '?teamname=production&status=approvedorrejected&partnumber=' + keyvalue
     }
    return this.makeapi.method(searchapi, '', "get")
      .subscribe(data => {
        if(this.tabname == 'pending') {
          this.productiondata = data;
        }
        else if(this.tabname == 'approvedorrejected'){
          this.productiondatahistory = data;
        }
        // else if(this.tabname == 'rejected'){
        //   this.QAdatasrejection = data;
        // }

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
      return this.makeapi.method(this.packagingdetailapi + this.productiondata[index].id, "", "get")
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
      return this.makeapi.method(this.packagingdetailapi + this.productiondatahistory[index].id, "", "get")
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
  packsignofid:any;
  teamname1:any;
subteam:any;
  approve(e, id,packsignofid,teamname1,subteam) {
    this.teamname1=teamname1;
      this.subteam=subteam;
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
    $(".neutral").prop("checked", true);
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
      this.getdata.showNotification('bottom', 'right', 'Remarks are invalid ', "danger");
      return false;
    }
    else {
      document.getElementById('rejectDisable').setAttribute("disabled", "disabled");
      this.statusRejected();
    }
  }

  statusdata = [1,2,3,4,5];
  viewstatus(id) {
    var reqdata='packmasterid='+id;
      return this.makeapi.method(this.statusapi, reqdata, "post")
      .subscribe(data => {
        this.statusdata = data;
        // for (var i = 0; i < data.length; i++) {
        //   if (data[i].teamname == 'supplier') {
        //     this.statusdata[0] =data[i];

        //   }
        //   else if (data[i].teamname == 'MHE') {
        //     this.statusdata[1] =data[i];

        //   }
        //   else if (data[i].teamname == 'SMQ') {
        //     this.statusdata[2] =data[i];
        //   }
        //   else if (data[i].teamname == 'IPL') {
        //     this.statusdata[3] =data[i];
        //   }
        //   else if (data[i].teamname == 'production') {
        //     this.statusdata[4] =data[i];
        //   }
        // }
        $("#viewstatus").modal('show')
      });
  }


  statusApproved() {
    var reqdata = JSON.stringify({ "id": this.signoffsubmitedid, "teamname": "production", "status": "approved", "updatedby": this.updatedby,"packsignoffid": this.packsignofid,'teamname1':this.teamname1,
    'subteam':this.subteam,"approverid":this.approverid });
    return this.makeapi.method(this.signoffapi, reqdata, "postjson")
      .subscribe(data => {

        if(data.id == 0) {
          document.getElementById('rejectDisable').removeAttribute("disabled");
          this.getdata.showNotification('bottom', 'right', 'Action already taken, refresh and try again', "danger");
        }
        else{

        $("#Approve").modal('hide')
        $(".neutral").prop("checked", true)
        this.getdata.showNotification('bottom', 'right', 'Approved successfully!!', "success");
        this.getProduction();
        }


      },
        Error => {
        });
  }

  statusRejected() {
    var reqdata = JSON.stringify({ "packsignoffid":this.packsignofid,"id": this.signoffsubmitedid, "teamname": "production", "status": "rejected", "updatedby": this.updatedby, 'remarks': this.rejectForm.value.remarks,'teamname1':this.teamname1,"subteam": this.subteam ,"approverid":this.approverid });
    return this.makeapi.method(this.signoffapi, reqdata, "postjson")
      .subscribe(data => {
        if(data.id == 0) {
          document.getElementById('rejectDisable').removeAttribute("disabled");
          this.getdata.showNotification('bottom', 'right', 'Action already taken, refresh and try again', "danger");
        }
        else{
         $('#Reject').modal("hide");
         this.getdata.showNotification('bottom', 'right', 'Rejected successfully!!', "danger");
         this.getProduction();
        }

      },
        Error => {
        });
  }
  tabname = 'pending'
  pendingtab='show';
  historytab='notshow';
  othertab='notshow'
  changetab(status) {
    // $("#searchvalueid").val("")

    if (status == 'pending') {
      this.tabname = 'pending';

      this.pendingtab='show';
      this.historytab='notshow'
      this.othertab='notshow'
    }
    else if (status == 'rejectionhistory') {
      this.tabname = 'approvedorrejected';

      this.historytab='show'
      this.pendingtab='notshow';
      this.othertab='notshow'
    }
  }
}
