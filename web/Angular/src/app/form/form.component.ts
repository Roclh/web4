import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Point} from '../objects/Point';
import {catchError} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {Subject, throwError} from 'rxjs';
import {ConfigService} from '../services/config.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PointService} from '../services/point.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],

})
export class FormComponent implements OnInit, AfterViewInit {
  username!: string;
  $points: Subject<Point[]> = new Subject<Point[]>();
  pointForm: FormGroup;
  xValues = [ -4, -3, -2, -1, "0", 1, 2,3, 4].reverse();
  rValues = [ -4, -3, -2, -1, "0", 1, 2, 3, 4].reverse();
  canvasRadius = 3;
  matchingRadius = false;
  readonly canvasWidthHeight = 500;

  constructor(private configService: ConfigService,
              private router: Router,
              private fb: FormBuilder,
              private pointService: PointService) {
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
      () => this.getPoints()
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
      () => this.$points.next([])
    );
  }

  private handleError(errorResp: HttpErrorResponse) {
    return throwError(errorResp);
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
