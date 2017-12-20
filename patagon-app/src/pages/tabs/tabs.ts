import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root: any = 'Tabs1Page';
  tab2Root: any = 'Tabs2Page';
  tab3Root: any = 'Tab3Page';
  myIndex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    // Set the active tab based on the passed index from menu.ts
    this.myIndex = navParams.data.tabIndex || 0;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
