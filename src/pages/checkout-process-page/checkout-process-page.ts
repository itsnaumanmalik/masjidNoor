import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { NativeStorage } from "@ionic-native/native-storage";
import { GlobalVariable } from "../../app/global";
import { Http } from '@angular/http';
import { HomePage } from "../home/home";
import { RemoteServiceProvider } from "../../providers/remote-service/remote-service";
import { now } from "moment/moment";
import { Payment } from "../payment/payment";
import { EmailValidator } from '../../validators/email';
//import { InAppBrowserOptions } from "@ionic-native/in-app-browser";
import { InAppBrowserOptions, InAppBrowser } from "@ionic-native/in-app-browser";
/**
 * Generated class for the CheckoutProcessPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// @IonicPage()
@Component({
    selector: 'page-checkout-process-page',
    templateUrl: 'checkout-process-page.html',
})
export class CheckoutProcessPage {
    payment: string = "paypal";
    paypalValue: any;
    creditcardValue: any;
    todayTime: any;
    mosque: any;
    mosque_name: any;
    id: any;
    instructions: any;

    total: any;
    fitranaIns: any;
    schoolIns: any;
    masjidIns: any;

    fitrana: boolean = true;
    school: boolean = false;
    masjid: boolean = false;


    deliverFlag: boolean;

    estTime: any;
    storevalue: any;
    reward_amount: number = 0;
    storecreditExist: boolean = false;
    time: number;
    day: number;
    value: string;
    year: number;
    month: any;
    datenow: any;
    date: Date;
    instruction: string = '';
    orderId: any;
    orderStatus: any;
    payapalresponse: any;
    data: any;
    email: any;
    cashpay: any = 0;
    submitAttempt: boolean = false;
    ProcessForm: FormGroup;
    paypal: boolean = true;
    creditcard: boolean = false;
    pickup: boolean = false;
    Schedule_deliver: boolean = false;
    mytime: any;
    myDate: any;
    user_name: any;
    storeCredit: boolean;
    Deliver: boolean = true;
    deliver_now: boolean = true;
    Dine: boolean = true;
    Take: boolean = false;
    month_array: any[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    options: InAppBrowserOptions = {
        location: 'yes',//Or 'no' 
        hidden: 'no', //Or  'yes'
        clearcache: 'yes',
        clearsessioncache: 'yes',
        zoom: 'yes',//Android only ,shows browser zoom controls 
        hardwareback: 'yes',
        mediaPlaybackRequiresUserAction: 'no',
        shouldPauseOnSuspend: 'no', //Android only 
        closebuttoncaption: 'Close', //iOS only
        disallowoverscroll: 'no', //iOS only 
        toolbar: 'yes', //iOS only 
        enableViewportScale: 'no', //iOS only 
        allowInlineMediaPlayback: 'no',//iOS only 
        presentationstyle: 'pagesheet',//iOS only 
        fullscreen: 'yes',//Windows only    
    };

    constructor(public iab: InAppBrowser, public serverUrl: RemoteServiceProvider, public NativeStorage: NativeStorage, private nativeStorage: NativeStorage, public viewCtrl: ViewController, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public http: Http, public globals: GlobalVariable, private payPal: PayPal, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {


        this.instructions = this.navParams.get('instructions');
        console.log("instructions", this.instructions);
        // this.email = this.navParams.get('Email');
        // console.log("email", this.email);
        // this.total = this.navParams.get('Total');
        // console.log("amount", this.total);

        console.log("cashpay", this.cashpay);

        this.ProcessForm = formBuilder.group({
            name: ['', Validators.compose([Validators.minLength(3), Validators.required])],
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            total: ['', Validators.compose([Validators.minLength(1), Validators.required])],
            phone: ['', Validators.compose([Validators.maxLength(13), Validators.required])],
            Address: ['', Validators.compose([Validators.minLength(4), Validators.required])],
            zipcode: ['', Validators.compose([Validators.required])],
            city: ['', Validators.compose([Validators.required])],
            state: ['', Validators.compose([Validators.required])],
            addresscheck: [false]
        })

        console.log("Process Form", this.ProcessForm);
        // console.log(this.globals.Timing);


        // this.getAddress();
        this.showMosqueName();

        var today = new Date();
        this.todayTime = today.toLocaleString('en-US', { timeZone: 'America/New_York' });
        console.log("Today Date:", this.todayTime);

        this.date = new Date();
        this.datenow = this.date.getTime();
        this.month = this.date.getMonth() + 1;
        console.log(this.date, this.month);
        this.year = this.date.getFullYear();
        this.month = this.month.toString();
        this.day = this.date.getDay();
        this.datenow = this.datenow.toString();
        if (this.month.length == 1) {
            this.month = "0" + this.month;
        }
        if (this.datenow.length == 1) {
            this.datenow = "0" + this.datenow;
        }
        console.log("month", this.year, this.month, this.datenow, this.date);

        this.value = this.year + "-" + this.month + "-" + this.datenow;
        this.value.toString();


    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CheckoutProcessPage');


    }

    payOnline() {
        //const browser = this.iab.create('http://www.elitevisionit.com/masjidNoor/files/SchoolCalendar.pdf');
        let target = "_self";
        this.iab.create('http://www.masjidnoorli.net/donate/', target, this.options);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    selectPayment(payment) {
        this.payment = payment;
        if (this.payment == "paypal") {
            this.paypal = true;
            this.creditcard = false;
            console.log("paypal", this.payment);
            //paypal=this.payment;
            this.paypalValue = this.payment;
        }
        else if (this.payment == "creditcard") {
            this.creditcard = true;
            this.paypal = false;
            this.creditcardValue = this.payment;
            console.log("creditcard", this.payment);
            //creditcard= this.payment


        }
    }

    // delivernowbox(){
    //     console.log("delivernow")
    //     if(this.deliver_now == false)
    //     {
    //         this.Schedule_deliver = true;
    //     }
    //     else{
    //         this.Schedule_deliver = false;
    //     }

    // }

    // scheduleDeliverbox(){

    //     if(this.Schedule_deliver == false)
    //     {
    //         this.deliver_now = true
    //     }
    //     else{
    //         this.deliver_now = false
    //     }

    // }

    Instruction() {
        // console.log("bussines disscount flag",this.globals.BusinessDiscountFlag)
        // if(this.globals.BusinessDiscountFlag == true)
        // {
        //     this.instruction = 'Business discount applied '+this.globals.BusinessDiscount+'%';
        // }
        // if(this.globals.GainDiscountFlag ==true )
        // {
        //     this.instruction = 'Business discount applied $ '+this.globals.GainDiscount;

        // }
        // if(this.globals.GainDiscountFlag && this.globals.BusinessDiscountFlag)
        // {

        //     this.instruction = 'Gain discount $'+this.globals.GainDiscount+ 'and Business discount %'+this.globals.BusinessDiscount+  'applied';
        // }

        // if (this.fitrana == true) {
        //     console.log("Fitrana hello");
        //     var fit = 'Fitrana';
        //     this.instruction = this.instruction.concat(fit);
        // }
        // if (this.school == true) {
        //     console.log("school hello");
        //     var sch = 'school';
        //     this.instruction = this.instruction.concat(sch)
        // }
        // if (this.masjid == true) {
        //     console.log("masjid hello");
        //     var msjd = 'masjid';
        //     this.instruction = this.instruction.concat(msjd)
        // }

        console.log("instruction", this.instruction);
    }

    // checkTiming(){

    //     if(this.Schedule_deliver == false)
    //     {
    //         if(this.globals.Timing)
    //         {
    //             this.date =  new Date();
    //             this.day = this.date.getDay();
    //             this.time = this.date.getHours();
    //             console.log("day","hours",this.day,this.time);
    //             var  current_day =  this.globals.Timing[this.day];
    //             console.log(current_day);
    //             if(this.time<current_day[0] || this.time>=current_day[1] || current_day[0] == 'closed' )
    //             {
    //                 let alert = this.alertCtrl.create({
    //                     title: 'Sorry',
    //                     subTitle: 'Restaurants currently closed.',
    //                     buttons: ['OK']
    //                 });
    //                 alert.present();
    //                 return false;
    //             }
    //             else{
    //                 return true;
    //             }

    //         }
    //         else{
    //             console.log("else");
    //                 return true;
    //         }
    //     }
    //     else{
    //         console.log("bigelse");

    //         this.myDate = this.myDate.toString();

    //         var time = this.myDate.substr(11, 2);


    //         console.log(time);


    //         if(this.globals.Timing)
    //         {
    //             var  current_day =  this.globals.Timing[this.day];
    //             console.log(current_day[0],current_day[1],time);
    //             if(parseInt(time) < parseInt(current_day[0]) ||parseInt(time) >= parseInt(current_day[1]) || current_day[0] == 'closed' )
    //             {
    //                 let alert = this.alertCtrl.create({
    //                     title: 'Sorry',
    //                     subTitle: 'Restaurants closed on the given time and date.',
    //                     buttons: ['OK']
    //                 });
    //                 alert.present();
    //                 return false;
    //             }
    //             else{
    //                 return true;
    //             }

    //         }
    //         else{
    //             console.log("else");
    //                 return true;
    //         }


    //     }
    // }

    formataNumero(e: any, separador: string = '.', decimais: number = 2) {
        let a: any = e.value.split('');
        let ns: string = '';
        a.forEach((c: any) => { if (!isNaN(c)) ns = ns + c; });
        ns = parseInt(ns).toString();
        if (ns.length < (decimais + 1)) { ns = ('0'.repeat(decimais + 1) + ns); ns = ns.slice((decimais + 1) * -1); }
        let ans = ns.split('');
        let r = '';
        for (let i = 0; i < ans.length; i++) if (i == ans.length - decimais) r = r + separador + ans[i]; else r = r + ans[i];
        e.value = r;
        console.log('e.value', e.value);
        //this.navCtrl.push('CheckoutProcessPage',{Total:r});
    }

    showMosqueName() {
        this.serverUrl.getMosqueName()
            .then(data => {
                this.mosque = data;
                console.log("mosque_data:", this.mosque);
                this.id = this.mosque[0].id;
                console.log("mosque_id:", this.id);
                this.mosque_name = this.mosque[0].mosque_name;
                console.log("mosque_name:", this.mosque_name);
            });
    }

    process(ProcessData: any) {

        this.Instruction();

        // if(this.checkTiming())
        // {
        // if(this.Schedule_deliver == false)
        // {
        //     this.myDate = "current";
        // }


        console.log(ProcessData, this.ProcessForm.valid, this.myDate);
        if (!this.ProcessForm.valid) {
            this.submitAttempt = true;
            console.log(' Some values were not given or were incorrect, please fill them');
        } else {

            if (ProcessData.addresscheck == true) {
                this.nativeStorage.setItem('address',
                    {
                        name: ProcessData.name,
                        phone: ProcessData.phone,
                        address: ProcessData.Address,
                        zipcode: ProcessData.zipcode,
                        city: ProcessData.city,
                        state: ProcessData.state,
                        check: ProcessData.addresscheck
                    }).then(() => console.log('Stored item!'),
                    error => console.error('Error storing item', error)
                    );
            }

            if (this.creditcard == true) {
                //  if (this.creditcardValue) {
                this.navCtrl.push(Payment, { Address: ProcessData.Address + "," + ProcessData.name + "," + ProcessData.phone + "," + ProcessData.city + "," + ProcessData.state + "," + ProcessData.zipcode, total: Number(ProcessData.total), email: ProcessData.email, Date: this.value, StoreAmount: this.storevalue, instructions: this.instructions });

            }
            else {
                // if(this.Schedule_deliver == false)
                // {
                //     this.myDate = "current";
                // }
                this.OrderStatus(ProcessData);


            }

        }
        //  }
    }

    // paypalbox() {

    //     console.log("paypal", this.paypal);

    //     if (this.paypal == false) {
    //         this.creditcard = true;
    //         this.paypal = false;
    //     }
    //     else {
    //         this.paypal = true;
    //         this.creditcard = false;
    //     }
    // }

    // creditcardbox() {
    //     console.log("creditcard", this.creditcard);

    //     if (this.creditcard == false) {
    //         this.paypal = true;
    //         this.creditcard = false;

    //     }
    //     else {
    //         this.paypal = false;
    //         this.creditcard = true;
    //     }
    // }

    OrderStatus(ProcessData: any) {
         this.payOnline();
        let loading = this.loadingCtrl.create({
            content: "Loading... Please Wait",

        });
        loading.present();
        // console.log("Time",this.myDate);
        var link = "https://elitevisionit.com/masjidNoor/index.php/HomePage/place_order_pp";

        var data = JSON.stringify({ time: this.todayTime, email: this.email, mosque_id: this.id, payment_info: ProcessData.name + "," + ProcessData.phone + "," + ProcessData.Address + "," + ProcessData.city + "," + ProcessData.state + "," + ProcessData.zipcode, instructions: this.instructions, total: this.total });
        console.log("OrderStatus", data);
        this.http.post(link, data).subscribe(data => {
            this.data = data.json();
            console.log(this.data);
            loading.dismiss();
            if (this.data.success) {
                this.orderStatus = this.data.success;
                this.orderId = this.data.orderId;
                console.log("Donation Status:", this.orderId);

                //this.payOnline()
                //this.Paypal(this.data.orderId)
            }
            else {
                let alert = this.alertCtrl.create({
                    title: 'Error',
                    subTitle: 'Please try again',
                    buttons: ['OK']
                });
                alert.present();


            }


            console.log("data", this.data);
        }, error => {
            console.log("Error!");
            loading.dismiss();

        });
    }



    Paypal(id) {

        console.log("id", id);
        this.globals.OrderId = id;
        if (this.globals.paypalId == '') {
            let alert = this.alertCtrl.create({
                title: 'Oops',
                subTitle: 'Payments not available,please try again',
                buttons: ['OK']
            });
            alert.present();
        }
        else {

            this.payPal.init({
                PayPalEnvironmentProduction: this.globals.paypalId,
                PayPalEnvironmentSandbox: this.globals.paypalSandboxId
            }).then(() => {

                this.payPal.prepareToRender('PayPalEnvironmentProduction', new PayPalConfiguration({
                    // Only needed if you get an "Internal Service Error" after PayPal login!
                    //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
                    // acceptCreditCards: true,
                    // languageOrLocale: 'pt-BR',
                    // merchantName: 'CanalDoAbranches',
                    // merchantPrivacyPolicyURL: '',
                    // merchantUserAgreementURL: ''
                })).then(() => {
                    console.log("Total", this.total.toString());
                    let payment = new PayPalPayment(this.total.toString(), 'USD', 'Order no:' + id.toString(), 'sale');
                    this.payPal.renderSinglePaymentUI(payment).then((data) => {

                        // Successfully paid
                        console.log(data);
                        // Example sandbox response
                        //
                        this.payapalresponse = data;
                        this.navCtrl.setRoot(HomePage);
                        console.log(this.payapalresponse);
                        console.log(this.payapalresponse.response.state);

                        // if (this.payapalresponse.response.state == 'approved') {
                        //     this.ConfirmOrder();

                        // }

                        // else {

                        //     let alert = this.alertCtrl.create({
                        //         title: 'Error',
                        //         subTitle: 'Please Try again',
                        //         buttons: ['OK']
                        //     });
                        //     alert.present();

                        // }

                    }, () => {
                        // Error or render dialog closed without being successful
                    });
                }, () => {
                    // Error in configuration
                });
            }, () => {
                // Error in initialization, maybe PayPal isn't supported or something else
            });

        }
    }

    // ConfirmOrder() {

    //     let loading = this.loadingCtrl.create({
    //         content: "Loading... Please Wait",

    //     });
    //     loading.present();
    //     var link = "https://elitevisionit.com/masjidNoor/index.php/HomePage/status_order_pp";

    //     var data = JSON.stringify({ status: this.orderStatus, order_id: this.orderId })
    //     this.http.post(link, data).subscribe(data => {
    //         this.data = data.json();

    //         loading.dismiss();
    //         if (this.data.success) {
    //             this.setArray();
    //             this.navCtrl.setRoot(HomePage);

    //             let alert = this.alertCtrl.create({
    //                 title: 'Congratulation',
    //                 subTitle: 'Your order has been sucessfully updated.',
    //                 buttons: ['OK']
    //             });
    //             alert.present();


    //         }
    //         else {
    //             let alert = this.alertCtrl.create({
    //                 title: 'Error',
    //                 subTitle: 'Oops,something went wrong.please contact our Restaurant person',
    //                 buttons: ['OK']
    //             });
    //             alert.present();


    //         }
    //     }, error => {
    //         console.log("Error!");

    //     });
    // }


    setArray() {
        this.globals.Product.length = 0;
        this.nativeStorage.setItem('Product', { array: this.globals.Product })
            .then(


            () => console.log('Stored item!'),
            error => console.error('Error storing item', error)


            );
    }
    addressSame() {

        console.log("same1", this.ProcessForm.value.sameAddress);


        if (this.ProcessForm.value.sameAddress == true) {

            this.ProcessForm.value.billingAddress = this.ProcessForm.value.Address;
            this.ProcessForm.get('billingAddress').setValue(this.ProcessForm.value.Address);


        }
        else {

            this.ProcessForm.get('billingAddress').setValue(null);

        }

    }



    // getAddress() {
    //     this.nativeStorage.getItem('address')
    //         .then(data => {

    //             this.ProcessForm.get('name').setValue(data.address);
    //             this.ProcessForm.get('phone').setValue(data.address);
    //             this.ProcessForm.get('Address').setValue(data.address);
    //             this.ProcessForm.get('zipcode').setValue(data.zipcode);
    //             this.ProcessForm.get('city').setValue(data.city);
    //             this.ProcessForm.get('state').setValue(data.state);
    //             this.ProcessForm.get('addresscheck').setValue(data.check);

    //         }).catch(err => console.log);

    // }





    cancel() {

        this.globals.cartflag = true;
        // this.navCtrl.popToRoot();
        this.viewCtrl.dismiss();

    }

}



