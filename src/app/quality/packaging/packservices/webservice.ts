import { Injectable } from '@angular/core';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
import 'rxjs/Rx';
import { Router } from '@angular/router';
declare var $;


@Injectable()

export class WebService {
    token: any;

    constructor(private http: Http, private router: Router, ) {

       if (this.session() == null) {
            
            console.log("SESSION IN  METHOD");
        }
        else {
            this.token = this.getCookie('disc-cookies');
        }

        this.token = this.getCookie('disc-cookies');
        console.log(this.token);
    }
    getCheckToken() {
        return this.getCookie('disc-cookies');
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
        this.token = null;
    }

    //qa Server
    appconstant = "http://13.234.64.82:8080/DaimPackaging/pack/";
    appconstantcore = 'http://13.234.64.82:8080/DICVDISC/core/';
    appconstantdisc = 'http://13.234.64.82:8080/DICVDISC/disc/';
    globalurldisc = "http://dicv-discportal.s3-website.ap-south-1.amazonaws.com/#/login";


    //live-Server
    // appconstantcore = 'https://www.digitalsupplychain.bharatbenz.com/DICVDISC/core/';
    // appconstantdisc = 'https://www.digitalsupplychain.bharatbenz.com/DICVDISC/disc/';
    // appconstant     = 'https://www.digitalsupplychain.bharatbenz.com/DaimPackaging/pack/';
    // globalurldisc   = "https://www.digitalsupplychain.bharatbenz.com/dicvscar/DaimDISC/#/login"




    partno: any;
    suppliercode: any;
    id: any;
    week: any;
    year: any;

    method(url, data, method): Observable<any> {
        if (method === 'post') {
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
                        localStorage.removeItem('Daim-packagingSession');
                        this.deleteCookie('packcookies'); this.deleteCookie('cookies')
                        // window.open(this.globalurldisc);
                        console.log("FAILURE IN METHOD");

                    }
                });
        }
        if (method === 'postlogin') {
            const headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            return this.http.post(url, data, { headers: headers })
                .map((response: Response) => response);
        }
        if (method === 'postjson') {
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
                        localStorage.removeItem('Daim-packagingSession');
                        this.deleteCookie('packcookies'); this.deleteCookie('cookies')
                        // window.open(this.globalurldisc);
                        console.log("FAILURE IN METHOD -postjson");

                    }
                });
        }
        if (method === 'postjsonlogin') {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
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
                        localStorage.removeItem('Daim-packagingSession');
                        // window.open(this.globalurldisc);
                        this.deleteCookie('cookies');
                        console.log("FAILURE IN METHOD - postjsonlogin");

                    }
                });
        }
        if (method === 'postfilemultipart') {
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
                        localStorage.removeItem('Daim-packagingSession');
                        this.deleteCookie('packcookies'); this.deleteCookie('cookies')
                        // window.open(this.globalurldisc);
                        console.log("FAILURE IN METHOD -postmultipart");

                    }
                });
        }
        if (method === 'get') {
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
                        localStorage.removeItem('Daim-packagingSession');
                        // window.open(this.globalurldisc);
                        this.deleteCookie('cookies');
                        console.log("FAILURE IN METHOD-get");

                    }
                });
        }
        if (method === 'file') {
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
                        localStorage.removeItem('Daim-packagingSession');
                        // window.open(this.globalurldisc);
                        this.deleteCookie('cookies');
                        console.log("FAILURE IN METHOD-file");

                    }
                });
        }


        if (method === 'JWTExcel') {
            const headers = new Headers();
            headers.append('Authorization', this.token);
            return this.http.get(url, { responseType: ResponseContentType.Blob, headers: headers })
                .map(res => {
                    return {
                        filename: 'Daim_Packaging_Report.xlsx',
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
                        localStorage.removeItem('disc-portal-session');
                        localStorage.removeItem('Daim-packagingSession');
                        // window.open(this.globalurldisc);
                        this.deleteCookie('cookies');
                        console.log("FAILURE IN METHOD-jwtecel");
                    }
                });

        }
        if (method === 'JWTExcel2') {
            const headers = new Headers();
            headers.append('Authorization', this.token);
            return this.http.get(url, { responseType: ResponseContentType.Blob, headers: headers })
                .map(res => {
                    return {
                        filename: 'Daim_Packaging_Date_Wise_Report.xlsx',
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
                        localStorage.removeItem('disc-portal-session');
                        localStorage.removeItem('Daim-packagingSession');
                        // window.open(this.globalurldisc);
                        this.deleteCookie('cookies');
                        console.log("FAILURE IN METHOD excel2");

                    }
                });

        }
        if (method === 'JWTPDF') {
            const headers = new Headers();
            headers.append('Authorization', this.token);
            return this.http.get(url, { responseType: ResponseContentType.Blob, headers: headers })
                .map(res => {
                    return {
                        filename: this.partno + '_' + this.suppliercode + '_' + this.id + '.pdf',
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
                        localStorage.removeItem('disc-portal-session');
                        localStorage.removeItem('Daim-packagingSession');
                        // window.open(this.globalurldisc);
                        this.deleteCookie('cookies');
                        console.log("FAILURE IN METHOD-jwtpdf");
                    }
                });

        }
        if (method === 'JWT_ALLPDF') {
            const headers = new Headers();
            headers.append('Authorization', this.token);
            return this.http.get(url, { responseType: ResponseContentType.Blob, headers: headers })
                .map(res => {
                    return {
                        filename: 'Week' + this.week + '_' + 'year' + this.year + '.pdf',
                        data: res.blob()
                    };
                })

        }
        if (method === 'JWTPDF_ZIP') {
            const headers = new Headers();
            headers.append('Authorization', this.token);
            return this.http.get(url, { responseType: ResponseContentType.Blob, headers: headers })
                .map(res => {
                    return {
                        filename: 'Pack_Report.zip',
                        data: res.blob()
                    };
                })

        }
    }
    showNotification(from, align, msg, type) {

        $.notify({
            icon: 'notifications',
            message: msg

        }, {
                type: type,
                timer: 4000,
                placement: {
                    from: from,
                    align: align
                }
            });
    }

    session() {
        console.log("1")
        // Decode the String
        return JSON.parse(localStorage.getItem("Daim-packagingSession"));
    }



    deleteCookie(cname) {
        var d = new Date();
        d.setTime(d.getTime() - (1000 * 60 * 60 * 24));
        var expires = "expires=" + d.toUTCString();
        window.document.cookie = cname + "=" + "; " + expires;
    }

}