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

  private containerDimensions: any;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.loadSquares();

    setTimeout(() => {
      this.loadTableData();
    }, 500);

    window.addEventListener('resize', () => {
      this.loadSquares();

      setTimeout(() => {
        this.loadTableData();
      }, 500);
    });
  }

  public plotAirplane(airplane: Airplane) {
    let xTranlation = this.middlePointXPosition + (((this.squareWidth)) * airplane.x);
    let yTranlation = this.middlePointYPosition + ((((this.squareWidth)) * airplane.y) * -1);

    if (airplane.x > 0) {
      xTranlation -= this.squareWidth * 0.7;
    } else if (airplane.x < 0) {
      xTranlation += this.squareWidth * 0.3;
    } else {
      xTranlation -= this.squareWidth * 0.2;
    }

    if (this.containerDimensions.width >= 1400) {
      if (airplane.y > 0) {
        yTranlation += this.squareWidth * 0.2;
      } else if (airplane.y < 0) {
        yTranlation += this.squareWidth * 0.5;
      } else {
        yTranlation -= this.squareWidth * 0.15;
      }
    } else {
      if (airplane.y > 0) {
        yTranlation -= this.squareWidth * 0.2;
      } else if (airplane.y < 0) {
        yTranlation -= this.squareWidth * 0.05;
      } else {
        yTranlation -= this.squareWidth * 0.15;
      }
    }

    airplane.translation = `translate(${xTranlation + 'px'}, ${yTranlation + 'px'}) rotate(${(this.getAirplaneDirection(airplane)) + 'deg'})`;
  }

  public loadTableData() {
    this.tableData = JSON.parse(localStorage.getItem('tableData')) ? JSON.parse(localStorage.getItem('tableData')) : [];
    this.changeDetector.detectChanges();

    this.tableData.forEach((airplane) => {
      this.plotAirplane(airplane);
    });

    this.changeDetector.detectChanges();
  }

  private loadSquares() {
    setTimeout(() => {
      this.containerDimensions = this.radarContainer.nativeElement.getBoundingClientRect();

      this.squareWidth = this.containerDimensions.width / (this.containerDimensions.width >= 1400 ? 42 : 30);
      const squareCount = Math.round(this.containerDimensions.height / this.squareWidth) * (this.containerDimensions.width >= 1400 ? 42 : 30);

      this.radarSquares = new Array();

      for (let i = 0; i < squareCount; i++) {
        let square = new Square();
        square.height = this.squareWidth + 'px';
        square.width = this.squareWidth + 'px';
        this.radarSquares.push(square);
      }

      this.middlePointXPosition = (this.containerDimensions.width / 2) - (this.middlePointElement.nativeElement.offsetWidth / 2);
      this.middlePointYPosition = (this.containerDimensions.height / 2) - (this.middlePointElement.nativeElement.offsetHeight / 2);

      this.middlePointTranslation = `translate(${this.middlePointXPosition + 'px'}, ${this.middlePointYPosition + 'px'})`;
      this.changeDetector.detectChanges();
    }, 500);
  }

  private getAirplaneDirection(airplane: Airplane) {
    if (airplane.direction) {
      return ((parseInt(airplane.direction.toString())) * -1) + 45;
    }

    return 45;
  }

  public getTextRotation(airplane: Airplane) {
    if (airplane.direction) {
      return `rotate(${airplane.direction}deg)`;
    }

    return 'rotate(-45deg)';
  }
}
