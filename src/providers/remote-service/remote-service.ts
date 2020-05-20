import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';


/*
  Generated class for the RemoteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RemoteServiceProvider {
  currentIslamicDate: any;
  salah: Object;

  BaseUrl: string;
  ServerUrl: string;

  constructor(public http: HttpClient) {
    console.log('Hello RemoteServiceProvider Provider');
   // this.BaseUrl = 'http://192.168.1.4/masjidApis/index.php/';
    this.ServerUrl = 'https://elitevisionit.com/masjidNoor/index.php/';
  }

  getSliderListing() {
    return new Promise(resolve => {
      this.http.get(this.ServerUrl + '/HomePage/sliderpictures').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getIsmaicDateListing() {
     return new Promise(resolve => {
     //  .map(res => res.json());
      this.http.get(this.ServerUrl + '/HomePage/todayHijriDate').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getSalahTimeListing() {
    return new Promise(resolve => {
      this.http.get(this.ServerUrl + '/HomePage/salahTimeListing').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getJummahTimeListing() {
    return new Promise(resolve => {
      this.http.get(this.ServerUrl + '/HomePage/jummahTimeListing').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getMosqueName() {
    return new Promise(resolve => {
      this.http.get(this.ServerUrl + '/HomePage/showMosqueName').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getImamInfo() {
    return new Promise(resolve => {
      this.http.get(this.ServerUrl + '/HomePage/getImaminfo').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  showEventDetails() {
    return new Promise(resolve => {
      this.http.get(this.ServerUrl + '/HomePage/eventDetails').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getLinkListing() {
    return new Promise(resolve => {
      this.http.get(this.ServerUrl + '/HomePage/openLinks').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getSchool() {
    return new Promise(resolve => {
      this.http.get(this.ServerUrl + '/HomePage/schoolContactDetails').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getCategoriesFromServer() {
    return new Promise(resolve => {
      this.http.get(this.ServerUrl + '/HomePage/list_category').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getCategoryDetailFromServer(category) {
    //console.log(category);

    return new Promise(resolve => {
      var link = this.ServerUrl + '/HomePage/get_category';
      var data = JSON.stringify({ category: category });
      this.http.post(link, data).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);

      });
    });
  }

  getMessageDetails() {
    return new Promise(resolve => {
      this.http.get(this.ServerUrl + '/HomePage/messageDetails').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getServicesForms() {
    return new Promise(resolve => {
      this.http.get(this.ServerUrl + '/HomePage/servicesForms').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  //   var link = this.BaseUrl + '/HomePage/get_category';
  //   var data = JSON.stringify({ category: category });
  //   return this.http.post(link, data)
  //     .map((res: any) => res.json())
  //     .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  // }

  sendContact(name, email, mobile, query, message) {

    var link = this.ServerUrl + 'HomePage/contact';
    var data = JSON.stringify({ name: name, email: email, mobile: mobile, query: query, message: message });
    // return this.http.post(link, data)
    //   .map((res: any) => res.json())
    //   .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    return this.http.post(link, data).subscribe((response) => {
      console.log("response:", response);
    });
  }

  //   addUser(data) {
  //   return new Promise((resolve, reject) => {
  //     this.http.post(this.BaseUrl+'/HomePage/salahTimeListing', JSON.stringify(data))
  //       .subscribe(res => {
  //         resolve(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //   });
  // }

  // getNormalAdds() {

  //   var link = this.BaseUrl + 'Users_Controller/get_simple2';
  //   // var data = JSON.stringify({latitude: lat, longitude: long});

  //   return this.http.get(link)
  //     .map((res: any) => res.json())
  //     .catch((error: any) => Observable.throw(error.json().error || 'Server error'));


  // }

  // getCategoriesFromServer() {

  //   var link = this.BaseUrl + 'Users_Controller/list_category';
  //   return this.http.get(link)
  //     .map((res: any) => res.json())
  //     .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  // }

  // getCategoryDetailFromServer(cat_id) {
  //   console.log(cat_id);

  //   var link = this.BaseUrl + 'Users_Controller/get_category';
  //   var data = JSON.stringify({ category_id: cat_id });
  //   return this.http.post(link, data)
  //     .map((res: any) => res.json())
  //     .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  // }

  // NearbyFromServer(lat, long) {

  //   var link = this.BaseUrl + 'Users_Controller/get_simple_nearby';
  //   var data = JSON.stringify({ latitude: lat, longitude: long });
  //   return this.http.post(link, data)
  //     .map((res: any) => res.json())
  //     .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  // }

  // getFeaturedProducts() {

  //   var link = this.ServerUrl + '/get-all-categories';
  //   var data = JSON.stringify({ "": "" });
  //   return this.http.post(link, data)
  //     .map((res: any) => res.json())

  //     .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  // }

  // Subscribe(name, email) {

  //   var link = this.BaseUrl + 'Users_Controller/subscribe';
  //   var data = JSON.stringify({ name: name, email: email });
  //   return this.http.post(link, data)
  //     .map((res: any) => res.json())
  //     .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  // }

  // Advertisement(name, email, phone, city, advertisement_type, message, business_name) {

  //   var link = this.BaseUrl + 'Users_Controller/new_advertisement';
  //   var data = JSON.stringify({ name: name, email: email, phone: phone, business_name: business_name, city: city, advertisement_type: advertisement_type, message: message });
  //   console.log(data);

  //   return this.http.post(link, data)
  //     .map((res: any) => res.json())
  //     .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  // }


}//end class RemoteServiceProvider
