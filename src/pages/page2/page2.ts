import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  logo:string='https://abeon-hosting.com/images/image-placeholder-png-8.png'
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  checkFocus(ev){
    this.isFocus=true;
  }
  ngAfterViewInit(){
    let items=JSON.parse(localStorage.getItem('business'))
    console.log(items);
    this.businessName=items.title;
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
}
