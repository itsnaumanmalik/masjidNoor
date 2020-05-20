import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SocialMediaPage } from "../pages/social-media/social-media";

import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { NewsLetterPage } from "../pages/news-letter/news-letter";
import { SubscribePage } from "../pages/subscribe/subscribe";
import { ServicesPage } from "../pages/services/services";
import { DonatePage } from "../pages/donate/donate";
import { EventsPage } from "../pages/events/events";
// import { FcmProvider } from '../providers/fcm/fcm';
import { tap } from 'rxjs/operators';
import { ImamPage } from "../pages/imam/imam";
import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal';
import { isCordovaAvailable } from '../common/is-cordova-available';
import { oneSignalAppId, sender_id } from '../config';
import { SchoolPage } from "../pages/school/school";
import { MessagesPage } from "../pages/messages/messages";
import { AboutPage } from "../pages/about/about";

@Component({
  templateUrl: 'app.html',
  providers: [InAppBrowser]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any, icon: any }>;
  SocialLinks: Array<{title: string, icon: any, Url: string}>;

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
  
  // public fcm: FcmProvider,
  constructor(private oneSignal: OneSignal, public toastCtrl: ToastController, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private iab: InAppBrowser) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { icon: 'home', title: 'Home', component: HomePage },
      { icon: 'clipboard', title: 'Services', component: ServicesPage },
      { icon: 'calendar', title: 'Programs', component: EventsPage },
      { icon: 'notifications', title: 'Announcements', component: MessagesPage },
      // { icon: 'card', title: 'Donate', component: DonatePage },
      { icon: 'school', title: 'School', component: SchoolPage },
      { icon: 'help-circle', title: 'Ask Imam', component: ImamPage },
      { icon: 'mail', title: 'Contact', component: NewsLetterPage },
      { icon: 'notifications-outline', title: 'Subscribe', component: SubscribePage },
      { icon: 'logo-facebook', title: 'Social Media', component: SocialMediaPage },
      { icon: 'contact', title: 'About', component: AboutPage }

    ];

    this.SocialLinks = [
      { title: 'Donate', Url: 'https://www.masjidnoorli.net/donate/', icon: 'card' },
      { title: 'Volunteer', Url: 'https://docs.google.com/forms/d/e/1FAIpQLSeNU1EnV1QYB8ToXrRbl5NqphmI7_NhmmoEPgZzxiw7ezASiA/viewform', icon: 'link' },
      // { title: 'Website', Url: 'http://masjidnoorli.net', icon: 'globe' },
      { title: 'Location', Url: 'https://www.google.com/maps/place/Masjid+Noor+LI/@40.8393704,-73.3686598,17z/data=!3m1!4b1!4m5!3m4!1s0x89e82f346b636007:0x355d3acb3f74deaa!8m2!3d40.8393664!4d-73.3664711', icon: 'compass' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //this.notificationSetup();

      if (isCordovaAvailable()) {
        this.oneSignal.startInit(oneSignalAppId, sender_id);
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.handleNotificationReceived().subscribe(data => this.onPushReceived(data.payload));
        this.oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload));
        this.oneSignal.endInit();
      }

    });
  }
 

  private onPushReceived(payload: OSNotificationPayload) {
    //alert('Push recevied:' + payload.body);
    console.log('Push recevied:' + payload.body);
    this.nav.push(HomePage);

  }

  private onPushOpened(payload: OSNotificationPayload) {
    //alert('Push opened: ' + payload.body);
  }

  openUrl(Url: string, myEvent) {
    // const browser = this.iab.create(Url);
    // browser.show();
    //const browser = this.iab.create(Url);

    let target = "_system";

    this.iab.create(Url,target,this.options);
  
}

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
