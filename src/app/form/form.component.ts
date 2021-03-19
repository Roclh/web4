import {AfterViewInit, Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],

})
export class FormComponent implements OnInit, AfterViewInit {
  val: number = 0;
  X: string[];
  selectedX: string = "0";
  entryForm: any;
  R: string[];
  selectedR: string = "0";


  constructor() {

    this.X = [
      '-4', '-3', '-2', '-1', '0', '1', '2','3','4'
    ]
    this.R = [
      '-4', '-3', '-2', '-1', '0', '1', '2','3','4'
    ]
  }


  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

}
