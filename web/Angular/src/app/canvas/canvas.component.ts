import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Point} from '../objects/Point';
import {Subject} from 'rxjs';

const design = {
  colors: {
    aim: 'yellow',
    hit: 'lawngreen',
    miss: 'red',
    shapes: '#2097f2',
    main: 'black',
    background: 'white'
  },
  point: {
    outlineWidth: 3.5,
    radius: 4
  },
  fontSize: 15,
  coordsSystem: {
    lineWidth: 2
  }
};

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('container') canvasContainerRef!: ElementRef<HTMLElement>;
  @ViewChild('aim') aimCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  @Input('widthHeight') wh!: number;
  @Input('radius') rValue!: number;
  @Input('matching-radius') matchingRads!: boolean;
  @Input('points') $hits!: Subject<Point[]>;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  // First OnChanges happens before children are created, so this is needed
  initialized: boolean = false;

  points: Point[] = []; // buffer

  rOffset!: number;

  center!: number;
  canvasContainer!: HTMLElement;
  aimCtx!: CanvasRenderingContext2D;
  ctx!: CanvasRenderingContext2D;

  ngOnChanges(changes: SimpleChanges) {
    if (this.initialized && (changes.rValue || changes.matchingRads)) {
      this.redrawAll();
    }
  }

  ngOnInit() {
    this.$hits.subscribe(newPoints => {
      this.points = newPoints;
      this.redrawAll();
    })
  }

  ngAfterViewInit() {
    this.center = this.wh / 2;
    this.rOffset = this.wh * 2 / 5;

    this.aimCtx = this.aimCanvasRef.nativeElement.getContext('2d')!;
    this.aimCtx.strokeStyle = design.colors.main;
    this.aimCtx.lineWidth = design.point.outlineWidth;

    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.ctx.lineWidth = design.point.outlineWidth;
    this.ctx.strokeStyle = design.colors.main;

    this.canvasContainer = this.canvasContainerRef.nativeElement;

    this.initialized = true;

    this.drawAll();
  }

  submitPoint(e: MouseEvent) {
    let scale = this.drawingR / this.rOffset;
    let x = Math.round((this.canvasRelativeX(e, this.canvasContainer) - this.center) * scale);
    let y = (this.center - this.canvasRelativeY(e, this.canvasContainer)) * scale;

    this.onSubmit.emit({'x': x, 'y': y, 'r': this.rValue});
  }

  drawLetters(ctx: CanvasRenderingContext2D, center: number, rOffset: number) {
    const textOffset = this.wh / 100; // previously 5
    const axisLetterBorderOffset = design.fontSize;

    const R = String(this.drawingR);
    const halfR = String(this.drawingR / 2);

    ctx.strokeStyle = design.colors.main;
    ctx.font = design.fontSize + 'px Arial';
    // R
    ctx.textAlign = 'center';
    // left
    ctx.strokeText('- ' + R, center - rOffset, center - textOffset);
    ctx.strokeText('- ' + halfR, center - rOffset / 2, center - textOffset);
    // right
    ctx.strokeText(R, center + rOffset, center - textOffset);
    ctx.strokeText(halfR, center + rOffset / 2, center - textOffset);
    // top
    ctx.textAlign = 'left';
    ctx.strokeText(R, center + textOffset, center - rOffset);
    ctx.strokeText(halfR, center + textOffset, center - rOffset / 2);
    // bottom
    ctx.strokeText('- ' + R, center + textOffset, center + rOffset);
    ctx.strokeText('- ' + halfR, center + textOffset, center + rOffset / 2);

    // X, Y
    ctx.strokeText('X', this.wh - axisLetterBorderOffset, center - textOffset);
    ctx.strokeText('Y', center + textOffset, axisLetterBorderOffset);
  }

  drawCoordsSystem(ctx: CanvasRenderingContext2D) {
    // styles
    ctx.strokeStyle = design.colors.main;
    ctx.lineWidth = design.coordsSystem.lineWidth;

    // horizontal
    ctx.beginPath();
    ctx.moveTo(0, this.center);
    ctx.lineTo(this.wh, this.center);
    ctx.stroke();

    // vertical
    ctx.beginPath();
    ctx.moveTo(this.center, this.wh);
    ctx.lineTo(this.center, 0);
    ctx.stroke();
  }

  clearCanvas(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.wh, this.wh);
  }

  drawShapes(ctx: CanvasRenderingContext2D, center: number, rOffset: number) {
    ctx.fillStyle = design.colors.shapes;

    // ??????????????????????????
    ctx.fillRect(center - rOffset/2, center-rOffset, rOffset/2, rOffset);

    // ??????????????????????
    ctx.moveTo(center, center);
    ctx.beginPath();
    ctx.lineTo(center, center - rOffset/2);
    ctx.lineTo(center + rOffset, center);
    ctx.lineTo(center, center);
    ctx.fill();

    // ???????????????? ??????????
    ctx.beginPath();
    ctx.lineTo(center + rOffset, center);
    ctx.arc(center, center, rOffset, 0, Math.PI/2);
    ctx.lineTo(center, center);
    ctx.fill();
  }

  eraseAim = () => this.clearCanvas(this.aimCtx);

  drawAll() {
    this.drawBackground(this.ctx);
    this.drawPoints(this.ctx);
  }

  redrawAll() {
    this.clearCanvas(this.ctx);
    this.drawAll();
  }

  redrawAim(e: MouseEvent, ctx: CanvasRenderingContext2D) {
    this.eraseAim();
    let scale = this.drawingR / this.rOffset;
    ctx.fillStyle = design.colors.aim;
    ctx.beginPath();
    ctx.arc(
      Math.round((this.canvasRelativeX(e, this.canvasContainer) - this.center) * scale) / scale + this.center,
      this.canvasRelativeY(e, this.canvasContainer),
      design.point.radius, 0, 2 * Math.PI
    );
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  drawPoint(ctx: CanvasRenderingContext2D, x: number, y: number, fillStyle: any) {
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = design.colors.main;
    ctx.beginPath();
    ctx.arc(
      this.center + x * this.rOffset / this.drawingR,
      this.center - y * this.rOffset / this.drawingR, design.point.radius, 0, 2 * Math.PI
    );
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  drawBackground(ctx: CanvasRenderingContext2D) {
    if (this.rValue != 0) {
      this.drawShapes(ctx, this.center, this.rOffset);
    }
    this.drawCoordsSystem(this.ctx);
    this.drawLetters(ctx, this.center, this.rOffset);
  }

  drawPoints(ctx: CanvasRenderingContext2D) {
    ctx.lineWidth = design.point.outlineWidth;
    let hits = this.matchingRads ? this.points.filter(point => point.r == this.rValue) : this.points;
    hits.forEach(point => this.drawPoint(ctx, point.x, point.y, design.colors[this.checkPoint(point, this.rValue) ? 'hit' : 'miss']));
  }

  get drawingR(): number {
    return this.rValue == 0 ? 1 : this.rValue;
  }


  canvasRelativeX(event: MouseEvent, canvasContainer: HTMLElement): number {
    return event.pageX - canvasContainer.offsetLeft;
  }

  canvasRelativeY(event: MouseEvent, canvasContainer: HTMLElement): number {
    return event.pageY - canvasContainer.offsetTop;
  }

  checkPoint(point: Point, r: number):boolean{
    return (point.x<=0&&point.y>=0&&(point.x>-r/2&&point.y<r))||(point.x>=0&&point.y>=0&&(point.y<r/2-point.x/2))||(point.x>=0&&point.y<=0&&(point.x*point.x+point.y*point.y<r*r))
  }
}
