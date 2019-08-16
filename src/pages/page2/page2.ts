import { Component,ElementRef, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Page3Page } from '../page3/page3';

/**
 * Generated class for the Page2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html',
})

export class Page2Page {
  isFocus:boolean=false;
  name:string= ''
  businessName
  logo:any='https://abeon-hosting.com/images/image-placeholder-png-8.png';
  THUMBNAIL_HEIGHT=300;
  THUMBNAIL_WIDTH=300;
  original_url;
  isLogo:boolean=false;
  isVisible:boolean=false;
  text
  @ViewChild('fileInp') fileInput: ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public platform:Platform) {
      this.isLogo=false;
      this.text="Add Logo"
  }
  checkFocus(){
    console.log("Focus")
    this.isFocus=true;
    setTimeout(()=>{     
      this.isVisible=true;
    },1000)
    
  }
  ngAfterViewInit(){
    let items=JSON.parse(localStorage.getItem('business'))
    console.log(items[0]["business_details"].name);
    this.businessName=items[0]["business_details"].title;;
     if(items[0]["business_details"].name!=null){
        this.name=items[0]["business_details"].name;
        this.checkFocus();
     }
   //  console.log(items[0]["business_details"]["logos"]["thumbnail_url"]);
     if(items[0]["business_details"]["logos"].thumbnail_url!=null){
       this.original_url=this.logo=items[0]["business_details"]["logos"]["thumbnail_url"];
      
       this.isLogo=true;
     }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Page2Page');
  }
  slideUp(){
    if(this.isFocus==true){
      return{'slideTop':true}
    }
  }
  setFilteredItems(){
  
  }
  addPic(){
    this.fileInput.nativeElement.click();
  }
  fileUpload(ev) {
  //  for(let i=0;i<ev.target.files.length;i++){
      this.getBase64(ev.target.files[0]);
  //  } 
  }
  
  getBase64(file) {
    this.isLogo=true;
    this.text='Change Logo'
    var reader = new FileReader();
    reader.readAsDataURL(file);
     reader.onload =  ()=> {
     console.log();
     this.logo=reader.result;
     this.original_url=reader.result;
   // this.resizedataURL(reader.result,this.THUMBNAIL_HEIGHT,this.THUMBNAIL_WIDTH);
      
    };
 }
  resizedataURL(datas, wantedWidth, wantedHeight){
    let ev=this;
   return new Promise(async function(resolve,reject){
       var img = document.createElement('img');
       img.onload = ()=>
       {        
           // We create a canvas and get its context.
           var canvas = document.createElement('canvas');
           var ctx = canvas.getContext('2d');
           canvas.width = wantedWidth;
           canvas.height = wantedHeight;
           // We resize the image with the canvas method drawImage();
           ctx.drawImage(img, 0, 0, wantedWidth, wantedHeight);
 
           var dataURI = canvas.toDataURL();
            ev.logo=dataURI
            ev.original_url=datas;
            ev.isLogo=true;
           
       };
       img.src = datas;
   })
  }
  NextPage(){
    console.log("==>", this.isLogo)
      let items=[]=JSON.parse(localStorage.getItem('business'));
      let logo={
        thumbnail_url: (this.isLogo)?this.logo:null,
       // url:(this.isLogo)? this.original_url:null
      }
     
      let obj={
         logo: items[0]["business_details"]["logo"],
         title: items[0]["business_details"]["title"],
         name:this.name,
         logos:logo
      }
      console.log(obj);
      let userDetails=[];
      userDetails.push(
      {business_details:obj}
      );
      console.log(userDetails)
    localStorage.setItem('business',JSON.stringify(userDetails));
      let options= 
      {animate: true, 
       animation: 'ios-transition', 
           duration: 1000, 
       direction: 'left'}
      this.navCtrl.push(Page3Page,null,options);
      
  }
  
  Animations(type){
    if(type==1){
      if(this.isLogo==true)
      {
        return {'fadein':true}
      }        
    }
    else if(type==2){
      return {'bounceInRight':true}
    }        
    if(type==3 && this.name.length>=1){
      return {'fadeInDown':true}
    }
    else{
      return {'fadeInUp':true}
    } 
  }
  
}
