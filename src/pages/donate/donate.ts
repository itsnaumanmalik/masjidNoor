import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { CheckoutProcessPage } from "../checkout-process-page/checkout-process-page";
import { DetailsPage } from "../details/details";
/**
 * Generated class for the DonatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-donate',
  templateUrl: 'donate.html',
})
export class DonatePage {
  mosque_name: any;
  mosque_id: any;
  mosque: any;
  value = '';
  // fitranaIns= 'fitrana';
  // schoolIns= 'school';
  // masjidIns= 'masjid';
  selectedOption: string;
  printedOption: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public viewCtrl: ViewController, ) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonatePage');
    
  }

  


  addDetails(value) {
   var instructions=value.currentTarget.name;
    console.log("value:",value.currentTarget.name);
    this.navCtrl.push(CheckoutProcessPage ,{instructions:instructions});
  }

  


}
