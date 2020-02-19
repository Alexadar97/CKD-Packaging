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
import { AuthGuard } from '../packservices/canactivate.service';


declare var $;

@Component({
  selector: 'app-signoffsheet',
  templateUrl: './signoffsheet.component.html',
  styleUrls: ['./signoffsheet.component.css']
})
export class SignoffsheetComponent implements OnInit {

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

  constructor(private http: Http, private ref: ChangeDetectorRef,private AuthGuard:AuthGuard ,  private getdata: WebService, private Formbuilder: FormBuilder, private router: Router, private makeapi: WebService, ) {
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

    this.signoffform();

  }

  ngOnInit() {
  //  this.signoffsheet = this.DataService.signoffsheet
   console.log(this.makeapi.session());
   console.log(this.AuthGuard.session())
    // console.log(typeof (this.getdata.session().id))
    // $('#fromdate').datetimepicker({
    //   format: 'DD/MM/YYYY',
    //   defaultDate: new Date(),
    //   useCurrent: true
    // });

    // $('[data-toggle="tooltip"]').tooltip();

    // document.getElementById('modeofhandling').setAttribute("disabled", "disabled");

    this.updatedby = this.getdata.session().shortid;

    
  }
  
  packmasterid: any;

  partdata(keyvalue) {
    if (this.packdatalists.indexOf(keyvalue) != -1) {
      var finalreqdata = this.getdata.appconstantdisc + " `/" + keyvalue
      return this.makeapi.method(finalreqdata, '', "get")
        .subscribe(data => {
          this.packmasterid = data.id
          var finalreqdata = this.getdata.appconstantdisc + "partMapping/" + this.packmasterid
          return this.makeapi.method(finalreqdata, '', "get")
            .subscribe(data => {
              if (data.supplierCodes != null) {
                this.suppdatalists = data.supplierCodes;
              }
              else if (data.suppMasterList != null) {
                var getform = this.signOffSheetForm.value
                this.signOffSheetForm.value.supplierDetails.suppliercode = data.suppMasterList[0].code;
                getform.supplierDetails.suppliername = data.suppMasterList[0].name;
                getform.supplierDetails.variant = data.suppMasterList[0].variant;
                getform.supplierDetails.address = data.suppMasterList[0].address;
                getform.supplierDetails.email = data.suppMasterList[0].email;
                getform.supplierDetails.contactperson = data.suppMasterList[0].contactperson;
                getform.supplierDetails.phonenumber = data.suppMasterList[0].phonenumber;
                getform.supplierDetails.fax = data.suppMasterList[0].fax;
                this.signOffSheetForm.patchValue(getform)
              }
              var getform = this.signOffSheetForm.value
              getform.partDetails.partname = data.partMaster.partName;
              getform.partDetails.partnumber = data.partMaster.partNumber;
             getform.partDetails.plantcode = data.partMaster.plantCode;
              getform.partDetails.plantname = data.partMaster.plantName;
              getform.partDetails.id = data.partMaster.id;
              getform.partDetails.email = data.partMaster.email;
              getform.partDetails.contact = data.partMaster.contact;
              getform.partDetails.buyername = data.partMaster.buyername;
              this.signOffSheetForm.patchValue(getform);
            },
              Error => {
              });
        },
          Error => {
          });
    }
    else {
      let reqdata = "partnumber=" + keyvalue
      return this.makeapi.method(this.searchPartDataapi, reqdata, "post")
        .subscribe(data => {
          this.packdatalists = data;
        },
          Error => {
          });
    }
  }

  supplierdata(keyvalue) {
    if (this.suppdatalists.indexOf(keyvalue) != -1) {
      var finalreqdata = this.getdata.appconstantdisc + "supp/" + keyvalue
      return this.makeapi.method(finalreqdata, '', "get")
        .subscribe(data => {
          var getform = this.signOffSheetForm.value
          this.signOffSheetForm.value.supplierDetails.suppliercode = data.code;
          getform.supplierDetails.suppliername = data.name;
          getform.supplierDetails.variant = data.variant;
          getform.supplierDetails.address = data.address;
          getform.supplierDetails.email = data.email;
          getform.supplierDetails.contactperson = data.contactperson;
          getform.supplierDetails.phonenumber = data.phonenumber;
          getform.supplierDetails.fax = data.fax;
          this.signOffSheetForm.patchValue(getform)
        },
          Error => {
          });
    }
    else {
      var reqdata = "&suppliercode=" + keyvalue
      return this.makeapi.method(this.searchSuppDataapi, reqdata, "post")
        .subscribe(data => {
          for (var i = 0; i < data.length; i++) {
            this.suppdatalists[i] = data[i].code;
          }
        },
          Error => {
          });
    }

  }

  Displayload(event) {
    if (event == true) {
      this.showLoad = true;
    }
    else {
      this.showLoad = false;
      this.uploadtab()
    }
  }

  changeimageevent1: any;
  changeimageevent2: any;
  changeimageevent3: any;
  changeimageevent4: any;
  changeimageevent5: any;
  changeimageevent6: any;
 
 
  closeimage(e) {
  
    if (e == 1) {
      this.assets1 = "assets/img/plus.jpg";
      this.changeimageevent1 = 'closed';
      this.imageupload1.nativeElement.value = "";
      this.errorimage1 = " Part Image is required ";
      $("#partimage").attr("src", "assets/img/plus.jpg");
      $("#imgid1").attr("src", "assets/img/plus.jpg");

      this.show1 = "notshow";
    }
    else if (e == 2) {
      this.assets2 = "assets/img/plus.jpg";
      this.changeimageevent2 = 'closed';
      this.imageupload2.nativeElement.value = "";
      $("#imgid2").attr("src", "assets/img/plus.jpg");

      this.show2 = "notshow";
    }
    else if (e == 3) {
      this.assets3 = "assets/img/plus.jpg";
      this.changeimageevent3 = 'closed';
      this.imageupload3.nativeElement.value = "";
      $("#imgid3").attr("src", "assets/img/plus.jpg");

      this.show3 = "notshow";
    }
    else if (e == 4) {
      this.assets4 = "assets/img/plus.jpg";
      this.changeimageevent4 = 'closed';
      this.imageupload4.nativeElement.value = "";
      $("#imgid4").attr("src", "assets/img/plus.jpg");

      this.show4 = "notshow";
    }
    else if (e == 5) {
      this.assets5 = "assets/img/plus.jpg";
      this.changeimageevent5 = 'closed';
      this.imageupload5.nativeElement.value = "";
      $("#imgid5").attr("src", "assets/img/plus.jpg");

      this.errorimage5 = "Packaging with DICV Label is required ";
      this.show5 = "notshow";
    }
    else if (e == 6) {
      this.assets6 = "assets/img/plus.jpg";
      this.changeimageevent6 = 'closed';
      this.imageupload6.nativeElement.value = "";
      $("#imgid6").attr("src", "assets/img/plus.jpg");

      this.errorimage6 = " Final Packaging Image is required ";
      this.show6 = "notshow";
    }
  }


