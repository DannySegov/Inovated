import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';


@Component({
  selector: 'app-main-tab',
  templateUrl: './main-tab.component.html',
  styleUrls: ['./main-tab.component.scss'],
})
export class MainTabComponent  implements OnInit {

  selectTab: any;
  @ViewChild('tabs') tabs!: IonTabs;
  
  constructor() { }

  ngOnInit() {
  }

  setCurrentTab(event: any) {
    console.log(event);    
    this.selectTab = this.tabs.getSelected();
  }

  pages = [
    { Url: '/main/uprisings', Icon: 'levantamiento' },
    { Url: '/main/clients', Icon: 'cliente' },
    { Url: '/main/services', Icon: 'servicios' },
    { Url: '/main/reports', Icon: 'solicitud' },
  ];

}
