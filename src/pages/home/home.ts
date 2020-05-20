import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy, Input } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Platform, IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from "ionic-angular";
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { Geolocation } from '@ionic-native/geolocation';
import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
import { SchoolPage } from "../school/school";
import * as moment from 'moment';
import { DonatePage } from "../donate/donate";
import { EventsPage } from "../events/events";
import { MessagesPage } from "../messages/messages";
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from "@ionic-native/background-mode";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Observable } from 'rxjs/Rx';

declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
  // template: `{{ now | date:'HH:mm'}}`
})
export class HomePage {
  showDate: {
  };
  currentIslamicDate: {
  };
  timeDestroy: any[];
  oneTimes: any;
  ac: any;
  zhurNotification: any;
  asrNotification: any;
  magrebNotification: any;
  ishaNotification: any;
  CurrentTimeNotification: any;
  fajarNotification: any;

  // @ViewChild('mapCanvas') mapElement: ElementRef;

  Images: any;
  ishaTime: any;
  asrTime: any;
  magribTime: any;
  zuhrTime: any;
  fajarTime: any;
  namazTime: any;
  currentTime: any;
  timeArray: any[];
  compare_isha: any;
  compare_magrib: any;
  compare_asr: any;
  compare_zuhr: any;
  compare_fajar: any;
  compare_time: any;
  links: {
  };
  salat: any;
  check_date: any;
  jummah: any;
  salah: any;
  testing: boolean = true;
  CurrentTime: any;
  ChangeTime: any;
  Fajardistance: any;
  Zuhrdistance: any;
  Asrdistance: any;
  Magribdistance: any;
  Ishadistance: any;
  interavalTime: any;
  arr: any[];

  // @ViewChild('map') mapElement: ElementRef;
  // map: any;
  now: number;

  notifications: any[] = [];

  salahTimings: any[];

  displayMinTime: any[];
  displaySecTime: any[];
  minutes: any = 59;
  seconds: any = 0;

  /// For count down timer

  remainingTime: number;
  time: number;
  subscriptionFirst: any;
  subscriptionSecond: any;
  subscriptionThird: any;
  subscriptionFourth: any;
  tickFirst: any;
  tickSecond: any;
  tickThird: any;
  tickFourth: any;
  remainingSeconds: number;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  displayTime: string;
  timeInSeconds: number;
  distance: number;

  //// end count down timer


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

  constructor(private backgroundMode: BackgroundMode, public toastCtrl: ToastController, private localNotifications: LocalNotifications, public platform: Platform, private iab: InAppBrowser, public geolocation: Geolocation, public ServerUrl: RemoteServiceProvider, public alertCtrl: AlertController, public toaster: ToastController, public loadingCtrl: LoadingController, public http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.SalahTimeListing();
    this.JummahTimeListing();
    this.openLinkListing();
    this.sliderListing();
    this.showHijriDate();

    //this.salahNotifications(this.salahTimings);

    // // Set the date we're counting down to
    // var countDownDate = new Date("Apr 2, 2019 08:40:25").getTime();

    // // Update the count down every 1 second
    // var x = setInterval(function () {

    //   // Get todays date and time
    //   var now = new Date().getTime();

    //   // Find the distance between now and the count down date
    //   var distance = countDownDate - now;


    //   // Time calculations for days, hours, minutes and seconds
    //   // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //   var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    //   // Output the result in an element with id="demo"
    //   document.getElementById("demo").innerHTML = hours + "h "
    //     + minutes + "m " + seconds + "s ";

    //   // If the count down is over, write some text 
    //   if (distance < 0) {
    //     clearInterval(x);
    //     document.getElementById("demo").innerHTML = "EXPIRED";
    //   }
    // }, 1000);

  }
ionViewDidLeave(){
  // ngOnDestroy(this.interavalTime);
  clearInterval(this.interavalTime);
  
}
  ionViewDidLoad() {
    // this.loadMap();
    // console.log("map",this.loadMap());

  }
  // ngOnInit(){
  //   this.showHijriDate();
  // }

  // getBookDetails() {
  //    this.ServerUrl.getIsmaicDateListing().subscribe(data => {
  //     this.showDate = data.json();
  //     console.log(this.showDate);
  //   });
  // }

  

  showHijriDate() {
    this.ServerUrl.getIsmaicDateListing()
      .then(data => {  
        //JSON.parse(JSON.stringify(data)).data
        this.showDate = JSON.parse(JSON.stringify(data)).hijridate;
        console.log("showDate:", this.showDate);

      }
      
      );
  }

  /* Initialize and setup the time for question */
  // ngOnInit() {
  //   this.initTimer();
  //   this.startTimer();
  // }

  // ngOnDestroy() {
  //   this.initTimer();
  //   this. startTimer(); 
  // }

  ngOnDestroy() {
    clearInterval(this.interavalTime);
    // this.initTimer();
    // this.startTimer();
  }

  events() {
    this.navCtrl.push(EventsPage);
  }

  weburl(url) {
    const browser = this.iab.create(url);
  }

  openPage() {
    this.navCtrl.push(SchoolPage);
  }

