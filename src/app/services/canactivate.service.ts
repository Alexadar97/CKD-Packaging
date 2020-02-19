import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
declare var $;

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    userbuids = [];
    usermodids: any;
    userroleid: any;
    teamid: any;
    deliverytoken = '';
    constructor(private router: Router) {
    }

    canActivate() {
        if (this.getToken() == null || this.getToken() == "") {
            localStorage.removeItem('disc-portal-session');
            this.router.navigateByUrl('/login');
        }
         else if (this.session() == null) {
            this.router.navigateByUrl('/login');
          }
        else {
            if (this.session().firsttimelogin == 0) {
                this.userroleid = this.session().roleid;
                if (this.userroleid != 5) {
                    this.usermodids = this.session().modids;
                    if ((this.session().buids).length == 1) {
                        this.userbuids[0] = Number(this.session().buids)
                    }
                    else {
                        this.userbuids = this.session().buids.split(",");
                    }
                    // this.usermodids=[1,2]
                    // this.userbuids=[1,2]
                    this.teamid = this.session().teamid;
                    for (var i = 0; i < this.userbuids.length; i++) {
                        this.userbuids[i] = Number(this.userbuids[i])
                    }
                }
                return true;
            }
            else {
                this.userroleid = this.session().roleid;
                if (this.userroleid != 5) {
                    this.usermodids = this.session().modids;
                    if ((this.session().buids).length == 1) {
                        console.log(this.session().buids)
                        this.userbuids[0] = Number(this.session().buids)
                    }
                    else {
                        this.userbuids = this.session().buids.split(",");
                    }
                    //    this.usermodids=[1,2]
                    //     this.userbuids=[1,2]
                    this.teamid = this.session().teamid;
                    for (var i = 0; i < this.userbuids.length; i++) {
                        this.userbuids[i] = Number(this.userbuids[i])
                    }
                }
                this.router.navigateByUrl('dashboard/changepassword');
                return true;
            }
        }
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
    canActivateChild() {
        console.log('checking child route access');
        return true;
    }

    session() {
        // Decode the String
        if (localStorage.getItem("disc-portal-session") != null) {
            var encodedString = localStorage.getItem("disc-portal-session");
            encodedString = encodedString.substring(6);
            var decodedString = atob(encodedString);
            return JSON.parse(decodedString);
        }
    }
    // ngAfterViewInit() {
    //     var divHeight = $('.innerbodyScroll').height(); 
    //     console.log(divHeight)
    //   $('.filterby').css('height', divHeight+'px');
    // }
}