import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare var google;
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
   image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  constructor(public navCtrl: NavController, public navParams: NavParams
   
    ) {
  }
 
  loadMap(){
      
      let latLng = new google.maps.LatLng(30.334110,78.055205);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.terrain 
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.getLocation();
    //  this.addMarker();
// this.getItems();
   
}
  ionViewDidLoad() {
    let items=[]=JSON.parse(localStorage.getItem('business'));
    if(items[0]["business_details"]["logos"]["thumbnail_url"]!=null){
       this.image=items[0]["business_details"]["logos"]["thumbnail_url"]
    }
    else{
      this.image=null;
    }
    this.loadMap();
  }
  getLocation() {
    if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position);
        this.addMarker(position.coords.latitude,position.coords.latitude)
     })
    } else { 
     // x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  
   showPosition(position) {
   // this.addMarker(position.coords.latitude,position.coords.longitude)
    // x.innerHTML = "Latitude: " + position.coords.latitude + 
    // "<br>Longitude: " + position.coords.longitude;
  }
  addMarker(lat,lng){
    var icon = {
      url: this.image, // url
      scaledSize: new google.maps.Size(50, 50), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
  };
   new google.maps.Marker({
      map: this.map,
      icon:icon,
      shape: [0, 0, 40, 40],
     // icon:"https://cdn3.iconfinder.com/data/icons/glypho-travel/64/gps-position-target-512.png",
     // animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
    var geocoder = geocoder = new google.maps.Geocoder();
    let latLng = new google.maps.LatLng(lat,lng);
   // var env=this;
    geocoder.geocode({ 'latLng': latLng }, (results, status)=> {
     
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              //  alert("Location: " + results[1].formatted_address);
             // console.log(results)
             let content = results[1].formatted_address;         
   
            // this.addInfoWindow(marker, content);
            }
        }
    });
   
  
  }
}
