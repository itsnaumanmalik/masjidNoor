import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RemoteServiceProvider } from "../../providers/remote-service/remote-service";
import { EventsDetailPage } from "../events-detail/events-detail";
import { Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  index: any;
  categories_list: any;
  timeArray: any[];
  phone: any;
  pic_url: any;
  timing: any;
  category: any;
  email: any;
  description: any;
  website: any;
  address: any;
  title: any;
  date: any;
  events: any;
  selectOptions: { title: string; subTitle: string; mode: string; };
  readMoreFlag: boolean;
  noCategory: boolean;
  events_array: any;

  constructor(public alertCtrl: AlertController, public http: Http, public ServerUrl: RemoteServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.showEvents();
    this.getCategories();
    this.selectedCategory();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
    this.selectOptions = {
      title: 'Categories',
      subTitle: 'Select your category.',
      mode: 'md'
    };

  }




  showEvents() {
    this.ServerUrl.showEventDetails()
      .then(data => {
        this.events = data;
        console.log("events:", this.events);
        this.noCategory = false;
        this.events.forEach(element => {
          element.readMoreFlag = false;
          element.contentFlag = false;
          this.pic_url = element.pic_url;
          console.log("pic_url", this.pic_url);
        });

        this.timeArray = this.events;

      });

  }

  CategoryChange() {
    if (this.category == 'all') {
      this.showEvents();
    }
    else {
      this.selectedCategory();
    }
  }

  selectedCategory() {
    this.ServerUrl.getCategoryDetailFromServer(this.category)
      .then(data => {
        console.log(data);
        this.events = data;
        console.log("selected:", this.events);
        if ((this.events == null) || (this.events == '') || (this.events == 'null')) {
          this.noCategory = true;
        }
        else {
          this.noCategory = false;
          this.events.forEach(element => {
            element.readMoreFlag = false;
            element.contentFlag = false;


          });
          this.events_array = this.events;

        }
      }, error => {
        console.log("Error!")
      });
  }


  getCategories() {
    this.ServerUrl.getCategoriesFromServer()
      .then(data => {
        this.categories_list = data;
        console.log("links:", this.categories_list);
      });

  }

  // details(eventGet: any[]) {
  //   for (var value of this.events) {
  //     // console.log(value);
  //     console.log("1", value.pic_url);
  //     console.log("1", value.date);
  //     console.log("1", value.timing);
  //     console.log("1", value.address);
  //     console.log("1", value.description);
  //     console.log("1", value.phone);
  //     console.log("1", value.email);
  //     console.log("1", value.website);
  //   }
  //   this.index = this.events.indexOf(value); 
  //   console.log("index is : " , this.index );
  //   this.navCtrl.push(EventsDetailPage, { pic_url: this.index });
  // }

  public details(selectedDetail: any) {
    this.navCtrl.push(EventsDetailPage, { data: JSON.stringify(selectedDetail) });
  }


}
