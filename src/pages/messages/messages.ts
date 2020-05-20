import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RemoteServiceProvider } from "../../providers/remote-service/remote-service";
import { MessageDetailsPage } from "../message-details/message-details";
import { EventsDetailPage } from "../events-detail/events-detail";
/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  notification: any;

  constructor(public http: Http, public ServerUrl: RemoteServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.MessagesNotification();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }

  MessagesNotification() {
    this.ServerUrl.getMessageDetails()
      .then(data => {
        this.notification = data;
        console.log("notification:", this.notification);
      });
  }

  // eventDetails() {
  //   this.navCtrl.push(MessageDetailsPage);
  // }
//   public eventDetails(selectedDetail:any){
//    this.navCtrl.push(EventsDetailPage,{data:JSON.stringify(selectedDetail)}); 
// }

}
