import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { HomePage } from "../home/home";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalVariable } from '../../app/global';
import { NativeStorage } from "@ionic-native/native-storage";
// import { Stripe } from '@ionic-native/stripe';
import { RemoteServiceProvider } from "../../providers/remote-service/remote-service";
/**
 * Generated class for the Payment page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// @IonicPage()
declare var Stripe;

@Component({
    selector: 'page-payment',
    templateUrl: 'payment.html',
})
export class Payment {
    todayTime: any;
    total: any;
    time: any;
    value: any;
    mosque: {
    };
    mosque_name: any;
    id: any;
    Token: any;

    deliver: any;
    pickup: any;
    StorePoint: any;
    order_date: any;
    instructions: string = '';
    Address: any;
    data: any;
    email: any;
    user_name: any;

    amount: any;
    cardinfo: any = {
        number: '',
        expMonth: '',
        expYear: '',
        cvc: ''
    }
    submitAttempt: boolean = false;
    PaymentForm: FormGroup;

    //stripeToken = Stripe('pk_live_7QWheQF9Fd0prGb5wxUN25ce00dury00IM');
    stripeToken = Stripe('pk_test_tlKA7FnnkzqjFk4Vh62yXNm3');
    cardJS: any;

    constructor(public ServerUrl: RemoteServiceProvider, private nativeStorage: NativeStorage, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public globals: GlobalVariable, public viewCtrl: ViewController, private app: App, public formBuilder: FormBuilder, public http: Http, public navCtrl: NavController, public navParams: NavParams) {
        // constructor(public NativeStorage:NativeStorage,private nativeStorage: NativeStorage,public alertCtrl: AlertController,public loadingCtrl: LoadingController, public globals: GlobalVariable, public viewCtrl: ViewController,private app: App,public formBuilder: FormBuilder,public stripe: Stripe, public http: Http,public navCtrl: NavController, public navParams: NavParams) {
        this.amount = this.navParams.get('total');
        console.log("Total:", this.amount);
        this.email = this.navParams.get('email');
        this.Address = this.navParams.get('Address');
        this.instructions = navParams.get('instructions');
        console.log("Instruct:", this.instructions);
        this.time = this.navParams.get('Date').toLocaleString('en-US', { timeZone: 'America/New_York' });
        console.log("Date:", this.time);
        this.StorePoint = navParams.get('StoreAmount');

        var today = new Date();
        this.todayTime = today.toLocaleString('en-US', { timeZone: 'America/New_York' });
        console.log("Today Date:", this.todayTime);

        this.PaymentForm = formBuilder.group({
            creditcardno: ['', Validators.compose([Validators.minLength(16), Validators.maxLength(16), Validators.pattern('[0-9]*'), Validators.required])],
            expiryMonth: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(2), Validators.required])],
            expiryYear: ['', Validators.compose([Validators.minLength(4), Validators.maxLength(4), Validators.required])],
            CVC: ['', Validators.compose([Validators.required])],
            cardinfo: [false]
        });



        //this.getCreditCard();
        this.showMosqueName();

        // this.PaymentForm.value.creditcardno = '4242424242424244242'
        //       this.PaymentForm.get('creditcardno').setValue(this.PaymentForm.value.creditcardno);

        //        console.log(this.PaymentForm.value.cardno);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PaymentPage');
        this.setupStripe();
    }



    showMosqueName() {
        this.ServerUrl.getMosqueName()
            .then(data => {
                this.mosque = data;
                console.log("mosque_data:", this.mosque);
                this.id = this.mosque[0].id;
                console.log("mosque_id:", this.id);
                this.mosque_name = this.mosque[0].mosque_name;
                console.log("mosque_name:", this.mosque_name);
            });
    }

    // pay(PaymentData: any) {

    //     var a = btoa(PaymentData.creditcardno)
    //     console.log("encode", a);
    //     console.log("decode", atob(a));
    //     console.log(PaymentData.creditcardno);
    //     if (!this.PaymentForm.valid) {
    //         this.submitAttempt = true;
    //         console.log(' Some values were not given or were incorrect, please fill them');
    //     } else {

    //         console.log("paymentcard", PaymentData.cardinfo);
    //         if (PaymentData.cardinfo == true) {
    //             this.nativeStorage.setItem('card',
    //                 {
    //                     cardno: btoa(PaymentData.creditcardno),
    //                     exmonth: btoa(PaymentData.expiryMonth),
    //                     exyear: btoa(PaymentData.expiryYear),
    //                     cvc: btoa(PaymentData.CVC),
    //                     check: btoa(PaymentData.cardinfo)
    //                 }).then(() => console.log('Stored item!'),
    //                 error => console.error('Error storing item', error)
    //                 // error => console.log("Error!")
    //                 );
    //         }


    //         this.cardinfo = {
    //             number: PaymentData.creditcardno,
    //             expMonth: PaymentData.expiryMonth,
    //             expYear: PaymentData.expiryYear,
    //             cvc: PaymentData.CVC
    //         }

    //         console.log(this.cardinfo);
    //         let loading = this.loadingCtrl.create({
    //             content: "Loading... Please wait",

    //         });
    //         loading.present();
    //         if (this.globals.StripId == '') {
    //             loading.dismiss();

    //             let alert = this.alertCtrl.create({
    //                 title: 'Oops',
    //                 subTitle: 'Payments not available,please try again',
    //                 buttons: ['OK']
    //             });

    //             alert.present();
    //         }
    //         else {
    //             console.log("Time date:", this.time);
    //             console.log("this.globals.StripId", this.globals.StripId);

    //             this.stripe.setPublishableKey(this.globals.StripId);
    //             this.stripe.createCardToken(this.cardinfo)
    //                 .then((Token) => {
    //                     console.log("Token for stripe is:", Token);
    //                     // var data = 'stripetoken=' + token + '&amount=50';
    //                     var link = ('https://elitevisionit.com/masjidNoor/index.php/HomePage/place_order');

    //                     var orderdata = JSON.stringify({ time: this.todayTime, email: this.email, mosque_id: this.id, payment_info: { address: this.Address, token: Token.id }, instructions: this.instructions, total: this.amount });
    //                     console.log(orderdata);
    //                     this.http.post(link, orderdata).subscribe(data => {

    //                         console.log("data without json", data);
    //                         this.data = data.json();
    //                         console.log("data1:", this.data);
    //                         loading.dismiss();

    //                         console.log("data", this.data);

    //                         if (this.data.success) {

    //                             let alert = this.alertCtrl.create({
    //                                 title: 'Congratulation',
    //                                 subTitle: this.data.message,
    //                                 buttons: ['OK']
    //                             });
    //                             alert.present();

    //                             //this.setArray();
    //                             // this.RadeemStoreCredit();
    //                             //this.navCtrl.popToRoot();
    //                             // this.viewCtrl.dismiss();
    //                             this.navCtrl.setRoot(HomePage);

    //                         }

    //                         else {
    //                             let alert_error = this.alertCtrl.create({
    //                                 title: 'Error',
    //                                 subTitle: this.data.message,
    //                                 buttons: ['OK']
    //                             });

    //                             alert_error.present();


    //                         }

    //                     }
    //                         , error => {
    //                             console.log("Error!");
    //                             // debugger;
    //                         });

    //                 });
    //         }
    //     }
    // }
    setupStripe() {
        let elements = this.stripeToken.elements();

        var style = {
            base: {
                color: '#32325d',
                lineHeight: '24px',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#aab7c4'
                }
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a'
            }
        };


        this.cardJS = elements.create('card', { hidePostalCode: true, style: style });


        this.cardJS.mount('#card-element');

        this.cardJS.addEventListener('change', event => {
            var displayError = document.getElementById('card-errors');
            if (event.error) {
                displayError.textContent = event.error.message;
            } else {
                displayError.textContent = '';
            }
        });

        var form = document.getElementById('payment-form');

        console.log("Form:", form);

        form.addEventListener('submit', event => {
            let loading = this.loadingCtrl.create({
                content: "Loading... Please wait",

            });
            loading.present();
            event.preventDefault();

            //this.stripeToken.createToken(this.cardJS)
                //   this.stripe.createSource(this.card)
                this.stripeToken.createSource(this.cardJS)
                .then(result => {

                    console.log("Token:", result.token.id);
                    console.log("Card:", this.cardJS);
                    if (result.error) {
                        var errorElement = document.getElementById('card-errors');
                        errorElement.textContent = result.error.message;
                    } else if (this.stripeToken == '') {

                        let alert = this.alertCtrl.create({
                            title: 'Oops',
                            subTitle: 'Payments not available,please try again',
                            buttons: ['OK']
                        });

                        alert.present();
                    }else {

                        //this.resDetail.token=result.token.id;

                        console.log("Card details", result);
                        var link = ('https://elitevisionit.com/masjidNoor/index.php/HomePage/place_order');

                        var orderdata = JSON.stringify({ time: this.todayTime, email: this.email, mosque_id: this.id, payment_info: { address: this.Address, token: result.token.id }, instructions: this.instructions, total: this.amount });
                        console.log(orderdata);
                        this.http.post(link, orderdata).subscribe(data => {

                            console.log("data without json", data);
                            this.data = data.json();
                            console.log("data1:", this.data);
                            loading.dismiss();

                            console.log("data", this.data);

                            if (this.data.success) {

                                let alert = this.alertCtrl.create({
                                    title: 'Congratulation',
                                    subTitle: this.data.message,
                                    buttons: ['OK']
                                });
                                alert.present();

                                //this.setArray();
                                // this.RadeemStoreCredit();
                                //this.navCtrl.popToRoot();
                                // this.viewCtrl.dismiss();
                                this.navCtrl.setRoot(HomePage);

                            }

                            else {
                                let alert_error = this.alertCtrl.create({
                                    title: 'Error',
                                    subTitle: this.data.message,
                                    buttons: ['OK']
                                });

                                alert_error.present();


                            }

                        }
                            , error => {
                                console.log("Error!");
                                // debugger;
                            });


                        //////End Api Hit Code Chunk//////
                    }
                });
        });
    }



    setArray() {
        this.globals.Product.length = 0;
        this.nativeStorage.setItem('Product', { array: this.globals.Product })
            .then(
            () => console.log('Stored item!'),
            error => console.error('Error storing item', error)


            );
    }

    Savecreditcard() {
        console.log(this.PaymentForm.value.cardinfo);
    }

    // getCreditCard(){
    //     this.nativeStorage.getItem('card')
    //     .then(data => {

    //         this.PaymentForm.get('creditcardno').setValue(atob(data.cardno));
    //         this.PaymentForm.get('expiryMonth').setValue(atob(data.exmonth));
    //         this.PaymentForm.get('expiryYear').setValue(atob(data.exyear));
    //         this.PaymentForm.get('CVC').setValue(atob(data.cvc));
    //         this.PaymentForm.get('cardinfo').setValue(atob(data.check));


    //     }).catch(err => console.log);

    // }

    dismiss() {
        this.viewCtrl.dismiss();
    }
    cancel() {

        // this.navCtrl.popToRoot();
        this.viewCtrl.dismiss();
    }



}
