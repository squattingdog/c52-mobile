import { MenuController } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private menu: MenuController) {}

  public showMainMenu(): void {
    // show menu click
    console.log('opening menu');
    this.menu.getMenus().then(menus => {
      console.log(menus);
    });
    const val = this.menu.toggle();
    val.then(b => {
      console.log(b);
    });
  }
}
