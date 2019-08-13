import { Component,ViewChild,ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { ServicesDataProvider } from '../../providers/services-data/services-data';
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
  name;
   lat;lng;
   country;city;state
   image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  PlusCode=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private geolocation: Geolocation,public platform:Platform,
    public serviceRep:ServicesDataProvider,
    private nativeGeocoder: NativeGeocoder,
    public ngZone:NgZone
    ) {
      this.geolocation.getCurrentPosition().then((resp) => {
        this.lat= resp.coords.latitude
        this.lng=resp.coords.longitude
        let items=[]=JSON.parse(localStorage.getItem('business'));
        var address =this.name=items[0]["business_details"]["name"];
        this.GetLocation(address);
       
       }).catch((error) => {
         console.log('Error getting location', error);
       });
    
       // this.loadMap();
  }
 
  GetLocation(address){
    var geocoder = new google.maps.Geocoder();
    let items=[]=JSON.parse(localStorage.getItem('business'));
   // var address =this.name=items[0]["business_details"]["name"];
    geocoder.geocode( { 'address': address}, (results, status)=> {
      console.log(results);

      if (status == google.maps.GeocoderStatus.OK) {
          this.address=results[0]["formatted_address"];
          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();
           this.ngZone.run(()=>{
           
          this.lat=latitude;
            this.lng=longitude;
            var AddressComponent=[]=results[0].address_components;
            console.log(AddressComponent);
            this.loadMap();
            AddressComponent.forEach(element => {
               
                if(element.types.indexOf('administrative_area_level_1')>=0){
                  //this.shipForm.controls['state'].setValue(element.long_name);
                   this.state=element.long_name
                }
                if(element.types.indexOf('country')>=0){
                  //this.shipForm.controls['country'].setValue(element.long_name);
                  this.country=element.long_name;
                }
                if(element.types.indexOf('administrative_area_level_2')>=0){
                  //this.shipForm.controls['state'].setValue(element.long_name);
                   this.city=element.long_name
                }
            });
           // this.city=results[0].address_components[0]["short_name"];
           })
         
          this.GetPlusCode();
        
          } 
          else{
            this.loadMap();
            this.GetPlusCode();
           // this.GetLocation(this.address)
          }
      }); 
      
  }


  plusCode;
  GetPlusCode(){
    this.PlusCode=[];
    this.serviceRep.getPlusCode(this.lat,this.lng).subscribe(res=>{
      this.ngZone.run(()=>{
        this.plusCode=res.plus_code.global_code
      })
     
      
    })
  }

  loadMap(){
      
      let latLng = new google.maps.LatLng(this.lat,this.lng);

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
   
  }
  getLocation() {
    if(this.platform.is('cordova')){
      this.addMarker(this.lat,this.lng);
    }
    else{
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
           console.log(position);
           this.lat=position.coords.latitude;
           this.lng=position.coords.longitude
           this.addMarker(this.lat,this.lng);
        })
       } 
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
      anchor: new google.maps.Point(0, 0), // anchor
      labelOrigin: new google.maps.Point(20, 55)
  };
 
 let marker=  new google.maps.Marker({
      map: this.map,
      icon:this.image!=null?icon:null,
      shape: [0, 0, 40, 40],
      position: this.map.getCenter(),
      animation: google.maps.Animation.DROP,
      draggable:true,
      label: { color: '#565656', fontWeight: 'bold', fontSize: '20px',top:'200px', text: this.name },
     
    });
  
    var myoverlay = new google.maps.OverlayView();
    myoverlay.draw = function () {
        this.getPanes().markerLayer.id='markerLayer';
    };
      myoverlay.setMap(this.map);
    google.maps.event.addListener(marker, 'dragend', (e)=> 
    { 
    //  console.log(e.latLng.lat());
     this.ngZone.run(()=>{
      this.lat=e.latLng.lat();
      this.lng=e.latLng.lng();
      this.GetPlusCode();
      console.log(this.lat,this.lng);
     })
     
    });
   marker.addListener('click', () => {
      this.ToogleBounce();
   });
  }
  addInfoWindow(marker, content){
       
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    
   
  }
  address;
  ToogleBounce(){
  //  console.log("Clicked",this.PlusCode)
  var geocoder = geocoder = new google.maps.Geocoder();
        let latLng = new google.maps.LatLng(this.lat,this.lng);
       // var env=this;
        geocoder.geocode({'latLng': latLng }, (results, status)=> {
          console.log("Here....",results)
            if (status == google.maps.GeocoderStatus.OK) {
            
                if (results[1]) {
                  //  alert("Location: " + results[1].formatted_address);
                 // console.log(results)
                 this.address = results[1].formatted_address;         
       
                
                }
             else{
               console.log(status)
             }
            }
        });
  }
  UpdateAddress(){
    let address=this.address +" "+ this.city+" "+this.state+" "+this.country;
   // this.GetLocation(address);
  }
}
