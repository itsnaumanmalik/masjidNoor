import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteServiceProvider } from "../../providers/remote-service/remote-service";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { EmailComposer } from "@ionic-native/email-composer";
import { CallNumber } from "@ionic-native/call-number";

/**
 * Generated class for the MessageDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-message-details',
  templateUrl: 'message-details.html',
})
export class MessageDetailsPage {
  eventsDetail: any;
  data: any;
  event: any;

  constructor(private emailComposer: EmailComposer,private callNumber: CallNumber,private iab: InAppBrowser,public ServerUrl: RemoteServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
  // this.eventDetails();
    this.data = this.navParams.get('data');
    console.log("this.data:", this.data);
    this.eventsDetail = JSON.parse(this.data);
    console.log("this.eventsDetails:", this.eventsDetail);
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageDetailsPage');
  }

  //  eventDetails(){
  //    this.ServerUrl.showEventDetails()
  //     .then(data => {
  //       this.event = data;
  //       console.log("events:", this.event);
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
