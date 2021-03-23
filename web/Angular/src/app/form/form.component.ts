import {AfterViewInit, Component, Inject, Input, OnInit} from '@angular/core';
import {Point} from '../objects/Point';
import {catchError} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {Subject, throwError} from 'rxjs';
import {ConfigService} from '../services/config.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PointService} from '../services/point.service';
import {NotificationsService} from 'angular2-notifications';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],

})
export class FormComponent implements OnInit, AfterViewInit {
  username!: string;
  @Input('value') $points!: Subject<Point[]>;
  pointForm: FormGroup;
  xValues = [
    {label: '4', value: 4},
    {label: '3', value: 3},
    {label: '2', value: 2},
    {label: '1', value: 1},
    {label: '0', value: 0},
    {label: '-1', value: -1},
    {label: '-2', value: -2},
    {label: '-3', value: -3},
    {label: '-4', value: -4}
  ]
  rValues = [
    {label: '4', value: 4},
    {label: '3', value: 3},
    {label: '2', value: 2},
    {label: '1', value: 1},
    {label: '0', value: 0},
    {label: '-1', value: -1},
    {label: '-2', value: -2},
    {label: '-3', value: -3},
    {label: '-4', value: -4}
  ]
  canvasRadius = 3;
  matchingRadius = false;
  readonly canvasWidthHeight = 450;

  constructor(private configService: ConfigService,
              private router: Router,
              private fb: FormBuilder,
              private pointService: PointService,
              private service: NotificationsService) {
    this.pointForm = fb.group({
      x: new FormControl('', Validators.required),
      y: new FormControl('0', [Validators.min(-4.99999), Validators.max(4.99999)]),
      r: new FormControl('', [Validators.required, Validators.min(0)])
    });
  }


  ngOnInit(): void {
    this.username = this.configService.login ?? '[something is wrong]';
    this.getPoints();

  }

  submitPoint(point: Point) {
    console.log(`Submitting point with x = ${point.x}, y = ${point.y}, r = ${point.r}`);
    this.pointService.postPoint(point).pipe(
      catchError(this.handleError.bind(this))
    ).subscribe(
      () => {
        this.onSuccess("Точка удачно добавлена!");
        this.getPoints();
      }
    );
  }

  getPoints(){
    console.log(`GET points`);
    this.pointService.getPoints().pipe(
      catchError(this.handleError.bind(this))
    ).subscribe(
      points => this.$points.next(points as Point[])
    );
  }

  clearPoints() {
    console.log(`DELETE points (clear)`);
    this.pointService.deletePoints().pipe(
      catchError(this.handleError.bind(this))
    ).subscribe(
      () =>{
        this.onSuccess("Точки были удалены!");
        this.$points.next([])
      }
    );
  }

  private handleError(errorResp: HttpErrorResponse) {
    this.onError(errorResp.error);
    return throwError(errorResp);
  }

  onSuccess(message: any){
    this.service.success('Success', message, {
      position: ['bottom', 'right'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    });
  }

  onError(message: any){
    this.service.error('Error', message, {
      position: ['bottom', 'right'],
      timeOut: 2000,
      animate: 'fade',
      showProgressBar: true
    });
  }

  signOut(): void {
    this.configService.signOut();
    this.router.navigateByUrl('auth').then(() => console.log('Navigated to auth'));
  }

  get yForm() {
    return this.pointForm.get('y')!;
  }

  get rForm() {
    return this.pointForm.get('r')!;
  }

  isNaN(value: number): boolean {
    return Number.isNaN(value);
  }

  ngAfterViewInit(): void {
  }

  redraw(){
    this.canvasRadius = this.rForm.value;
  }
}
