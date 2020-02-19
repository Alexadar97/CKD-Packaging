import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

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
import { ExportpackagingComponent } from './quality/packaging/exportpackaging/exportpackaging.component';
import { EnduserapprovalComponent } from './quality/packaging/enduserapproval/enduserapproval.component';
import { ReportComponent } from './quality/packaging/report/report.component';
import { SignoffsheetsupllyComponent } from './quality/packaging/signoffsheetsuplly/signoffsheetsuplly.component';
import { SupplierlistComponent } from './quality/packaging/supplierlist/supplierlist.component';
// import { QualityComponent } from './quality/quality.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,

    children: [
      { path: '', redirectTo: 'signoffsheet', pathMatch: 'full' },
      // { path: 'dashboard', component: DashboardComponent },
     
      {path: 'signoffsheet', component: SignoffsheetComponent},
      {path: 'signoffsheetsupply', component: SignoffsheetsupllyComponent},
      {path: 'Supplierlist', component: SupplierlistComponent},
      {path: 'exportpackaging', component: ExportpackagingComponent},
      {path: 'Enduserapproval', component: EnduserapprovalComponent},
      {path: 'report', component: ReportComponent},
      { path: 'packdashboard', component: PackagingdashboardComponent },
      {path: 'detailreport', component:  DetailReportComponent},
      {path: 'signoffreport', component: SignoffreportComponent},
      {path: 'mhe-approvel', component: MheApprovelComponent},
      {path: 'sm-approvel', component: SmApprovelComponent},
      {path: 'ipl-approvel', component: IplApprovelComponent},
      {path: 'production', component: ProductionComponent},
      {path: 'packaging-manuals', component: PackagingManualsComponent},
      {path: 'user-management', component: UserManagementComponent},
      {path: 'configuration', component: ConfigurationComponent},
      {path: 'pdfview', component: PdfviewComponent},
      {path: 'rolelist', component: RolelistComponent},
    ]
  },
];

@NgModule({
  imports: [  
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
