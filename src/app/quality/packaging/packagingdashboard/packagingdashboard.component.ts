import { Component, OnInit, Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
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
declare var $;
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-packagingdashboard',
  templateUrl: './packagingdashboard.component.html',
  styleUrls: ['./packagingdashboard.component.css']
})
export class PackagingdashboardComponent implements OnInit {

  constructor(private http: Http, private ref: ChangeDetectorRef, private getdata: WebService, private Formbuilder: FormBuilder, private router: Router, private makeapi: WebService, ) {



  }

  piechartdata: Array<{ region: string, returnable: number, nonReturnable: number, renpercentage: number, nonpercentage: number }>
  supppiechartdata: Array<{ region: string, returnable: number, nonReturnable: number, renpercentage: number, nonpercentage: number }>

  ageingcount = [];

  piechart2: any;
  piechart1: any;
  piechart3: any;
  piechart4: any;
  barchart1: any;
  barchart2: any;
  donut1: any;
  donut2: any;
  donut3: any;
  items: Array<{ name: string, count: number, color: string }>
  items2: Array<{ name: string, count: number, color: string }>
  items3: Array<{ name: string, count: number, color: string }>
  items4: Array<{ name: string, count: number, color: string }>
  items5: Array<{ name: string, count: number, color: string }>
  items6: Array<{ name: string, count: number, color: string }>


  suppitems: Array<{ name: string, count: number, color: string }>
  suppitems2: Array<{ name: string, count: number, color: string }>
  suppitems3: Array<{ name: string, count: number, color: string }>
  suppitems4: Array<{ name: string, count: number, color: string }>
  suppitems5: Array<{ name: string, count: number, color: string }>
  suppitems6: Array<{ name: string, count: number, color: string }>
  // waterfall1;
  // waterfall2;
  // waterfall3;
  // waterfall4;


  private getPackTypeCountapi = this.getdata.appconstant + 'getPackTypeCount';
  private getSignOffCountapi = this.getdata.appconstant + 'getSignOffCount';
  private getPackCountByPartNumber = this.getdata.appconstant + 'getPackCountByPartNumber';
  private getPackCountBySuppCode = this.getdata.appconstant + 'getPackCountBySuppCode';
  private getagingCounteapi = this.getdata.appconstant + 'getAgingCount';
  private getPackWeeklyReportAPI = this.getdata.appconstant + 'getWeeklyReportData';

  ngOnInit() {

    console.log("Dash Result");

    this.piechartdata = [
      { "region": "north", "returnable": 0, "nonReturnable": 0, 'renpercentage': 0, 'nonpercentage': 0 },
      { "region": "south", "returnable": 0, "nonReturnable": 0, 'renpercentage': 0, 'nonpercentage': 0 },
      { "region": "west", "returnable": 0, "nonReturnable": 0, 'renpercentage': 0, 'nonpercentage': 0 },
      { "region": "east", "returnable": 0, "nonReturnable": 0, 'renpercentage': 0, 'nonpercentage': 0 },
      { "region": "chennai", "returnable": 0, "nonReturnable": 0, 'renpercentage': 0, 'nonpercentage': 0 },
      { "region": "central", "returnable": 0, "nonReturnable": 0, 'renpercentage': 0, 'nonpercentage': 0 },

    ]

    this.supppiechartdata = [
      { "region": "north", "returnable": 0, "nonReturnable": 0, 'renpercentage': 0, 'nonpercentage': 0 },
      { "region": "south", "returnable": 0, "nonReturnable": 0, 'renpercentage': 0, 'nonpercentage': 0 },
      { "region": "west", "returnable": 0, "nonReturnable": 0, 'renpercentage': 0, 'nonpercentage': 0 },
      { "region": "east", "returnable": 0, "nonReturnable": 0, 'renpercentage': 0, 'nonpercentage': 0 },
      { "region": "chennai", "returnable": 0, "nonReturnable": 0, 'renpercentage': 0, 'nonpercentage': 0 },
      { "region": "central", "returnable": 0, "nonReturnable": 0, 'renpercentage': 0, 'nonpercentage': 0 },
    ]

    this.ageingcount = [{ "level1": 0, "level2": 0, "teamname": "SMQ" },
    { "level1": 0, "level2": 0, "teamname": "IPL" },
    { "level1": 0, "level2": 0, "teamname": "production" }]


    $('[data-toggle="tooltip"]').tooltip();


    this.getallcountdata();
    this.getsignoffcount();
    this.getallsuppcountdata();
    this.getagingCounte();



    this.makeapi.method(this.getPackWeeklyReportAPI, '', "get")
      .subscribe(data => {
        console.log(data);
        this.renderOnlinePackaging(data);
      });


  }


