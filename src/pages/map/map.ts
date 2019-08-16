import { Component,ViewChild,ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { ServicesDataProvider } from '../../providers/services-data/services-data';
import { timestamp } from 'rxjs/operator/timestamp';
import { AddNewLocationPage } from '../add-new-location/add-new-location';
import { PersonalInfoPage } from '../personal-info/personal-info';
import { count } from 'rxjs/operator/count';
declare var google;
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  name;
   lat;lng;
   country;city;state;  address:string=''
   image ;
   markers=[];
   prt=0;
   postal_code;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  checked:boolean=false;
  PlusCode=[];
  address_components=[];
  address2;
  isAddress:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private geolocation: Geolocation,public platform:Platform,
    public serviceRep:ServicesDataProvider,
    public alertCtrl:AlertController,
    public ngZone:NgZone
    ) {
      console.log(localStorage.getItem('locations'))
      if(localStorage.getItem('locations')!=null){
        console.log("Heyyy")
        this.isAddress=false;
      }
      else{
        this.isAddress=true;
      }
      this.prt=navParams.get('parent')?1:0;
      console.log("Parent",this.prt)
      this.geolocation.getCurrentPosition().then((resp) => {
        this.lat= resp.coords.latitude
        this.lng=resp.coords.longitude
        let items=[]=JSON.parse(localStorage.getItem('business'));
        var address =this.name=items[0]["business_details"]["name"];
        this.GetCurrentLocation(this.lat,this.lng,0);
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
            this.address_components=AddressComponent;
            console.log(AddressComponent);
            this.loadMap();
            AddressComponent.forEach(element => {
               
                if(element.types.indexOf('administrative_area_level_1')>=0){
                  //this.shipForm.controls['state'].setValue(element.long_name);
                   this.state=element.long_name
                }
                // if(element.types.indexOf('country')>=0){
                //   //this.shipForm.controls['country'].setValue(element.long_name);
                //   this.country=element.long_name;
                // }
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


  GetCurrentLocation(lat,lng,location){
    var geocoder = new google.maps.Geocoder();
    let items=[]=JSON.parse(localStorage.getItem('business'));
   // var address =this.name=items[0]["business_details"]["name"];
   let latLng = new google.maps.LatLng(lat,lng);
    geocoder.geocode( { 'latLng': latLng}, (results, status)=> {
      if (status == google.maps.GeocoderStatus.OK) {
          this.address=results[0]["formatted_address"];
          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();
           this.ngZone.run(()=>{
           
          this.lat=latitude;
            this.lng=longitude;
            var AddressComponent=[]=results[0].address_components;
            this.address_components=AddressComponent;
            AddressComponent.forEach(element => {
               
                if(element.types.indexOf('administrative_area_level_1')>=0){
                  //this.shipForm.controls['state'].setValue(element.long_name);
                   this.state=element.long_name
                }
               
                if(element.types.indexOf('administrative_area_level_2')>=0){
                  //this.shipForm.controls['state'].setValue(element.long_name);
                   this.city=element.long_name
                }
                if(element.types.indexOf('country')>=0 && location==0){
                  //this.shipForm.controls['country'].setValue(element.long_name);
                  this.country=element.long_name;
                }
            });
           // this.city=results[0].address_components[0]["short_name"];
           })
         
          this.GetPlusCode();
        
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
    (document.getElementById('div_address') as HTMLDivElement).style.display='none';
    var options = {
      types: ['(cities)'],
    
     };
     var input = document.getElementById('from');
     var autocomplete = new google.maps.places.Autocomplete(input,options);

      
    google.maps.event.addListener(autocomplete, 'place_changed',  ()=> {
      var place=[] = autocomplete.getPlace().address_components;
      let city='',state='',country='';
      place.forEach(element => {
       if( element.types.indexOf('administrative_area_level_2')>=0){
          city=element.long_name
       }
       if(element.types.indexOf('administrative_area_level_1')>=0){
         state=element.long_name;
       }
       if(element.types.indexOf('country')>=0 ){
        //this.shipForm.controls['country'].setValue(element.long_name);
       country=element.long_name;
      }
      });
      this.address2=city+", "+state+", "+country;
      console.log(place);
      });

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
  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
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
    //  icon:this.image!=null?icon:null,
      shape: [0, 0, 40, 40],
      position: this.map.getCenter(),
      animation: google.maps.Animation.DROP,
      draggable:true,
     // label: { color: '#565656', fontWeight: 'bold', fontSize: '20px',top:'200px', text: this.name },
     
    });
    this.markers.push(marker);
    var myoverlay = new google.maps.OverlayView();
    myoverlay.draw = function () {
        this.getPanes().markerLayer.id='markerLayer';
    };
      myoverlay.setMap(this.map);
    google.maps.event.addListener(marker, 'dragend', (e)=> 
    { 
   console.log(e);
     this.ngZone.run(()=>{
      this.lat=e.latLng.lat();
      this.lng=e.latLng.lng();
      this.GetCurrentLocation(this.lat,this.lng,1);
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
  RecenterMap(address){
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
            this.address_components=AddressComponent;
            console.log(AddressComponent);
           
            AddressComponent.forEach(element => {
               this.ngZone.run(()=>{
                if(element.types.indexOf('administrative_area_level_1')>=0){
                  //this.shipForm.controls['state'].setValue(element.long_name);
                   this.state=element.long_name
                }
                if(element.types.indexOf('country')>=0){
                  //this.shipForm.controls['country'].setValue(element.long_name);
                  this.country=element.long_name;
                }
                if(element.types.indexOf('administrative_area_level_2')>=0){
                  console.log("Hiii")
                  //this.shipForm.controls['state'].setValue(element.long_name);
                   this.city=element.long_name
                }
               })
            });
            this.loadMap();
          this.city=results[0].address_components[1]["short_name"];
           })
         
          this.GetPlusCode();
           
          } 
          else{
            this.ShowAlert("Location error","Unable to find location!",0);
          }
      }); 
      
  }

  
  LocateOnMap(){
    let address=this.address+" "+this.city+" "+this.state+" "+this.country;
    this.RecenterMap(address);
  }

ShowAlert(title,message,type){
  const alert = this.alertCtrl.create({
    title: title,
    subTitle: message,
    buttons: [
      {
      text: 'Ok',
      handler: () => {
        
      }
    }]
  });
    alert.present();
  }
  datachanged(event){
    this.checked=event.checked;
    if(this.checked==true){
      (document.getElementById('div_address') as HTMLDivElement).style.display='block';
    }
    else{
      (document.getElementById('div_address') as HTMLDivElement).style.display='none';
    }
  }
  NextPage(type){
    let options= 
    {
      animate: true, 
      animation: 'ios-transition', 
      duration: 1000, 
      direction: 'left'
    };     
    if(type==1){
    console.log(this.checked);
    if(this.checked==true){
       localStorage.setItem('address2',this.address2);
       this.navCtrl.setRoot(PersonalInfoPage,null,options);
       localStorage.setItem('is_address',"false");
    }
    else{

      let zipCode='';
      this.address_components.forEach(element => {
       
        
         if(element.types.indexOf('postal_code')>=0){
           console.log("Hiii")
           //this.shipForm.controls['state'].setValue(element.long_name);
           zipCode=element.long_name
         }
       
         console.log(zipCode);
         
       
     });

      if(localStorage.getItem("locations")!=null){
         console.log("Found");
         let locations=[]=JSON.parse(localStorage.getItem('locations'));
         let obj={
          city:this.city,
          state:this.state,
          address:this.address,
          latitude:this.lat,
          longitude:this.lng,
          plus_code:this.plusCode,
          zipCode:zipCode
         }
        locations.push(obj);
        localStorage.setItem('locations',JSON.stringify(locations));
        //this.
      }
      else{
        console.log("Not found");
        let locations=[];
        locations.push({
          city:this.city,
          state:this.state,
          address:this.address,
          latitude:this.lat,
          longitude:this.lng,
          plus_code:this.plusCode,
          zipCode:zipCode
        })
        localStorage.setItem('locations',JSON.stringify(locations));
      }
     
        this.navCtrl.setRoot(AddNewLocationPage,null,options);
      
    }
   }
   else{
    let options= 
    {animate: true, 
     animation: 'ios-transition', 
         duration: 1000, 
     direction: 'left'};      
      this.navCtrl.setRoot(AddNewLocationPage,null,options);
   }
  }
}
