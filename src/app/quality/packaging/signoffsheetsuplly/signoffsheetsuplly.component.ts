
import { AuthGuard } from '../packservices/canactivate.service';
import { Component, OnInit, Pipe, PipeTransform, ChangeDetectorRef, ViewChild } from '@angular/core';
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
import { debug } from 'util';
declare var $;
// import { AuthGuard } from '../packservices/canactivate.service';
@Component({
  selector: 'app-signoffsheetsuplly',
  templateUrl: './signoffsheetsuplly.component.html',
  styleUrls: ['./signoffsheetsuplly.component.css']
})
export class SignoffsheetsupllyComponent implements OnInit {

  assets1 = "assets/img/plus.jpg";
  assets2 = "assets/img/plus.jpg";
  assets3 = "assets/img/plus.jpg";
  assets4 = "assets/img/plus.jpg";
  assets5 = "assets/img/plus.jpg";
  assets6 = "assets/img/plus.jpg";
  show1 = "notshow";
  show2 = "notshow";
  show3 = "notshow";
  show4 = "notshow";
  show5 = "notshow";
  show6 = "notshow";
  file: any;
  bsValue = new Date();
  emailvalidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+")){2,}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  numbervalidation = /^[0-9]+$/;
  alphaWithoutSpace = /^[a-zA-Z]+$/;
  alphanumeric = /^[a-zA-Z0-9]+$/;
  alphanumericDecimal = /^[a-zA-Z0-9.]+$/;
  decimalnumber = /^(0|[0-9]\d*)(\.\d+)?$/;
  alphawithdot = /^[a-zA-Z. ]+$/;
  alpha = /^[A-Za-z\d\s]+$/;
  passwordvalidation = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  contactnmber = /^[0-9\-+()]+$/
  loadTextboxVal: any;
  showLoad = true;
  myForm: any;
  signOffSheetForm: any;
  conformpartno: any;
  conformpartdisc: any;
  conformSupplier: any;
  conformvendorcode: any;
  conformShopLocation: any;
  conformGLT: any;
  partoverview:any;
  conformvarient: any;
  conformPartLength: any;
  conformPartwidth: any;
  conformPartHeight: any;
  conformPackagingLength: any;
  conformPackagingwidth: any;
  conformPackagingHeight: any;
  QuantityPrimary: any;
  QuantitySecondary: any;
  AmortizationPeriod: any;
  updatedby: any;
  signoffsubmitedid: any;
  signOffuploadForm: any;
  signoffApprovereqdata: any
  signoffpendingreqdata: any;
  loadForm: any;

  packdatalists = [];
  suppdatalists = [];
  imagearray = []; // imagearray

  errorimage1 = " Part Image is required ";
  errorimage2 = "";
  errorimage3 = "";
  errorimage4 = "";
  errorimage5 = "Packaging with DICV Label is required";
  errorimage6 = " Final Packaging Image is required ";
  assets = "assets/img/plus.jpg";
  filename1: any;
  finallfile1: any;
  filename2: any;
  finallfile2: any;
  filename3: any;
  finallfile3: any;
  filename4: any;
  finallfile4: any;
  filename5: any;
  finallfile5: any;
  filename6: any;
  finallfile6: any;
 

  vcispecError = "";
  naspecError = "";
  rpoilspecError = "";
  naspecdisplay = "notshow";
  rpoilspecdisplay = "notshow"
  vcispecdisplay = "notshow";

  addrowbtbdisable = 'true';

  @ViewChild('file1') fileupload: any;
  @ViewChild('image1') imageupload1: any;
  @ViewChild('image2') imageupload2: any;
  @ViewChild('image3') imageupload3: any;
  @ViewChild('image4') imageupload4: any;
  @ViewChild('image5') imageupload5: any;
  @ViewChild('image6') imageupload6: any;
  private searchPartDataapi = this.getdata.appconstantdisc + 'searchPartData';
  private searchSuppDataapi = this.getdata.appconstantdisc + 'searchSupplier';
  private packagingapi = this.getdata.appconstant + 'packaging';
  private signoffapi = this.getdata.appconstant + 'signoff';
  private uploadsignoff = this.getdata.appconstant + 'uploadFile';
  private uploadImageapi = this.getdata.appconstant + 'uploadImage';
  private loadapi = this.getdata.appconstant + 'load';
  private validateExcelApi = this.getdata.appconstant + 'validateExcel';
  private uploadFileApi = this.getdata.appconstant + 'uploadFile';

