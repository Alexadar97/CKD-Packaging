import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { WebService } from '../packservices/webservice';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router, private getdata: WebService, ) {
    }
    canActivate() {
     
        //  if (this.getToken() == null || this.getToken() == "") {
        //     localStorage.removeItem('disc-portal-session');
        //     localStorage.removeItem('Daim-packagingSession');
        //     window.open(this.getdata.globalurldisc, "_self");
        // }
        // else
         if (this.session() == null) {
            // window.open(this.getdata.globalurldisc, "_self");
        }
        else {
            return true;
        }
    }
    canActivateChild() {
        return true;
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
        return this.getCookie('disc-cookies');
    }

    session() {
        // console.log("3")
        // Decode the String
        // if (localStorage.getItem("Daim-packagingSession") != null && this.getToken() != null && this.getToken() != "") {
        //     var encodedString = localStorage.getItem("Daim-packagingSession");
        //     var decodedString = atob(encodedString);
        //     return JSON.parse(decodedString);
        // }
        // console.log("4")
        return JSON.parse(localStorage.getItem("Daim-packagingSession"));
    }


}