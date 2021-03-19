import {Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter, AfterViewInit} from '@angular/core';

import {Point} from '../objects/Point';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit, AfterViewInit {
  @ViewChild('container') canvasContainerRef!: ElementRef<HTMLElement>;
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  @Input('WidthHeight') wh!: number;
  @Input('radius') r!: number;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  rOffset!: number;
  center!: number;
  canvasContainer!: HTMLElement;
  ctx!: CanvasRenderingContext2D;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.center = this.wh / 2;
    this.rOffset = this.wh * 2 / 5;
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.ctx.lineWidth = 1.5;
    this.ctx.strokeStyle = 'black';

    this.canvasContainer = this.canvasContainerRef.nativeElement;

    this.drawCanvas(this.ctx);
  }

  hit(e: MouseEvent){


  }

  drawCanvas(ctx: CanvasRenderingContext2D){
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1.5;

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


}
