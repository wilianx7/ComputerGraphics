import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Airplane } from 'src/app/resources/airplane';
import { Square } from 'src/app/resources/square';

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.css']
})
export class RadarComponent implements AfterViewInit {
  @ViewChild('radarContainer') radarContainer: ElementRef;
  @ViewChild('middlePoint') middlePointElement: ElementRef;

  public tableData: Array<Airplane> = [];
  public radarSquares: Array<Square>;
  public squareWidth: number;
  public middlePointTranslation: string;
  public middlePointXPosition: number;
  public middlePointYPosition: number;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loadSquares();
      this.loadTableData();
    }, 250);

    window.addEventListener('resize', () => {
      this.loadSquares();
      this.loadTableData();
    });
  }

  public plotAirplane(airplane: Airplane) {
    let xTranlation = this.middlePointXPosition + (((this.squareWidth)) * airplane.x);
    let yTranlation = this.middlePointYPosition + ((((this.squareWidth)) * airplane.y) * -1);

    if (airplane.x > 0) {
      xTranlation -= this.squareWidth * 0.60527249084;
    } else if (airplane.x < 0) {
      xTranlation += this.squareWidth * 0.30263624542;
    } else {
      xTranlation -= this.squareWidth * 0.24210899634;
    }

    if (airplane.y > 0) {
      yTranlation -= this.squareWidth;
      yTranlation += this.squareWidth * 0.90790873626;
    } else if (airplane.y < 0) {
      yTranlation += this.squareWidth;
      yTranlation -= this.squareWidth * 1.05922685897;
    } else {
      yTranlation -= this.squareWidth * 0.15131812271;
    }

    airplane.translation = `translate(${xTranlation + 'px'}, ${yTranlation + 'px'})`;
  }

  public loadTableData() {
    this.tableData = JSON.parse(localStorage.getItem('tableData')) ? JSON.parse(localStorage.getItem('tableData')) : [];
    this.changeDetector.detectChanges();

    this.tableData.forEach((airplane) => {
      this.plotAirplane(airplane);
    });
  }

  private loadSquares() {
    const containerDimensions = this.radarContainer.nativeElement.getBoundingClientRect();
    this.squareWidth = containerDimensions.width / 16;
    const squareCount = Math.round(containerDimensions.height / this.squareWidth) * 16;
    this.radarSquares = new Array();

    for (let i = 0; i < squareCount; i++) {
      let square = new Square();
      square.height = this.squareWidth + 'px';
      square.width = this.squareWidth + 'px';
      this.radarSquares.push(square);
    }

    this.middlePointXPosition = (containerDimensions.width / 2) - (this.middlePointElement.nativeElement.offsetWidth / 2);
    this.middlePointYPosition = (containerDimensions.height / 2) - (this.middlePointElement.nativeElement.offsetHeight / 2);

    this.middlePointTranslation = `translate(${this.middlePointXPosition + 'px'}, ${this.middlePointYPosition + 'px'})`;
    this.changeDetector.detectChanges();
  }
}
