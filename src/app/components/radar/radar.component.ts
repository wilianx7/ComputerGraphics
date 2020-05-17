import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Square } from 'src/app/resources/square';

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.css']
})
export class RadarComponent implements AfterViewInit {
  @ViewChild('radarContainer') radarContainer: ElementRef;
  @ViewChild('middlePoint') middlePointElement: ElementRef;

  public radarSquares: Array<Square>;
  public middlePointTranslation: string;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.loadSquares();

    window.addEventListener('resize', () => {
      this.loadSquares();
    });
  }

  public plotAirplane(xPosition: number, yPosition: number) {

  }

  private loadSquares() {
    const containerDimensions = this.radarContainer.nativeElement.getBoundingClientRect();
    const squareWidth = containerDimensions.width / 20;
    const squareCount = Math.round(containerDimensions.height / squareWidth) * 20;
    this.radarSquares = new Array();

    for (let i = 0; i < squareCount; i++) {
      let square = new Square();
      square.height = squareWidth + 'px';
      square.width = squareWidth + 'px';
      this.radarSquares.push(square);
    }

    const middlePointXPosition = (containerDimensions.width / 2) - (this.middlePointElement.nativeElement.offsetWidth / 2) + 'px';
    const middlePointYPosition = (containerDimensions.height / 2) - (this.middlePointElement.nativeElement.offsetHeight / 2) + 'px';

    this.middlePointTranslation = `translate(${middlePointXPosition}, ${middlePointYPosition})`;
    this.changeDetector.detectChanges();
  }
}
