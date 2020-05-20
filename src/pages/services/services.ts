import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, ToastController, AlertController } from 'ionic-angular';
import { RemoteServiceProvider } from "../../providers/remote-service/remote-service";
import { ServiceFormsPage } from "../service-forms/service-forms";
import { NewsLetterPage } from "../news-letter/news-letter";

/**
 * Generated class for the ServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {


  constructor(public serverUrl: RemoteServiceProvider, public alertCtrl: AlertController, public viewCtrl: ViewController, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {
    // this.forms();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesPage');
  }

  tap() {
    let alert = this.alertCtrl.create({
      subTitle: 'Monthly Community Nights',
      //subTitle: 'Content Coming Soon',
      message: 'Provides a platform for Muslims in community to gather in the Masjid to listen to a few wise words from the Imam and socialize in a spiritual setting.',
      buttons: ['OK']
    });

    alert.present();
  }

  tap1() {
    let alert = this.alertCtrl.create({
      subTitle: 'Sister’s classes',
      //subTitle: 'Content Coming Soon',
      message: 'a weekly class led by female scholar for ladies to learn Islamic teachings and jurisprudence.',
      buttons: ['OK']
    });

    alert.present();
  }

  tap2() {
    let alert = this.alertCtrl.create({
      subTitle: 'Monthly Youth programs',
      //subTitle: 'Content Coming Soon',
      message: 'Masjid schedules regular events to attract teenagers to the masjid. Events include, halaqa, picnic and sports activities.',
      buttons: ['OK']
    });

    alert.present();
  }

  tap3() {
    let alert = this.alertCtrl.create({
      title: 'Nikkah',
      //subTitle: 'Content Coming Soon',
      message:'Please Contact US for the service',
      // buttons: ['OK']
      buttons: [
      {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, 
      {
        text: 'Contact US',
        handler: () => {
          this.navCtrl.push(NewsLetterPage);
        }
      }
    ]
    });//

    alert.present();
  }

  tap4() {
    let alert = this.alertCtrl.create({
      subTitle: 'Youth Summer Camp',
      //subTitle: 'Content Coming Soon',
      message: 'During summer break, masjid organizes summer school to provide a learning environment for our boys and girls where they are taught while having plenty of fun.',
      buttons: ['OK']
    });

    alert.present();
  }

  // private presentToast(text) {
  //   let toast = this.toastCtrl.create({
  //     message: text,
  //     duration: 3000,
  //     position: 'bottom'
  //   });
  //   toast.present();
  // }

  formsDetail() {
    this.navCtrl.push(ServiceFormsPage);
  }

}
