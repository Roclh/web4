import {Component, OnInit, NgModule} from '@angular/core';

import { PrimeNGConfig} from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'lab4';

  constructor(private primengConfig: PrimeNGConfig) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
