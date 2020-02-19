import { Injectable } from '@angular/core';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
import 'rxjs/Rx';
import { Router } from '@angular/router';
declare var $;
import { NgxSpinnerService } from 'ngx-spinner';
import 'rxjs/add/operator/finally';

@Injectable()
export class WebserviceService {
    token: any;
    userid: any;
    userroleid: any;
    usershortid: any;
    userteamname: any;
    useremail: any;
    userbuids: any;
    usermodids = [];
    usercompds = [];
    restrictuserid ={'shortid':'arulnav'};
    constructor(private http: Http, private router: Router, private spinner: NgxSpinnerService) {
        this.token = this.getCookie('disc-cookies');

        if (this.getCheckToken() == null || this.getCheckToken() == "") {
            localStorage.removeItem('disc-portal-session');
            localStorage.removeItem('Daim-packagingSession');
        }
        else if (this.session() == null) {
            this.router.navigateByUrl('/login');
        }
        else {
            this.getuserinfo();
            this.token = this.getCookie('disc-cookies');
        }
    }
    getCheckToken() {
        return this.getCookie('disc-cookies');
    }
    getuserinfo() {
        this.username = this.session().name;
        this.userid = this.session().id;
        this.userroleid = this.session().roleid;
        this.usershortid = this.session().shortid;
        this.userteamname = this.session().teamname;
        this.useremail = this.session().emailid;
        this.userbuids = this.session().buids.split(",");
    }
    getCookie(cname) {
        var name = cname + "=";
        var cArr = window.document.cookie.split(';');
        for (var i = 0; i < cArr.length; i++) {
            var c = cArr[i].trim();
            if (c.indexOf(name) == 0)
                return c.substring(name.length, c.length);
        }
        return "";
    }
    getToken() {
        this.token = this.getCookie('disc-cookies');
    }

