import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HomePage } from "../home/home";

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
/**
 * Generated class for the SchoolRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-school-register',
  templateUrl: 'school-register.html',
})
export class SchoolRegisterPage {

  gender: string = "Male";
  maleValue: any;
  femaleValue: any;
  male: boolean = true;
  female: boolean = false;

  payment_option: string = "";
  program_attending: string = "Maktab";

  grade_entering: any;
  grade_attended: any;
  sendData: any;
  BaseUrl: string;
  lname: string;
  mobile: string;
  fname: string;
  email: string;
  submitAttempt: boolean = false;
  loginForm: FormGroup;
  Dine: boolean = true;
  Take: boolean = false;
  isenabled: boolean = false;
  toggleBool: boolean = true;
  agree_masjid_terms: string = "masjid_rules";
  agree_waiver_terms: string = "waiver_rules";

  constructor(public formBilder: FormBuilder, public navCtrl: NavController, public alertCtrl: AlertController, public toastCtrl: ToastController, public http: Http, private navController: NavController) {

    this.BaseUrl = 'https://elitevisionit.com/masjidNoor/index.php/';
    this.loginForm = formBilder.group({
      fname: ['', Validators.compose([Validators.minLength(4), Validators.required])],
      lname: ['', Validators.compose([Validators.minLength(4), Validators.required])],
      // gender: ['', Validators.compose([Validators.required])],
      age: ['', Validators.compose([Validators.required])],
      grade_entering: ['', Validators.compose([Validators.required])],
      grade_attended: ['', Validators.compose([Validators.required])],
      parent_name: ['', Validators.compose([Validators.required])],
      parent_phone: ['', Validators.compose([Validators.required])],
      parents_phone_text: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.minLength(4), Validators.required])],
      parent_email: ['', Validators.compose([Validators.required, EmailValidator.isValid])]
      // program_attending: ['', Validators.compose([Validators.required])],
      // payment_option: ['', Validators.compose([Validators.required])]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchoolRegisterPage');
  }



  // selectGender(gender) {
  //   this.gender = gender;

  //   if (this.gender == "male") {
  //     this.male = true;
  //     this.female = false;
  //     console.log("male", this.gender);
  //     //paypal=this.payment;
  //     this.maleValue = this.gender;
  //   }
  //   else if (this.gender == "female") {
  //     this.female = true;
  //     this.male = false;
  //     this.femaleValue = this.gender;
  //     console.log("female", this.gender);
  //     //creditcard= this.payment


  //   }
  // }
  selectGender(gender) {
    this.gender = gender;
  }


  gradeEntering() {
    console.log("grade_entering:", this.grade_entering);
  }

  gradeAttended() {
    console.log("grade_attended:", this.grade_attended);
  }

  programAttending(program_attending) {
    this.program_attending = program_attending;
  }

  paymentOption(payment_option) {
    this.payment_option = payment_option;
  }

  // rulesOption(agree_masjid_terms, agree_waiver_terms) {
  //   this.agree_masjid_terms = agree_masjid_terms;
  //   this.agree_waiver_terms = agree_waiver_terms;
  //   if ((this.agree_masjid_terms == agree_masjid_terms) && (this.agree_waiver_terms == agree_waiver_terms)) { // if no radio button is selected, always return false so every nothing is shown  
  //     this.isenabled = true;
  //     // return false;  
  //   }
  //   else {
  //     this.isenabled = false;
  //   }
  // }



  changeEvent() {
    if (this.Dine == true) {
      this.isenabled = true;
    }
    else {
      this.isenabled = false;
    }
  }
  // waiverOption(agree_waiver_terms){
  //   this.agree_waiver_terms=agree_waiver_terms;
  //   if (this.agree_waiver_terms) { // if no radio button is selected, always return false so every nothing is shown  
  //     this.isenabled = true;
  //     // return false;  
  //   }
  //   else {
  //     this.isenabled = false;
  //   }
  // }


  SubmitToServer(LoginData: any) {
    if (!this.loginForm.valid) {
      this.submitAttempt = true;
      console.log(' Some values were not given or were incorrect, please fill them');
    } else {
      var link = this.BaseUrl + 'HomePage/schoolRegistration';
      var data = JSON.stringify({
        fname: LoginData.fname, lname: LoginData.lname, gender: this.gender, age: LoginData.age, grade_entering: this.grade_entering,
        grade_attended: this.grade_attended, parent_name: LoginData.parent_name,
        parent_phone: LoginData.parent_phone, parents_phone_text: LoginData.parents_phone_text, address: LoginData.address,
        parent_email: LoginData.parent_email, program_attending: this.program_attending, payment_option: this.payment_option
      });

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