  displayTotals = {}
  renderOnlinePackaging(data) {
    var detailMap = {};
    data.map((item, index) => {
      if (detailMap[item['teamname']] == undefined) {
        detailMap[item['teamname']] = {}
        // detailMap[item['teamname']]['values'] = item['values']
      } else {
        // detailMap[item['teamname']]['values'] = item['values']
        // detailMap[item['teamname']][item['status']] = item['count']
      }

      item['values'].map((valitem) => {
        detailMap[item['teamname']][valitem['status']] = valitem['count']
      });




    })



    var teamKeys = Object.keys(detailMap);
    var waterfallValueArr = [];

    for (var k = 0; k < teamKeys.length; k++) {
      var teamName = teamKeys[k];
      var teamObj = detailMap[teamName];
      var total = teamObj['pending'] + teamObj['approved'] + teamObj['rejected'];
      detailMap[teamName]['total'] = total;

      var valArr = [];
      valArr.push(detailMap[teamName]['total']);
      valArr.push(detailMap[teamName]['approved']);
      valArr.push(detailMap[teamName]['rejected']);
      valArr.push(detailMap[teamName]['pending']);
      waterfallValueArr.push(valArr);

    }



    this.displayTotals['mhe'] = detailMap['mhe']['total']
    this.displayTotals['production'] = detailMap['production']['approved']
    this.displayTotals['rejected'] = detailMap['mhe']['rejected'] + detailMap['smq']['rejected'] + detailMap['ipl']['rejected'] + detailMap['production']['rejected']
    this.displayTotals['pending'] = detailMap['mhe']['pending'] + detailMap['smq']['pending'] + detailMap['ipl']['pending'] + detailMap['production']['pending']
    this.displayTotals['percent'] = Math.round((this.displayTotals['production'] / this.displayTotals['mhe']) * 100)


    console.log(this.displayTotals);



  }
  waterfall1 = new Chart({
    chart: {
      type: 'waterfall',
      height: 250,

    },

    title: {
      text: ''
    },

    // xAxis: {
    //   type: 'category',
    //   labels: {
    //     autoRotation: false
    //   }
    // },

    yAxis: {
      min: 0,

      title: {
        text: ' '
      }
    },

    legend: {
      enabled: false
    },
    plotOptions: {
      column: {
        stacking: 'normal',


      }
    },

    tooltip: {
      pointFormat: '<b>{point.y}</b> '
    },

    series: [{
     
      data: [{
        name: "Supplier Sign off Uploaded",
        y:80,
        color: "#c1c0bc",
        dataLabels: {
          enabled: true,
        }
      }, {
        name: "MHE Approved",
        y: - 40,
        color: "#68a943",
        dataLabels: {
          enabled: true,
        }
      }, {
        name: "DICV Rejected",
        y: -20,
        color: "#af3740",
        dataLabels: {
          enabled: true,
        },

      },
      {
        name: "Awaiting MHE Approval",
        y: -10,
        color: "#ffc700",
        dataLabels: {
          enabled: true,
        },

      }
      ],

    }]
  });
 waterfall2 = new Chart({
    chart: {
      type: 'waterfall',
      height: 250,
    },

    title: {
      text: ''
    },

    // xAxis: {
    //   type: 'category',
    //   labels: {
    //     autoRotation: false
    //   }
    // },

    yAxis: {
      min: 0,

      title: {
        text: ' '
      }
    },

    legend: {
      enabled: false
    },
    plotOptions: {
      column: {
        stacking: 'normal',


      }
    },

    tooltip: {
      pointFormat: '<b>{point.y}</b> '
    },

    series: [{
     
      data: [{
        name: "MHE Completed",
        y: 69,
        color: "#c1c0bc",
        dataLabels: {
          enabled: true,
        }
      }, {
        name: "SM Approved",
        y: -56,
        color: "#68a943",
        dataLabels: {
          enabled: true,
        }
      }, {
        name: "SM Rejected",
        y: -43,
        color: "#af3740",
        dataLabels: {
          enabled: true,
        },

      },
      {
        name: "Awaiting SM Approval",
        y: -34,
        color: "#ffc700",
        dataLabels: {
          enabled: true,
        },

      }
      ],

    }]
  });
 waterfall3 = new Chart({
    chart: {
      type: 'waterfall',
      height: 250,
    },

    title: {
      text: ''
    },

    // xAxis: {
    //   type: 'category',
    //   labels: {
    //     autoRotation: false
    //   }
    // },

    yAxis: {
      min: 0,

      title: {
        text: ' '
      }
    },

    legend: {
      enabled: false
    },
    plotOptions: {
      column: {
        stacking: 'normal',


      }
    },

    tooltip: {
      pointFormat: '<b>{point.y}</b> '
    },

    series: [{
    
      data: [{
        name: "SM Completed",
        y:98,
        color: "#c1c0bc",
        dataLabels: {
          enabled: true,
        }
      }, {
        name: "IPL Approved",
        y: -67,
        color: "#68a943",
        dataLabels: {
          enabled: true,
        }
      }, {
        name: "IPL Rejected",
        y: -45,
        color: "#af3740",
        dataLabels: {
          enabled: true,
        },

      },
      {
        name: "Awaiting IPL Approval",
        y: -23,
        color: "#ffc700",
        dataLabels: {
          enabled: true,
        },

      }
      ],

    }]
  });
waterfall4 = new Chart({
    chart: {
      type: 'waterfall',
      height: 250,
    },

    title: {
      text: ''
    },

    // xAxis: {
    //   type: 'category',
    //   labels: {
    //     autoRotation: false
    //   }
    // },

    yAxis: {
      min: 0,

      title: {
        text: ' '
      }
    },

    legend: {
      enabled: false
    },
    plotOptions: {
      column: {
        stacking: 'normal',


      }
    },

    tooltip: {
      pointFormat: '<b>{point.y}</b> '
    },
    series: [{
     
      data: [{
        name: "IPL Completed",
        y:97,
        color: "#c1c0bc",
        dataLabels: {
          enabled: true,
        }
      }, {
        name: "Production Approved",
        y: -45,
        color: "#68a943",
        dataLabels: {
          enabled: true,
        }
      }, {
        name: "Production Rejected",
        y: -34,
        color: "#af3740",
        dataLabels: {
          enabled: true,
        },

      },
      {
        name: "Awaiting Production Approval",
        y: -14,
        color: "#ffc700",
        dataLabels: {
          enabled: true,
        },

      }
      ],

    }]
  });


