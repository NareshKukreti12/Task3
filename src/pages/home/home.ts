import { Component} from '@angular/core';
import { NavController, Keyboard, Platform } from 'ionic-angular';
import { ServicesDataProvider } from '../../providers/services-data/services-data';
import { FormControl } from '@angular/forms';
import { Renderer } from '@angular/core';
import { Page2Page } from '../page2/page2';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    searchTerm: string = '';
    searchControl: FormControl;
    items: any;
    searching: any = false;
    isVisible:boolean=true;
    logo;   
    isFound:boolean=false;
    result:string='';
    isFocus:boolean=false;
   
  constructor(public navCtrl: NavController,
    public dataService:ServicesDataProvider,
    public renderer:Renderer,
    public keyboard:Keyboard,
    public platform:Platform,
    private nativePageTransitions: NativePageTransitions
    ) {
    this.isVisible=false;
    this.isFound=false;
    this.keyboard.close();
    
  }
  ionAfterViewInit(){
    document.getElementById('searchBar').blur();
    this.keyboard.close();
  }
  ngOnInit() {
    this.setFilteredItems();
  }

  setFilteredItems() {
   
    console.log("ON Change")
 // this.isVisible=true;
  
   // this.isFound=false;
    console.log(this.searchTerm);
    this.items = this.dataService.filterItems(this.searchTerm);
   
  //   if(this.searchTerm.length>0  ) 
  //  { this.isVisible=true;}
  
  //   else{
  //       this.isVisible=false;
  //   }
  }
  onCancel(ev){
    console.log("Cancel")
     //this.searchTerm='';
     this.isVisible=true;
     this.isFound=false;
  }
  

  SetBusiness(item){
    let userDetails=[];
    //localStorage.setItem('business',JSON.stringify(item));
  
    if(localStorage.getItem('business')==null){
      let businessDetails=[];
      businessDetails.push({
        logo:item.logo,
        title:item.title,
        name:null,
        logos:{
          thumbnail_url:null,
          url:null
        }
      })
      userDetails.push({
        business_details:businessDetails,
        
      });
    localStorage.setItem('business',JSON.stringify(userDetails))
    }
    else{
      
      let items=[]=JSON.parse(localStorage.getItem('business'));
      let obj={
        logo:item.logo,
        title:item.title,
        name:items[0]["business_details"]["name"]!=null?items[0]["business_details"]["name"]:null,
        logos:{
          thumbnail_url:items[0]["business_details"]["logos"]["thumbnail_url"]!=null?items[0]["business_details"]["logos"]["thumbnail_url"]:null,
          url:items[0]["business_details"]["logos"]["url"]!=null?items[0]["business_details"]["logos"]["url"]:null
        }
      }
      userDetails.push({
        business_details:obj
      })
      console.log(userDetails);
      localStorage.setItem('business',JSON.stringify(userDetails));
    }
   this.keyboard.close();
    this.isVisible=false;   
    this.logo=item.logo;
     this.isFound=true;
   this.searchTerm=item.title;
  }
  lightSpeedIn(){
    
     if(this.isFound==true){
       return {'lightSpeedIn':true}
     }
     else{
      return {'lightSpeedIn':false}
     }
  }
  Fade(type){
 //   console.log("Type",type)
    if(this.isFound==true)
    {
      if(type==1)
      {
      return {'jackInTheBox':true}
      }
    
    else{
      return {'fadeInDown':true}
     }
  }
  else{
    if(type==1)
    {
    return {'jackInTheBox':false}
    }
  
  else{
    return {'rotateIn':false}
   }
  }
  }
  checkFocus(event){
    this.isFound=false;
    console.log("Focus ",event);
    this.isFocus=true;
    setTimeout(()=>{
   this.isVisible=true;
    },600)
    //this.isVisible=true;
  }
  FocusRemoved(){
    console.log("Focus removed");
    if(this.isFound==true){
      this.isFound=false;
      this.isVisible=true;
    }
  }
  slideUp(){
    if(this.isFocus==true){
      return{'slideTop':true}
    }
  }
  NextPage(){
    // let options: NativeTransitionOptions = {
    //   direction: 'up',
    //   duration: 500,
    //   slowdownfactor: 3,
    //   slidePixels: 20,
    //   iosdelay: 100,
    //   androiddelay: 150,
    //   fixedPixelsTop: 0,
    //   fixedPixelsBottom: 60
    //  };
  //   let options= 
  //  {animate: true, 
  //   animation: 'ios-transition', 
  //       duration: 1000, 
  //   direction: 'left'}
   
  //    this.nativePageTransitions.slide(options);
  //   this.navCtrl.push(Page2Page,null,options)
  let options= 
   {animate: true, 
    animation: 'ios-transition', 
        duration: 1000, 
    direction: 'left'}
   this.navCtrl.push(Page2Page,null,options)
  }
 
}
