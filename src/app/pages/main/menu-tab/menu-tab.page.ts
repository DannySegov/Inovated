import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-menu-tab',
  templateUrl: './menu-tab.page.html',
  styleUrls: ['./menu-tab.page.scss'],
})
export class MenuTabPage implements OnInit {
  @ViewChild('tabs') tabs!: IonTabs;
  selectTab: any;

  pages = [
    { Url: '/main/uprisings', Icon: 'levantamiento' },
    { Url: '/main/clients', Icon: 'cliente' },
    { Url: '/main/services', Icon: 'servicios' },
    { Url: '/main/reports', Icon: 'solicitud' },
  ];

  constructor() { }

  ngOnInit() {
  }

  setCurrentTab(event: any) { // Método para establecer la pestaña actual
    console.log(event);    
    this.selectTab = this.tabs.getSelected();
  }
}