  getallcountdata() {
    return this.makeapi.method(this.getPackCountByPartNumber, '', "post")
      .subscribe(data => {

        for (var i = 0; i < data.length; i++) {
          if (data[i].region == 'north') {
            this.piechartdata[0].returnable = Number(data[i].returnable);
            this.piechartdata[0].nonReturnable = Number(data[i].nonReturnable);

            var returnpercentage = ((this.piechartdata[0].returnable) / ((this.piechartdata[0].returnable) + (this.piechartdata[0].nonReturnable))) * 100;

            var nonreturnpercentage = ((this.piechartdata[0].nonReturnable) / ((this.piechartdata[0].returnable) + (this.piechartdata[0].nonReturnable))) * 100;

            this.piechartdata[0].renpercentage = returnpercentage;
            this.piechartdata[0].nonpercentage = nonreturnpercentage

          }
          else if (data[i].region == 'south') {
            this.piechartdata[1].returnable = Number(data[i].returnable);
            this.piechartdata[1].nonReturnable = Number(data[i].nonReturnable);

            var returnpercentage = ((this.piechartdata[1].returnable) / ((this.piechartdata[1].returnable) + (this.piechartdata[1].nonReturnable))) * 100;

            var nonreturnpercentage = ((this.piechartdata[1].nonReturnable) / ((this.piechartdata[1].returnable) + (this.piechartdata[1].nonReturnable))) * 100;

            this.piechartdata[1].renpercentage = returnpercentage;
            this.piechartdata[1].nonpercentage = nonreturnpercentage
          }
          else if (data[i].region == 'central') {
            this.piechartdata[5].returnable = Number(data[i].returnable)
            this.piechartdata[5].nonReturnable = Number(data[i].nonReturnable);

            var returnpercentage = ((this.piechartdata[5].returnable) / ((this.piechartdata[5].returnable) + (this.piechartdata[5].nonReturnable))) * 100;

            var nonreturnpercentage = ((this.piechartdata[5].nonReturnable) / ((this.piechartdata[5].returnable) + (this.piechartdata[5].nonReturnable))) * 100;

            this.piechartdata[5].renpercentage = returnpercentage;
            this.piechartdata[5].nonpercentage = nonreturnpercentage
          }
          else if (data[i].region == 'chennai') {
            this.piechartdata[4].returnable = Number(data[i].returnable)
            this.piechartdata[4].nonReturnable = Number(data[i].nonReturnable);

            var returnpercentage = ((this.piechartdata[4].returnable) / ((this.piechartdata[4].returnable) + (this.piechartdata[4].nonReturnable))) * 100;

            var nonreturnpercentage = ((this.piechartdata[4].nonReturnable) / ((this.piechartdata[4].returnable) + (this.piechartdata[4].nonReturnable))) * 100;

            this.piechartdata[4].renpercentage = returnpercentage;
            this.piechartdata[4].nonpercentage = nonreturnpercentage
          }
          else if (data[i].region == 'east') {
            this.piechartdata[3].returnable = Number(data[i].returnable)
            this.piechartdata[3].nonReturnable = Number(data[i].nonReturnable);

            var returnpercentage = ((this.piechartdata[3].returnable) / ((this.piechartdata[3].returnable) + (this.piechartdata[3].nonReturnable))) * 100;

            var nonreturnpercentage = ((this.piechartdata[3].nonReturnable) / ((this.piechartdata[3].returnable) + (this.piechartdata[3].nonReturnable))) * 100;

            this.piechartdata[3].renpercentage = returnpercentage;
            this.piechartdata[3].nonpercentage = nonreturnpercentage
          }
          else if (data[i].region == 'west') {
            this.piechartdata[2].returnable = Number(data[i].returnable)
            this.piechartdata[2].nonReturnable = Number(data[i].nonReturnable);
            var returnpercentage = ((this.piechartdata[2].returnable) / ((this.piechartdata[2].returnable) + (this.piechartdata[2].nonReturnable))) * 100;

            var nonreturnpercentage = ((this.piechartdata[2].nonReturnable) / ((this.piechartdata[2].returnable) + (this.piechartdata[2].nonReturnable))) * 100;

            this.piechartdata[2].renpercentage = returnpercentage;
            this.piechartdata[2].nonpercentage = nonreturnpercentage
          }
        }



        this.items = [
          { name: 'Returnable', count: Number(this.piechartdata[3].returnable), color: '#27c24c' },
          { name: 'Non-Returnable', count: Number(this.piechartdata[3].nonReturnable), color: '#ccc' },
        ];
        this._total = this.items.map(a => a.count).reduce((x, y) => x + y);

        this.items2 = [
          { name: 'Returnable', count: Number(this.piechartdata[4].returnable), color: '#27c24c' },
          { name: 'Non-Returnable', count: Number(this.piechartdata[4].nonReturnable), color: '#ccc' },
        ];
        this._total2 = this.items2.map(a => a.count).reduce((x, y) => x + y);

        this.items3 = [
          { name: 'Returnable', count: Number(this.piechartdata[2].returnable), color: '#27c24c' },
          { name: 'Non-Returnable', count: Number(this.piechartdata[2].nonReturnable), color: '#ccc' },
        ];
        this._total3 = this.items3.map(a => a.count).reduce((x, y) => x + y);
        this.items4 = [
          { name: 'Returnable', count: Number(this.piechartdata[0].returnable), color: '#27c24c' },
          { name: 'Non-Returnable', count: Number(this.piechartdata[0].nonReturnable), color: '#ccc' },
        ];
        this._total4 = this.items4.map(a => a.count).reduce((x, y) => x + y);
        this.items5 = [
          { name: 'Returnable', count: Number(this.piechartdata[1].returnable), color: '#27c24c' },
          { name: 'Non-Returnable', count: Number(this.piechartdata[1].nonReturnable), color: '#ccc' },
        ];
        this._total5 = this.items5.map(a => a.count).reduce((x, y) => x + y);
        this.items6 = [
          { name: 'Returnable', count: Number(this.piechartdata[5].returnable), color: '#27c24c' },
          { name: 'Non-Returnable', count: Number(this.piechartdata[5].nonReturnable), color: '#ccc' },
        ];
        this._total6 = this.items6.map(a => a.count).reduce((x, y) => x + y);
      },
        Error => {
        });

  }
  barchart3 = new Chart({
    chart: {
      type: 'bar'
    },
    title: {
      text: 'ISPR COUNTS'
    },
    xAxis: {
      categories: ['Counts']
    },
    yAxis: {
      min: 0,
      title: {
        text: ''
      }
    },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    series: [
    
      {
        type: 'bar',
      name: 'Raised',
      data: [23]
    }, {
      type: 'bar',
      name: 'Assigned',
      data: [24]
    }, {
      type: 'bar',
      name: 'Accepted',
      data: [33]
    }]
  });
  barchart4 = new Chart({
    chart: {
      type: 'column'
    },
    title: {
      text: 'ASSIGNED ISPR'
    },
    xAxis: {
      categories: ['North', 'South', 'East', 'Central', 'West', 'Chennai']
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
      type: 'bar',
      name: 'MHE',
      data: [0, 1, 0, 6, 0, 421]
    }, {
      type: 'bar',
      name: 'SM',
      data: [7, 1, 0, 0, 3, 15]
    }, {
      type: 'bar',
      name: 'IPL',
      data: [0, 0, 6, 0, 2, 53]
    }, {
      type: 'bar',
      name: 'PRODUCTION',
      data: [3, 0, 3, 0, 5, 35]
    }]
  });

  getagingCounte() {
    return this.makeapi.method(this.getagingCounteapi, '', "post")
      .subscribe(data => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].teamname == 'SMQ') {
            this.ageingcount[0].level1 = data[i].level1;
            this.ageingcount[0].level2 = data[i].level2;
          }
          else if (data[i].teamname == 'IPL') {
            this.ageingcount[1].level1 = data[i].level1;
            this.ageingcount[1].level2 = data[i].level2;
          }
          else if (data[i].teamname == 'production') {
            this.ageingcount[2].level1 = data[i].level1;
            this.ageingcount[2].level2 = data[i].level2;
          }
        }
        this.barchart1 = new Chart({
          chart: {
            type: 'column'
          },
          title: {
            text: 'AGEING STATUS'
          },
          xAxis: {
            categories: ['Level 1', 'Level 2']
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
            name: 'SM',
            data: [Number(this.ageingcount[0].level1), Number(this.ageingcount[0].level2)]
          }, {
            type: 'column',
            name: 'IPL',
            data: [Number(this.ageingcount[1].level1), Number(this.ageingcount[1].level2)]
          }, {
            type: 'column',
            name: 'PRODUCTION',
            data: [Number(this.ageingcount[2].level1), Number(this.ageingcount[2].level2)]
          }]
        });
      },
        Error => {
        });

  }
  getallsuppcountdata() {
    return this.makeapi.method(this.getPackCountBySuppCode, '', "post")
      .subscribe(data => {


        for (var i = 0; i < data.length; i++) {
          if (data[i].region == 'north') {
            this.supppiechartdata[0].returnable = Number(data[i].returnable);
            this.supppiechartdata[0].nonReturnable = Number(data[i].nonReturnable);

            var returnpercentage = ((this.supppiechartdata[0].returnable) / ((this.supppiechartdata[0].returnable) + (this.supppiechartdata[0].nonReturnable))) * 100;

            var nonreturnpercentage = ((this.supppiechartdata[0].nonReturnable) / ((this.supppiechartdata[0].returnable) + (this.supppiechartdata[0].nonReturnable))) * 100;

            this.supppiechartdata[0].renpercentage = returnpercentage;
            this.supppiechartdata[0].nonpercentage = nonreturnpercentage

          }
          else if (data[i].region == 'south') {
            this.supppiechartdata[1].returnable = Number(data[i].returnable);
            this.supppiechartdata[1].nonReturnable = Number(data[i].nonReturnable);

            var returnpercentage = ((this.supppiechartdata[1].returnable) / ((this.supppiechartdata[1].returnable) + (this.supppiechartdata[1].nonReturnable))) * 100;

            var nonreturnpercentage = ((this.supppiechartdata[1].nonReturnable) / ((this.supppiechartdata[1].returnable) + (this.supppiechartdata[1].nonReturnable))) * 100;

            this.supppiechartdata[1].renpercentage = returnpercentage;
            this.supppiechartdata[1].nonpercentage = nonreturnpercentage
          }
          else if (data[i].region == 'central') {
            this.supppiechartdata[5].returnable = Number(data[i].returnable)
            this.supppiechartdata[5].nonReturnable = Number(data[i].nonReturnable);

            var returnpercentage = ((this.supppiechartdata[5].returnable) / ((this.supppiechartdata[5].returnable) + (this.supppiechartdata[5].nonReturnable))) * 100;

            var nonreturnpercentage = ((this.supppiechartdata[5].nonReturnable) / ((this.supppiechartdata[5].returnable) + (this.supppiechartdata[5].nonReturnable))) * 100;

            this.supppiechartdata[5].renpercentage = returnpercentage;
            this.supppiechartdata[5].nonpercentage = nonreturnpercentage
          }
          else if (data[i].region == 'chennai') {
            this.supppiechartdata[4].returnable = Number(data[i].returnable)
            this.supppiechartdata[4].nonReturnable = Number(data[i].nonReturnable);

            var returnpercentage = ((this.supppiechartdata[4].returnable) / ((this.supppiechartdata[4].returnable) + (this.supppiechartdata[4].nonReturnable))) * 100;

            var nonreturnpercentage = ((this.supppiechartdata[4].nonReturnable) / ((this.supppiechartdata[4].returnable) + (this.supppiechartdata[4].nonReturnable))) * 100;

            this.supppiechartdata[4].renpercentage = returnpercentage;
            this.supppiechartdata[4].nonpercentage = nonreturnpercentage
          }
          else if (data[i].region == 'east') {
            this.supppiechartdata[3].returnable = Number(data[i].returnable)
            this.supppiechartdata[3].nonReturnable = Number(data[i].nonReturnable);

            var returnpercentage = ((this.supppiechartdata[3].returnable) / ((this.supppiechartdata[3].returnable) + (this.supppiechartdata[3].nonReturnable))) * 100;

            var nonreturnpercentage = ((this.supppiechartdata[3].nonReturnable) / ((this.supppiechartdata[3].returnable) + (this.supppiechartdata[3].nonReturnable))) * 100;

            this.supppiechartdata[3].renpercentage = returnpercentage;
            this.supppiechartdata[3].nonpercentage = nonreturnpercentage
          }
          else if (data[i].region == 'west') {
            this.supppiechartdata[2].returnable = Number(data[i].returnable)
            this.supppiechartdata[2].nonReturnable = Number(data[i].nonReturnable);


            var returnpercentage = ((this.supppiechartdata[2].returnable) / ((this.supppiechartdata[2].returnable) + (this.supppiechartdata[2].nonReturnable))) * 100;

            var nonreturnpercentage = ((this.supppiechartdata[2].nonReturnable) / ((this.supppiechartdata[2].returnable) + (this.supppiechartdata[2].nonReturnable))) * 100;

            this.supppiechartdata[2].renpercentage = returnpercentage;
            this.supppiechartdata[2].nonpercentage = nonreturnpercentage
          }
        }
        this.suppitems = [
          { name: 'Returnable', count: Number(this.supppiechartdata[3].returnable), color: '#27c24c' },
          { name: 'Non-Returnable', count: Number(this.supppiechartdata[3].nonReturnable), color: '#ccc' },
        ];
        this.supp_total = this.suppitems.map(a => a.count).reduce((x, y) => x + y);

        this.suppitems2 = [
          { name: 'Returnable', count: Number(this.supppiechartdata[4].returnable), color: '#27c24c' },
          { name: 'Non-Returnable', count: Number(this.supppiechartdata[4].nonReturnable), color: '#ccc' },
        ];
        this.supp_total2 = this.suppitems2.map(a => a.count).reduce((x, y) => x + y);

        this.suppitems3 = [
          { name: 'Returnable', count: Number(this.supppiechartdata[2].returnable), color: '#27c24c' },
          { name: 'Non-Returnable', count: Number(this.supppiechartdata[2].nonReturnable), color: '#ccc' },
        ];
        this.supp_total3 = this.suppitems3.map(a => a.count).reduce((x, y) => x + y);
        this.suppitems4 = [
          { name: 'Returnable', count: Number(this.supppiechartdata[0].returnable), color: '#27c24c' },
          { name: 'Non-Returnable', count: Number(this.supppiechartdata[0].nonReturnable), color: '#ccc' },
        ];
        this.supp_total4 = this.suppitems4.map(a => a.count).reduce((x, y) => x + y);
        this.suppitems5 = [
          { name: 'Returnable', count: Number(this.supppiechartdata[1].returnable), color: '#27c24c' },
          { name: 'Non-Returnable', count: Number(this.supppiechartdata[1].nonReturnable), color: '#ccc' },
        ];
        this.supp_total5 = this.suppitems5.map(a => a.count).reduce((x, y) => x + y);
        this.suppitems6 = [
          { name: 'Returnable', count: Number(this.supppiechartdata[5].returnable), color: '#27c24c' },
          { name: 'Non-Returnable', count: Number(this.supppiechartdata[5].nonReturnable), color: '#ccc' },
        ];
        this.supp_total6 = this.suppitems6.map(a => a.count).reduce((x, y) => x + y);
      },
        Error => {
        });
  }

  signofftable = [];

  getsignoffcount() {
    return this.makeapi.method(this.getSignOffCountapi, '', "post")
      .subscribe(data => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].region == 'north') {
            this.signofftable[0] = data[i];
            if (this.signofftable[0].mhe == null) {
              this.signofftable[0].mhe = 0;
            }
            if (this.signofftable[0].smq == null) {
              this.signofftable[0].smq = 0;
            }
            if (this.signofftable[0].ipl == null) {
              this.signofftable[0].ipl = 0;
            }
            if (this.signofftable[0].production == null) {
              this.signofftable[0].production = 0;
            }
          }
          else if (data[i].region == 'south') {
            this.signofftable[1] = data[i];
            if (this.signofftable[1].mhe == null) {
              this.signofftable[1].mhe = 0;
            }
            if (this.signofftable[1].smq == null) {
              this.signofftable[1].smq = 0;
            }
            if (this.signofftable[1].ipl == null) {
              this.signofftable[1].ipl = 0;
            }
            if (this.signofftable[1].production == null) {
              this.signofftable[1].production = 0;
            }
          }
          else if (data[i].region == 'east') {
            this.signofftable[2] = data[i];
            if (this.signofftable[2].mhe == null) {
              this.signofftable[2].mhe = 0;
            }
            if (this.signofftable[2].smq == null) {
              this.signofftable[2].smq = 0;
            }
            if (this.signofftable[2].ipl == null) {
              this.signofftable[2].ipl = 0;
            }
            if (this.signofftable[2].production == null) {
              this.signofftable[2].production = 0;
            }
          }
          else if (data[i].region == 'central') {
            this.signofftable[3] = data[i];
            if (this.signofftable[3].mhe == null) {
              this.signofftable[3].mhe = 0;
            }
            if (this.signofftable[3].smq == null) {
              this.signofftable[3].smq = 0;
            }
            if (this.signofftable[3].ipl == null) {
              this.signofftable[3].ipl = 0;
            }
            if (this.signofftable[3].production == null) {
              this.signofftable[3].production = 0;
            }
          }
          else if (data[i].region == 'west') {
            this.signofftable[4] = data[i];
            if (this.signofftable[4].mhe == null) {
              this.signofftable[4].mhe = 0;
            }
            if (this.signofftable[4].smq == null) {
              this.signofftable[4].smq = 0;
            }
            if (this.signofftable[4].ipl == null) {
              this.signofftable[4].ipl = 0;
            }
            if (this.signofftable[4].production == null) {
              this.signofftable[4].production = 0;
            }

          }
          else if (data[i].region == 'chennai') {
            this.signofftable[5] = data[i];
            if (this.signofftable[5].mhe == null) {
              this.signofftable[5].mhe = 0;
            }
            if (this.signofftable[5].smq == null) {
              this.signofftable[5].smq = 0;
            }
            if (this.signofftable[5].ipl == null) {
              this.signofftable[5].ipl = 0;
            }
            if (this.signofftable[5].production == null) {
              this.signofftable[5].production = 0;
            }
          }
        }
        console.log(this.signofftable)
        this.barchart2 = new Chart({
          chart: {
            type: 'column'
          },
          title: {
            text: 'PENDING STATUS'
          },
          xAxis: {
            categories: ['North', 'South', 'East', 'Central', 'West', 'Chennai']
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
            name: 'MHE',
            data: [Number(this.signofftable[0].mhe), Number(this.signofftable[1].mhe), Number(this.signofftable[2].mhe), Number(this.signofftable[3].mhe), Number(this.signofftable[4].mhe), Number(this.signofftable[5].mhe)]
          }, {
            type: 'column',
            name: 'SM',
            data: [Number(this.signofftable[0].smq), Number(this.signofftable[1].smq), Number(this.signofftable[2].smq), Number(this.signofftable[3].smq), Number(this.signofftable[4].smq), Number(this.signofftable[5].smq)]
          }, {
            type: 'column',
            name: 'IPL',
            data: [Number(this.signofftable[0].ipl), Number(this.signofftable[1].ipl), Number(this.signofftable[2].ipl), Number(this.signofftable[3].ipl), Number(this.signofftable[4].ipl), Number(this.signofftable[5].ipl)]
          }, {
            type: 'column',
            name: 'PRODUCTION',
            data: [Number(this.signofftable[0].production), Number(this.signofftable[1].production), Number(this.signofftable[2].production), Number(this.signofftable[3].production), Number(this.signofftable[4].production), Number(this.signofftable[5].production)]
          }]
        });

      },
        Error => {
        });
  }


  maptitle: any;
  mapchart1 = 'notshow';
  mapchart2 = 'notshow';
  mapchart3 = 'notshow';
  mapchart4 = 'notshow';
  mapchart5 = 'notshow';
  mapchart6 = 'notshow';

  piechart5: any;
  close(e) {
    alert("hi");
    console.log("hiii")
  }
  changetab() {
    this.mapchart5 = 'notshow';
    this.mapchart2 = 'notshow';
    this.mapchart3 = 'notshow';
    this.mapchart4 = 'notshow';
    this.mapchart1 = 'notshow';
    this.mapchart6 = 'notshow';
    this.maptitle = " ";
    this.suppmapchart5 = 'notshow';
    this.suppmapchart2 = 'notshow';
    this.suppmapchart3 = 'notshow';
    this.suppmapchart1 = 'notshow';
    this.suppmapchart4 = 'notshow';
    this.suppmapchart6 = 'notshow';
    this.suppmaptitle = " "
  }
  mouseHover(state) {
    if (state == "north") {
      this.mapchart5 = 'show';
      this.mapchart2 = 'notshow';
      this.mapchart3 = 'notshow';
      this.mapchart4 = 'notshow';
      this.mapchart1 = 'notshow';
      this.mapchart6 = 'notshow';
      this.maptitle = " NORTH";
    }
    else if (state == "south") {
      this.mapchart3 = 'show';
      this.mapchart1 = 'notshow';
      this.mapchart2 = 'notshow';
      this.mapchart4 = 'notshow';
      this.mapchart5 = 'notshow';
      this.mapchart6 = 'notshow';
      this.maptitle = "SOUTH"
    }

    else if (state == "central") {
      this.mapchart4 = 'show';
      this.mapchart1 = 'notshow';
      this.mapchart2 = 'notshow';
      this.mapchart3 = 'notshow';
      this.mapchart5 = 'notshow';
      this.mapchart6 = 'notshow';
      this.maptitle = "CENTRAL"
    }
    else if (state == "chennai") {
      this.mapchart6 = 'show';
      this.mapchart1 = 'notshow';
      this.mapchart2 = 'notshow';
      this.mapchart3 = 'notshow';
      this.mapchart5 = 'notshow';
      this.mapchart4 = 'notshow';
      this.maptitle = "CHENNAI"
    }
    else if (state == "east") {
      this.mapchart1 = 'show';
      this.mapchart4 = 'notshow';
      this.mapchart2 = 'notshow';
      this.mapchart3 = 'notshow';
      this.mapchart5 = 'notshow';
      this.mapchart6 = 'notshow';
      this.maptitle = "EAST"
    }
    else if (state == "west") {
      this.mapchart2 = 'show';
      this.mapchart1 = 'notshow';
      this.mapchart4 = 'notshow';
      this.mapchart3 = 'notshow';
      this.mapchart5 = 'notshow';
      this.mapchart6 = 'notshow';
      this.maptitle = "WEST"
    }
  }
  // outsidemap(){
  //   $('html').click(function(e) {
  //     if (e.target.id != 'one' ) {

  //     $('html').click(function(e) {
  //       if (e.target.id != 'one') {
  //         console.log('hiae')
  //         // this.mapchart5 = 'notshow';
  //         // this.mapchart2 = 'notshow';
  //         // this.mapchart3 = 'notshow';
  //         // this.mapchart4 = 'notshow';
  //         this.mapchart1 = 'notshow';
  //         // this.mapchart6 = 'notshow';   
  //          }
  //     });
  //     }
  //   });
  // }
  private _total: number = 0;


  getPerimeter(radius: number): number {
    return Math.PI * 2 * radius;
  }

  getColor(index: number): string {
    return this.items[index].color;
  }

  getOffset(radius: number, index: number): number {
    var percent = 0;
    for (var i = 0; i < index; i++) {
      percent += ((this.items[i].count) / this._total);
    }
    var perimeter = Math.PI * 2 * radius;
    return perimeter * percent;
  }



  private _total2: number = 0;


  getPerimeter2(radius: number): number {
    return Math.PI * 2 * radius;
  }

  getColor2(index: number): string {
    return this.items2[index].color;
  }

  getOffset2(radius: number, index: number): number {
    var percent = 0;
    for (var i = 0; i < index; i++) {
      percent += ((this.items2[i].count) / this._total2);
    }
    var perimeter = Math.PI * 2 * radius;
    return perimeter * percent;
  }


  private _total3: number = 0;


  getPerimeter3(radius: number): number {
    return Math.PI * 2 * radius;
  }

  getColor3(index: number): string {
    return this.items3[index].color;
  }

  getOffset3(radius: number, index: number): number {
    var percent = 0;
    for (var i = 0; i < index; i++) {
      percent += ((this.items3[i].count) / this._total3);
    }
    var perimeter = Math.PI * 2 * radius;
    return perimeter * percent;
  }

  private _total4: number = 0;


  getPerimeter4(radius: number): number {
    return Math.PI * 2 * radius;
  }

  getColor4(index: number): string {
    return this.items4[index].color;
  }

  getOffset4(radius: number, index: number): number {
    var percent = 0;
    for (var i = 0; i < index; i++) {
      percent += ((this.items4[i].count) / this._total4);
    }
    var perimeter = Math.PI * 2 * radius;
    return perimeter * percent;
  }


  private _total5: number = 0;


  getPerimeter5(radius: number): number {
    return Math.PI * 2 * radius;
  }

  getColor5(index: number): string {
    return this.items5[index].color;
  }

  getOffset5(radius: number, index: number): number {
    var percent = 0;
    for (var i = 0; i < index; i++) {
      percent += ((this.items5[i].count) / this._total5);
    }
    var perimeter = Math.PI * 2 * radius;
    return perimeter * percent;
  }


  private _total6: number = 0;


  getPerimeter6(radius: number): number {
    return Math.PI * 2 * radius;
  }

  getColor6(index: number): string {
    return this.items6[index].color;
  }

  getOffset6(radius: number, index: number): number {
    var percent = 0;
    for (var i = 0; i < index; i++) {
      percent += ((this.items6[i].count) / this._total6);
    }
    var perimeter = Math.PI * 2 * radius;
    return perimeter * percent;
  }
  // suppcode chart//


  suppmaptitle: any;
  suppmapchart1 = 'notshow';
  suppmapchart2 = 'notshow';
  suppmapchart3 = 'notshow';
  suppmapchart4 = 'notshow';
  suppmapchart5 = 'notshow';
  suppmapchart6 = 'notshow';

  suppmouseHover(state) {
    if (state == "north") {
      this.suppmapchart5 = 'show';
      this.suppmapchart2 = 'notshow';
      this.suppmapchart3 = 'notshow';
      this.suppmapchart1 = 'notshow';
      this.suppmapchart4 = 'notshow';
      this.suppmapchart6 = 'notshow';
      this.suppmaptitle = " NORTH"
    }
    else if (state == "south") {
      this.suppmapchart3 = 'show';
      this.suppmapchart1 = 'notshow';
      this.suppmapchart2 = 'notshow';
      this.suppmapchart4 = 'notshow';
      this.suppmapchart5 = 'notshow';
      this.suppmapchart6 = 'notshow';
      this.suppmaptitle = "SOUTH"
    }

    else if (state == "central") {
      this.suppmapchart4 = 'show';
      this.suppmapchart1 = 'notshow';
      this.suppmapchart2 = 'notshow';
      this.suppmapchart3 = 'notshow';
      this.suppmapchart5 = 'notshow';
      this.suppmapchart6 = 'notshow';
      this.suppmaptitle = "CENTRAL"
    }
    else if (state == "chennai") {
      this.suppmapchart6 = 'show';
      this.suppmapchart1 = 'notshow';
      this.suppmapchart2 = 'notshow';
      this.suppmapchart3 = 'notshow';
      this.suppmapchart5 = 'notshow';
      this.suppmapchart4 = 'notshow';
      this.suppmaptitle = "CHENNAI"
    }
    else if (state == "east") {
      this.suppmapchart1 = 'show';
      this.suppmapchart4 = 'notshow';
      this.suppmapchart2 = 'notshow';
      this.suppmapchart3 = 'notshow';
      this.suppmapchart5 = 'notshow';
      this.suppmapchart6 = 'notshow';
      this.suppmaptitle = "EAST"
    }
    else if (state == "west") {
      this.suppmapchart2 = 'show';
      this.suppmapchart1 = 'notshow';
      this.suppmapchart4 = 'notshow';
      this.suppmapchart3 = 'notshow';
      this.suppmapchart5 = 'notshow';
      this.suppmapchart6 = 'notshow';
      this.suppmaptitle = "WEST"
    }
  }

  private supp_total: number = 0;


  suppgetPerimeter(radius: number): number {
    return Math.PI * 2 * radius;
  }

  suppgetColor(index: number): string {
    return this.suppitems[index].color;
  }

  suppgetOffset(radius: number, index: number): number {
    var percent = 0;
    for (var i = 0; i < index; i++) {
      percent += ((this.suppitems[i].count) / this.supp_total);
    }
    var perimeter = Math.PI * 2 * radius;
    return perimeter * percent;
  }



  private supp_total2: number = 0;


  suppgetPerimeter2(radius: number): number {
    return Math.PI * 2 * radius;
  }

  suppgetColor2(index: number): string {
    return this.suppitems2[index].color;
  }

  suppgetOffset2(radius: number, index: number): number {
    var percent = 0;
    for (var i = 0; i < index; i++) {
      percent += ((this.suppitems2[i].count) / this.supp_total2);
    }
    var perimeter = Math.PI * 2 * radius;
    return perimeter * percent;
  }


  private supp_total3: number = 0;


  suppgetPerimeter3(radius: number): number {
    return Math.PI * 2 * radius;
  }

  suppgetColor3(index: number): string {
    return this.suppitems3[index].color;
  }

  suppgetOffset3(radius: number, index: number): number {
    var percent = 0;
    for (var i = 0; i < index; i++) {
      percent += ((this.suppitems3[i].count) / this.supp_total3);
    }
    var perimeter = Math.PI * 2 * radius;
    return perimeter * percent;
  }

  private supp_total4: number = 0;


  suppgetPerimeter4(radius: number): number {
    return Math.PI * 2 * radius;
  }

  suppgetColor4(index: number): string {
    return this.suppitems4[index].color;
  }

  suppgetOffset4(radius: number, index: number): number {
    var percent = 0;
    for (var i = 0; i < index; i++) {
      percent += ((this.suppitems4[i].count) / this.supp_total4);
    }
    var perimeter = Math.PI * 2 * radius;
    return perimeter * percent;
  }


  private supp_total5: number = 0;


  suppgetPerimeter5(radius: number): number {
    return Math.PI * 2 * radius;
  }

  suppgetColor5(index: number): string {
    return this.suppitems5[index].color;
  }

  suppgetOffset5(radius: number, index: number): number {
    var percent = 0;
    for (var i = 0; i < index; i++) {
      percent += ((this.suppitems5[i].count) / this.supp_total5);
    }
    var perimeter = Math.PI * 2 * radius;
    return perimeter * percent;
  }


  private supp_total6: number = 0;


  suppgetPerimeter6(radius: number): number {
    return Math.PI * 2 * radius;
  }

  suppgetColor6(index: number): string {
    return this.suppitems6[index].color;
  }

  suppgetOffset6(radius: number, index: number): number {
    var percent = 0;
    for (var i = 0; i < index; i++) {
      percent += ((this.suppitems6[i].count) / this.supp_total6);
    }
    var perimeter = Math.PI * 2 * radius;
    return perimeter * percent;
  }



}
// mouseHover(state) {
//   $('body').click(function(event) {    
//     var id = event.target.id;
//     // alert(id)
//     if(id==1){
//       // alert(id+'fghfh')

