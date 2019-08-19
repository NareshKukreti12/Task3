
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
      { title: "Software Development",logo:'../../assets/logos/1.png' },
      { title: "Marketing",logo:'../../assets/logos/2.png'  },
      { title: "Agriculture",logo:'../../assets/logos/3.png'  },
      { title: "Automobiles",logo:'../../assets/logos/4.png'  },
      { title: "Transport",logo:'../../assets/logos/5.png' },
      { title: "Aviation",logo:'../../assets/logos/6.png'  },
      { title: "Clothing",logo:'../../assets/logos/7.png'  },
      { title: "Restaurant",logo:'../../assets/logos/8.png'  },
      { title:"Fitness",logo:'../../assets/logos/9.png' },
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
