import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from "@ionic-native/email-composer";
import { CallNumber } from "@ionic-native/call-number";
import { RemoteServiceProvider } from "../../providers/remote-service/remote-service";

/**
 * Generated class for the SchoolContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-school-contact',
  templateUrl: 'school-contact.html',
})
export class SchoolContactPage {
  details: any;

  constructor(public ServerUrl: RemoteServiceProvider,private emailComposer: EmailComposer,private callNumber: CallNumber,public navCtrl: NavController, public navParams: NavParams) {
    this.school();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchoolContactPage');
  }

  school(){
     this.ServerUrl.getSchool()
      .then(data => {
        this.details = data;
        console.log("school:", this.details);
      });
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