  donate() {
    let target = "_system";
    this.iab.create('https://www.masjidnoorli.net/donate/', target, this.options);
    // this.navCtrl.push(DonatePage);
    // .then(
    //   response => {
    //     console.log('Response ' + response);
    //   },
    //   error => {
    //     console.log('Error: ' + error);
    //   }
    // ).catch(exception => {
    //   console.log('Exception ' + exception);
    // });;
  }

  salah_calendar(url) {
    //const browser = this.iab.create('http://www.elitevisionit.com/masjidNoor/files/SchoolCalendar.pdf');
    let target = "_system";
    this.iab.create(url, target, this.options);
  }

  tap2() {
    let alert = this.alertCtrl.create({
      subTitle: 'Masjid Noor LI Address ',
      //subTitle: 'Content Coming Soon',
      message: '1032 Park Ave, Huntington, NY 11743',
      buttons: ['OK']
    });

    alert.present();
  }

  //   loadMap() {

  //      let latLng = new google.maps.LatLng(-34.9290, 138.6010);

  //     let mapOptions = {
  //       center: latLng,
  //       zoom: 15,
  //       mapTypeId: google.maps.MapTypeId.ROADMAP
  //     }


  //     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);


  // //  /   this.geolocation.getCurrentPosition().then((position) => {
  // //       position.coords.latitude = 53.710140;
  // //       position.coords.longitude = -1.642110;
  // //       let latLng = new google.maps.LatLng(53.710140, -1.642110);

  // //       let mapOptions = {
  // //         center: latLng,
  // //         zoom: 15,
  // //         mapTypeId: google.maps.MapTypeId.ROADMAP
  // //       }

  // //       this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  // //     }, (err) => {
  // //       console.log(err);
  // //     });

  //   }


  //   addMarker() {

  //     let marker = new google.maps.Marker({
  //       map: this.map,
  //       animation: google.maps.Animation.DROP,
  //       position: this.map.getCenter()
  //     });

  //     let content = "<h4>Information!</h4>";

  //     this.addInfoWindow(marker, content);

  //   }

  //   addInfoWindow(marker, content) {

  //     let infoWindow = new google.maps.InfoWindow({
  //       content: content
  //     });

  //     // google.maps.event.addListener(marker, 'click', () => {
  //     //   infoWindow.open(this.map, marker);
  //     // });
  //     google.maps.event.addListener(this.map, 'click', () => {
  //    alert(this.map.getCenter());

  //     infoWindow.open(this.map, marker);
  //     });

  //   }

  // showTimer(){
  //   this.initTimer();
  //   this.startTimer();
  // }

  // initTimer() {
  //   // Pomodoro is usually for 59 minutes
  //   if (!this.timeInSeconds) {
  //     this.timeInSeconds = 3540;
  //   }

  //   this.time = this.timeInSeconds;
  //   this.runTimer = false;
  //   this.hasStarted = false;
  //   this.hasFinished = false;
  //   this.remainingTime = this.timeInSeconds;

  //   this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
  // }

  // startTimer() {
  //   this.runTimer = true;
  //   this.hasStarted = true;
  //   this.timerTick();
  // }

  // pauseTimer() {
  //   this.runTimer = false;
  // }

  // resumeTimer() {
  //   this.startTimer();
  // }

  // timerTick() {
  //   setTimeout(() => {

  //     if (!this.runTimer) { return; }
  //     this.remainingTime--;
  //     this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
  //     if (this.remainingTime > 0) {
  //       this.timerTick();
  //     }
  //     else {
  //       this.hasFinished = true;
  //     }
  //   }, 1000);
  // }

  // getSecondsAsDigitalClock(inputSeconds: number) {
  //   if (!inputSeconds) {
  //     inputSeconds = 3540;
  //   }
  //   var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
  //   var mint = Math.floor((sec_num) / 60);
  //   var secs = sec_num - (mint * 60);
  //   var minutesString = '';
  //   var secondsString = '';

  //   minutesString = (mint < 10) ? "0" + mint : mint.toString();
  //   secondsString = (secs < 10) ? "0" + secs : secs.toString();
  //   return minutesString + 'm' + secondsString + 's';
  // }

  openLinkListing() {
    this.ServerUrl.getLinkListing()
      .then(data => {
        this.links = data;
        console.log("links:", this.links);
      });
  }


