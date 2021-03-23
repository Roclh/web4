import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {Point} from '../../objects/Point';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  $points : Subject<Point[]> = new Subject<Point[]>();

  constructor() {

  }

  ngOnInit(): void {
  }



}