  changeimage(event, image) {

    if (event.target.files[0].size > 10000000) {
      this.getdata.showNotification('bottom', 'right', 'File size must be less than 10 MB !!', "danger");
      return false;
    }
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        if (image == 1) {
          this.changeimageevent1 = true;
          var from = (event.target.result).split(",");
          this.assets1 = 'data:image/png;base64,' + from[1]
        }
        else if (image == 2) {
          this.changeimageevent2 = true;
          var from = (event.target.result).split(",");
          this.assets2 = 'data:image/png;base64,' + from[1]
        }
        else if (image == 3) {
          this.changeimageevent3 = true;
          var from = (event.target.result).split(",");
          this.assets3 = 'data:image/png;base64,' + from[1]
        }
        else if (image == 4) {
          this.changeimageevent4 = true;
          var from = (event.target.result).split(",");
          this.assets4 = 'data:image/png;base64,' + from[1]
        }
        else if (image == 5) {
          this.changeimageevent5 = true;
          var from = (event.target.result).split(",");
          this.assets5 = 'data:image/png;base64,' + from[1]
        }
        else if (image == 6) {
          this.changeimageevent6 = true;
          var from = (event.target.result).split(",");
          this.assets6 = 'data:image/png;base64,' + from[1]
        }
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      var file: File = fileList[0];
      if (image == 1) {
        this.filename1 = file.name;
        this.finallfile1 = file;
        this.errorimage1 = "";
        this.show1 = "show";
      }
      else if (image == 2) {
        this.filename2 = file.name;
        this.finallfile2 = file;
        this.errorimage2 = "";
        this.show2 = "show";
      }
      else if (image == 3) {
        this.filename3 = file.name;
        this.finallfile3 = file;
        this.errorimage3 = "";
        this.show3 = "show";
      }
      else if (image == 4) {
        this.filename4 = file.name;
        this.finallfile4 = file;
        this.errorimage4 = "";
        this.show4 = "show";
      }
      else if (image == 5) {
        this.filename5 = file.name;
        this.finallfile5 = file;
        this.errorimage5 = "";
        this.show5 = "show";
      }
      else if (image == 6) {
        this.filename6 = file.name;
        this.finallfile6 = file;
        this.errorimage6 = "";
        this.show6 = "show";
      }

    }
    
  }
  pallet(pallet) {
    if (pallet == "Two way Pallet") {
      var getform = this.signOffSheetForm.value
      getform.packagingDetails.twowaypallet = true;
      getform.packagingDetails.fourwaypallet = false;
      this.signOffSheetForm.patchValue(getform);
    }
    else {
      var getform = this.signOffSheetForm.value
      getform.packagingDetails.fourwaypallet = true;
      getform.packagingDetails.twowaypallet = false;
      this.signOffSheetForm.patchValue(getform);
    }
  }

  confirm() {
    this.conformpartno = this.signOffSheetForm.value.partDetails.partnumber
    this.conformpartdisc = this.signOffSheetForm.value.partDetails.plantcode
    this.conformSupplier = this.signOffSheetForm.value.supplierDetails.suppliername
    this.conformvendorcode = this.signOffSheetForm.value.supplierDetails.suppliercode
    this.conformShopLocation = this.signOffSheetForm.value.supplierDetails.address
    this.conformGLT = this.signOffSheetForm.value.supplierDetails.suppliercode
    this.conformvarient = this.signOffSheetForm.value.supplierDetails.variant
    this.conformPartLength = this.signOffSheetForm.value.partDetails.partlength
    this.conformPartwidth = this.signOffSheetForm.value.partDetails.partwidth
    this.conformPartHeight = this.signOffSheetForm.value.partDetails.partheight
    this.conformPackagingLength = this.signOffSheetForm.value.secondaryPackaging.packlength
    this.conformPackagingwidth = this.signOffSheetForm.value.secondaryPackaging.packwidth
    this.conformPackagingHeight = this.signOffSheetForm.value.secondaryPackaging.packheight
    this.QuantityPrimary = this.signOffSheetForm.value.partDetails.plantcode
    this.QuantitySecondary = this.signOffSheetForm.value.partDetails.plantcode
    this.AmortizationPeriod = this.signOffSheetForm.value.partDetails.plantcode
    $('#confirm').modal("show");
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
  handleOther: any;
  moh: any;
  npcm: any;
  handleReason: any;

  viewreport() {
    if (this.signOffSheetForm.value.primaryPackaging.packagingtype == "Select") {
      this.getdata.showNotification('bottom', 'right', 'Packaging Type is required', "danger");
    }
    this.modaldata = this.signOffSheetForm.value;
    this.moh = "false";
    this.npcm = "false"
    this.rpoil = this.modaldata.packagingDetails.rpoil;
    this.vci = this.modaldata.packagingDetails.vci;
    this.cpna = this.modaldata.packagingDetails.cpna;

    this.twowaypallet = this.modaldata.packagingDetails.twowaypallet
    this.fourwaypallet = this.modaldata.packagingDetails.fourwaypallet
    this.heattreated = this.modaldata.packagingDetails.heattreated
    this.fumigated = this.modaldata.packagingDetails.fumigated
    this.forklift = this.modaldata.packagingDetails.forklift
    this.manual = this.modaldata.packagingDetails.manual
    this.handleOther = this.modaldata.packagingDetails.handleOther
    this.handleReason = this.modaldata.packagingDetails.handleReason
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
  }

  cancel() {
    this.getdata.showNotification('bottom', 'right', 'File upload canceled successfully!!', "danger");
    $('#Reject').modal("hide");
    this.refresh();
  }



  shelllifecheck(e) {
    
    if (e == true) {
      $("#shelllife").removeClass("clicked");
      $('#shelllife').removeAttr("disabled", "disabled");
      $('#shell1').removeClass('disableNgStyle');
      $('#shelllife').removeClass('disableNgStyle');
    }
    else {
      var getform = this.signOffSheetForm.value
      getform.packagingDetails.shellLife = '';
      this.signOffSheetForm.patchValue(getform);
      $("#shelllife").addClass("clicked");
      document.getElementById('shelllife').setAttribute("disabled", "disabled");
      $('#shell1').addClass('disableNgStyle');
      $('#shelllife').addClass('disableNgStyle');
    }
  }

  mohradio(e) {
    if (e == "forklift") {
      this.modeofhandling(false);
      var getform = this.signOffSheetForm.value
      getform.packagingDetails.forklift = true;
      getform.packagingDetails.manual = false;
      getform.packagingDetails.handleOther = false;

      this.signOffSheetForm.patchValue(getform);
    }
    else if (e == "manual") {
      this.modeofhandling(false);
      var getform = this.signOffSheetForm.value
      getform.packagingDetails.forklift = false;
      getform.packagingDetails.manual = true;
      getform.packagingDetails.handleOther = false;
      this.signOffSheetForm.patchValue(getform);
    }
    else if (e == "handleOther") {
      var getform = this.signOffSheetForm.value
      getform.packagingDetails.forklift = false;
      getform.packagingDetails.manual = false;
      getform.packagingDetails.handleOther = true;
      this.signOffSheetForm.patchValue(getform);
    }
  }

  modeofhandling(e) {
    if (e == true) {
      $("#modeofhandling").removeClass("clicked");
      $('#modeofhandling').removeAttr("disabled", "disabled");
    }
    else {
      var getform = this.signOffSheetForm.value
      getform.packagingDetails.handleReason = '';
      this.signOffSheetForm.patchValue(getform);
      $("#modeofhandling").addClass("clicked");
      document.getElementById('modeofhandling').setAttribute("disabled", "disabled");

    }
  }



  checkspeck(e, value) {
    if (e == true && value == 'rpoilspec') {
      this.rpoilspecdisplay = "show";
      this.rpoilspecError = "Rust Prevention Oil is required";
      $('#palrpi').removeClass('disableNgStyle');
      $('#palvci').removeClass('disableNgStyle');
    }
    else if (e == true && value == 'vcispec') {
      this.vcispecdisplay = "show";
      this.vcispecError = "VCI is required";
      $('#palrpi').removeClass('disableNgStyle');
      $('#palvci').removeClass('disableNgStyle');
    }
    else if (e == true && value == 'naspec') {
      $('#palrpi').addClass('disableNgStyle');
      $('#palvci').addClass('disableNgStyle');
      var getform = this.signOffSheetForm.value
      getform.packagingDetails.rpoil = false;
      this.signOffSheetForm.patchValue(getform);
      var getform = this.signOffSheetForm.value
      getform.packagingDetails.vci = false;
      this.signOffSheetForm.patchValue(getform);

      this.naspecdisplay = "show";
      this.naspecError = "NA reason is  required";

      $("#nopointer").addClass("nopointer");
      $("#nopointer1").addClass("nopointer");
      document.getElementById('vci').setAttribute("disabled", "disabled");
      document.getElementById('rpoil').setAttribute("disabled", "disabled");

      this.rpoilspecdisplay = "notshow";
      this.rpoilspecError = "";
      var getform = this.signOffSheetForm.value
      getform.packagingDetails.rpoilspec = '';
      this.signOffSheetForm.patchValue(getform);

      this.vcispecdisplay = "notshow";
      this.vcispecError = "";
      var getform = this.signOffSheetForm.value
      getform.packagingDetails.vcispec = '';
      this.signOffSheetForm.patchValue(getform)
    }
    else if (e == false && value == 'rpoilspec') {
      this.rpoilspecdisplay = "notshow";
      this.rpoilspecError = "";
      var getform = this.signOffSheetForm.value
      getform.packagingDetails.rpoilspec = '';
      this.signOffSheetForm.patchValue(getform)
    }
    else if (e == false && value == 'vcispec') {
      this.vcispecdisplay = "notshow";
      this.vcispecError = "";
      var getform = this.signOffSheetForm.value
      getform.packagingDetails.vcispec = '';
      this.signOffSheetForm.patchValue(getform)
    }
    else if (e == false && value == 'naspec') {
      $("#nopointer").removeClass("nopointer");
      $("#nopointer1").removeClass("nopointer");
      $('#vci').removeAttr("disabled", "disabled");
      $('#rpoil').removeAttr("disabled", "disabled");
      $('#palrpi').removeClass('disableNgStyle');
      $('#palvci').removeClass('disableNgStyle');
      this.naspecdisplay = "notshow";
      this.naspecError = "";
      var getform = this.signOffSheetForm.value
      getform.packagingDetails.naspec = '';
      this.signOffSheetForm.patchValue(getform)
    }
  }
  inputSepc(e, spec) {
    var getform = this.signOffSheetForm.value;
    if (spec == 'rpoil') {
      if (e.target.value.length == 0) {
        this.rpoilspecError = "Rust Prevention Oil is required"
        $('#rpoiltext').addClass('error');
      }
      else {
        this.rpoilspecError = "";
        $('#rpoiltext').removeClass('error');
      }
    }
    else if (spec == 'vcispec') {
      if (e.target.value.length == 0) {
        this.vcispecError = "VCI is required"
        $('#vcispectext').addClass('error');
      }
      else {
        this.vcispecError = "";
        $('#vcispectext').removeClass('error')
      }
    }
    else if (spec == 'naspec') {
      if (e.target.value.length == 0) {
        this.naspecError = "NA Reasons is required"
        $('#naspectext').addClass('error');
      }
      else {
        this.naspecError = "";
        $('#naspectext').removeClass('error');
      }
    }
  }

  signofsheetsubmit() {
    document.getElementById('signofsheetsDisable').setAttribute("disabled", "disabled");
    var getform = this.signOffSheetForm.value;
    if (this.loadcount == 1) {

      if (this.changeimageevent1 == false) {
        getform["partimage"] = this.loadDataresponse.partimage;
      }
      if (this.changeimageevent2 == false) {
        getform["icimage1"] = this.loadDataresponse.icimage1;
      }
      if (this.changeimageevent3 == false) {
        getform["icimage2"] = this.loadDataresponse.icimage1;
      }
      if (this.changeimageevent4 == false) {
        getform["srpimage"] = this.loadDataresponse.srpimage;
      }
      if (this.changeimageevent5 == false) {
        getform["otherimage"] = this.loadDataresponse.otherimage;
      }
      if (this.changeimageevent6 == false) {
        getform["fpimage"] = this.loadDataresponse.fpimage;
      }
    }
    // getform["userid"] = this.getdata.session().id;
    var reqdata = getform;
    this.getdata.method(this.packagingapi, JSON.stringify(reqdata), 'postjson')
      .subscribe(data => {
        this.loadForm.reset()
        $('#modalView').modal("hide");
        this.signoffsubmitedid = data.id;

        this.signoffApprovereqdata = JSON.stringify({ "packsignoffid": this.signoffsubmitedid, "teamname": "supplier", "status": "completed", "updatedby": this.updatedby });

        this.signoffpendingreqdata = JSON.stringify({ "packsignoffid": this.signoffsubmitedid, "teamname": "MHE", "status": "pending" });

        this.signoffApprove(this.signoffApprovereqdata);

        if (this.changeimageevent1 == true) {
          this.signofsheetimageupload(this.finallfile1, 'partimage')
        }
        if (this.changeimageevent2 == true) {
          this.signofsheetimageupload(this.finallfile2, 'icimage1')
        }
        if (this.changeimageevent3 == true) {
          this.signofsheetimageupload(this.finallfile3, 'icimage2')
        }
        if (this.changeimageevent4 == true) {
          this.signofsheetimageupload(this.finallfile4, 'srpimage')
        }
        if (this.changeimageevent5 == true) {
          this.signofsheetimageupload(this.finallfile5, 'otherimage')
        }
        if (this.changeimageevent6 == true) {
          this.signofsheetimageupload(this.finallfile6, 'fpimage')
        }

        document.getElementById('signofsheetsDisable').removeAttribute("disabled");
        this.getdata.showNotification('bottom', 'right', 'Form successfully saved with Doc Ref No:' + this.signoffsubmitedid, "success");

        this.refresh();



      },
        Error => {
        });

  }



  signofsheetimageupload(finallfile, image) {
    let finalformdata: FormData = new FormData();
    finalformdata.append("file", finallfile);
    finalformdata.append("filename", image);
    finalformdata.append("packmasterid", this.signoffsubmitedid);
    this.getdata.method(this.uploadImageapi, finalformdata, 'file')
      .subscribe(
        data => {
        },
        Error => {
        });
  }

  approvemodalshow() {
    // if (!this.signOffSheetForm.valid) {
    //   this.markFormGroupTouched(this.signOffSheetForm);
    //   this.getdata.showNotification('bottom', 'right', 'Some Mandatory fields are  missing .Please fill all the fields.', "danger");
    //   return false;
    // }
    // if (this.signOffSheetForm.value.packagingDetails.cpna == true && this.naspecError != '') {
    //   this.getdata.showNotification('bottom', 'right', 'In CORROSION PROTECTION METHOD NA reasons are Invalid.', "danger");
    //   return false;
    // }
    // else if (this.signOffSheetForm.value.packagingDetails.vci == true && this.vcispecError != '') {
    //   this.getdata.showNotification('bottom', 'right', 'In CORROSION PROTECTION METHOD VCI Specification are Invalid.', "danger");
    //   return false;
    // }
    // else if (this.signOffSheetForm.value.packagingDetails.rpoil == true && this.rpoilspecError != '') {
    //   this.getdata.showNotification('bottom', 'right', 'In CORROSION PROTECTION METHOD RP OIL Specification are Invalid.', "danger");
    //   return false;
    // }
    // else if (this.signOffSheetForm.value.packagingDetails.handleOther == true && this.signOffSheetForm.value.packagingDetails.handleReason == '') {
    //   this.getdata.showNotification('bottom', 'right', "In MODE OF HANDLING Reasons  are Required. ", "danger");
    //   return false;
    // }
    // else if (this.signOffSheetForm.value.packagingDetails.cpna == true && this.signOffSheetForm.value.packagingDetails.nareason == '') {
    //   this.getdata.showNotification('bottom', 'right', "In CORROSION PROTECTION METHOD NA Specification are Invalid.", "danger");
    //   return false;
    // }
    // else if (this.signOffSheetForm.value.packagingDetails.tempStorageSpec == true && this.signOffSheetForm.value.packagingDetails.shellLife == '') {
    //   this.getdata.showNotification('bottom', 'right', " Shelf Life is require ", "danger");
    //   return false;
    // }
    // else if (this.errorimage1 != "") {
    //   this.getdata.showNotification('bottom', 'right', 'Some Mandatory fields are  missing .Please fill all the fields.', "danger");
    //   return false;
    // }
    // else if (this.errorimage5 != "") {
    //   this.getdata.showNotification('bottom', 'right', 'Some Mandatory fields are  missing .Please fill all the fields.', "danger");
    //   return false;
    // }
       if (this.errorimage6 != "") {
      this.getdata.showNotification('bottom', 'right', 'Some Mandatory fields are  missing .Please fill all the fields.', "danger");
      return false;
    }
    else {
      $('#approve').modal("show");
    }
  }

  noapprove() {
    document.getElementById('modelEnterDisable').removeAttribute("disabled");
  }
  filename: any;
  finallfile: any;
  errorupload = "";
  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      var file: File = fileList[0];
      this.filename = file.name;
      this.finallfile = file;
      this.errorupload = ""
    }
  }

  uploadfileid: any;
  uploadsubmit() {

    if (!this.signOffuploadForm.valid) {
      this.getdata.showNotification('bottom', 'right', 'Some Mandatory fields are  missing .Please fill all the fields.', "danger");
      return false;
    }
    if (this.fileupload.nativeElement.value == "") {
      this.errorupload = "File Upload is required"
      this.getdata.showNotification('bottom', 'right', 'File upload is required!!', "danger");
      return false;
    }
    else {
      this.fileupload.nativeElement.value = "";
      let finalformdata: FormData = new FormData();
      finalformdata.append("file", this.finallfile);
      finalformdata.append("filename", this.finallfile.name);
      this.getdata.method(this.uploadsignoff, finalformdata, 'file')
        .subscribe(
          data => {
            this.signOffuploadForm.reset();
            if (data.status == "Success") {
              this.uploadfileid = data.id

              this.signoffApprovereqdata = JSON.stringify({ "packsignoffid": this.uploadfileid, "teamname": "supplier", "status": "completed", "updatedby": this.updatedby });
              this.signoffpendingreqdata = JSON.stringify({ "packsignoffid": this.uploadfileid, "teamname": "MHE", "status": "pending" });

              this.signoffApprove(this.signoffApprovereqdata);

              this.getdata.showNotification('bottom', 'right', ' File uploaded successfully.Doc Ref No:' + this.uploadfileid, "success");
              this.filename = "";
              this.errorupload = "";
              this.fileupload.nativeElement.value = "";

            }
            if (data.status == "Failed") {
              this.getdata.showNotification('bottom', 'right', data.field + ',Please check and Re-upload', "danger");
              this.filename = "";
              this.errorupload = "";
              this.fileupload.nativeElement.value = "";
            }
          },
          Error => {
          });
    }
  }

  signoffApprove(reqdata) {
    return this.makeapi.method(this.signoffapi, reqdata, "postjson")
      .subscribe(data => {
        this.signoffpending(this.signoffpendingreqdata);

      },
        Error => {
        });
  }
  signoffpending(reqdata) {
    return this.makeapi.method(this.signoffapi, reqdata, "postjson")
      .subscribe(data => {
      },
        Error => {
        });
  }

  packdatauploadlists = [];
  partuploaddata(keyvalue) {
    if (this.packdatauploadlists.indexOf(keyvalue) != -1) {
      var finalreqdata = this.getdata.appconstant + "part/" + keyvalue
      return this.makeapi.method(finalreqdata, '', "get")
        .subscribe(data => {
          var getform = this.signOffuploadForm.value
          getform.partname = data.partMaster.cPartName;
          getform.partnumber = data.partMaster.cPartNumber;
          this.signOffuploadForm.patchValue(getform)
        },
          Error => {
          });
    }
    let reqdata = "partnumber=" + keyvalue
    return this.makeapi.method(this.searchPartDataapi, reqdata, "post")
      .subscribe(data => {
        this.packdatauploadlists = data;
      },
        Error => {
        });
  }
  // suppdatauploadlists = [];
  // supplieruploaddata(keyvalue) {
  //   if (this.suppdatauploadlists.indexOf(keyvalue) != -1) {
  //     var finalreqdata = this.getdata.appconstant + "supp/" + keyvalue
  //     return this.makeapi.method(finalreqdata, '', "get")
  //       .subscribe(data => {
  //         var getform = this.signOffuploadForm.value;
  //         getform.suppliername = data.suppliername;
  //         getform.suppliername = data.suppliername;
  //         this.signOffuploadForm.patchValue(getform)
  //       },
  //         Error => {
  //         });
  //   }
  //   else {
  //     var reqdata = "&suppliercode=" + keyvalue
  //     return this.makeapi.method(this.searchSuppDataapi, reqdata, "post")
  //       .subscribe(data => {
  //         this.suppdatauploadlists = data;
  //       },
  //         Error => {
  //         });
  //   }

  // }


  lodeenter(event) {
    if (event.keyCode == 13) {
      this.load();
    }
  }
  loadcount: any;
  loadPackMasterId: any;
  loadDataresponse: any;

  load() {
    this.loadDataresponse = '';
    this.changeimageevent1 = false;
    this.changeimageevent2 = false;
    this.changeimageevent3 = false;
    this.changeimageevent4 = false;
    this.changeimageevent5 = false;
    this.changeimageevent6 = false;

    this.loadcount = 0;
    this.naspecdisplay = "notshow";
    this.rpoilspecdisplay = "notshow"
    this.vcispecdisplay = "notshow";
    console.log(this.loadForm.value)
    if (this.loadForm.value.refno == '' || this.loadForm.value.refno == null) {
      this.getdata.showNotification('bottom', 'right', "Invalid Refrence Number", "danger");
      return false;
    }
    else if (this.loadForm.valid) {
      document.getElementById('loadDisable').setAttribute("disabled", "disabled");
      var reqdata = 'refno=' + this.loadForm.value.refno + '&userid=' + this.getdata.session().id + '&roleid=' + this.getdata.session().roleid;
      return this.makeapi.method(this.loadapi, reqdata, "post")
        .subscribe(data => {
          document.getElementById('loadDisable').removeAttribute("disabled");
          this.loadDataresponse = data
          this.loadForm.reset()
          if (data.packagingDetails == null && data.partDetails == null && data.supplierDetails == null && data.primaryPackaging == null && data.secondaryPackaging == null) {
            this.getdata.showNotification('bottom', 'right', "Invalid Refrence Number", "danger");
          }
          else {
            this.loadcount = 1;
            this.loadPackMasterId = data.id
            var getform = this.signOffSheetForm.value;
            getform.partDetails = data.partDetails;
            getform.supplierDetails = data.supplierDetails
            getform.primaryPackaging = data.primaryPackaging;
            getform.secondaryPackaging = data.secondaryPackaging;
            getform.packagingDetails = data.packagingDetails
            this.signOffSheetForm.patchValue(getform)
            if (data.partimage != null) {
              this.assets1 = 'data:image/png;base64,' + data.partimage
              $('#imgid1').attr('src', 'data:image/png;base64,' + data.partimage)
              this.errorimage1 = "";
              this.show1 = "show";
            }
            if (data.icimage1 != null) {
              this.assets2 = 'data:image/png;base64,' + data.icimage1
              $('#imgid2').attr('src', 'data:image/png;base64,' + data.icimage1)
              this.errorimage2 = "";
              this.show2 = "show";
            }
            if (data.icimage2 != null) {
              this.assets3 = 'data:image/png;base64,' + data.icimage2
              $('#imgid3').attr('src', 'data:image/png;base64,' + data.icimage2)

              this.errorimage3 = "";
              this.show3 = "show";
            }
            if (data.srpimage != null) {
              this.assets4 = 'data:image/png;base64,' + data.srpimage
              $('#imgid4').attr('src', 'data:image/png;base64,' + data.srpimage)

              this.errorimage4 = "";
              this.show4 = "show";
            }
            if (data.otherimage != null) {
              this.assets5 = 'data:image/png;base64,' + data.otherimage
              $('#imgid5').attr('src', 'data:image/png;base64,' + data.otherimage)

              this.errorimage5 = "";
              this.show5 = "show";
            }
            if (data.fpimage != null) {
              this.assets6 = 'data:image/png;base64,' + data.fpimage
              $('#imgid6').attr('src', 'data:image/png;base64,' + data.fpimage)

              this.errorimage6 = "";
              this.show6 = "show";
            }
            if (data.packagingDetails.tempStorageSpec == 'false') {
              var getform = this.signOffSheetForm.value
              getform.packagingDetails.tempStorageSpec = false;
              this.signOffSheetForm.patchValue(getform);
              this.shelllifecheck(false)
            }
            if (data.packagingDetails.tempStorageSpec == 'true') {
              var getform = this.signOffSheetForm.value
              getform.packagingDetails.tempStorageSpec = true;
              this.signOffSheetForm.patchValue(getform);
              this.shelllifecheck(true)
            }
            if (data.packagingDetails.vci == true) {
              this.vcispecdisplay = "show";
            }
            if (data.packagingDetails.rpoil == true) {
              this.rpoilspecdisplay = "show";
            }
            if ((data.primaryPackaging.dicvPack == 'Yes') || (data.primaryPackaging.dicvPack == 'yes')) {
              $('#dfcipackid').removeClass('disableNgStyle');
              var getform = this.signOffSheetForm.value
              getform.primaryPackaging.dicvPack = 'Yes';
              this.signOffSheetForm.patchValue(getform);
            }
            if (data.packagingDetails.cpna == true) {

              var getform = this.signOffSheetForm.value
              getform.packagingDetails.rpoil = false;
              this.signOffSheetForm.patchValue(getform);
              var getform = this.signOffSheetForm.value
              getform.packagingDetails.vci = false;
              this.signOffSheetForm.patchValue(getform);
              this.naspecdisplay = "show";
              $("#nopointer").addClass("nopointer");
              $("#nopointer1").addClass("nopointer");
              document.getElementById('vci').setAttribute("disabled", "disabled");
              document.getElementById('rpoil').setAttribute("disabled", "disabled");

              this.rpoilspecdisplay = "notshow";
              this.rpoilspecError = "";
              var getform = this.signOffSheetForm.value
              getform.packagingDetails.rpoilspec = '';
              this.signOffSheetForm.patchValue(getform);

              this.vcispecdisplay = "notshow";
              this.vcispecError = "";
              var getform = this.signOffSheetForm.value
              getform.packagingDetails.vcispec = '';
              this.signOffSheetForm.patchValue(getform)
            }
            if (data.packagingDetails.twowaypallet == true) {
              $('#twowaypallet').prop('checked', true);
            }
            if (data.packagingDetails.fourwaypallet == true) {
              $('#fourwaypallet').prop('checked', true);
            }
            if (data.packagingDetails.heatreated == true) {
              $('#heattre').prop('checked', true);
            }
            if (data.packagingDetails.fumigated == true) {
              $('#fumigat').prop('checked', true);
            }
            if (data.packagingDetails.forklift == true) {
              $('#forkliftrad').prop('checked', true);
              this.modeofhandling(false);
            }
            if (data.packagingDetails.manual == true) {
              $('#manualrad').prop('checked', true);
              this.modeofhandling(false);
            }
            if (data.packagingDetails.handleOther == true) {
              $('#otherrad').prop('checked', true);
              $("#modeofhandling").removeClass("clicked");
              $('#modeofhandling').removeAttr("disabled", "disabled");
            }
            if (data.primaryPackaging.packagingtype == "returnable" || data.primaryPackaging.packagingtype == "nonreturnable") {
              $('#typepack').removeClass("form-control ng-dirty ng-untouched ng-invalid")
              $('#typepack').addClass("form-control ng-touched ng-valid ng-dirty")
            }
            if (data.primaryPackaging.packagingtype != "returnable" && data.primaryPackaging.packagingtype != "nonreturnable") {
              $('#typepack').removeClass("form-control ng-touched ng-valid ng-dirty")
              $('#typepack').addClass("form-control ng-untouched ng-pristine ng-valid")
              var getform = this.signOffSheetForm.value
              getform.packagingDetails.packagingtype = 'Select';
              this.signOffSheetForm.patchValue(getform);
            }
            if ((data.supplierDetails.region).toLowerCase() == "north" || (data.supplierDetails.region).toLowerCase() == "west" || (data.supplierDetails.region).toLowerCase() == "south" || (data.supplierDetails.region).toLowerCase() == "east" || (data.supplierDetails.region).toLowerCase() == "central" || (data.supplierDetails.region).toLowerCase() == "chennai") {

              $('#regionselect').removeClass("form-control ng-dirty ng-untouched ng-invalid")
              $('#regionselect').addClass("form-control ng-touched ng-valid ng-dirty")
            }
            if (data.supplierDetails.region != "north" && data.supplierDetails.region != "west" && data.supplierDetails.region != "south" && data.supplierDetails.region != "east"
              && data.supplierDetails.region != "central" && data.supplierDetails.region != "chennai") {
              $('#regionselect').removeClass("form-control ng-touched ng-valid ng-dirty")
              $('#regionselect').addClass("form-control ng-untouched ng-pristine ng-valid")
              var getform = this.signOffSheetForm.value
              getform.supplierDetails.region = 'Select';
              this.signOffSheetForm.patchValue(getform);
            }

            this.autocalcParaLoad("loadcalc")
            this.getdata.showNotification('bottom', 'right', " Form loaded successfully", "success");
          }
        },
          Error => {
          });
    }
  }
  refresh() {
    this.loadForm.reset()
    $('#typepack').removeClass("load-valid")
    this.signOffSheetForm.reset();
    this.assets1 = "assets/img/plus.jpg";
    this.assets2 = "assets/img/plus.jpg";
    this.assets3 = "assets/img/plus.jpg";
    this.assets4 = "assets/img/plus.jpg";
    this.assets5 = "assets/img/plus.jpg";
    this.assets6 = "assets/img/plus.jpg";
    this.rpoilspecdisplay = "notshow";
    this.vcispecdisplay = 'notshow';
    this.naspecdisplay = 'notshow';
    this.closeimage(1);
    this.closeimage(2);
    this.closeimage(3);
    this.closeimage(4);
    this.closeimage(5);
    this.closeimage(6);


    this.changeimageevent1 = false;
    this.changeimageevent2 = false;
    this.changeimageevent3 = false;
    this.changeimageevent4 = false;
    this.changeimageevent5 = false;
    this.changeimageevent6 = false;



    var getform = this.signOffSheetForm.value
    getform.primaryPackaging.packagingtype = 'Select';
    getform.supplierDetails.region = 'Select';
    getform.partDetails.plantcode = '6365';
    getform.partDetails.plantname = 'DICV';
    getform.packagingDetails.tempStorageSpec = true;
    getform.packagingDetails.shellLife = '';
    getform.packagingDetails.twowaypallet = true;
    getform.packagingDetails.fourwaypallet = false;
    getform.packagingDetails.heatreated = false;
    getform.packagingDetails.fumigated = false;
    getform.packagingDetails.forklift = true;
    getform.packagingDetails.manual = false;
    getform.packagingDetails.handleOther = false;
    getform.packagingDetails.handleReason = '';
    getform.packagingDetails.rpoil = false;
    getform.packagingDetails.vci = false;
    getform.packagingDetails.cpna = false;
    getform.primaryPackaging.dicvPack = 'Yes';
    getform.packagingDetails.rpoilspec = '';
    getform.packagingDetails.vcispec = '';
    getform.packagingDetails.nareason = '';
    this.signOffSheetForm.patchValue(getform);
    $('#dicvcheck').prop('checked', true);
    $('#twowaypallet').prop('checked', true);
    $('#tepmpspec').prop('checked', true);
    $('#forkliftrad').prop('checked', true);
    this.shelllifecheck(true);

    $('#dfcipackid').removeClass('disableNgStyle');
    $('#palrpi').removeClass('disableNgStyle');
    $('#palvci').removeClass('disableNgStyle');
    $('#shell1').removeClass('disableNgStyle');
    $('#shelllife').removeClass('disableNgStyle');
    $('#typepack').removeClass("form-control ng-touched ng-valid ng-dirty")
    $('#typepack').addClass("form-control ng-dirty ng-untouched ng-invalid")

  }
  packtypeaddclass() {
    $('#typepack').removeClass("form-control ng-dirty ng-untouched ng-invalid")
    $('#typepack').addClass("form-control ng-touched ng-valid ng-dirty")
  }

  autocalcParaLoad(name) {
    if (this.signOffSheetForm.value.secondaryPackaging.boxesperlayer != null && this.signOffSheetForm.value.secondaryPackaging.nooflayers != null) {
      var noofboxesperpalletload = Number(this.signOffSheetForm.value.secondaryPackaging.boxesperlayer) * Number(this.signOffSheetForm.value.secondaryPackaging.nooflayers)
      var getform = this.signOffSheetForm.value
      getform.secondaryPackaging.noofboxes = (noofboxesperpalletload).toFixed(2);
      this.signOffSheetForm.patchValue(getform);
    }
    if (this.signOffSheetForm.value.primaryPackaging.piecespercontainer != null && this.signOffSheetForm.value.secondaryPackaging.noofboxes != null) {
      var paralized = Number(this.signOffSheetForm.value.primaryPackaging.piecespercontainer) * Number(this.signOffSheetForm.value.secondaryPackaging.noofboxes)
      var getform = this.signOffSheetForm.value
      getform.secondaryPackaging.loadquantity = (paralized).toFixed(2);
      this.signOffSheetForm.patchValue(getform);
    }
    if (this.signOffSheetForm.value.primaryPackaging.packheight != null && this.signOffSheetForm.value.secondaryPackaging.noofboxes != null) {
      var secPackheight = 152 + (Number(this.signOffSheetForm.value.primaryPackaging.packheight) * Number(this.signOffSheetForm.value.secondaryPackaging.nooflayers));
      var getform = this.signOffSheetForm.value
      getform.secondaryPackaging.packheight = (secPackheight).toFixed(2);
      this.signOffSheetForm.patchValue(getform);
    }
    if (this.signOffSheetForm.value.primaryPackaging.piecespercontainer != null && this.signOffSheetForm.value.primaryPackaging.tareweight != null && this.signOffSheetForm.value.secondaryPackaging.tareweight != null) {
      var grosswt = (Number(this.signOffSheetForm.value.primaryPackaging.piecespercontainer) * Number(this.signOffSheetForm.value.primaryPackaging.tareweight)) + Number(this.signOffSheetForm.value.secondaryPackaging.tareweight)
      var getform = this.signOffSheetForm.value
      getform.secondaryPackaging.grossweight = (grosswt);
      this.signOffSheetForm.patchValue(getform);
    }
    
  }


  tablefilename = 'filename'
  adduploadrowindex = 1;
  addrow() {
    if (this.adduploadrowindex < 10) {
      $('#addr' + this.adduploadrowindex).html("<td>" + (this.adduploadrowindex + 1) + "</td><td><input name='firstname" + this.adduploadrowindex + "' type='text' placeholder='Part Number' class='form-control input-md'> </td>  <td><input  name='lastname" + this.adduploadrowindex + "' type='text' placeholder='Part Name'  class='form-control input-md'></td><td><input  name='age" + this.adduploadrowindex + "' type='text' placeholder='Supplier Code'  class='form-control input-md'></td><td><input  name='city" + this.adduploadrowindex + "' type='text' placeholder='Supplier Name'  class='form-control input-md'></td><td><div class='upload-btn-wrapper' align='center'><label for='fileupload" + this.adduploadrowindex + "' class='btn btn-danger btn-md'><span class='span'>Browse File&nbsp;&nbsp;<i class='material-icons arrorright'>arrow_right_alt</i></span></label><input type='file' class='displaynone' id='fileupload" + this.adduploadrowindex + "' required #file" + this.adduploadrowindex + "  (change)='fileChange($event," + this.adduploadrowindex + ")' style='display:none;' accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel'><p style='font-size: 15px;' class='text-primary'>{{" + this.tablefilename + this.adduploadrowindex + "}}</p><p class='text-danger'>{{errorupload}}</p></div></td>");
      $('#tab_logic').append('<tr id="addr' + (this.adduploadrowindex + 1) + '"></tr>');
      this.adduploadrowindex++;
    }
  };

  delete() {
    if (this.adduploadrowindex > 1) {
      $("#addr" + (this.adduploadrowindex - 1)).html('');
      this.adduploadrowindex--;
    }
  };
  dfcipack(event) {
    if (event == true) {
      $('#dfcipackid').removeClass('disableNgStyle');
    }
    else {
      $('#dfcipackid').addClass('disableNgStyle');
    }
  }

  get signOffFormdetails() { return <FormArray>this.signOffForm.get('details') }

  signOffForm: FormGroup;
  details: FormArray;
  signoffform() {
    this.signOffForm = this.Formbuilder.group({
      details: this.Formbuilder.array([this.createItem()]),
    });
  }

  createItem(): FormGroup {
    return this.Formbuilder.group({
      partNumber: [null, Validators.compose([Validators.required])],
      partName: [null, Validators.compose([Validators.required])],
      supplierCode: [null, Validators.compose([Validators.required])],
      supplierName: [null, Validators.compose([Validators.required])],
      uploadFile: [null, Validators.compose([Validators.required])],
    });
  }

  addRow(): void {
    this.addrowbtbdisable = 'true';
    this.details = <FormArray>this.signOffForm.get('details');
    this.details.push(this.createItem());
  }

  /** Delete Row */
  deleteRow(rowNumber) {
    this.addrowbtbdisable = 'false';
    this.details = <FormArray>this.signOffForm.get('details');
    this.details.removeAt(rowNumber);
  }
  uploadfilearry = []
  Sfilename: any;
  Sfinallfile: any;
  onFileChange(event, i) {
    $('#SfileError' + i).html('');
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      var file: File = fileList[0];
      var getdata = this.signOffForm.get('details').value;

      if (getdata[i].partNumber == null || getdata[i].partNumber == null) {
        $("#uploadfile" + i).val('');
        this.signOffForm.get('details').patchValue(getform);
        var getform = this.signOffForm.get('details').value;
        getform[i].uploadFile = null;
      }
      else if (getdata[i].partName == null || getdata[i].partName == null) {
        $("#uploadfile" + i).val('');
        $('#SfileError' + i).html('Part name  mandatory');
        var getform = this.signOffForm.get('details').value;
        getform[i].uploadFile = null;
        this.signOffForm.get('details').patchValue(getform);
      }
      else if (getdata[i].supplierCode == null || getdata[i].supplierCode == '') {
        $("#uploadfile" + i).val('');
        $('#SfileError' + i).html(' Supplier code is mandatory');
        var getform = this.signOffForm.get('details').value;
        getform[i].uploadFile = null;
        this.signOffForm.get('details').patchValue(getform);
      }
      else if (getdata[i].supplierName == null || getdata[i].supplierName == '') {
        $("#uploadfile" + i).val('');
        $('#SfileError' + i).html(' Supplier name is mandatory');
        var getform = this.signOffForm.get('details').value;
        getform[i].uploadFile = null;
        this.signOffForm.get('details').patchValue(getform);
      }
      else {
        $('#validating').modal("show");
        $('#Sfilename' + i).html(file.name);
        let finalformdata: FormData = new FormData();
        finalformdata.append("partname", getdata[i].partNumber);
        finalformdata.append("partnumber", getdata[i].partNumber);
        finalformdata.append("suppliercode", getdata[i].supplierCode);
        finalformdata.append("file", file);
        this.getdata.method(this.validateExcelApi, finalformdata, 'file')
          .subscribe(
            data => {
              $('#validating').modal("hide");
              if (data.status == 'Failed') {
                if ((/msie\s|trident\/|edge\//i.test(window.navigator.userAgent) != true)) {
                  this.signOffForm.get('details').value[i].uploadFile = null;
                  $('#SfileError' + i).html(data.field);
                  $('#Sfilename' + i).html('');
                  $("#uploadfile" + i).val('');
                }
                else {
                  var getform = this.signOffForm.get('details').value;
                  getform[i].uploadFile = null;
                  this.signOffForm.get('details').patchValue(getform);
                  $('#SfileError' + i).html(data.field);
                  $('#Sfilename' + i).html('');
                }

                this.getdata.showNotification('bottom', 'right', data.field, "danger");
              } else {
                $('#inputpartnum' + i).addClass("errorclicked");
                document.getElementById('inputpartnum' + i).setAttribute("disabled", "disabled");
                $("#inputpartname" + i).addClass("errorclicked");
                document.getElementById('inputpartname' + i).setAttribute("disabled", "disabled");
                $("#inputsuppnum" + i).addClass("errorclicked");
                document.getElementById('inputsuppnum' + i).setAttribute("disabled", "disabled");
                $("#inputsuppname" + i).addClass("errorclicked");
                document.getElementById('inputsuppname' + i).setAttribute("disabled", "disabled");
                this.getdata.showNotification('bottom', 'right', 'File validated successfully', "success");
                this.addrowbtbdisable = 'false';
                this.uploadfilearry[i] = file

              }

            },
            Error => {
              if ((/msie\s|trident\/|edge\//i.test(window.navigator.userAgent) != true)) {
                $('#SfileError' + i).html('The uploaded file exceeds the limit of size 10 MB. Kindly check and upload.');
                this.signOffForm.get('details').value[i].uploadFile = null;
                $('#Sfilename' + i).html('');
                $("#uploadfile" + i).val('');
              }
              else {
                $('#SfileError' + i).html('The uploaded file exceeds the limit of size 10 MB. Kindly check and upload.');
                var getform = this.signOffForm.get('details').value;
                getform[i].uploadFile = null;
                this.signOffForm.get('details').patchValue(getform);
                $('#Sfilename' + i).html('');
              }
              $('#validating').modal("hide");
              this.getdata.showNotification('bottom', 'right', 'The uploaded file exceeds the limit of size 10 MB. Kindly check and upload.', "danger");
            });
      }
    }
  }

  /*** Uplaod page part seracdt */
  partUploaddata(keyvalue, i) {
    if (this.packdatalists.indexOf(keyvalue) != -1) {
      var finalreqdata = this.getdata.appconstantdisc + "part/" + keyvalue
      return this.makeapi.method(finalreqdata, '', "get")
        .subscribe(data => {
          this.packmasterid = data.id
          var finalreqdata = this.getdata.appconstantdisc + "partMapping/" + this.packmasterid
          return this.makeapi.method(finalreqdata, '', "get")
            .subscribe(data => {
              if (data.supplierCodes != null) {
                this.suppdatalistsupload = data.supplierCodes;
              }
              else if (data.suppMasterList != null) {
                this.signOffForm.get('details').value[i].supplierCode = data.suppMasterList[0].code;
                this.signOffForm.get('details').value[i].supplierName = data.suppMasterList[0].name;
                var getform = this.signOffForm.get('details').value;
                getform[i].supplierCode = data.suppMasterList[0].code;
                getform[i].supplierName = data.suppMasterList[0].name;
                this.signOffForm.get('details').patchValue(getform);
              }
              this.signOffForm.get('details').value[i].partName = data.partMaster.partName;
              this.signOffForm.get('details').value[i].partNumber = data.partMaster.partNumber;
              var getform = this.signOffForm.get('details').value;
              getform[i].partName = data.partMaster.partName;
              getform[i].partNumber = data.partMaster.partNumber;
              this.signOffForm.get('details').patchValue(getform);
            },
              Error => {
              });
        },
          Error => {
          });
    }
    else {
      let reqdata = "partnumber=" + keyvalue
      return this.makeapi.method(this.searchPartDataapi, reqdata, "post")
        .subscribe(data => {
          this.packdatalists = data;
        },
          Error => {
          });
    }
  }
  suppdatalistsupload = [];
  supplierUploaddata(keyvalue, i) {
    var getform = this.signOffForm.get('details').value;
    if (this.suppdatalistsupload.indexOf(keyvalue) != -1) {
      var finalreqdata = this.getdata.appconstantdisc + "supp/" + keyvalue
      return this.makeapi.method(finalreqdata, '', "get")
        .subscribe(data => {
          if (data.suppMasterList != null) {
            this.signOffForm.get('details').value[i].supplierCode = data.code;
            this.signOffForm.get('details').value[i].supplierName = data.name;
            var getform = this.signOffForm.get('details').value;
            this.suppdatalistsupload = data.code;
            getform[i].supplierCode = data.suppMasterList.code;
            getform[i].supplierName = data.suppMasterList.name;
            this.signOffForm.get('details').patchValue(getform);
          }
          else {
            this.signOffForm.get('details').value[i].supplierCode = data.code;
            this.signOffForm.get('details').value[i].supplierName = data.name;
            var getform = this.signOffForm.get('details').value;
            getform[i].supplierCode = data.code;
            getform[i].supplierName = data.name;
            this.signOffForm.get('details').patchValue(getform);
          }
        },
          Error => {
          });
    }
    else {
      this.suppdatalistsupload = [];
      var reqdata = "&suppliercode=" + keyvalue
      return this.makeapi.method(this.searchSuppDataapi, reqdata, "post")
        .subscribe(data => {
          for (var i = 0; i < data.length; i++) {
            this.suppdatalistsupload[i] = data[i].code;
          }
        },
          Error => {
          });
    }

  }
  /** upload form submit */
  uploadSignoffsubmit() {
    document.getElementById('modelUploadDisable').setAttribute("disabled", "disabled");
    var getdata = this.signOffForm.get('details').value;
    if ((/msie\s|trident\/|edge\//i.test(window.navigator.userAgent) == true)) {
      for (var j = 0; j < getdata.length; j++) {
        if (this.signOffForm.get('details').value[j].uploadFile == undefined || this.signOffForm.get('details').value[j].uploadFile == null) {
          $('#SfileError' + j).html('File is required');
          $('#Sfilename' + j).html('');
          document.getElementById('modelUploadDisable').removeAttribute("disabled");
          this.getdata.showNotification('bottom', 'right', 'All fields are required', "danger");
          return false;
        }
      }
    }
    else if ((/msie\s|trident\/|edge\//i.test(window.navigator.userAgent) != true)) {
      for (var j = 0; j < getdata.length; j++) {
        if (this.signOffForm.get('details').value[j].uploadFile == undefined || this.signOffForm.get('details').value[j].uploadFile == null) {
          $('#SfileError' + j).html('File is required');
          $('#Sfilename' + j).html('');
          document.getElementById('modelUploadDisable').removeAttribute("disabled");
          this.getdata.showNotification('bottom', 'right', 'All fields are required', "danger");
          return false;
        }
      }
    } else {

    }
    if (this.signOffForm.valid) {
      $('#loading').modal("show");
      for (var j = 0; j < getdata.length; j++) {
        let finalformdata: FormData = new FormData();
        finalformdata.append("userid", (this.getdata.session().id));
        finalformdata.append("partname", (getdata[j].partName));
        finalformdata.append("partnumber", (getdata[j].partNumber));
        finalformdata.append("suppliercode", (getdata[j].supplierCode));
        finalformdata.append("suppliername", (getdata[j].supplierName));
        finalformdata.append("roleid", (this.getdata.session().roleid));

        finalformdata.append("file", this.uploadfilearry[j]);
        this.getdata.method(this.uploadFileApi, finalformdata, 'file')
          .subscribe(
            data => {
              $('#loading').modal("hide");
              if (data.status == 'failed') {
                document.getElementById('modelUploadDisable').removeAttribute("disabled");
                this.getdata.showNotification('bottom', 'right', data.field, "danger");
              }
              else {
                document.getElementById('modelUploadDisable').removeAttribute("disabled");
                this.addrowbtbdisable = 'false';
                this.uploadfileid = data.id
                this.getdata.showNotification('bottom', 'right', 'File uploaded successfully and Saved with Doc Ref No:' + this.uploadfileid, "success");
                this.filerest()
              }
            },
            Error => {
              if ((/msie\s|trident\/|edge\//i.test(window.navigator.userAgent) != true)) {
                $('#SfileError' + j).html('Server side issue,please get in touch with the support team.');
                this.signOffForm.get('details').value[j].uploadFile = null;
                $('#Sfilename' + j).html('');
                $("#uploadfile" + j).val('');
              }
              else {
                $('#SfileError' + j).html('Server side issue,please get in touch with the support team.');
                var getform = this.signOffForm.get('details').value;
                getform[j].uploadFile = null;
                this.signOffForm.get('details').patchValue(getform);
                $('#Sfilename' + j).html('');
              }
              document.getElementById('modelUploadDisable').removeAttribute("disabled");
              $('#loading').modal("hide");
              this.getdata.showNotification('bottom', 'right', 'Server side issue,please get in touch with the support team.', "danger");
            });
      }
    } else {
      console.log(3)
      this.getdata.showNotification('bottom', 'right', 'All fields are required', "danger");
      document.getElementById('modelUploadDisable').removeAttribute("disabled");
      this.markFormGroupTouched(this.signOffForm);

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
  //**keydown file empty */

  keydownFileEmpty(i) {
    var getform = this.signOffForm.get('details').value;
    getform[i].uploadFile = null;
    this.signOffForm.get('details').patchValue(getform);
    if ((/msie\s|trident\/|edge\//i.test(window.navigator.userAgent) == true)) {
      $('#SfileError' + i).html('File is required');
    }
    $('#Sfilename' + i).html('');
  }
  cancelconfirmmodal() {
    $('#camceluploadmodal').modal('show')
  }
  filerest() {
    $('#camceluploadmodal').modal('hide')
    var getdata = this.signOffForm.get('details').value;
    for (var j = getdata.length; j >= 0; j--) {
      if (j == 0) {
        this.addrowbtbdisable = 'true';
        $('#SfileError' + j).html('');
        $('#Sfilename' + j).html('');
        $('#inputpartnum0').removeClass("errorclicked");
        $('#inputpartnum0').removeAttr("disabled", "disabled");
        $("#inputpartname0").removeClass("errorclicked");
        $('#inputpartname0').removeAttr("disabled", "disabled");
        $("#inputsuppnum0").removeClass("errorclicked");
        $('#inputsuppnum0').removeAttr("disabled", "disabled");
        $("#inputsuppname0").removeClass("errorclicked");
        $('#inputsuppname0').removeAttr("disabled", "disabled");
      }
      else {
        $('#SfileError' + j).html('');
        $('#Sfilename' + j).html('');
        this.deleteRow(j)
      }
      this.signOffForm.reset()
    }
  }
  cancelsignofupload() {
    $('#camceluploadmodal').modal('hide')
    var getdata = this.signOffForm.get('details').value;
    for (var j = getdata.length; j >= 0; j--) {
      if (j == 0) {
        this.addrowbtbdisable = 'true';
        $('#SfileError' + j).html('');
        $('#Sfilename' + j).html('');
        $('#inputpartnum0').removeClass("errorclicked");
        $('#inputpartnum0').removeAttr("disabled", "disabled");
        $("#inputpartname0").removeClass("errorclicked");
        $('#inputpartname0').removeAttr("disabled", "disabled");
        $("#inputsuppnum0").removeClass("errorclicked");
        $('#inputsuppnum0').removeAttr("disabled", "disabled");
        $("#inputsuppname0").removeClass("errorclicked");
        $('#inputsuppname0').removeAttr("disabled", "disabled");
      }
      else {
        $('#SfileError' + j).html('');
        $('#Sfilename' + j).html('');
        this.deleteRow(j)
      }
    }
    this.signOffForm.reset()
    this.getdata.showNotification('bottom', 'right', 'File  upload canceled successfully', "danger");
  }
  uploadtab() {
    $('#camceluploadmodal').modal('hide')
    var getdata = this.signOffForm.get('details').value;
    for (var j = getdata.length; j >= 0; j--) {
      if (j == 0) {
        this.addrowbtbdisable = 'true';
        $('#SfileError' + j).html('');
        $('#Sfilename' + j).html('');
        $('#inputpartnum0').removeClass("errorclicked");
        $('#inputpartnum0').removeAttr("disabled", "disabled");
        $("#inputpartname0").removeClass("errorclicked");
        $('#inputpartname0').removeAttr("disabled", "disabled");
        $("#inputsuppnum0").removeClass("errorclicked");
        $('#inputsuppnum0').removeAttr("disabled", "disabled");
        $("#inputsuppname0").removeClass("errorclicked");
        $('#inputsuppname0').removeAttr("disabled", "disabled");
      }
      else {
        $('#SfileError' + j).html('');
        $('#Sfilename' + j).html('');
        this.deleteRow(j)
      }
    }
    this.signOffForm.reset()
  }
  errorForupload() {
    this.getdata.showNotification('bottom', 'right', 'All fields are required...', "danger");
  }
  uploadFile(val){
    $('#file'+val).trigger('click',function(){
      var fileObj = {}
      console.log($('#file'+val).val());
      $('#preview'+val).attr('src',$('#file'+val).val());
    }); 
    //add values in a object
    
  }
  initiate(){
    if (this.signOffSheetForm.invalid) {
      this.markFormGroupTouched(this.signOffSheetForm);
      $.notify("Mandatory Field is required!!!", "error");
      return false;
    }
  }
}