  constructor(private http: Http, private ref: ChangeDetectorRef,private AuthGuard:AuthGuard, private getdata: WebService, private Formbuilder: FormBuilder, private router: Router, private makeapi: WebService, ) {
    this.signOffSheetForm = this.Formbuilder.group({
      partDetails: this.Formbuilder.group({
        partnumber: [null, Validators.compose([Validators.required, Validators.pattern(this.alphanumeric), Validators.maxLength(50)])],
        partname: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
        plantcode: ['6365', Validators.compose([Validators.required, Validators.pattern(this.alphanumeric), Validators.minLength(1), Validators.maxLength(50)])],
        plantname: ['DICV', Validators.compose([Validators.required, Validators.pattern(this.alpha), Validators.minLength(3), Validators.maxLength(50)])],
        email: [null, Validators.compose([Validators.required, Validators.pattern(this.emailvalidation), Validators.minLength(1), Validators.maxLength(100)])],
        contact: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(50)])],
        suppliername: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
        suppliercode: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
        buyername: [null, Validators.compose([Validators.required, Validators.pattern(this.alphawithdot), Validators.minLength(3), Validators.maxLength(50)])],
        partlength: [null, Validators.compose([Validators.required, Validators.pattern(this.alphanumericDecimal), Validators.minLength(1), Validators.maxLength(20)])],
        partwidth: [null, Validators.compose([Validators.required, Validators.pattern(this.alphanumericDecimal), Validators.minLength(1), Validators.maxLength(20)])],
        partheight: [null, Validators.compose([Validators.required, Validators.pattern(this.alphanumericDecimal), Validators.minLength(1), Validators.maxLength(20)])],
        partdia: [null, Validators.compose([Validators.pattern(this.alphanumericDecimal), Validators.minLength(1), Validators.maxLength(20)])],
        partweight: [null, Validators.compose([Validators.required, Validators.pattern(this.alphanumericDecimal), Validators.minLength(1), Validators.maxLength(20)])],
        usagepervehicle: [null, Validators.compose([Validators.required, Validators.pattern(this.alphanumericDecimal), Validators.minLength(1), Validators.maxLength(20)])],
      }),
      partoverview:this.Formbuilder.group({
        Partnumber:[null, Validators.compose([Validators.required])],
        Partname:[null, Validators.compose([Validators.required])],
        Variant:[null, Validators.compose([Validators.required])],
        consumptionplantcode:[null, Validators.compose([Validators.required])],
        Plantname:[null, Validators.compose([Validators.required])],
        Buyername:[null, Validators.compose([Validators.required])],
        Contactno:[null, Validators.compose([Validators.required])],
        mail:[null, Validators.compose([Validators.required])],
     }),
     partdesc:this.Formbuilder.group({
      partweight:[null, Validators.compose([Validators.required])],
      partcategory:[null, Validators.compose([Validators.required])],
      Length:[null, Validators.compose([Validators.required])],
      Width:[null, Validators.compose([Validators.required])],
      Height:[null, Validators.compose([Validators.required])],
      Diameter:[null, Validators.compose([Validators.required])],
     }),
     packageconstruction:this.Formbuilder.group({
      image1:[null, Validators.compose([Validators.required])],
      image2:[null, Validators.compose([Validators.required])],
      image3:[null, Validators.compose([Validators.required])],
      image4:[null, Validators.compose([Validators.required])],
     }),
      supplierDetails: this.Formbuilder.group({
        suppliercode: [null, Validators.compose([Validators.required, Validators.pattern(this.alphanumeric), Validators.maxLength(50)])],
        suppliername: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
        variant: [null, Validators.compose([Validators.required, Validators.pattern(this.alpha), Validators.minLength(3), Validators.maxLength(50)])],
        address: [null, Validators.compose([Validators.required, Validators.maxLength(250)])],
        email: [null, Validators.compose([Validators.required, Validators.pattern(this.emailvalidation), Validators.minLength(1), Validators.maxLength(100)])],
        contactperson: [null, Validators.compose([Validators.required, Validators.pattern(this.alphawithdot), Validators.minLength(3), Validators.maxLength(50)])],
        phonenumber: [null, Validators.compose([Validators.pattern(this.contactnmber), Validators.minLength(8), Validators.maxLength(50)])],
        fax: [null, Validators.compose([Validators.pattern(this.numbervalidation), Validators.maxLength(20)])],
        region: ['Select', Validators.compose([Validators.required,])],
      }),
      primaryPackaging: this.Formbuilder.group({
        packagingtype: ["Select", Validators.compose([Validators.required,])],
        packagingcode: [null, Validators.compose([Validators.required, Validators.pattern(this.alphanumeric), Validators.minLength(1), Validators.maxLength(50)])],
        collapsibleheight: [null, Validators.compose([Validators.pattern(this.decimalnumber), Validators.minLength(1), Validators.maxLength(20)])],
        piecespercontainer: [null, Validators.compose([Validators.required, Validators.pattern(this.decimalnumber), Validators.minLength(1), Validators.maxLength(20)])],
        packlength: [null, Validators.compose([Validators.required, Validators.pattern(this.alphanumericDecimal), Validators.minLength(1), Validators.maxLength(20)])],
        packwidth: [null, Validators.compose([Validators.required, Validators.pattern(this.alphanumericDecimal), Validators.minLength(1), Validators.maxLength(20)])],
        packheight: [null, Validators.compose([Validators.required, Validators.pattern(this.alphanumericDecimal), Validators.minLength(1), Validators.maxLength(20)])],
        tareweight: [null, Validators.compose([Validators.required, Validators.pattern(this.alphanumericDecimal), Validators.minLength(1), Validators.maxLength(20)])],
        dicvPack: ['yes'],
      }),
      secondaryPackaging: this.Formbuilder.group({
        boxesperlayer: [null, Validators.compose([Validators.pattern(this.decimalnumber), Validators.minLength(1), Validators.maxLength(20)])],
        loadquantity: [null, Validators.compose([Validators.pattern(this.decimalnumber), Validators.minLength(1), Validators.maxLength(20)])],
        nooflayers: [null, Validators.compose([Validators.pattern(this.decimalnumber), Validators.minLength(1), Validators.maxLength(20)])],
        noofboxes: [null, Validators.compose([Validators.pattern(this.decimalnumber), Validators.minLength(1), Validators.maxLength(20)])],
        noofcontainers: [null, Validators.compose([Validators.pattern(this.decimalnumber)])],
        packlength: [null, Validators.compose([Validators.pattern(this.alphanumericDecimal), Validators.minLength(1), Validators.maxLength(20)])],
        packwidth: [null, Validators.compose([Validators.pattern(this.alphanumericDecimal), Validators.minLength(1), Validators.maxLength(20)])],
        packheight: [null, Validators.compose([Validators.pattern(this.alphanumericDecimal), Validators.minLength(1), Validators.maxLength(20)])],
        tareweight: [null, Validators.compose([Validators.pattern(this.decimalnumber), Validators.minLength(1), Validators.maxLength(20)])],
        grossweight: [null, Validators.compose([Validators.pattern(this.decimalnumber), Validators.minLength(1), Validators.maxLength(20)])],
        perdayprodvol: [null, Validators.compose([Validators.pattern(this.decimalnumber), Validators.minLength(1), Validators.maxLength(20)])],
        inventory: [null, Validators.compose([Validators.required, Validators.pattern(this.decimalnumber), Validators.minLength(1), Validators.maxLength(20)])],
        supplyfrequency: [null, Validators.compose([Validators.pattern(this.alphanumericDecimal), Validators.minLength(1), Validators.maxLength(20)])],
      }),
      packagingDetails: this.Formbuilder.group({
        rpoil: [false,],
        vci: [false],
        cpna: [false,],
        rpoilspec: [null, ([Validators.pattern(this.alpha), Validators.maxLength(200)])],
        ppd: [null, ([Validators.pattern(this.alpha), Validators.maxLength(200)])],
        vcispec: ["", ([Validators.pattern(this.alpha), Validators.maxLength(200)])],
        nareason: ["", ([Validators.pattern(this.alpha), Validators.minLength(2), Validators.maxLength(200)])],
        twowaypallet: [true],
        fourwaypallet: [false,],
        heattreated: [false,],
        fumigated: [false,],
        forklift: [true,],
        manual: [false,],
        handleOther: [false,],
        handleReason: ['', ([Validators.pattern(this.alpha), Validators.minLength(2), Validators.maxLength(50)])],
        tempStorageSpec: [true],
        shelflife: ['', ([Validators.pattern(this.alphanumeric), Validators.minLength(1), Validators.maxLength(3)])]
      }),
    });

    this.signOffuploadForm = this.Formbuilder.group({
      partnumber: [null, Validators.compose([Validators.required, Validators.pattern(this.alphanumeric), Validators.maxLength(50)])],
      partname: [null, Validators.compose([Validators.required, Validators.pattern(this.alpha), Validators.minLength(3), Validators.maxLength(50)])],
      suppliercode: [null, Validators.compose([Validators.required, Validators.pattern(this.alphanumeric), Validators.maxLength(50)])],
      suppliername: [null, Validators.compose([Validators.required, Validators.pattern(this.alpha), Validators.minLength(3), Validators.maxLength(50)])],

    });

    this.loadForm = this.Formbuilder.group({
      refno: [null, Validators.compose([Validators.pattern(this.numbervalidation)])],
    });

   

  }

  ngOnInit() {
  }
   initiate(){
    if (this.signOffSheetForm.invalid) {
      this.markFormGroupTouched(this.signOffSheetForm);
      $.notify("Mandatory Field is required!!!", "error");
      return false;
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