import {Component, Input, OnInit} from '@angular/core';
import {Point} from '../objects/Point';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input('value') $value!: Subject<Point[]>;
  value: Point[] = []

  ngOnInit() {
    this.$value.subscribe(newValues => {
      this.value = newValues;
      console.log(this.value);
    })
  }
}
