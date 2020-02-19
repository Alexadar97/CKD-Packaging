import { Injectable } from '@angular/core';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
declare var $: any;

@Injectable()
export class DatatransferService {
  appcode: any;
  userid: any;
  logintype: any;
  user_email: any;
  signoffsheet:any;

  // Old-QA-Server
  // http://13.127.191.27:8080/DaimPMP/pmp/;



  // QA-Server
  Coreappconstant = 'http://13.234.64.82:8080/DICVDISC/core/';
  appconstantpdp = 'http://13.234.64.82:8080/DaimPDP/pdp/';
  appconstant = 'http://13.234.64.82:8080/DICVDISC/disc/';
  appconstantpmp = "http://13.234.64.82:8080/DaimPMP/pmp/";
  appconstantispr = "http://13.234.64.82:8080/DaimISPR/ispr/";
  appconstantpackaging= 'http://13.234.64.82:8080/DaimPackaging/pack/';
  globalurl = "http://dicv-discportal.s3-website.ap-south-1.amazonaws.com/packaging"


  // Coreappconstant = 'http://13.234.64.82:8080/DICVDISC_JWT/core/';
  // appconstantpdp = 'http://13.234.64.82:8080/DaimPDP/pdp/';
  // appconstant = 'http://13.234.64.82:8080/DICVDISC_JWT/disc/';
  // appconstantpmp = "http://13.234.64.82:8080/DaimPMP/pmp/";
  // appconstantispr = "http://13.234.64.82:8080/DaimISPR/ispr/";
  // appconstantpackaging= 'http://13.234.64.82:8080/DaimPackaging/pack/';
  // globalurl = "http://dicv-discportal.s3-website.ap-south-1.amazonaws.com/packaging"

  //local-serve-dev
  // Coreappconstant = 'http://13.234.64.82:8080/DICVDISC/core/';
  // appconstantpdp = 'http://13.234.64.82:8080/DaimPDP/pdp/';
  // appconstant = 'http://13.234.64.82:8080/DICVDISC/disc/';
  // appconstantpmp = "http://13.234.64.82:8080/DaimPMP/pmp/";
  // appconstantispr = "http://13.234.64.82:8080/DaimISPR/ispr/";
  // appconstantpackaging = 'http://13.234.64.82:8080/DaimPackaging/pack/';
  // globalurl = "http://localhost:4200"


  // //live-serve
  // Coreappconstant = 'https://www.digitalsupplychain.bharatbenz.com/DICVDISC/core/';
  // appconstantpdp = 'https://www.digitalsupplychain.bharatbenz.com/DaimPDP/pdp/';
  // appconstant = 'https://www.digitalsupplychain.bharatbenz.com/DICVDISC/disc/';
  // appconstantpmp = "https://www.digitalsupplychain.bharatbenz.com/DaimPMP/pmp/";
  // appconstantispr = "https://www.digitalsupplychain.bharatbenz.com/DaimISPR/ispr/";
  // appconstantpackaging = 'https://www.digitalsupplychain.bharatbenz.com/DaimPackaging/pack/';
  // globalurl = "https://www.digitalsupplychain.bharatbenz.com/dicvscar/Daimpackaging";

  // local-dev-Server
  // Coreappconstant = 'http://172.30.1.200:9500/DICVDISC/core/';
  // appconstant = 'http://172.30.1.200:9500/DICVDISC/disc/';
  // appconstantpdp = 'http://172.30.1.200:9500/DaimPDP/pdp/';zz
  // appconstantpmp="http://172.30.1.200:9500/DaimPMP/pmp/";
  // // Demo-Server
  // appconstant = "https://sevael.in/iTechQuest/";

  // getsession = JSON.parse(localStorage.getItem("sevinvoicesession"));
  constructor() {

  }
  public session: BehaviorSubject<any> = new BehaviorSubject<boolean>(false);
  getsession(value) {
    this.session.next(value);
  }

  showNotification(from, align, msg, type) {

    $.notify({
      icon: 'notifications',
      message: msg

    }, {
        type: type,
        timer: 2000,
        placement: {
          from: from,
          align: align
        }
      });
  }

  // appcode = 'vignesshgmailcom'
  // userid = 'users1';
  // logintype = 'superuser';
  //  getapi(value) {
  //      this.apidetail.next(value);
  //  }
  partid: any;
  setpartid(partid) {
    this.partid = partid;
    console.log(this.partid)
  }
  pmpProjectid = null;
  pmpProjectname = null;
  pmppartid = null;
  pmpStatusProjectid = null;
  pmpStatusProjectName=null;
  devstatusmailteam = [];
  devstatuspartid = [];

}
