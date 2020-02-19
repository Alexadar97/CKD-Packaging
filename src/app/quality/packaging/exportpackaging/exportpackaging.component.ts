import { Component, OnInit } from '@angular/core';
declare var $;
import * as $ from 'jquery';
@Component({
  selector: 'app-exportpackaging',
  templateUrl: './exportpackaging.component.html',
  styleUrls: ['./exportpackaging.component.css']
})
export class ExportpackagingComponent implements OnInit {
  p3 = 1;
  p1 = 1;
  constructor() { }

  ngOnInit() {
  }

  moadlShow(){
    $("#viewstatus").modal("show")
  }
}