  SalahTimeListing() {
    this.ServerUrl.getSalahTimeListing()
      .then(data => {
        this.salah = data;
        console.log("salah:", this.salah);
        for (var value of this.salah) {
          // console.log(value);
          console.log("1", value.fajar_iqamah);
          console.log("1", value.zuhr_iqamah);
          console.log("1", value.asr_iqamah);
          console.log("1", value.magrib_iqamah);
          console.log("1", value.isha_iqamah);
        }
        this.timeArray = this.salah;
        console.log("Show time:", this.timeArray);
        this.timeCounter(this.timeArray);
        //this.getTimer(this.timeArray);
        //this.salahNotifications(this.timeArray);
        this.compare_fajar = value.fajar_iqamah;
        this.compare_zuhr = value.zuhr_iqamah;
        this.compare_asr = value.asr_iqamah;
        this.compare_magrib = value.magrib_iqamah;
        this.compare_isha = value.isha_iqamah;

        this.check_date = value.date;
        console.log("this.check_date: ", this.check_date);

        const currentYear = new Date().getFullYear();

        var check = this.check_date;
        console.log("check: ", check);

        const date1 = new Date(`${check} ${currentYear}`).setHours(0, 0, 0, 0);
        console.log("date 1 ", date1);

        const date2 = new Date().setHours(0, 0, 0, 0);
        console.log("date 2 ", date2);

        if (date1 === date2) {
          console.log("date is same ");
          this.salat = this.salah;
          console.log("this.salat", this.salat);


        }
        else {
          console.log("date is not same ");

        }

      });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/andro.mp3'
    }
    else {
      return 'file://assets/sounds/iphone.m4r'
    }
  }

  // salahNotifications(salahTimings: any[]) {

  //   for (var value of salahTimings) {
  //     this.CurrentTime = moment().unix();
  //     console.log("moment", this.CurrentTime);
  //     this.Fajardistance = moment(value.fajar_iqamah, 'HH:mm: A').diff(moment().startOf(this.CurrentTime), 'minutes');
  //     console.log("Fajardistance:", this.Fajardistance);

  //     if ((this.Fajardistance <= '20') && (this.Fajardistance >= '0')) {
  //       //   console.log("Inside notification function",this.Number(minutes));
  //       //this.notification();
  //       this.CurrentTimeNotification = moment().unix();
  //       console.log("CurrentTimeNotification:", this.CurrentTimeNotification);

  //       this.fajarNotification = moment(value.fajar_iqamah, 'HH:mm: A').diff(moment().startOf(this.CurrentTimeNotification), 'minutes');
  //       console.log("fajarNotification:", this.fajarNotification);

  //       var timeLeftFajar = moment(value.fajar_iqamah, 'HH:mm: A').subtract(20, "minutes").toDate()
  //       console.log("timeLeftFajar:", timeLeftFajar);

  //       this.localNotifications.schedule({
  //         text: 'Reminder for ' + value.fajar_salat + ' ' + ' Iqamah',
  //         //text: ' 20 minutes remaining for  Fajar Aqamah',
  //         at: timeLeftFajar,
  //         //every: "day",
  //         led: 'FF0000',
  //         sound: this.setSound()
  //       });
  //       this.notifications.push(this.localNotifications);
  //       this.backgroundMode.enable();

  //     } //end fajar loop

  //     this.Zuhrdistance = moment(value.zuhr_iqamah, 'HH:mm: A').diff(moment().startOf(this.CurrentTime), 'minutes');
  //     console.log("Zohr distance:", this.Zuhrdistance);
  //     // this.oneTimes = moment(this.Zuhrdistance, 'mm: A').toString();
  //     //   console.log("one times", this.oneTimes);

  //     if ((this.Zuhrdistance <= '20') && (this.Zuhrdistance >= '0')) {

  //       this.CurrentTimeNotification = moment().unix();
  //       console.log("CurrentTimeNotification:", this.CurrentTimeNotification);

  //       this.zhurNotification = moment(value.zuhr_iqamah, 'HH:mm: A').diff(moment().startOf(this.CurrentTimeNotification), 'minutes');
  //       console.log("zuhrrNotification:", this.zhurNotification);

  //       var timeLeftZuhr = moment(value.zuhr_iqamah, 'HH:mm: A').subtract(20, "minutes").toDate()
  //       console.log("timeLeftZuhr:", timeLeftZuhr);

  //       this.localNotifications.schedule({
  //         id: 1,
  //         text: 'Reminder for ' + value.zuhr_salat + ' ' + ' Iqamah',
  //         at: timeLeftZuhr,
  //         //every: "day",
  //         led: 'FF0000',
  //         sound: this.setSound()
  //       });
  //       this.notifications.push(this.localNotifications);
  //       this.backgroundMode.enable();
  //     } //end zuhr loop

  //     this.Asrdistance = moment(value.asr_iqamah, 'HH:mm: A').diff(moment().startOf(this.CurrentTime), 'minutes');
  //     console.log("distance:", this.Asrdistance);

  //     if ((this.Asrdistance <= '20') && (this.Asrdistance >= '0')) {

  //       this.CurrentTimeNotification = moment().unix();
  //       console.log("CurrentTimeNotification:", this.CurrentTimeNotification);

  //       this.asrNotification = moment(value.asr_iqamah, 'HH:mm: A').diff(moment().startOf(this.CurrentTimeNotification), 'minutes');
  //       console.log("asrNotification:", this.asrNotification);

  //       var timeLeftAsr = moment(value.asr_iqamah, 'HH:mm: A').subtract(20, "minutes").toDate()
  //       console.log("timeLeftAsr:", timeLeftAsr);

  //       this.localNotifications.schedule({
  //         text: 'Reminder for ' + value.asr_salat + ' ' + ' Iqamah',
  //         //text: ' 20 minutes remaining for  Fajar Aqamah',
  //         at: timeLeftAsr,
  //         // every: "day",
  //         led: 'FF0000',
  //         sound: this.setSound()
  //       });
  //       this.notifications.push(this.localNotifications);
  //       this.backgroundMode.enable();
  //     } //end asr loop

  //     this.Magribdistance = moment(value.magrib_iqamah, 'HH:mm: A').diff(moment().startOf(this.CurrentTime), 'minutes');
  //     console.log("distance:", this.Magribdistance);

  //     if ((this.Magribdistance <= '20') && (this.Magribdistance >= '0')) {
  //       //   console.log("Inside notification function",this.Number(minutes));
  //       //this.notification();
  //       this.CurrentTimeNotification = moment().unix();
  //       console.log("CurrentTimeNotification:", this.CurrentTimeNotification);

  //       this.magrebNotification = moment(value.magrib_iqamah, 'HH:mm: A').diff(moment().startOf(this.CurrentTimeNotification), 'minutes');
  //       console.log("magrebNotification:", this.magrebNotification);

  //       var timeLeftMagreb = moment(value.magrib_iqamah, 'HH:mm: A').subtract(20, "minutes").toDate()
  //       console.log("timeLeftMagreb:", timeLeftMagreb);

  //       this.localNotifications.schedule({
  //         text: 'Reminder for ' + value.magrib_salat + ' ' + ' Iqamah',
  //         //text: ' 20 minutes remaining for  Fajar Aqamah',
  //         at: timeLeftMagreb,
  //         // every: "day",
  //         led: 'FF0000',
  //         sound: this.setSound()
  //       });
  //       this.notifications.push(this.localNotifications);
  //       this.backgroundMode.enable();
  //     } //end margib loop

  //     this.Ishadistance = moment(value.isha_iqamah, 'HH:mm: A').diff(moment().startOf(this.CurrentTime), 'minutes');
  //     console.log("distance:", this.Ishadistance);

  //     if ((this.Ishadistance <= '20') && (this.Ishadistance >= '0')) {
  //       //   console.log("Inside notification function",this.Number(minutes));
  //       //this.notification();
  //       this.CurrentTimeNotification = moment().unix();
  //       console.log("CurrentTimeNotification:", this.CurrentTimeNotification);

  //       this.ishaNotification = moment(value.isha_iqamah, 'HH:mm: A').diff(moment().startOf(this.CurrentTimeNotification), 'minutes');
  //       console.log("ishaNotification:", this.ishaNotification);

  //       var timeLeftIsha = moment(value.isha_iqamah, 'HH:mm: A').subtract(20, "minutes").toDate()
  //       console.log("timeLeftIsha:", timeLeftIsha);

  //       this.localNotifications.schedule({
  //         text: 'Reminder for ' + value.isha_salat + ' ' + ' Iqamah',
  //         //text: ' 20 minutes remaining for  Fajar Aqamah',
  //         at: timeLeftIsha,
  //         //every: "day",
  //         led: 'FF0000',
  //         sound: this.setSound(),
  //       });
  //       this.notifications.push(this.localNotifications);
  //       this.backgroundMode.enable();
  //     } //end isha loop

  //   } //end for lop
  // } //end method salahNotifications


  timeCounter(timeGet: any[]) {
    // Get todays date and time
    for (var value of timeGet) {

      this.CurrentTime = moment().unix();
      console.log("moment", this.CurrentTime);

      this.Fajardistance = moment(value.fajar_iqamah, 'HH:mm: A').diff(moment().startOf(this.CurrentTime), 'minutes');
      console.log("Fajardistance:", this.Fajardistance);

      if ((this.Fajardistance <= '59') && (this.Fajardistance >= '0')) {

        console.log("Fajardistance with in if cond:", this.Fajardistance);

        var current_datetime = new Date();
        console.log("current_datetime", current_datetime);

        // var formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()
        var formatted_date = value.date + ", " + current_datetime.getFullYear() + " " + `${value.fajar_iqamah.toString()}`;
        console.log("formatted_date", formatted_date);


        // Set the date we're counting down to
        // var countDownDate = new Date(`${formatted_date.toString()} ${value.fajar_iqamah.toString()}`).getTime();
        var countDownDate = new Date(formatted_date.toString()).getTime();
        console.log("countDownDate", countDownDate);

        var countDate = parseInt(countDownDate.toString(), 10);
        console.log("count", countDate);

        // Update the count down every 1 second
        this.interavalTime = setInterval(function () {

          // Get todays date and time
          var now = new Date().getTime();
          console.log("now", now);

          var nowDate = parseInt(now.toString(), 10);
          console.log("nowDate", nowDate);

          // Find the distance between now and the count down date
          this.distance = countDate - nowDate;
          console.log("this.distance", this.distance);

          var dist = parseInt(this.distance.toString(), 10);
          console.log("dist", dist);

          // Time calculations for days, hours, minutes and seconds
          this.minutes = Math.floor((Number(dist) % (1000 * 60 * 60)) / (1000 * 60));
          this.seconds = Math.floor((Number(dist) % (1000 * 60)) / 1000);
          console.log("console minutes", typeof this.minutes === "number");
          console.log("console seconds", typeof this.seconds === "number");

          var minutesString = '';
          var secondsString = '';

          minutesString = (this.minutes < 10) ? "0" + this.minutes : this.minutes.toString();
          secondsString = (this.seconds < 10) ? "0" + this.seconds : this.seconds.toString();

          if ((typeof minutesString === "string" || minutesString !== "NAN" || minutesString !== " ") && (typeof secondsString === "string" || secondsString !== "NAN" || secondsString !== " ")) {
            console.log("Valid String Mins and Secs:", minutesString, secondsString);
            //document.getElementById("demo").innerHTML = minutesString + 'm ' + secondsString + 's';
            //  document.getElementById("demo").classList.remove("h1.mystyle");
           //  document.getElementById("demo").classList.add('animate-flicker');

          }else if (( minutesString == "NAN" || minutesString == " ") && (secondsString == "NAN" || secondsString == " ")) {
            console.log("It's NAN so hide the timer:", minutesString, secondsString);
          // document.getElementById("demo").classList.remove("h1.mystyle");
       //   document.getElementById("demo").classList.add('animate-flicker');
          
          }else {
            // document.getElementById("demo").innerHTML = this.minutes + 'm ' + this.seconds + 's';
            // document.getElementById("demo").classList.remove("h1.mystyle");
         //   document.getElementById("demo").classList.add('animate-flicker');

            console.log("These are minutes and seconds:", this.minutes, this.seconds);
        }

          //  // If the count down is over, write some text 
          if (dist < 0) {

            clearInterval(this.interavalTime);
            //document.getElementById("demo").innerHTML = "EXPIRED";
            // var elem = document.getElementById("demo");
            // elem.parentNode.removeChild(elem);
            document.getElementById("demo").style.display = "none";
          }
          //console.log("Inside notification function outside if");


        }, 1000);

      }

      this.Zuhrdistance = moment(value.zuhr_iqamah, 'HH:mm: A').diff(moment().startOf(this.CurrentTime), 'minutes');
      console.log("Zohr distance:", this.Zuhrdistance);


      if ((this.Zuhrdistance <= '59') && (this.Zuhrdistance >= '0')) {

        var current_datetime = new Date();
        console.log("current_datetime", current_datetime);

        // var formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()
        var formatted_date = value.date + ", " + current_datetime.getFullYear() + " " + `${value.zuhr_iqamah.toString()}`;
        console.log("formatted_date", formatted_date);

        // Set the date we're counting down to
        // var countDownDate = new Date(`${formatted_date.toString()} ${value.zuhr_iqamah.toString()}`).getTime();
        var countDownDate = new Date(formatted_date.toString()).getTime();
        console.log("countDownDate", countDownDate);

        var countDate = parseInt(countDownDate.toString(), 10);
        console.log("count", countDate);

        // Update the count down every 1 second
        this.interavalTime = setInterval(function () {

          // Get todays date and time
          var now = new Date().getTime();
          console.log("now", now);

          var nowDate = parseInt(now.toString(), 10);
          console.log("nowDate", nowDate);

          // Find the distance between now and the count down date
          this.distance = countDate - nowDate;
          console.log("this.distance", this.distance);

          var dist = parseInt(this.distance.toString(), 10);
          console.log("dist", dist);


          // Time calculations for days, hours, minutes and seconds
          this.minutes = Math.floor((Number(dist) % (1000 * 60 * 60)) / (1000 * 60));
          this.seconds = Math.floor((Number(dist) % (1000 * 60)) / 1000);
          console.log("console minutes", typeof this.minutes === "number");
          console.log("console seconds", typeof this.seconds === "number");

          var minutesString = '';
          var secondsString = '';

          minutesString = (this.minutes < 10) ? "0" + this.minutes : this.minutes.toString();
          secondsString = (this.seconds < 10) ? "0" + this.seconds : this.seconds.toString();

          if ((typeof minutesString === "string" || minutesString !== "NAN" || minutesString !== " ") && (typeof secondsString === "string" || secondsString !== "NAN" || secondsString !== " ")) {
            console.log("Valid String Mins and Secs:", minutesString, secondsString);
            //document.getElementById("demo1").innerHTML = minutesString + 'm ' + secondsString + 's';
            //  document.getElementById("demo1").classList.remove("#demo1 > mystyle");
         //    document.getElementById("demo1").classList.add('animate-flickerA');

          }else if (( minutesString == "NAN" || minutesString == " ") && (secondsString == "NAN" || secondsString == " ")) {
            console.log("It's NAN so hide the timer:", minutesString, secondsString);
          // document.getElementById("demo1").classList.remove("#demo1 > mystyle");
          //document.getElementById("demo1").classList.add('animate-flickerA');
          
          }else {
            // document.getElementById("demo1").innerHTML = this.minutes + 'm ' + this.seconds + 's';
            // document.getElementById("demo1").classList.remove("#demo1 > mystyle");
          //  document.getElementById("demo1").classList.add('animate-flickerA');

            console.log("These are minutes and seconds:", this.minutes, this.seconds);
        }

          //  // If the count down is over, write some text 
          if (dist < 0) {

            clearInterval(this.interavalTime);
            //document.getElementById("demo").innerHTML = "EXPIRED";
            // var elem = document.getElementById("demo1");
            // elem.parentNode.removeChild(elem);
            document.getElementById("demo1").style.display = "none";
          }
          //console.log("Inside notification function outside if");


        }, 1000);

      }

      this.Asrdistance = moment(value.asr_iqamah, 'HH:mm: A').diff(moment().startOf(this.CurrentTime), 'minutes');
      console.log("asr distance:", this.Asrdistance);

      if ((this.Asrdistance <= '59') && (this.Asrdistance >= '0')) {

        var current_datetime = new Date();
        console.log("current_datetime", current_datetime);

        // var formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()
        // var formatted_date = value.date + ", " + current_datetime.getFullYear() + " " + value.asr_iqamah.slice(0, -2);
        var formatted_date = value.date + ", " + current_datetime.getFullYear() + " " + `${value.asr_iqamah.toString()}`;
        console.log("formatted_date", formatted_date);

        // Set the date we're counting down to
        // var countDownDate = new Date(`${formatted_date.toString()} ${value.asr_iqamah.toString()}`).getTime();
        var countDownDate = new Date(formatted_date.toString()).getTime();
        console.log("countDownDate", countDownDate);

        var countDate = parseInt(countDownDate.toString(), 10);
        console.log("count", countDate);

        // Update the count down every 1 second
        this.interavalTime = setInterval(function () {

          // Get todays date and time
          var now = new Date().getTime();
          console.log("now", now);

          var nowDate = parseInt(now.toString(), 10);
          console.log("nowDate", nowDate);

          // Find the distance between now and the count down date
          this.distance = countDate - nowDate;
          console.log("this.distance", this.distance);

          var dist = parseInt(this.distance.toString(), 10);
          console.log("dist", dist);

          // Time calculations for days, hours, minutes and seconds
          this.minutes = Math.floor((Number(dist) % (1000 * 60 * 60)) / (1000 * 60));
          this.seconds = Math.floor((Number(dist) % (1000 * 60)) / 1000);
          console.log("console minutes", typeof this.minutes === "number");
          console.log("console seconds", typeof this.seconds === "number");

          var minutesString = '';
          var secondsString = '';

          minutesString = (this.minutes < 10) ? "0" + this.minutes : this.minutes.toString();
          secondsString = (this.seconds < 10) ? "0" + this.seconds : this.seconds.toString();

          if ((typeof minutesString === "string" || minutesString !== "NAN" || minutesString !== " ") && (typeof secondsString === "string" || secondsString !== "NAN" || secondsString !== " ")) {
            console.log("Valid String Mins and Secs:", minutesString, secondsString);
            //document.getElementById("demo2").innerHTML = minutesString + 'm ' + secondsString + 's';
            //  document.getElementById("demo2").classList.remove("#demo2 > mystyle");
         //    document.getElementById("demo2").classList.add('animate-flickerB');

          }else if (( minutesString == "NAN" || minutesString == " ") && (secondsString == "NAN" || secondsString == " ")) {
            console.log("It's NAN so hide the timer:", minutesString, secondsString);
          // document.getElementById("demo2").classList.remove("#demo2 > mystyle");
          //document.getElementById("demo2").classList.add('animate-flickerB');
          
          }else {
            // document.getElementById("demo").innerHTML = this.minutes + 'm ' + this.seconds + 's';
            // document.getElementById("demo2").classList.remove("#demo2 > mystyle");
          //  document.getElementById("demo2").classList.add('animate-flickerB');

            console.log("These are minutes and seconds:", this.minutes, this.seconds);
        }

          //  // If the count down is over, write some text 
          if (dist < 0) {

            clearInterval(this.interavalTime);
            //document.getElementById("demo").innerHTML = "EXPIRED";
            // var elem = document.getElementById("demo2");
            // elem.parentNode.removeChild(elem);
            document.getElementById("demo2").style.display = "none";
          }
          //console.log("Inside notification function outside if");


        }, 1000);

        // let current_datetime = new Date()
        // let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()
        // console.log("formatted_date", formatted_date);

        // // Set the date we're counting down to
        // var countDownDate = new Date(`${formatted_date.toString()} ${value.asr_iqamah}`).getTime();
        // console.log("countDownDate", Number(countDownDate));
        // const date = moment(value.asr_iqamah).format('mm:ss A');
        // console.log("countDownDates", Number(countDownDate));

        // // Update the count down every 1 second
        // this.interavalTime = setInterval(function () {

        //   // Get todays date and time
        //   var now = new Date().getTime();

        //   // Find the distance between now and the count down date
        //   this.distance = countDownDate - now;


        //   // Time calculations for days, hours, minutes and seconds
        //   this.minutes = Math.floor((Number(this.distance) % (1000 * 60 * 60)) / (1000 * 60));
        //   this.seconds = Math.floor((Number(this.distance) % (1000 * 60)) / 1000);

        //   var minutesString = '';
        //   var secondsString = '';

        //   minutesString = (this.minutes < 10) ? "0" + this.minutes : this.minutes.toString();
        //   secondsString = (this.seconds < 10) ? "0" + this.seconds : this.seconds.toString();
        //   document.getElementById("demo2").innerHTML = minutesString + 'm' + secondsString + 's';

        //   //document.getElementById("demo2").innerHTML = Number(this.minutes) + "m " + Number(this.seconds) + "s ";
        //   // If the count down is over, write some text 
        //   if (this.distance < 0) {

        //     clearInterval(this.interavalTime);
        //     // document.getElementById("demo").innerHTML = "EXPIRED";
        //     document.getElementById("demo2").style.display = "none";
        //   }
        // }, 1000);

      }

      this.Magribdistance = moment(value.magrib_iqamah, 'HH:mm: A').diff(moment().startOf(this.CurrentTime), 'minutes');
      console.log("distance:", this.Magribdistance);

      if ((this.Magribdistance <= '59') && (this.Magribdistance >= '0')) {

        var current_datetime = new Date();
        console.log("current_datetime", current_datetime);

        // var formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()
        var formatted_date = value.date + ", " + current_datetime.getFullYear() + " " + `${value.magrib_iqamah.toString()}`;
        console.log("formatted_date", formatted_date);

        // Set the date we're counting down to
        // var countDownDate = new Date(`${formatted_date.toString()} ${value.magrib_iqamah.toString()}`).getTime();
        var countDownDate = new Date(formatted_date.toString()).getTime();
        console.log("countDownDate", countDownDate);

        var countDate = parseInt(countDownDate.toString(), 10);
        console.log("count", countDate);

        // Update the count down every 1 second
        this.interavalTime = setInterval(function () {

          // Get todays date and time
          var now = new Date().getTime();
          console.log("now", now);

          var nowDate = parseInt(now.toString(), 10);
          console.log("nowDate", nowDate);

          // Find the distance between now and the count down date
          this.distance = countDate - nowDate;
          console.log("this.distance", this.distance);

          var dist = parseInt(this.distance.toString(), 10);
          console.log("dist", dist);

          // Time calculations for days, hours, minutes and seconds
          this.minutes = Math.floor((Number(dist) % (1000 * 60 * 60)) / (1000 * 60));
          this.seconds = Math.floor((Number(dist) % (1000 * 60)) / 1000);
          console.log("console minutes", typeof this.minutes === "number");
          console.log("console seconds", typeof this.seconds === "number");

          var minutesString = '';
          var secondsString = '';

          minutesString = (this.minutes < 10) ? "0" + this.minutes : this.minutes.toString();
          secondsString = (this.seconds < 10) ? "0" + this.seconds : this.seconds.toString();

          if ((typeof minutesString === "string" || minutesString !== "NAN" || minutesString !== " ") && (typeof secondsString === "string" || secondsString !== "NAN" || secondsString !== " ")) {
            console.log("Valid String Mins and Secs:", minutesString, secondsString);
            //document.getElementById("demo3").innerHTML = minutesString + 'm ' + secondsString + 's';
             //document.getElementById("demo3").classList.remove("#demo3 > mystyle");
           //  document.getElementById("demo3").classList.add('animate-flickerC');

          }else if (( minutesString == "NAN" || minutesString == " ") && (secondsString == "NAN" || secondsString == " ")) {
            console.log("It's NAN so hide the timer:", minutesString, secondsString);
          //document.getElementById("demo3").classList.remove("#demo3 > mystyle");
          //document.getElementById("demo3").classList.add('animate-flickerC');
          
          }else {
            // document.getElementById("demo3").innerHTML = this.minutes + 'm ' + this.seconds + 's';
            //document.getElementById("demo3").classList.remove("#demo3 > mystyle");
           // document.getElementById("demo3").classList.add('animate-flickerC');

            console.log("These are minutes and seconds:", this.minutes, this.seconds);
        }
          //  // If the count down is over, write some text 
          if (dist < 0) {

            clearInterval(this.interavalTime);
            //document.getElementById("demo").innerHTML = "EXPIRED";
            // var elem = document.getElementById("demo3");
            // elem.parentNode.removeChild(elem);
            document.getElementById("demo3").style.display = "none";
          }
          //console.log("Inside notification function outside if");


        }, 1000);

      }

      this.Ishadistance = moment(value.isha_iqamah, 'HH:mm: A').diff(moment().startOf(this.CurrentTime), 'minutes');
      console.log("distance:", this.Ishadistance);

      if ((this.Ishadistance <= '59') && (this.Ishadistance >= '0')) {

        var current_datetime = new Date();
        console.log("current_datetime", current_datetime);

        // var formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()
        var formatted_date = value.date + ", " + current_datetime.getFullYear() + " " + `${value.isha_iqamah.toString()}`;
        console.log("formatted_date", formatted_date);

        // Set the date we're counting down to
        // var countDownDate = new Date(`${formatted_date.toString()} ${value.isha_iqamah.toString()}`).getTime();
        var countDownDate = new Date(formatted_date.toString()).getTime();
        console.log("countDownDate", countDownDate);

        var countDate = parseInt(countDownDate.toString(), 10);
        console.log("count", countDate);

        // Update the count down every 1 second
        this.interavalTime = setInterval(function () {

          // Get todays date and time
          var now = new Date().getTime();
          console.log("now", now);

          var nowDate = parseInt(now.toString(), 10);
          console.log("nowDate", nowDate);

          // Find the distance between now and the count down date
          this.distance = countDate - nowDate;
          console.log("this.distance", this.distance);

          var dist = parseInt(this.distance.toString(), 10);
          console.log("dist", dist);

          // Time calculations for days, hours, minutes and seconds
          this.minutes = Math.floor((Number(dist) % (1000 * 60 * 60)) / (1000 * 60));
          this.seconds = Math.floor((Number(dist) % (1000 * 60)) / 1000);
          console.log("console minutes", typeof this.minutes === "number");
          console.log("console seconds", typeof this.seconds === "number");

          var minutesString = '';
          var secondsString = '';

          minutesString = (this.minutes < 10) ? "0" + this.minutes : this.minutes.toString();
          secondsString = (this.seconds < 10) ? "0" + this.seconds : this.seconds.toString();

          if ((typeof minutesString === "string" || minutesString !== "NAN" || minutesString !== " ") && (typeof secondsString === "string" || secondsString !== "NAN" || secondsString !== " ")) {
            console.log("Valid String Mins and Secs:", minutesString, secondsString);
            //document.getElementById("demo4").innerHTML = minutesString + 'm ' + secondsString + 's';
             //document.getElementById("demo4").classList.remove("#demo4 > mystyle");
            // document.getElementById("demo4").classList.add('animate-flickerD');

          }else if (( minutesString == "NAN" || minutesString == " ") && (secondsString == "NAN" || secondsString == " ")) {
            console.log("It's NAN so hide the timer:", minutesString, secondsString);
          //document.getElementById("demo4").classList.remove("#demo4 > mystyle");
          //document.getElementById("demo4").classList.add('animate-flickerD');
          
          }else {
            // document.getElementById("demo4").innerHTML = this.minutes + 'm ' + this.seconds + 's';
            //document.getElementById("demo4").classList.remove("#demo4 > mystyle");
           // document.getElementById("demo4").classList.add('animate-flickerD');

            console.log("These are minutes and seconds:", this.minutes, this.seconds);
        }

          //  // If the count down is over, write some text 
          if (dist < 0) {

            clearInterval(this.interavalTime);
            //document.getElementById("demo").innerHTML = "EXPIRED";
            // var elem = document.getElementById("demo4");
            // elem.parentNode.removeChild(elem);
            document.getElementById("demo4").style.display = "none";
          }
          //console.log("Inside notification function outside if");


        }, 1000);

      }

      this.fajarTime = value.fajar_iqamah;
      console.log("show1:", this.fajarTime);
      this.zuhrTime = value.zuhr_iqamah;
      console.log("show3:", this.zuhrTime);
      this.asrTime = value.asr_iqamah;
      console.log("show3:", this.asrTime);
      this.magribTime = value.magrib_iqamah;
      console.log("show4:", this.magribTime);
      this.ishaTime = value.isha_iqamah;
      console.log("show5:", this.ishaTime);
    }

  }

  JummahTimeListing() {
    this.ServerUrl.getJummahTimeListing()
      .then(data => {
        this.jummah = data;
        console.log("salah:", this.jummah);
      });
  }

  sliderListing() {
    this.ServerUrl.getSliderListing()
      .then(data => {
        this.Images = data;
        console.log("images:", this.Images);

      });
  }

  
  

  launch() {
    this.navCtrl.push(EventsPage);
  }

  slides = [
    {
      image: "assets/event.jpg",
    },
    {
      image: "assets/images/slider.jpg",
    },
    {
      image: "assets/images/slider2.jpg",
    },
    {
      image: "assets/images/slider3.jpg",
    },
    {
      image: "assets/images/slider4.jpg",
    },
    {
      image: "assets/images/slider5.jpg",
    }
  ];

  sun = [
    {
      fajar: "assets/fajar.png",
    },
    {
      sunsrise: "assets/sunrise.png",
    },
    {
      zohr: "assets/zohr.png",
    },
    {
      asr: "assets/asr.png",
    },
    {
      magrib: "assets/magrib.png",
    }
  ];

  message() {
    this.navCtrl.push(MessagesPage);
  }

  // async ngAfterViewInit() {
  //     const googleMaps = await getGoogleMaps(
  //       'AIzaSyB8pf6ZdFQj5qw7rc_HSGrhUwQKfIe9ICw'
  //     );
  //     this.confData.getMap().subscribe((mapData: any) => {
  //       const mapEle = this.mapElement.nativeElement;

  //       const map = new googleMaps.Map(mapEle, {
  //         center: mapData.find((d: any) => d.center),
  //         zoom: 16
  //       });

  //       mapData.forEach((markerData: any) => {
  //         const infoWindow = new googleMaps.InfoWindow({
  //           content: `<h5>${markerData.name}</h5>`
  //         });

  //         const marker = new googleMaps.Marker({
  //           position: markerData,
  //           map,
  //           title: markerData.name
  //         });

  //         marker.addListener('click', () => {
  //           infoWindow.open(map, marker);
  //         });
  //       });

  //       googleMaps.event.addListenerOnce(map, 'idle', () => {
  //         mapEle.classList.add('show-map');
  //       });
  //     });
  //   }
  // }

  // function getGoogleMaps(apiKey: string): Promise<any> {
  //   const win = window as any;
  //   const googleModule = win.google;
  //   if (googleModule && googleModule.maps) {
  //     return Promise.resolve(googleModule.maps);
  //   }

  //   return new Promise((resolve, reject) => {
  //     const script = document.createElement('script');
  //     script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.31`;
  //     script.async = true;
  //     script.defer = true;
  //     document.body.appendChild(script);
  //     script.onload = () => {
  //       const googleModule2 = win.google;
  //       if (googleModule2 && googleModule2.maps) {
  //         resolve(googleModule2.maps);
  //       } else {
  //         reject('google maps not available');
  //       }
  //     };
  //   });

} //end page Home
