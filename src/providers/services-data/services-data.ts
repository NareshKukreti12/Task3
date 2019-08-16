
import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
/*
  Generated class for the ServicesDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesDataProvider  {
 
  //userDetails=[];
  items=[];
  http:any;
  constructor(http:Http,) {
     this.http=http;
    this.items = [
      { title: "Software Development",logo:'http://www.sclance.com/pngs/technology-icon-png/technology_icon_png_1359192.png' },
      { title: "Marketing",logo:'https://astrolabs.com/wp-content/uploads/2017/09/Icons-DM-SMM.png' },
      { title: "Agriculture",logo:'https://www.freepngimg.com/thumb/agriculture/6-2-agriculture-png-images.png' },
      { title: "Automobiles",logo:'https://www.pngfind.com/pngs/m/145-1450403_automobiles-reliable-first-adcon-private-limited-hd-png.png' },
      { title: "Transport",logo:'https://img.pngio.com/filewv-transport-logopng-transport-png-1187_1187.png' },
      { title: "Aviation",logo:'https://www.designfreelogoonline.com/wp-content/uploads/2016/01/000679-Free-logo-maker-Aircraft-Logo-Templates-02.png' },
      { title: "Clothing",logo:'https://www.pinclipart.com/picdir/middle/168-1681636_140-clothes-icon-packs-icon-t-shirt-png.png' },
      { title: "Restaurant",logo:'https://www.freeiconspng.com/uploads/restaurant-icon-png-7.png' },
      { title:"Fitness",logo:"https://cdn0.iconfinder.com/data/icons/basic-8/97/45-512.png"},
    ];
  }
  
  filterItems(searchTerm) {
    return this.items.filter(item => {
      return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
}
  getPlusCode(lat,lng){
     let url="https://plus.codes/api?address="+lat+","+lng;
     return this.http.get(url).map(res=>res.json())
  }
}
