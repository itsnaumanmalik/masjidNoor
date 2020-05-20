import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HomePage } from "../home/home";

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';


/**
 * Generated class for the SubscribePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-subscribe',
  templateUrl: 'subscribe.html',
})
export class SubscribePage {
  check_box: any;
  sendData: any;
  BaseUrl: string;
  lname: string;
  mobile: string;
  fname: string;
  email: string;
  submitAttempt: boolean = false;
  loginForm: FormGroup;
  
  constructor(public formBilder: FormBuilder,public navCtrl: NavController,public alertCtrl: AlertController,public toastCtrl: ToastController, public http: Http,private navController: NavController) {

    this.BaseUrl = 'https://elitevisionit.com/masjidNoor/index.php/';
    this.loginForm = formBilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      fname: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      lname: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      check_box: ['false', Validators.requiredTrue],
      mobile: ['', Validators.compose([Validators.maxLength(13), Validators.required])]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubscribePage');
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
      var link = this.BaseUrl + 'HomePage/subscribe';
      var data = JSON.stringify({ fname: LoginData.fname,lname: LoginData.lname, email: LoginData.email, mobile: LoginData.mobile,check_box:LoginData.check_box});

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

  // updateCheckedOptions(location:Object, isChecked: boolean) {
  //     console.log(location)
  //     const worksites = <FormArray>this.myForm.controls.worksites;
  //     if(isChecked) {
  //       worksites.push(new FormControl(location));
  //     } else {
  //       let index = worksites.controls.findIndex(x => x.value.location_id == location.location_id);
  //       worksites.removeAt(index);
  //     }
  // }

}