    coursename: any;
    username = 'UserName';
    method(url, data, method): Observable<any> {
        if (method === 'postlogin') {
            const headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            return this.http.post(url, data, { headers: headers, withCredentials: true })
                .map((response: Response) => response);
        }

        if (method === 'postlogin') {
            const headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            return this.http.post(url, data, { headers: headers })
                .map((response: Response) => response);
        }
        if (method === 'post') {
            this.spinner.show();
            const headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers.append('Authorization', this.token);
            return this.http.post(url, data, { headers: headers })
                .map((response: Response) => response.json())
                .catch((error: any) => {
                    this.spinner.hide();
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {
                        localStorage.removeItem('disc-portal-session');
                        this.deleteCookie('disc-cookies')
                        this.router.navigateByUrl('/login');

                    }
                })
                .finally(() => {
                    this.spinner.hide();
                });
        }
        if (method === 'postnoloading') {
            const headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers.append('Authorization', this.token);
            return this.http.post(url, data, { headers: headers })
                .map((response: Response) => response.json())
                .catch((error: any) => {
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {
                        localStorage.removeItem('disc-portal-session');
                        this.deleteCookie('disc-cookies')
                        this.router.navigateByUrl('/login');

                    }
                })
                .finally(() => {
                });
        }
        if (method === 'postjsonnoloading') {
            const headers = new Headers();
            headers.append('content-type', 'application/json');
            headers.append('authorization', this.token);

            return this.http.post(url, data, { headers: headers })
                .map((response: Response) => response.json())
                .catch((error: any) => {
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {
                        localStorage.removeItem('disc-portal-session');
                        this.deleteCookie('disc-cookies')
                        this.router.navigateByUrl('/login');

                    }
                })
                .finally(() => {
                });
        }
        if (method === 'postjson') {
            this.spinner.show();
            const headers = new Headers();
            headers.append('content-type', 'application/json');
            headers.append('authorization', this.token);

            return this.http.post(url, data, { headers: headers })
                .map((response: Response) => response.json())
                .catch((error: any) => {
                    this.spinner.hide();
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {
                        localStorage.removeItem('disc-portal-session');
                        this.deleteCookie('disc-cookies')
                        this.router.navigateByUrl('/login');

                    }
                })
                .finally(() => {
                    this.spinner.hide();
                });
        }
        if (method === 'postjsonnoloading') {
            const headers = new Headers();
            headers.append('content-type', 'application/json');
            headers.append('authorization', this.token);

            return this.http.post(url, data, { headers: headers })
                .map((response: Response) => response.json())
                .catch((error: any) => {
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {
                        localStorage.removeItem('disc-portal-session');
                        this.deleteCookie('disc-cookies')
                        this.router.navigateByUrl('/login');

                    }
                })
                .finally(() => {
                });
        }
        if (method === 'postjsonextuser') {
            this.spinner.show();
            const headers = new Headers();
            headers.append('content-type', 'application/json');
            headers.append('authorization', this.token);

            return this.http.post(url, data, { headers: headers })
                .map((response: Response) => response.json())
                .catch((error: any) => {
                    this.spinner.hide();
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {
                        localStorage.removeItem('disc-portal-session');
                        this.deleteCookie('disc-cookies')
                        this.router.navigateByUrl('/login');

                    }
                })
                .finally(() => {
                    this.spinner.hide();
                });
        }
        if (method === 'postjsonlogin') {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return this.http.post(url, data, { headers: headers })
                .map((response: Response) => response.json())
                .catch((error: any) => {
                    this.spinner.hide();
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {
                        localStorage.removeItem('disc-portal-session');
                        this.router.navigateByUrl('/login');
                        this.deleteCookie('disc-cookies');

                    }
                })
                .finally(() => {
                });
        }
        if (method === 'postfilemultipart') {
            this.spinner.show();
            const headers = new Headers();
            headers.append('Content-Type', 'multipart/form-data');
            headers.append('Authorization', this.token);
            return this.http.post(url, data, { headers: headers })
                .map((response: Response) => response.json())
                .catch((error: any) => {
                    this.spinner.hide();
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {
                        localStorage.removeItem('disc-portal-session');
                        this.deleteCookie('disc-cookies')
                        this.router.navigateByUrl('/login');
                    }
                })
                .finally(() => {
                    this.spinner.hide();
                });
        }
        if (method === 'get') {
            this.spinner.show();
            const headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers.append('Authorization', this.token);
            return this.http.get(url, { headers: headers })
                .map((response: Response) => response.json())
                .catch((error: any) => {
                    this.spinner.hide();
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {
                        localStorage.removeItem('disc-portal-session');
                        this.router.navigateByUrl('/login');
                        this.deleteCookie('disc-cookies');
                    }
                    else {
                        return Observable.throw(new Error(error.status));
                    }
                })
                .finally(() => {
                    this.spinner.hide();
                });
        }
        if (method === 'delete') {
            this.spinner.show();
            const headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers.append('Authorization', this.token);
            return this.http.delete(url, { headers: headers })
                .map((response: Response) => response.json())
                .catch((error: any) => {
                    this.spinner.hide();
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {
                        localStorage.removeItem('disc-portal-session');
                        this.router.navigateByUrl('/login');
                        this.deleteCookie('disc-cookies');
                    }
                    else {
                        return Observable.throw(new Error(error.status));
                    }
                })
                .finally(() => {
                    this.spinner.hide();
                });
        }
        if (method === 'getnoload') {
            const headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers.append('Authorization', this.token);
            return this.http.get(url, { headers: headers })
                .map((response: Response) => response.json())
                .catch((error: any) => {
                    this.spinner.hide();
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {
                        localStorage.removeItem('disc-portal-session');
                        this.router.navigateByUrl('/login');
                        this.deleteCookie('disc-cookies');
                    }
                })
                .finally(() => {
                });
        }
        if (method === 'file') {
            this.spinner.show();
            let headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Authorization', this.token);
            let options = new RequestOptions({ headers: headers });
            return this.http.post(url, data, { headers: headers })
                .map((response: Response) => response.json())
                .catch((error: any) => {
                    this.spinner.hide();
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {
                        localStorage.removeItem('disc-portal-session');
                        this.router.navigateByUrl('/login');
                        this.deleteCookie('disc-cookies');
                    }
                })
                .finally(() => {
                    this.spinner.hide();
                });
        }
        if (method === 'filenoloading') {
            let headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Authorization', this.token);
            let options = new RequestOptions({ headers: headers });
            return this.http.post(url, data, { headers: headers })
                .map((response: Response) => response.json())
                .catch((error: any) => {
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {
                        localStorage.removeItem('disc-portal-session');
                        this.router.navigateByUrl('/login');
                        this.deleteCookie('disc-cookies');
                    }
                })
                .finally(() => {
                });
        }
        if (method === 'fileloading') {
            this.spinner.show();
            let headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Authorization', this.token);
            let options = new RequestOptions({ headers: headers });
            return this.http.post(url, data, { headers: headers })
                .map((response: Response) => response.json())
                .catch((error: any) => {
                    this.spinner.hide();
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {
                        localStorage.removeItem('disc-portal-session');
                        this.router.navigateByUrl('/login');
                        this.deleteCookie('disc-cookies');
                    }
                })
                .finally(() => {
                    this.spinner.hide();
                });
        }
        if (method === 'jwt_video') {
            this.spinner.show();
            const headers = new Headers();
            headers.append('Authorization', this.token);
            return this.http.get(url, { responseType: ResponseContentType.Blob, headers: headers })
                .map(res => {
                    return {
                        // data: res.blob()
                        res
                    };
                })
                .catch((error: any) => {
                    this.spinner.hide();
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {
                        // localStorage.removeItem('disc-portal-session');
                        // this.router.navigateByUrl('/login'); 
                        // this.deleteCookie('disc-cookies'); 
                    }
                })
                .finally(() => {
                    this.spinner.hide();
                });
        }

        if (method === 'JWTsinglePDF') {
            this.spinner.show();
            var token = "w24rfsf"
            const headers = new Headers();
            headers.append('Authorization', token);
            return this.http.get(url, { responseType: ResponseContentType.Blob, headers: headers })
                .map(res => {
                    return {
                        filename: this.coursename + '_' + this.username + '.pdf',
                        data: res.blob()
                    };
                })
                .catch((error: any) => {
                    this.spinner.hide();
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {
                        // localStorage.removeItem('disc-portal-session');
                        // this.router.navigateByUrl('/login'); 
                        // this.deleteCookie('disc-cookies'); 
                    }
                })
                .finally(() => {
                    this.spinner.hide();
                });

        }
        if (method === 'postjsonnoload') {
            const headers = new Headers();
            headers.append('content-type', 'application/json');
            headers.append('authorization', this.token);

            return this.http.post(url, data, { headers: headers })
                .map((response: Response) => response.json())
                .catch((error: any) => {
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {
                        localStorage.removeItem('disc-portal-session');
                        this.deleteCookie('disc-cookies')
                        this.router.navigateByUrl('/login');

                    }
                })
                .finally(() => {
                    this.spinner.hide();
                });
        }

        if (method === 'postfilemultipartNoload') {
            const headers = new Headers();
            headers.append('Content-Type', 'multipart/form-data');
            headers.append('Authorization', this.token);
            return this.http.post(url, data, { headers: headers })
                .map((response: Response) => response.json())
                .catch((error: any) => {
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {
                        localStorage.removeItem('disc-portal-session');
                        this.deleteCookie('disc-cookies')
                        this.router.navigateByUrl('/login');
                    }
                })
                .finally(() => {
                });
        }
        if (method === 'getNoload') {
            const headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers.append('Authorization', this.token);
            return this.http.get(url, { headers: headers })
                .map((response: Response) => response.json())
                .catch((error: any) => {
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {
                        localStorage.removeItem('disc-portal-session');
                        this.router.navigateByUrl('/login');
                        this.deleteCookie('disc-cookies');
                    }
                })

        }
        if (method === 'postnoload') {
            const headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers.append('Authorization', this.token);
            return this.http.post(url, data, { headers: headers })
                .map((response: Response) => response.json())
                .catch((error: any) => {
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {
                        localStorage.removeItem('disc-portal-session');
                        this.deleteCookie('disc-cookies')
                        this.router.navigateByUrl('/login');
                    }
                })
                .finally(() => {
                });
        }
        if (method === 'JWT_PDF') {
            const headers = new Headers();
            headers.append('Authorization', this.token);
            return this.http.get(url, { responseType: ResponseContentType.Blob, headers: headers })
                .map(res => {
                    console.log(res)
                    return {
                        filename: 'SRRreport' + this.vendorcode + '.pdf',
                        data: res.blob()
                    };
                })

        }

        if (method === 'JWT_DownloadExcelWithFilename') {
            this.spinner.show();
            const headers = new Headers();
            headers.append('Authorization', this.token);
            return this.http.get(url, { responseType: ResponseContentType.Blob, headers: headers })
                .map(res => {
                    return {
                        filename: data,
                        data: res.blob()
                    };
                })
                .catch((error: any) => {
                    this.spinner.hide();
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {
                    }
                })
                .finally(() => {
                    this.spinner.hide();
                });
        }

        if (method === 'JWTExcel') {
            const headers = new Headers();
            headers.append('Authorization', this.token);
            return this.http.get(url, { responseType: ResponseContentType.Blob, headers: headers })
                .map(res => {
                    return {
                        filename: 'SM_partmaster_report.xlsx',
                        data: res.blob()
                    };
                })
                .catch((error: any) => {
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {
                    }
                });

        }
        if (method === 'JWTExcelSRR') {
            const headers = new Headers();
            headers.append('Authorization', this.token);
            return this.http.get(url, { responseType: ResponseContentType.Blob, headers: headers })
                .map(res => {
                    console.log(headers.get('content-disposition'))
                    return {
                        filename: 'SRR_report.xlsx',
                        data: res.blob()
                    };
                })
                .catch((error: any) => {
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {
                    }
                });

        }
        if (method === 'JWTExcelISPRDump') {
            const headers = new Headers();
            headers.append('Authorization', this.token);
            return this.http.get(url, { responseType: ResponseContentType.Blob, headers: headers })
                .map(res => {
                    console.log(headers.get('content-disposition'))
                    return {
                        filename: 'ISPR_Dump.xlsx',
                        data: res.blob()
                    };
                })
                .catch((error: any) => {
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {
                    }
                });

        }
        if (method === 'JWTExcelKPIREportorDump') {
            this.spinner.show();
            const headers = new Headers();
            headers.append('Authorization', this.token);
            return this.http.get(url, { responseType: ResponseContentType.Blob, headers: headers })
                .map(res => {
                    return {
                        filename: data + '.xlsx',
                        data: res.blob()
                    };
                })
                .catch((error: any) => {
                    this.spinner.hide();
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {
                    }
                })
                .finally(() => {
                    this.spinner.hide();
                });
        }
                if (method === 'JWTExcelKPIREportorDump') {
            this.spinner.show();
            const headers = new Headers();
            headers.append('Authorization', this.token);
            return this.http.get(url, { responseType: ResponseContentType.Blob, headers: headers })
                .map(res => {
                    return {
                        filename: data + '.xlsx',
                        data: res.blob()
                    };
                })
                .catch((error: any) => {
                    this.spinner.hide();
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {
                    }
                })
                .finally(() => {
                    this.spinner.hide();
                });
        }
        if (method === 'JWT_PFEPDownload') {
            var filetype = data.split(".")
            this.spinner.show();
            const headers = new Headers();
            headers.append('Authorization', this.token);
            return this.http.get(url, { responseType: ResponseContentType.Blob, headers: headers })
                .map(res => {
                    return {
                        filename: data,
                        data: res.blob()
                    };
                })
                .catch((error: any) => {
                    this.spinner.hide();
                    if (error.status === 500) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 400) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 409) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 406) {
                        return Observable.throw(new Error(error.status));
                    }
                    else if (error.status === 403) {
                    }
                })
                .finally(() => {
                    this.spinner.hide();
                });
        }
    }
    vendorcode: any;
    year: any;
    month: any;
    deleteCookie(cname) {
        var d = new Date();
        d.setTime(d.getTime() - (1000 * 60 * 60 * 24));
        var expires = "expires=" + d.toUTCString();
        window.document.cookie = cname + "=" + "; " + expires;

    }
    /** Get Session Data */
    session() {
        // Decode the String
        if (localStorage.getItem("disc-portal-session") != null) {
            var encodedString = localStorage.getItem("disc-portal-session");
            encodedString = encodedString.substring(6);
            var decodedString = atob(encodedString);
            return JSON.parse(decodedString);
        }
    }
}
