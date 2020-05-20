import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HomePage } from "../home/home";

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';

/**
 * Generated class for the SchoolFeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-school-fee',
  templateUrl: 'school-fee.html',
})
export class SchoolFeePage {

  sendData: any;
  BaseUrl: string;
  lname: string;
  mobile: string;
  fname: string;
  email: string;
  submitAttempt: boolean = false;
  loginForm: FormGroup;

  constructor(public formBilder: FormBuilder, public navCtrl: NavController, public alertCtrl: AlertController, public toastCtrl: ToastController, public http: Http, private navController: NavController) {

    this.BaseUrl = 'https://elitevisionit.com/masjidNoor/index.php/';
    this.loginForm = formBilder.group({
      parent_name: ['', Validators.compose([Validators.minLength(4),Validators.required])],
      fname: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      lname: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      amount_requested: ['', Validators.compose([Validators.minLength(1), Validators.required])],
      reason_discount: ['', Validators.compose([Validators.minLength(10), Validators.required])]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchoolFeePage');
  }

  formataNumero(e: any, separador: string = '.', decimais: number = 2) {
    let a:any = e.value.split('');
    let ns:string = '';
    a.forEach((c:any) => { if (!isNaN(c)) ns = ns + c; });
    ns = parseInt(ns).toString();
    if (ns.length < (decimais+1)) { ns = ('0'.repeat(decimais+1) + ns); ns = ns.slice((decimais+1)*-1); }
    let ans = ns.split('');
    let r = '$';
    for (let i=0; i < ans.length; i++) if (i == ans.length - decimais) r = r + separador + ans[i]; else r = r + ans[i];
    e.value = r;
    console.log('e.value',e.value);
    //this.navCtrl.push('CheckoutProcessPage',{Total:r});
  }

  SubmitToServer(LoginData: any) {
    // if (this.email == '' || this.fname == '' || this.mobile == '' || this.lname == '') {
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
      var link = this.BaseUrl + 'HomePage/schoolFee';
      var data = JSON.stringify({ fname: LoginData.fname, lname: LoginData.lname, parent_name: LoginData.parent_name, amount_requested: LoginData.amount_requested, reason_discount: LoginData.reason_discount });

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
