import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {
    this.menu.enable(true, 'main');
  }
}
