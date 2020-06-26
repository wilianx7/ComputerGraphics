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
  public middlePointXPosition: number;
  public middlePointYPosition: number;

  private containerDimensions: any;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.loadSquares();

    setTimeout(() => {
      this.loadTableData();
    }, 100);

    window.addEventListener('resize', () => {
      this.loadSquares().then(() => {
        setTimeout(() => {
          this.loadTableData();
        }, 100);
      });

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
        yTranlation += (this.squareWidth * (airplane.y < 4 ? 0.3 : 0.2));
      } else if (airplane.y < 0) {
        yTranlation -= this.squareWidth * (airplane.y > -4 ? 0.6 : 0.5);
      } else {
        yTranlation -= this.squareWidth * 0.15;
      }
    } else {
      if (airplane.y > 0) {
        yTranlation += this.squareWidth * 0.4;
      } else if (airplane.y < 0) {
        yTranlation -= this.squareWidth * 0.6;
      } else {
        yTranlation -= this.squareWidth * 0.15;
      }
    }

    airplane.translation = `translate(${xTranlation + 'px'}, ${yTranlation + 'px'}) rotate(${(this.getAirplaneDirection(airplane)) + 'deg'})`;
  }

  public loadTableData() {
    this.loadSquares().then(() => {
      this.tableData = JSON.parse(localStorage.getItem('tableData')) ? JSON.parse(localStorage.getItem('tableData')) : [];
      this.changeDetector.detectChanges();

      setTimeout(() => {
        this.tableData.forEach((airplane) => {
          this.plotAirplane(airplane);
        });
      }, 100);

      this.changeDetector.detectChanges();
    });
  }

  private loadSquares() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.containerDimensions = this.radarContainer.nativeElement.getBoundingClientRect();

        this.squareWidth = this.containerDimensions.width / (this.containerDimensions.width >= 1400 ? 42 : 32);
        const squareCount = Math.round(this.containerDimensions.height / this.squareWidth) * (this.containerDimensions.width >= 1400 ? 42 : 32);

        this.radarSquares = new Array();

        for (let i = 0; i < squareCount; i++) {
          let square = new Square();
          square.height = this.squareWidth + 'px';
          square.width = this.squareWidth + 'px';
          this.radarSquares.push(square);
        }

        this.middlePointXPosition = (this.containerDimensions.width / 2) - (this.middlePointElement.nativeElement.offsetWidth / 2);
        this.middlePointYPosition = (this.containerDimensions.height / 2) - (this.middlePointElement.nativeElement.offsetHeight / 2);

        this.changeDetector.detectChanges();
        resolve();
      }, 100);
    });
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
