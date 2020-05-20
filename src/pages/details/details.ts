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
import { CheckoutProcessPage } from "../checkout-process-page/checkout-process-page";
import { NativeStorage } from "@ionic-native/native-storage";

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  instructions: any;
  Total: any;
  Email: any;
  total: any;
  fitranaIns: any;
  schoolIns: any;
  masjidIns: any;
  sendData: any;
  BaseUrl: string;
  email: any;

  submitAttempt: boolean = false;
  loginForm: FormGroup;

  constructor(private nativeStorage: NativeStorage, public formBilder: FormBuilder, public toastCtrl: ToastController, public http: Http, public ServerUrl: RemoteServiceProvider, public loadingctrl: LoadingController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    this.loginForm = formBilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      total: ['', Validators.compose([Validators.minLength(1), Validators.required])]
    })

    this.instructions = this.navParams.get('instructions');
    console.log("this.instructions:", this.instructions);

    this.BaseUrl = 'https://elitevisionit.com/masjidNoor/index.php/';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

  formataNumero(e: any, separador: string = '.', decimais: number = 2) {
    let a:any = e.value.split('');
    let ns:string = '';
    a.forEach((c:any) => { if (!isNaN(c)) ns = ns + c; });
    ns = parseInt(ns).toString();
    if (ns.length < (decimais+1)) { ns = ('0'.repeat(decimais+1) + ns); ns = ns.slice((decimais+1)*-1); }
    let ans = ns.split('');
    let r = '';
    for (let i=0; i < ans.length; i++) if (i == ans.length - decimais) r = r + separador + ans[i]; else r = r + ans[i];
    e.value = r;
    console.log('e.value',e.value);
    //this.navCtrl.push('CheckoutProcessPage',{Total:r});
  }

  SubmitToServer(LoginData: any) {

    if (!this.loginForm.valid) {
      this.submitAttempt = true;
      console.log(' Some values were not given or were incorrect, please fill them');
    } else {
      var link = this.BaseUrl + 'HomePage/details';
      var data = JSON.stringify({ total: LoginData.total, email: LoginData.email });

      this.http.post(link, data)
        .subscribe(data => {
          console.log("data1", data);
          this.sendData = data.json();
          console.log("this.sendData", this.sendData);
          if (this.sendData.status == "success") {
            
            //this.presentToast('Your query has been sent');
            var Ftotal=LoginData.total;
            var Femail=LoginData.email;
            var Finstructions=this.instructions;
            //this.navCtrl.push('CheckoutProcessPage',{Email:Femail,Instructions:Finstructions});
            this.navCtrl.push(CheckoutProcessPage,{Total:Ftotal,Email:Femail,Instructions:Finstructions});
            // this.navCtrl.push(CheckoutProcessPage);
            // this.navCtrl.push('CheckoutProcessPage',{Total:Ftotal,Email:Femail,Instructions:Finstructions});
            
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

  // setDetails() {
  //   this.nativeStorage.setItem('paymentdetails', { email: this.email, total: this.total })
  //     .then(
  //     () => console.log('Stored item!'),
  //     error => console.error('Error storing item', error)
  //     );
  // }



  // getDetails() {
  //   this.nativeStorage.getItem('paymentdetails')
  //     .then(
  //     data => {
  //       console.log("data",data);
  //       this.Email=data.email;
  //       this.Total=data.total;
  //     },
  //     error => console.error(error)
  //     );
  // }




}
