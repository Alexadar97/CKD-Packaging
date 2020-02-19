import { Component, OnInit,ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { WebService } from '../packservices/webservice';
import { Chart } from 'angular-highcharts';
declare var $;
@Component({
  selector: 'app-detail-report',
  templateUrl: './detail-report.component.html',
  styleUrls: ['./detail-report.component.css']
})
export class DetailReportComponent implements OnInit {
  DropdownDateForm:any;
  xlDownloadForm: any;
  pdfDownloadForm: any;
  currentYear: any;
  currentPage = 1;
  constructor(private http: Http, private ref: ChangeDetectorRef, private getdata: WebService, private Formbuilder: FormBuilder, private router: Router, private makeapi: WebService) {
    this.xlDownloadForm = this.Formbuilder.group({
      daterange: [null, Validators.compose([Validators.required])]
    });
    this.pdfDownloadForm = this.Formbuilder.group({
      week: [null, Validators.compose([Validators.required])],
      year: [null, Validators.compose([Validators.required])]
    });
    this.DropdownDateForm = this.Formbuilder.group({
      week: [null, Validators.compose([Validators.required])],
      year: [null, Validators.compose([Validators.required])]
    });
  }

  public getallpdfapi = this.getdata.appconstant + 'getWeeklyPDF?week=';
  public exportLogApi = this.getdata.appconstant + 'getDatewiseExcel?startDate=';
  public getWeeklyReportapi = this.getdata.appconstant + 'getWeeklySignOffReport';

  supadmin = false;
  userid: any;
  roleid: any;
  updatedby: any;
  minDate = new Date();

  ngOnInit() {
    this.userid = this.getdata.session().id;
    this.roleid = this.getdata.session().roleid;

    if ((this.getdata.session().roleid == 1) || (this.getdata.session().roleid == 0)) {
      this.supadmin = true;
    }
    this.updatedby = this.getdata.session().shortid;


    this.currentDAteForTabel();
    this.getweeklyreport();
    var date = new Date();
    var finaldate = date.getFullYear();
    this.getDropdownWeekAndYear(finaldate);
  }

  weeklyreportDatas = [];
  p1 = 1;
  currentYearTable: any;
  currentWeekTabel: any;
  currentDAteForTabel() {
    var d = new Date();
    this.currentYearTable = d.getFullYear();
    d = new Date(+d);
    d.setHours(0, 0, 0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    // Get first day of year
    var yearStart = new Date(d.getFullYear(), 0, 1);
    // Calculate full weeks to nearest Thursday
    this.currentWeekTabel = Math.ceil((((d.valueOf() - yearStart.valueOf()) / 86400000) + 1) / 7);
    // Return array of year and week number
    var getform = this.DropdownDateForm.value
    getform.year = this.currentYearTable;
    getform.week = this.currentWeekTabel;
    this.DropdownDateForm.patchValue(getform)
  }
  changedate(value, type) {
    if (type == "week") {
      this.currentWeekTabel = value;
      var getform = this.DropdownDateForm.value
      getform.week = this.currentWeekTabel;
      this.DropdownDateForm.patchValue(getform);
      this.getweeklyreport()
    }
    else {
      this.getDropdownWeekAndYear(value);
      this.currentYearTable = value;
      var getform = this.DropdownDateForm.value
      getform.year = this.currentYearTable;
      this.DropdownDateForm.patchValue(getform);
      this.getweeklyreport()
    }
  }
  barchart1: any;
  chartdata = { "supplierCompleted": 0, "MHECompleted": 0, "SMCompleted": 0, "IPLCompleted": 0, "prodCompleted": 0, 'MHEPending': 0, 'SMPending': 0, 'IPLPending': 0, 'prodPending': 0, 'MHERejected': 0, 'SMRejected': 0, 'IPLRejected': 0, 'prodRejected': 0, 'MHEReassigned': 0, 'SMReassigned': 0, 'IPLReassigned': 0, 'prodReassigned': 0 }; getweeklyreport() {
    this.weeklyreportDatas = [];
    var reqdata = 'week=' + this.currentWeekTabel + '&year=' + this.currentYearTable;
    return this.makeapi.method(this.getWeeklyReportapi, reqdata, "post")
      .subscribe(data => {
        this.weeklyreportDatas[0] = data;

        if (data.supplierCompleted == undefined) {
          this.chartdata.supplierCompleted = 0
        }
        else {
          this.chartdata.supplierCompleted = data.supplierCompleted
        }
        if (data.MHECompleted == undefined) {
          this.chartdata.MHECompleted = 0
        }
        else {
          this.chartdata.MHECompleted = data.MHECompleted
        }
        if (data.SMCompleted == undefined) {
          this.chartdata.SMCompleted = 0
        }
        else {
          this.chartdata.SMCompleted = data.SMCompleted
        }
        if (data.IPLCompleted == undefined) {
          this.chartdata.IPLCompleted = 0
        }
        else {
          this.chartdata.IPLCompleted = data.IPLCompleted
        }
        if (data.prodCompleted == undefined) {
          this.chartdata.prodCompleted = 0
        }
        else {
          this.chartdata.prodCompleted = data.prodCompleted
        }
        if (data.MHEPending == undefined) {
          this.chartdata.MHEPending = 0
        }
        else {
          this.chartdata.MHEPending = data.MHEPending
        }
        if (data.SMPending == undefined) {
          this.chartdata.SMPending = 0
        }
        else {
          this.chartdata.SMPending = data.SMPending
        }
        if (data.IPLPending == undefined) {
          this.chartdata.IPLPending = 0
        }
        else {
          this.chartdata.IPLPending = data.IPLPending
        }
        if (data.prodPending == undefined) {
          this.chartdata.prodPending = 0
        }
        else {
          this.chartdata.prodPending = data.prodPending
        }
        if (data.MHERejected == undefined) {
          this.chartdata.MHERejected = 0
        }
        else {
          this.chartdata.MHERejected = data.MHERejected
        }
        if (data.SMRejected == undefined) {
          this.chartdata.SMRejected = 0
        }
        else {
          this.chartdata.SMRejected = data.SMRejected
        }
        if (data.IPLRejected == undefined) {
          this.chartdata.IPLRejected = 0
        }
        else {
          this.chartdata.IPLRejected = data.IPLRejected
        }
        if (data.prodRejected == undefined) {
          this.chartdata.prodRejected = 0
        }
        else {
          this.chartdata.prodRejected = data.prodRejected
        }
        if (data.MHEReassigned == undefined) {
          this.chartdata.MHEReassigned = 0
        }
        else {
          this.chartdata.MHEReassigned = data.MHEReassigned
        }
        if (data.SMReassigned == undefined) {
          this.chartdata.SMReassigned = 0
        }
        else {
          this.chartdata.SMReassigned = data.SMReassigned
        }
        if (data.IPLReassigned == undefined) {
          this.chartdata.IPLReassigned = 0
        }
        else {
          this.chartdata.IPLReassigned = data.IPLReassigned
        }
        if (data.prodReassigned == undefined) {
          this.chartdata.prodReassigned = 0
        }
        else {
          this.chartdata.prodReassigned = data.prodReassigned
        }
        console.log(this.chartdata)
        this.barchart1 = new Chart({
          chart: {
            type: 'column'
          },
          title: {
            text: 'Status Report'
          },
          xAxis: {
            categories: ['Supplier', 'MHE', 'SM', 'IPL', 'PRODUCTION']
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Percentage(%)'
            }
          },
          tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
          },
          plotOptions: {
            column: {
              stacking: 'percent'
            }
          },
          series: [{
            type: 'column',
            name: 'Completed',
            data: [Number(this.chartdata.supplierCompleted), Number(0), Number(0), Number(0), Number(0)]
          }, {
            type: 'column',
            name: 'Approved',
            data: [Number(0), Number(this.chartdata.MHECompleted), Number(this.chartdata.SMCompleted), Number(this.chartdata.IPLCompleted), Number(this.chartdata.prodCompleted)]
          }, {
            type: 'column',
            name: 'Pending',
            data: [Number(0), Number(this.chartdata.MHEPending), Number(this.chartdata.SMPending), Number(this.chartdata.IPLPending), Number(this.chartdata.prodPending)]
          }, {
            type: 'column',
            name: 'Rejected',
            data: [Number(0), Number(this.chartdata.MHERejected), Number(this.chartdata.SMRejected), Number(this.chartdata.IPLRejected), Number(this.chartdata.prodRejected)]
          }, {
            type: 'column',
            name: 'Reassigned',
            data: [Number(0), Number(this.chartdata.MHEReassigned), Number(this.chartdata.SMReassigned), Number(this.chartdata.IPLReassigned), Number(this.chartdata.prodReassigned)]
          }]
        });
      },
        Error => {
        });
  }
  weeks = [];
  years = [];
  weeks2 = [];
  years2 = [];
  getDropdownWeekAndYear(year) {
    if (year / 4 == 0) {
      for (var i = 0; i < 53; i++) {
        this.weeks2[i] = i + 1;
      }
      for (var j = 0; year >= 2018; j++) {
        this.years2[j] = year;
        year--
      }
    }
    else {
      for (var k = 0; k < 52; k++) {
        this.weeks2[k] = k + 1;
      }
      for (var l = 0; year >= 2018; l++) {
        this.years2[l] = year;
        year--;
      }
    }
  }
  AllpdfId: any;
  getAllpdfId() {
    this.makeapi.week = this.DropdownDateForm.value.week;
    this.makeapi.year = this.DropdownDateForm.value.year;
    return this.makeapi.method(this.getallpdfapi + this.DropdownDateForm.value.week + '&year=' + this.DropdownDateForm.value.year, '', "JWT_ALLPDF")
    .subscribe(res => {
      $("#pdfdownload").modal('hide');
      var url = window.URL.createObjectURL(res.data);
      var a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = res.filename;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove(); // remove the element
    },
      Error => {
      });
    
  }

  name: any;
  download() {
    this.xlDownloadForm.reset()
    $("#xldownload").modal('show');
  }
  confirmXlDownload() {
    console.log(this.xlDownloadForm.invalid)
    if (this.xlDownloadForm.invalid == true) {
      this.markFormGroupTouched(this.xlDownloadForm);
    }
    else {
      $("#xldownload").modal('hide');
      var date1 = (this.xlDownloadForm.value.daterange[0].toISOString().slice(0, 10))
      date1 = date1.split("-");
      var finaldate1 = ((Number(date1[2])) + "/" + (date1[1]) + '/' + (date1[0])).toString();
      var date2 = (this.xlDownloadForm.value.daterange[1].toISOString().slice(0, 10))
      date2 = date2.split("-");
      var finaldate2 = ((Number(date2[2])) + "/" + (date2[1]) + '/' + (date2[0])).toString();
      console.log(finaldate1 + finaldate2);
      console.log(this.exportLogApi + finaldate1 + '&endDate=' + finaldate2)
      return this.makeapi.method(this.exportLogApi + finaldate1 + '&endDate=' + finaldate2, '', "JWTExcel2")
        .subscribe(res => {
          var url = window.URL.createObjectURL(res.data);
          var a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display: none');
          a.href = url;
          a.download = res.filename;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
        },
          Error => {
          });
    }

  }

  ConfirmdownloadPDF() {
    if (this.pdfDownloadForm.invalid == true) {
      this.markFormGroupTouched(this.pdfDownloadForm);
    }
    else {
      this.makeapi.week = this.pdfDownloadForm.value.week;
      this.makeapi.year = this.pdfDownloadForm.value.year;
      console.log(this.getallpdfapi + this.pdfDownloadForm.value.week + '&year=' + this.pdfDownloadForm.value.year);
      return this.makeapi.method(this.getallpdfapi + this.pdfDownloadForm.value.week + '&year=' + this.pdfDownloadForm.value.year, '', "JWT_ALLPDF")
        .subscribe(res => {
          $("#pdfdownload").modal('hide');
          var url = window.URL.createObjectURL(res.data);
          var a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display: none');
          a.href = url;
          a.download = res.filename;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove(); // remove the element
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





}


