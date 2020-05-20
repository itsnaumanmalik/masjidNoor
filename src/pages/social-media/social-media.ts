import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
/**
 * Generated class for the SocialMediaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-social-media',
  templateUrl: 'social-media.html',
})
export class SocialMediaPage {
  links: {
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

  constructor(public serverUrl:RemoteServiceProvider ,private iab: InAppBrowser,public navCtrl: NavController, public navParams: NavParams) {
    this.openLinkListing();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialMediaPage');
  }

  weburl(url) {
    const browser = this.iab.create(url);
  }

  Website() {
    //const browser = this.iab.create('http://www.elitevisionit.com/masjidNoor/files/SchoolCalendar.pdf');
    let target = "_system";
    this.iab.create('http://masjidnoorli.net', target, this.options);
  }

  openLinkListing() {
    this.serverUrl.getLinkListing()
      .then(data => {
        this.links = data;
        console.log("links:", this.links);
      });
  }

}
