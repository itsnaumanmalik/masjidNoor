import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HomePage } from "../home/home";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';

/**
 * Generated class for the NewsLetterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-news-letter',
  templateUrl: 'news-letter.html',
})
export class NewsLetterPage {
  ServerUrl: string;
  sendData: any;
  BaseUrl: string;
  name: any;
  email: any;
  mobile: any;
  query: any;
  message: any;
  submitAttempt: boolean = false;
  loginForm: FormGroup;

  constructor(public formBilder: FormBuilder,public toastCtrl: ToastController, public http: Http, public server: RemoteServiceProvider, public loadingctrl: LoadingController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    this.loginForm = formBilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      name: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      query: ['', Validators.compose([Validators.required, Validators.required])],
      message: ['', Validators.compose([Validators.required, Validators.required])],
      mobile: ['', Validators.compose([Validators.maxLength(13), Validators.required])]
    })
    
    // this.SubmitToServer(LoginData: any);
    this.ServerUrl = 'https://elitevisionit.com/masjidNoor/index.php/';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsLetterPage');
  }


  SubmitToServer(LoginData: any) {
    // if ((this.email == '' || this.name == '' || this.mobile == '' || this.query == '' || this.message == '') || 
    // this.email == '' && this.name == '' && this.mobile == '' && this.query == '' && this.message == '') {
    //   let alert = this.alertCtrl.create({
    //     title: 'Error',
    //     message: 'Please enter all details correctly',
    //     buttons: ['OK']
    //   });
    //   alert.present();

    // }
    // else {
      if (!this.loginForm.valid) {
      this.submitAttempt = true;
      console.log(' Some values were not given or were incorrect, please fill them');
    } else {
      var link = this.ServerUrl + 'HomePage/contact';
      var data = JSON.stringify({ name: LoginData.name, email: LoginData.email, mobile: LoginData.mobile, query: LoginData.query, message: LoginData.message });

      this.http.post(link, data)
        .subscribe(data => {
          console.log("data1", data);
          this.sendData = data.json();
          console.log("this.sendData", this.sendData);
          if (this.sendData.status == "success") {
            this.presentToast('Your query has been sent');

            this.navCtrl.setRoot(HomePage);
          }
          else {
            this.presentToast('Your query was not sent');
          }
        }, error => {
          console.log(error);
        });
    }

  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }


}
