import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HomePage } from "../home/home";
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';

/**
 * Generated class for the ImamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-imam',
  templateUrl: 'imam.html',
})
export class ImamPage {
  imam: {
  };
  imamValue: any;
  youthValue: any;
  youthFlag: boolean=false;
  imamFlag: boolean=true;
  sending_person: any;
  preferred_contact: any;
  phone: any;
  fiqh:any;
  sendData: any;
  BaseUrl: string;
  lname: string;
  mobile: string;
  fname: string;
  email: string;
  submitAttempt: boolean = false;
  loginForm: FormGroup;
  phoneFlag: boolean = true;
  emailFlag: boolean = false;
  phoneValue: any;
  emailValue: any;

  constructor(public ServerUrl: RemoteServiceProvider,public formBilder: FormBuilder,public navCtrl: NavController,public alertCtrl: AlertController,public toastCtrl: ToastController, public http: Http,private navController: NavController) {

    this.BaseUrl = 'https://elitevisionit.com/masjidNoor/index.php/';
    this.loginForm = formBilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      fname: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      lname: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      // general: ['false', Validators.requiredTrue],
      // fiqh: ['false', Validators.requiredTrue],
      mobile: ['', Validators.compose([Validators.maxLength(13), Validators.required])],
      question: ['', Validators.compose([Validators.minLength(10), Validators.required])]
      // imam: ['', Validators.compose([Validators.required])],
      // resident_scholar: ['', Validators.compose([Validators.required])]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImamPage');
  }

  selectOption(imam) {
    this.sending_person = imam;
    if(this.sending_person == "imam"){
        this.imamFlag=true;
        this.youthFlag = false;
        console.log("imam:",this.sending_person);
        //paypal=this.payment;
        this.imamValue=this.sending_person;
    }
    else if(this.sending_person == "youth_director"){
        this.imamFlag=false;
        this.youthFlag = true;
        this.youthValue = this.sending_person;
        console.log("Youth Director:",this.sending_person);
        //creditcard= this.payment
        

    }
  }
  
  selectQuestion(phone) {
    this.preferred_contact = phone;
    if(this.preferred_contact == "phone"){
        this.phoneFlag=true;
        this.emailFlag = false;
        console.log("phone:",this.preferred_contact);
        //paypal=this.payment;
        this.phoneValue=this.preferred_contact;
    }
    else if(this.preferred_contact == "email"){
        this.phoneFlag=false;
        this.emailFlag = true;
        this.emailValue = this.preferred_contact;
        console.log("email:",this.preferred_contact);
        //creditcard= this.payment
        

    }
  } 

  imamInfo() {
    this.ServerUrl.getImamInfo()
      .then(data => {
        this.imam = data;
        console.log("imam:", this.imam);
        
      });
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
      var link = this.BaseUrl + 'HomePage/askImam';
      var data = JSON.stringify({ sending_person:this.sending_person,fname: LoginData.fname,lname: LoginData.lname, email: LoginData.email, mobile: LoginData.mobile,preferred_contact:this.preferred_contact,question:LoginData.question});

      this.http.post(link, data)
        .subscribe(data => {
          console.log("data1", data);
          this.sendData = data.json();
          console.log("this.sendData", this.sendData);
          if (this.sendData.status == "success") {
            this.imamInfo();
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
