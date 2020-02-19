import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $;

@Component({
  selector: 'app-packaging-manuals',
  templateUrl: './packaging-manuals.component.html',
  styleUrls: ['./packaging-manuals.component.css']
})
export class PackagingManualsComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }
  foldertype = "folder";
  mouseEnter() {
    this.foldertype = "folder"
  }
  mouseLeave() {
    this.foldertype = "folder"
  }
  viewpdf() {
    this.router.navigateByUrl('dashboard/quality/packaging/pdfview');
  }
}