//       this.mapchart5 = 'show';
//       this.mapchart2 = 'notshow';
//       this.mapchart3 = 'notshow';
//       this.mapchart4 = 'notshow';
//       this.mapchart1 = 'notshow';
//       this.mapchart6 = 'notshow';
//       this.maptitle = " NORTH";
//       console.log(this.mapchart5)
//     }
//     else if (id==2) {
//       // alert(id+'dhdh')

//       this.mapchart6 = 'show';
//       this.mapchart1 = 'notshow';
//       this.mapchart2 = 'notshow';
//       this.mapchart3 = 'notshow';
//       this.mapchart5 = 'notshow';
//       this.mapchart4 = 'notshow';
//       this.maptitle = "CHENNAI"
//     }
//     else if (id==3) {
//       this.mapchart4 = 'show';
//     this.mapchart1 = 'notshow';
//     this.mapchart2 = 'notshow';
//     this.mapchart3 = 'notshow';
//     this.mapchart5 = 'notshow';
//     this.mapchart6 = 'notshow';
//     this.maptitle = "CENTRAL"
//     }
//     else if (id==4) {
//       this.mapchart1 = 'show';
//     this.mapchart4 = 'notshow';
//     this.mapchart2 = 'notshow';
//     this.mapchart3 = 'notshow';
//     this.mapchart5 = 'notshow';
//     this.mapchart6 = 'notshow';
//     this.maptitle = "EAST"
//     }
//     else if (id==5) {
//       this.mapchart3 = 'show';
//       this.mapchart1 = 'notshow';
//       this.mapchart2 = 'notshow';
//       this.mapchart4 = 'notshow';
//       this.mapchart5 = 'notshow';
//       this.mapchart6 = 'notshow';
//       this.maptitle = "SOUTH"
//     }
//     else if (id==6) {
//       this.mapchart2 = 'show';
//       this.mapchart1 = 'notshow';
//       this.mapchart4 = 'notshow';
//       this.mapchart3 = 'notshow';
//       this.mapchart5 = 'notshow';
//       this.mapchart6 = 'notshow';
//       this.maptitle = "WEST"
//     }
//     else{
//       this.mapchart2 = 'notshow';
//       this.mapchart1 = 'notshow';
//       this.mapchart4 = 'notshow';
//       this.mapchart3 = 'notshow';
//       this.mapchart5 = 'notshow';
//       this.mapchart6 = 'notshow';
//       this.maptitle = "";
//       console.log(this.mapchart5)

//     }
//     });
// }

