import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { WebService } from './quality/packaging/packservices/webservice';
import { AuthGuard } from './quality/packaging/packservices/canactivate.service';
import { PagerService } from './quality/packaging/packservices/pagerservice';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, BrowserXhr } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { HighchartsChartModule } from 'highcharts-angular';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
// import {TabModule} from 'angular-tabs-component';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import { PackagingdashboardComponent } from './quality/packaging/packagingdashboard/packagingdashboard.component';
import { SignoffsheetComponent } from './quality/packaging/signoffsheet/signoffsheet.component';
import { SignoffreportComponent } from './quality/packaging/signoffreport/signoffreport.component';
import { MheApprovelComponent } from './quality/packaging/mhe-approvel/mhe-approvel.component';
import { SmApprovelComponent } from './quality/packaging/sm-approvel/sm-approvel.component';
import { IplApprovelComponent } from './quality/packaging/ipl-approvel/ipl-approvel.component';
import { DetailReportComponent } from './quality/packaging/detail-report/detail-report.component';
import { ProductionComponent } from './quality/packaging/production/production.component';
import { PackagingManualsComponent } from './quality/packaging/packaging-manuals/packaging-manuals.component';
import { UserManagementComponent } from './quality/packaging/user-management/user-management.component';
import { ConfigurationComponent } from './quality/packaging/configuration/configuration.component';
import { PdfviewComponent } from './quality/packaging/pdfview/pdfview.component';
import { RolelistComponent } from './quality/packaging/rolelist/rolelist.component';
import { DashboardComponent } from './quality/packaging/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './quality/packaging/navbar/navbar.component';
import { PackcomponentsComponent } from './quality/packaging/packcomponents/packcomponents.component';
import { ExportpackagingComponent } from './quality/packaging/exportpackaging/exportpackaging.component';
import { EnduserapprovalComponent } from './quality/packaging/enduserapproval/enduserapproval.component';
import { ReportComponent } from './quality/packaging/report/report.component';
import { SignoffsheetsupllyComponent } from './quality/packaging/signoffsheetsuplly/signoffsheetsuplly.component';
import { SupplierlistComponent } from './quality/packaging/supplierlist/supplierlist.component';
import { QualityComponent } from './quality/quality.component';



@NgModule({
  declarations: [
    AppComponent,

    PackagingdashboardComponent, DashboardComponent,
    SignoffsheetComponent, SignoffreportComponent, MheApprovelComponent, SmApprovelComponent, RolelistComponent,
    IplApprovelComponent, DetailReportComponent, ProductionComponent, PackagingManualsComponent, UserManagementComponent, 
    ConfigurationComponent, PdfviewComponent, PackcomponentsComponent, LoginComponent, NavbarComponent, ExportpackagingComponent, EnduserapprovalComponent, ReportComponent, SignoffsheetsupllyComponent, SupplierlistComponent, QualityComponent,
  ],
  imports: [
    BsDatepickerModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    CommonModule,
    NgxPaginationModule,

    HttpClientModule,
    HighchartsChartModule,
    NgxSpinnerModule,
    // TabModule,
    ChartModule
  ],
  providers: [
    WebService, AuthGuard, PagerService,
    { provide: HIGHCHARTS_MODULES, useFactory: () => [more, exporting] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
