import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HomePage } from '../pages/home/home';
import { SchoolPage } from '../pages/school/school';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RemoteServiceProvider } from '../providers/remote-service/remote-service';

import { HTTP } from '@ionic-native/http';
import { Geolocation } from '@ionic-native/geolocation';
// import { Geolocation } from '@ionic-native/geolocation';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialMediaPage } from "../pages/social-media/social-media";
import { NewsLetterPage } from "../pages/news-letter/news-letter";
import { SubscribePage } from "../pages/subscribe/subscribe";

// import { File } from '@ionic-native/File/ngx';
// import { FileOpener } from '@ionic-native/file-opener/ngx';
// import { FileTransfer } from '@ionic-native/file-transfer/ngx';
// import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { ServicesPage } from "../pages/services/services";
// import { ProfilePage } from "../pages/profile/profile";

// import { Transfer } from '@ionic-native/transfer';
// import { FilePath } from '@ionic-native/file-path/ngx';
// import { Camera } from "@ionic-native/camera/ngx";
import { NativeStorage } from '@ionic-native/native-storage';
import { DonatePage } from "../pages/donate/donate";
//import { CheckoutProcessPage } from "../pages/checkout-process-page/checkout-process-page";
// import { Payment } from "../pages/payment/payment";
import { PayPal } from "@ionic-native/paypal";
import { Stripe } from '@ionic-native/stripe';
import { GlobalVariable } from "./global";
import { EventsPage } from "../pages/events/events";
import { EventsDetailPage } from "../pages/events-detail/events-detail";
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';
import { MessagesPage } from "../pages/messages/messages";
import { MessageDetailsPage } from "../pages/message-details/message-details";
import { ServiceFormsPage } from "../pages/service-forms/service-forms";
// import { FcmProvider } from '../providers/fcm/fcm';
// import * as firebase from 'firebase';
// import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
// import { Firebase } from "@ionic-native/firebase";
// import { AngularFireModule } from "@angular/fire";
import { Observable } from 'rxjs';
import { ImamPage } from "../pages/imam/imam";
import { SchoolContactPage } from "../pages/school-contact/school-contact";
import { SchoolRegisterPage } from "../pages/school-register/school-register";
import { SchoolFeePage } from "../pages/school-fee/school-fee";
import { SchoolRulesPage } from "../pages/school-rules/school-rules";

import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import { OneSignal } from '@ionic-native/onesignal';
import { Camera } from '@ionic-native/camera';
import { MediaCapture } from '@ionic-native/media-capture';
import { AboutPage } from "../pages/about/about";
import { Payment } from "../pages/payment/payment";
import { CheckoutProcessPage } from "../pages/checkout-process-page/checkout-process-page";
import { DetailsPage } from "../pages/details/details";
// Initialize Firebase
// export const firebaseConfig = {

//   apiKey: "AIzaSyBFw-DUa7WgXVSuZOJs8COjedE763MoHYM",
//     authDomain: "masjidnoor-dee47.firebaseapp.com",
//     databaseURL: "https://masjidnoor-dee47.firebaseio.com",
//     projectId: "masjidnoor-dee47",
//     storageBucket: "masjidnoor-dee47.appspot.com",
//     messagingSenderId: "574820072610"
// };
// firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SchoolPage,
    SocialMediaPage,
    NewsLetterPage,
    SubscribePage,
    ServicesPage,
    // ProfilePage,
    DonatePage,
    EventsPage,
    EventsDetailPage,
    MessagesPage,
    MessageDetailsPage,
    ServiceFormsPage,
    ImamPage,
    SchoolContactPage,
    SchoolRegisterPage,
    SchoolFeePage,
    SchoolRulesPage,
    AboutPage,
    Payment,
    CheckoutProcessPage,
    DetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    // AngularFireModule.initializeApp(firebaseConfig),
    // AngularFirestoreModule,
    // AngularFireModule,
    HttpModule,
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SchoolPage,
    SocialMediaPage,
    NewsLetterPage,
    SubscribePage,
    ServicesPage,
    // ProfilePage,
    DonatePage,
    EventsPage,
    EventsDetailPage,
    MessagesPage,
    MessageDetailsPage,
    ServiceFormsPage,
    ImamPage,
    SchoolContactPage,
    SchoolRegisterPage,
    SchoolFeePage,
    SchoolRulesPage,
    AboutPage,
    Payment,
    CheckoutProcessPage,
    DetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpModule,
    Geolocation,
    InAppBrowser,
    HttpClientModule,
    // File,
    // FileOpener,
    // FileTransfer,
    // DocumentViewer,
    // Transfer,
    // FilePath,
     Camera,
     MediaCapture,
    NativeStorage,
    PayPal,
    GlobalVariable,
    EmailComposer,
    CallNumber,
    // FcmProvider,
    BackgroundMode,
    // PayPalPayment, 
    // PayPalConfiguration,
    Stripe,
    // Firebase,
    LocalNotifications,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RemoteServiceProvider,
    OneSignal
  ]
})
export class AppModule {}
