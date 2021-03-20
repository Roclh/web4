import {Component, OnInit, NgModule} from '@angular/core';

import { PrimeNGConfig} from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'lab4';
  public headers: Headers | undefined;


  constructor(private primengConfig: PrimeNGConfig) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.headers = new Headers();
    this.headers.append('Access-Control-Allow-Origin','*');


    this.primengConfig.ripple = true;
  }
}
