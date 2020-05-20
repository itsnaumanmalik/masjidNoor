import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SchoolContactPage } from "../school-contact/school-contact";
import { SchoolRegisterPage } from "../school-register/school-register";
import { SchoolRulesPage } from "../school-rules/school-rules";
import { SchoolFeePage } from "../school-fee/school-fee";
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";

/**
 * Generated class for the SchoolPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-school',
  templateUrl: 'school.html',
})
export class SchoolPage {
  school: {
  };
  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
};

  constructor(private iab: InAppBrowser,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchoolPage');
  }

  school_register(){
    // this.navCtrl.push(SchoolRegisterPage);
    let target = "_system";
    this.iab.create('https://mnoor.live/KidsEducation',target,this.options);
  }

  school_calendar() {
    //const browser = this.iab.create('http://www.elitevisionit.com/masjidNoor/files/SchoolCalendar.pdf');
    let target = "_system";
    this.iab.create('https://www.elitevisionit.com/masjidNoor/files/SchoolCalendar.pdf',target,this.options);
}

  school_contact(){
    this.navCtrl.push(SchoolContactPage);
  }

  school_rules(){
    this.navCtrl.push(SchoolRulesPage);
  }

  school_fee(){
    this.navCtrl.push(SchoolFeePage);
  }

  summer_school(){
    let target = "_system";
    this.iab.create('https://bit.ly/2HAoVrb',target,this.options);
  }

}
