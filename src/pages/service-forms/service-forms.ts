import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
import { RemoteServiceProvider } from "../../providers/remote-service/remote-service";

/**
 * Generated class for the ServiceFormsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-service-forms',
  templateUrl: 'service-forms.html',
})
export class ServiceFormsPage {
  services: any;
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

  constructor(private serverUrl: RemoteServiceProvider, private iab: InAppBrowser,public navCtrl: NavController, public navParams: NavParams) {
    this.ServicesForms();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceFormsPage');
   
  }

  ServicesForms(){
    this.serverUrl.getServicesForms()
      .then(data => {
        this.services = data;
        console.log("salah:", this.services);
      });
  }

  pdfurl(url) {
    //const browser = this.iab.create(url, '_system', 'location=no');
    let target = "_system";
    this.iab.create(url,target,this.options);
  }
  pdfurl1(url) {
    //const browser = this.iab.create(url);
    let target = "_system";
    this.iab.create(url,target,this.options);
  }
  pdfurl2(url) {
    //const browser = this.iab.create(url);
    let target = "_system";
    this.iab.create(url,target,this.options);
  }
  pdfurl3(url) {
    //const browser = this.iab.create(url);
    let target = "_system";
    this.iab.create(url,target,this.options);
  }
  pdfurl4(url) {
    //const browser = this.iab.create(url);
    let target = "_system";
    this.iab.create(url,target,this.options);
  }

}
