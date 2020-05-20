import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteServiceProvider } from "../../providers/remote-service/remote-service";
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
import { EmailComposer } from "@ionic-native/email-composer";
import { CallNumber } from "@ionic-native/call-number";

/**
 * Generated class for the EventsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-events-detail',
  templateUrl: 'events-detail.html',
})
export class EventsDetailPage {
  eventsDetails: any;
  data: any;
  pic_url: any;
  event: any;

  options: InAppBrowserOptions = {
    location: 'yes',//Or 'no' 
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes',//Android only ,shows browser zoom controls 
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only 
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'no', //iOS only 
    toolbar: 'yes', //iOS only 
    enableViewportScale: 'no', //iOS only 
    allowInlineMediaPlayback: 'no',//iOS only 
    presentationstyle: 'pagesheet',//iOS only 
    fullscreen: 'yes',//Windows only    
  };

  constructor(private emailComposer: EmailComposer,private callNumber: CallNumber,private iab: InAppBrowser,public ServerUrl: RemoteServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
   // this.eventDetails();
    this.data = this.navParams.get('data');
    console.log("this.data:", this.data);
    this.eventsDetails = JSON.parse(this.data);
    console.log("this.eventsDetails:", this.eventsDetails);
    
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsDetailPage');
  }

  //   eventDetails(){
  //    this.ServerUrl.showEventDetails()
  //     .then(data => {
  //       this.event = data;
  //       console.log("events:", this.event);
  //       // for (var value of this.events) {
          
  //       //   this.date = value.date;
  //       //   console.log("this.check_date: ", this.date);
  //       //   this.title = value.title;
  //       //   this.address = value.address;
  //       //   this.website = value.website;
  //       //   this.description = value.description;
  //       //   this.email = value.email;
  //       //   this.category = value.category;
  //       //   this.timing = value.timing;
  //       //   this.pic_url = value.pic_url;
  //       //   this.phone = value.phone;
  //       // }
  //     });
  // }

  weburl(url) {
    const browser = this.iab.create(url);
  }

  call(number){
        
        this.callNumber.callNumber(number, true)
        .then(() => console.log('Launched dialer!'))
        .catch(() => console.log('Error launching dialer'));
 }

 openLink(url) {
    //const browser = this.iab.create('http://www.elitevisionit.com/masjidNoor/files/SchoolCalendar.pdf');
    let target = "_system";
    this.iab.create(url, target, this.options);
  }

 Email(address){
        
        this.emailComposer.isAvailable().then((available: boolean) =>{
            if(available) {
                //Now we know we can send
            }
        });
        
        let email = {
            to: address,
            
            subject: '',
            body: '',
            isHtml: true
        };
        
        // Send a text message using default options
        this.emailComposer.open(email);
        
    }

}
