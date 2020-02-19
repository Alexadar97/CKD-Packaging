import { Component, OnInit, Pipe, PipeTransform, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { PagerService } from '../packservices/pagerservice';
declare var $;
import { WebService } from '../packservices/webservice';
import { Chart } from 'angular-highcharts';
declare var $;
@Component({
  selector: 'app-signoffreport',
  templateUrl: './signoffreport.component.html',
  styleUrls: ['./signoffreport.component.css']
})
export class SignoffreportComponent implements OnInit {
    assets = "assets/img/selectimage.jpg";
    assets1 = "assets/img/selectimage.jpg";
    assets2 = "assets/img/selectimage.jpg";
    assets3 = "assets/img/selectimage.jpg";
    assets4 = "assets/img/selectimage.jpg";
    assets5 = "assets/img/selectimage.jpg";
    assets6 = "assets/img/selectimage.jpg";
  
    emailvalidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+")){2,}@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    numbervalidation = /^[0-9]+$/;
    alphaWithoutSpace = /^[a-zA-Z]+$/;
    alphanumeric = /^[a-zA-Z0-9]+$/;
    alphawithdot = /^[a-zA-Z. ]+$/;
    alpha = /^[A-Za-z\d\s]+$/;
    passwordvalidation = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    decimalnumber = /^(0|[0-9]\d*)(\.\d+)?$/;
    contactnmber = /^[0-9\-+()]+$/
    alphanumericDecimal = /^[a-zA-Z0-9.]+$/;
    // array of all items to be paged
    private allItems: any[];
  
    // pager object
    pager: any = {};
  
    // paged items
    pagedItems: any[];
  
    signOffSheetForm: any;
  
  
  
    show1 = "notshow";
    show2 = "notshow";
    show3 = "notshow";
    show4 = "notshow";
    show5 = "notshow";
    show6 = "notshow";
    file: any;
    bsValue = new Date();
  
    loadTextboxVal: any;
  
    showLoad = true;
    myForm: any;
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
    totalcount: any = 1;
    pagecount: any = 1;
  
    packdatalists = [];
    suppdatalists = [];
    imagearray = []; // imagearray
  
    errorimage1 = " Part Image is required ";
    errorimage2 = "";
    errorimage3 = "";
    errorimage4 = "";
    errorimage5 = "Packaging with DICV Label is required";
    errorimage6 = " Final Packaging Image is required ";
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
    userid: any;
  
    @ViewChild('file1') fileupload: any;
    @ViewChild('image1') imageupload1: any;
    @ViewChild('image2') imageupload2: any;
    @ViewChild('image3') imageupload3: any;
    @ViewChild('image4') imageupload4: any;
    @ViewChild('image5') imageupload5: any;
    @ViewChild('image6') imageupload6: any;
  
  
  
    constructor(private http: Http, private ref: ChangeDetectorRef, private getdata: WebService, private Formbuilder: FormBuilder, private router: Router, private makeapi: WebService, private pagerService: PagerService) {
  
      this.signOffSheetForm = this.Formbuilder.group({
        partDetails: this.Formbuilder.group({
          partnumber: [null, Validators.compose([Validators.required, Validators.pattern(this.alphanumeric), Validators.maxLength(50)])],
          partname: [null, Validators.compose([Validators.required,  Validators.minLength(3), Validators.maxLength(50)])],
          plantcode: [null, Validators.compose([Validators.required, Validators.pattern(this.alphanumeric), Validators.minLength(1), Validators.maxLength(50)])],
          plantname: [null, Validators.compose([Validators.required, Validators.pattern(this.alpha), Validators.minLength(3), Validators.maxLength(50)])],
          email: [null, Validators.compose([Validators.required, Validators.pattern(this.emailvalidation), Validators.minLength(1), Validators.maxLength(100)])],
          contact: [null, Validators.compose([Validators.required, Validators.pattern(this.contactnmber), Validators.minLength(8), Validators.maxLength(50)])],
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
          dicvPack: ['Yes'],
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
          shellLife: ['', ([Validators.pattern(this.alphanumeric), Validators.minLength(1), Validators.maxLength(3)])]
        }),
      });
    }
    items: any;
    selectedItems: any;
    dropdownSettings: any;
    checkfordownload: any;
    currentPage = 1;
    detailedreportdatas: any;
  
  
    packdatas: any;
    sp: any;
    moh: any;
    plantcode: any;
    refno: any;
    searchvalueed = '';
    supadmin = false;
  
    private packagingapi = this.getdata.appconstant + 'listpackaging';
    public Excelapi = this.getdata.appconstant + 'getExcel?searchParam=';
    private getImageapi = this.getdata.appconstant + 'getImage';
    private signoffapi = this.getdata.appconstant + 'signoff';
    public singlePdfapi = this.getdata.appconstant + 'getSinglePDF/';
    public getallpdfapi = this.getdata.appconstant + 'getPDF/';
    public searchapi = this.getdata.appconstant;
    public paginationapi = this.getdata.appconstant + 'packagingPagination';
    private exportLogApi = this.getdata.appconstant + 'getExcel?searchParam=';
  
  
    private searchPackDataapi = this.getdata.appconstant + 'searchPackData';
    private searchPartDataapi = this.getdata.appconstant + 'searchPartData';
    private searchSuppDataapi = this.getdata.appconstant + 'searchSupplier';
    private uploadsignoff = this.getdata.appconstant + 'uploadFile';
    private uploadImageapi = this.getdata.appconstant + 'uploadImage';
    private loadapi = this.getdata.appconstant + 'load';
    private statusapi = this.getdata.appconstant + 'signoffModal';
    private packagingdetailapi = this.getdata.appconstant + 'packaging/';
  
  
    roleid: any;
    ngOnInit() {
      this.userid = this.getdata.session().id;
      this.roleid = this.getdata.session().roleid;
      $('[data-toggle="tooltip"]').tooltip();
  
      document.getElementById('modeofhandling').setAttribute("disabled", "disabled");
  
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
      this.getsigfoffdata();
  
      if ((this.getdata.session().roleid == 1) || (this.getdata.session().roleid == 0)) {
        this.supadmin = true;
      }
      this.updatedby = this.getdata.session().shortid;
      this.searchvalueed = this.Excelapi + ' ';
  
    }
  
    paginationCount() {
      var reqdata = 'userid=' + this.getdata.session().id + '&searchstr=' + this.searchkeyvalue + '&roleid=' + this.roleid
      return this.makeapi.method(this.paginationapi, reqdata, "post")
        .subscribe(data => {
          this.totalcount = data.count;
        },
          Error => {
          });
    }
  
    getsigfoffdata() {
      var reqdata = 'userid=' + this.getdata.session().id + '&pagination=1' + '&searchstr=' + this.searchkeyvalue + '&roleid=' + this.roleid
      return this.makeapi.method(this.packagingapi, reqdata, "post")
        .subscribe(data => {
  
          this.detailedreportdatas = data;
          this.PAGECOUNT(1);
        },
          Error => {
          });
    }
  
    pagination = 1;
    getSingleSignoffdata(id) {
      this.pagination = id;
      if (id > this.pagerService.maxpagesize) {
        this.pagination = id - 1;
        return false;
      }
      if (id == 0) {
        this.pagination = id + 1;
        return false;
      }
      var reqdata = 'userid=' + this.getdata.session().id + '&pagination=' + id + '&searchstr=' + this.searchkeyvalue + '&roleid=' + this.roleid
      return this.makeapi.method(this.packagingapi, reqdata, "post")
        .subscribe(data => {
          if (data.length == 0) {
            return false;
          }
          else {
            this.detailedreportdatas = data;
          }
        },
          Error => {
          });
    }
  
  
  
  
  
    searchPN: any;
    searchSN: any;
    partdatalists = [];
  
    searchpartNo(type) {
      var reqdata;
      this.searchapi = this.getdata.appconstant;
  
  
      if (type == "pn") {
        reqdata = '&partnumber=' + this.searchPN;
        this.searchapi = this.searchapi + 'searchPartData';
        if (this.partdatalists.indexOf(this.searchPN) != -1) {
          var finalreqdata = this.getdata.appconstant + "partsearch/" + this.searchPN
          return this.makeapi.method(finalreqdata, '', "get")
            .subscribe(data => {
              this.detailedreportdatas = data;
              this.searchPN = "";
            },
              Error => {
              });
        }
  
      }
  
  
      else if (type == "sc") {
        reqdata = '&suppliercode=' + this.searchSN;
        this.searchapi = this.searchapi + 'searchSupplier';
        if (this.suppdatalists.indexOf(this.searchSN) != -1) {
          var finalreqdata = this.getdata.appconstant + "suppsearch/" + this.searchSN
          return this.makeapi.method(finalreqdata, '', "get")
            .subscribe(data => {
              for(var i=0;i<data.length;i++){
                this.detailedreportdatas[i] = data[i].code;
                }
              this.searchSN = "";
            },
              Error => {
              });
        }
      }
  
  
  
      return this.makeapi.method(this.searchapi, reqdata, "post")
        .subscribe(data => {
          if (type == "pn") {
            this.partdatalists = data;
          }
          else {
            this.suppdatalists = data;
          }
        },
          Error => {
          });
    }
  
    AllpdfId: any;
  
    getAllpdfId() {
      this.getallpdfapi = this.getdata.appconstant + 'getPDF/'
      $('.checksingle:checkbox').prop('checked', true);
      var AllpdfId = $('.checksingle:checked').map(function () {
        return $(this).val();
      }).get();
      var id = '';
  
      this.AllpdfId = AllpdfId;
      for (var i = 0; i < this.AllpdfId.length; i++) {
  
        id = id + this.AllpdfId[i] + ','
      }
      $('.checksingle:checkbox').prop('checked', false);
      id = id.slice(0, -1);
      this.getallpdfapi = this.getallpdfapi + id;
      this.downloadPDF()
    }
    checkAll(ischecked) {
      if (ischecked == true) {
        $('.checksingle:checkbox').prop('checked', true);
        var checkfordownload = $('.checksingle:checked').map(function () {
          return $(this).val();
        }).get();
        this.checkfordownload = checkfordownload;
        console.log(this.checkfordownload)
      }
      else {
        $('.checksingle:checkbox').prop('checked', false);
        this.checkfordownload = [];
        console.log(this.checkfordownload)
  
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
  
  
  
    rpoil: any;
    vci: any;
    cpna: any;
    modaldata: any;
    title: any
    twowaypallet: any;
    fourwaypallet: any;
    heatreated: any;
    fumigated: any;
    forklift: any;
    manual: any;
    others: any;
    heattreated: any;
    npcm: any;
    viewreport(index) {
      return this.makeapi.method(this.packagingdetailapi + this.detailedreportdatas[index].id, "", "get")
        .subscribe(data => {
          $('#imgid1').attr('src', 'assets/img/plus.jpg');
          $('#imgid2').attr('src', 'assets/img/plus.jpg');
          $('#imgid3').attr('src', 'assets/img/plus.jpg');
          $('#imgid4').attr('src', 'assets/img/plus.jpg');
          $('#imgid5').attr('src', 'assets/img/plus.jpg');
          $('#imgid6').attr('src', 'assets/img/plus.jpg');
  
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
  
    id: any;
  
  
  
    partdata(keyvalue) {
      if (this.packdatalists.indexOf(keyvalue) != -1) {
        var finalreqdata = this.getdata.appconstant + "part/" + keyvalue
        return this.makeapi.method(finalreqdata, '', "get")
          .subscribe(data => {
            if (data.supplierCodes != null) {
              this.suppdatalists = data.supplierCodes;
            }
            else if (data.supplierMaster != null) {
              var getform = this.signOffSheetForm.value
              this.signOffSheetForm.value.supplierDetails.suppliercode = data.supplierMaster.cCode;
              getform.supplierDetails.suppliername = data.supplierMaster.cName;
              getform.supplierDetails.variant = data.supplierMaster.variant;
              getform.supplierDetails.address = data.supplierMaster.address;
              getform.supplierDetails.email = data.supplierMaster.email;
              getform.supplierDetails.contactperson = data.supplierMaster.contactperson;
              getform.supplierDetails.phonenumber = data.supplierMaster.phonenumber;
              getform.supplierDetails.fax = data.supplierMaster.fax;
              this.signOffSheetForm.patchValue(getform)
            }
            var getform = this.signOffSheetForm.value
            getform.partDetails.partname = data.partMaster.cPartName;
            getform.partDetails.partnumber = data.partMaster.cPartNumber;
            if (data.partMaster.plantcode != null || data.partMaster.plantcode != undefined) {
              getform.partDetails.plantcode = data.partMaster.plantcode;
            }
            if (data.partMaster.plantname != null || data.partMaster.plantname != undefined) {
              getform.partDetails.plantname = data.partMaster.plantname;
            }
            getform.partDetails.id = data.partMaster.id;
            getform.partDetails.email = data.partMaster.email;
            getform.partDetails.contact = data.partMaster.contact;
            getform.partDetails.buyername = data.partMaster.buyername;
            this.signOffSheetForm.patchValue(getform);
          },
            Error => {
            });
      }
      else {
        let reqdata = "&partnumber=" + keyvalue
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
        var finalreqdata = this.getdata.appconstant + "supp/" + keyvalue
        return this.makeapi.method(finalreqdata, '', "get")
          .subscribe(data => {
            var getform = this.signOffSheetForm.value
            this.signOffSheetForm.value.supplierDetails.suppliercode = data.cCode;
            getform.supplierDetails.suppliername = data.cName;
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
        var reqdata = "suppliercode=" + keyvalue
        return this.makeapi.method(this.searchSuppDataapi, reqdata, "post")
          .subscribe(data => {
            for(var i=0;i<data.length;i++){
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
  
  
  
    cancel() {
      this.filename = "";
      this.errorupload = "";
      this.fileupload.nativeElement.value = "";
      this.getdata.showNotification('bottom', 'right', 'File upload canceled successfully!!', "danger");
      $('#Reject').modal("hide");
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
      console.log(this.signOffSheetForm.value)
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
  
      var getform = this.signOffSheetForm.value;
      getform["id"] = this.loadPackMasterId;
      getform["userid"] = this.edituserid;
      getform["status"] = this.loadStatus;
      getform.packagingDetails["id"] = this.loadPackMasterId;
      getform["revision"] = this.revisionid;
      getform.partDetails["id"] = this.loadPackMasterId;
      getform.primaryPackaging["id"] = this.loadPackMasterId;
      getform.secondaryPackaging["id"] = this.loadPackMasterId;
      getform.supplierDetails["id"] = this.loadPackMasterId;
  
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
  
  
      var reqdata = this.signOffSheetForm.value;
      this.getdata.method(this.getdata.appconstant + 'packaging', JSON.stringify(reqdata), 'postjson')
        .subscribe(data => {
  
          $('#typepack').removeClass("load-valid")
          this.signoffsubmitedid = this.loadPackMasterId;
  
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
  
  
          this.changeimageevent1 = false;
          this.changeimageevent2 = false;
          this.changeimageevent3 = false;
          this.changeimageevent4 = false;
          this.changeimageevent5 = false;
          this.changeimageevent6 = false;
  
          this.closeimage(1);
          this.closeimage(2);
          this.closeimage(3);
          this.closeimage(4);
          this.closeimage(5);
          this.closeimage(6);
          this.rpoilspecdisplay = "notshow";
          this.vcispecdisplay = 'notshow';
          this.naspecdisplay = 'notshow';
  
          $("#editmodal").modal('hide')
  
          this.getdata.showNotification('bottom', 'right', " Form edited successfully", "success");
  
          this.signOffSheetForm.reset();
  
          var getform = this.signOffSheetForm.value
          getform.packagingDetails.forklift = true;
          getform.packagingDetails.twowaypallet = true;
          getform.packagingDetails.tempStorageSpec = true;
  
          $("#fk").prop("checked", true);
          $("#tp").prop("checked", true);
          $("#sl").prop("checked", true);
  
          this.signOffSheetForm.patchValue(getform);
          this.getsigfoffdata();
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
            if (data.status == "Success") {
              this.getsigfoffdata();
            }
  
          },
          Error => {
          });
    }
  
    editconfirm() {
      if (!this.signOffSheetForm.valid) {
        this.markFormGroupTouched(this.signOffSheetForm);
        this.getdata.showNotification('bottom', 'right', 'Some mandatory fields are  missing .Please fill all the fields.', "danger");
        return false;
      }
      if (this.signOffSheetForm.value.packagingDetails.cpna == true && this.naspecError != '') {
        this.getdata.showNotification('bottom', 'right', 'In CORROSION PROTECTION METHOD NA reasons are invalid.', "danger");
        return false;
      }
      else if (this.signOffSheetForm.value.packagingDetails.vci == true && this.vcispecError != '') {
        this.getdata.showNotification('bottom', 'right', 'In CORROSION PROTECTION METHOD VCI Specification are invalid.', "danger");
        return false;
      }
      else if (this.signOffSheetForm.value.packagingDetails.rpoil == true && this.rpoilspecError != '') {
        this.getdata.showNotification('bottom', 'right', 'In CORROSION PROTECTION METHOD RP OIL Specification are invalid.', "danger");
        return false;
      }
      else if (this.signOffSheetForm.value.packagingDetails.handleOther == true && this.signOffSheetForm.value.packagingDetails.handleReason == '') {
        this.getdata.showNotification('bottom', 'right', "In MODE OF HANDLING Reasons  are required. ", "danger");
        return false;
      }
      else if (this.signOffSheetForm.value.packagingDetails.cpna == true && this.signOffSheetForm.value.packagingDetails.nareason == '') {
        this.getdata.showNotification('bottom', 'right', "In CORROSION PROTECTION METHOD NA specification are Invalid.", "danger");
        return false;
      }
      else if (this.signOffSheetForm.value.packagingDetails.tempStorageSpec == true && this.signOffSheetForm.value.packagingDetails.shellLife == '') {
        this.getdata.showNotification('bottom', 'right', " Shelf Life is require ", "danger");
        return false;
      }
  
      else if (this.errorimage1 != "") {
        this.getdata.showNotification('bottom', 'right', 'Some mandatory fields are  missing .Please fill all the fields.', "danger");
        return false;
      }
      else if (this.errorimage5 != "") {
        this.getdata.showNotification('bottom', 'right', 'Some mandatory fields are  missing .Please fill all the fields.', "danger");
        return false;
      }
      else if (this.errorimage6 != "") {
        this.getdata.showNotification('bottom', 'right', 'Some mandatory fields are  missing .Please fill all the fields.', "danger");
        return false;
      }
      else {
        this.signofsheetsubmit();
      }
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
  
  
    private markFormGroupTouched(formGroup: FormGroup) {
      (<any>Object).values(formGroup.controls).forEach(control => {
        control.markAsTouched();
  
        if (control.controls) {
          this.markFormGroupTouched(control);
        }
      });
    }
  
    packdatauploadlists = [];
    partuploaddata(keyvalue) {
      if (this.packdatauploadlists.includes(keyvalue) == true) {
        var finalreqdata = this.getdata.appconstant + "part/" + keyvalue
        return this.makeapi.method(finalreqdata, '', "get")
          .subscribe(data => {
            var getform = this.signOffuploadForm.value
            getform.partDetails.partname = data.partMaster.CPartName;
            getform.partDetails.partnumber = data.partMaster.cPartNumber;
            getform.plantcode = data.partMaster.plantcode;
            getform.plantname = data.partMaster.plantname;
            getform.id = data.partMaster.id;
            getform.email = data.partMaster.email;
            getform.contact = data.partMaster.contact;
            getform.buyername = data.partMaster.buyername;
            this.signOffuploadForm.patchValue(getform)
          },
            Error => {
            });
      }
      let reqdata = "&partnumber=" + keyvalue
      return this.makeapi.method(this.searchPartDataapi, reqdata, "post")
        .subscribe(data => {
          this.packdatauploadlists = data;
          console.log(this.packdatauploadlists)
        },
          Error => {
          });
    }
  
  
  
    loadcount: any;
    loadPackMasterId: any;
    loadDataresponse: any;
    revisionid: any;
    edituserid: any;
    loadStatus: any;
    editmodal(id, userid) {
      console.log(userid)
      var getform = this.signOffSheetForm.value
      getform.primaryPackaging.packagingtype = 'Select';
      getform.supplierDetails.region = 'Select';
      getform.packagingDetails.tempStorageSpec = true;
      getform.packagingDetails.shellLife = '';
      getform.packagingDetails.twowaypallet = true;
      getform.packagingDetails.fourwaypallet = false;
      getform.packagingDetails.heatreated = false;
      getform.packagingDetails.fumigated = false;
      getform.packagingDetails.forklift = false;
      getform.packagingDetails.manual = false;
      getform.packagingDetails.handleOther = false;
      getform.packagingDetails.handleReason = '';
      getform.packagingDetails.rpoil = false;
      getform.packagingDetails.vci = false;
      getform.packagingDetails.cpna = false;
      getform.packagingDetails.rpoilspec = '';
      getform.packagingDetails.vcispec = '';
      getform.packagingDetails.nareason = '';
      this.signOffSheetForm.patchValue(getform);
      $('#twowaypallet').prop('checked', true);
      $('#tepmpspec').prop('checked', true);
      $('#forkliftrad').prop('checked', true);
      this.mohradio('forklift');
      this.mohradio('manual');
  
      $('#palrpi').removeClass('disableNgStyle');
      $('#palvci').removeClass('disableNgStyle');
  
  
  
  
  
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
      if (id != null) {
        var reqdata = 'refno=' + id + '&userid=' + userid + '&roleid=' + this.roleid
        return this.makeapi.method(this.getdata.appconstant + 'load', reqdata, "post")
          .subscribe(data => {
            this.loadDataresponse = data
            this.revisionid = data.revision
            this.edituserid = data.userid
            this.loadStatus = data.status
  
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
            if ((data.primaryPackaging.dicvPack == 'Yes') || (data.primaryPackaging.dicvPack == 'yes')) {
              $('#dfcipackid').removeClass('disableNgStyle');
              var getform = this.signOffSheetForm.value
              getform.primaryPackaging.dicvPack = 'Yes';
              this.signOffSheetForm.patchValue(getform);
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
              $('#typepack').removeClass("form-control ng-untouched ng-pristine ng-valid")
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
  
              $('#regionselect').removeClass("form-control ng-untouched ng-pristine ng-valid")
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
  
            $("#editmodal").modal('show')
  
          },
            Error => {
            });
      }
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
      // if(this.signOffSheetForm.value.secondaryPackaging.boxesperlayer == null || this.signOffSheetForm.value.secondaryPackaging.nooflayers == null ){
      //   var getform = this.signOffSheetForm.value
      //   getform.secondaryPackaging.noofboxes = 0
      //   this.signOffSheetForm.patchValue(getform);
      // }
      // if(this.signOffSheetForm.value.primaryPackaging.piecespercontainer == null ||this.signOffSheetForm.value.secondaryPackaging.noofboxes == null){
      //   var getform = this.signOffSheetForm.value
      //   getform.secondaryPackaging.loadquantity = 0
      //   this.signOffSheetForm.patchValue(getform);
      // }
      // if(this.signOffSheetForm.value.primaryPackaging.piecespercontainer == null || this.signOffSheetForm.value.primaryPackaging.tareweight == null || this.signOffSheetForm.value.secondaryPackaging.tareweight == null){
      //   var getform = this.signOffSheetForm.value
      //   getform.secondaryPackaging.packheight = 0;
      //   this.signOffSheetForm.patchValue(getform);
      // }
      // if (this.signOffSheetForm.value.primaryPackaging.piecespercontainer == null ||this.signOffSheetForm.value.primaryPackaging.tareweight == null || this.signOffSheetForm.value.secondaryPackaging.tareweight == null) {
      //   var getform = this.signOffSheetForm.value
      //   getform.secondaryPackaging.grossweight = 0;
      //   this.signOffSheetForm.patchValue(getform);
      // }
    }
    singlecheckboxval() {
      let importantval = $(".checksingle:checkbox:checked").map(function () {
        var getdata = this.value;
        return getdata;
      }).get();
      this.checkfordownload = importantval;
    }
  
    dfcipack(event) {
      if (event == true) {
        $('#dfcipackid').removeClass('disableNgStyle');
      }
      else {
        $('#dfcipackid').addClass('disableNgStyle');
      }
    }
  
  
    searchbtn(type) {
      if (type == 'pn') {
        var reqdata;
        reqdata = '&partnumber=' + this.searchPN;
        this.searchapi = this.searchapi + 'searchPartData';
        var finalreqdata = this.getdata.appconstant + "partsearch/" + this.searchPN
        return this.makeapi.method(finalreqdata, '', "get")
          .subscribe(data => {
            for(var i=0;i<data.length;i++){
              this.detailedreportdatas[i] = data[i].code;
              }
            this.searchPN = "";
          },
            Error => {
            });
      }
      else {
        reqdata = '&suppliercode=' + this.searchSN;
        this.searchapi = this.searchapi + 'searchSupplier';
        var finalreqdata = this.getdata.appconstant + "suppsearch/" + this.searchSN
        return this.makeapi.method(finalreqdata, '', "get")
          .subscribe(data => {
            for(var i=0;i<data.length;i++){
              this.detailedreportdatas[i] = data[i].code;
              }
            this.searchSN = "";
          },
            Error => {
            });
      }
    }
  
    setPage(page: number) {
  
      this.getSingleSignoffdata(page);
      this.pager = this.pagerService.getPager(this.totalcount, page);
      this.pagedItems = this.detailedreportdatas.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
    searchkeyvalue = '';
    searchsignoff(keyvalue) {
      this.searchkeyvalue = keyvalue;
      this.PAGECOUNT(this.pagination);
      this.paginacount(this.pagination)
    }
    paginacount(id) {
      var reqdata = 'userid=' + this.getdata.session().id + '&pagination=' + id + '&searchstr=' + this.searchkeyvalue + '&roleid=' + this.roleid
      return this.makeapi.method(this.packagingapi, reqdata, "post")
        .subscribe(data => {
          this.detailedreportdatas = data;
        },
          Error => {
          });
    }
    PAGECOUNT(ID) {
      var reqdata = 'userid=' + this.getdata.session().id + '&searchstr=' + this.searchkeyvalue + '&roleid=' + this.roleid
      return this.makeapi.method(this.paginationapi, reqdata, "post")
        .subscribe(data => {
          this.totalcount = data.count;
          this.pager = this.pagerService.getPager(this.totalcount, ID);
        },
          Error => {
          });
    }
  
    name: any;
    download() {
      let reqdata = { "name": this.name }
      return this.makeapi.method(this.exportLogApi, reqdata, "JWTExcel")
        .subscribe(res => {
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
    downloadPDF() {
      let reqdata = { "name": this.name };
      console.log(this.getallpdfapi);
      return this.makeapi.method(this.getallpdfapi, reqdata, "JWTPDF_ZIP")
        .subscribe(res => {
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
    singlepdfDownload(id, partno, suppcode) {
      this.makeapi.id = id;
      this.makeapi.partno = partno;
      this.makeapi.suppliercode = suppcode;
      let reqdata = { "name": this.name };
      return this.makeapi.method(this.singlePdfapi + '?id=' + id, reqdata, "JWTPDF")
        .subscribe(res => {
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
  