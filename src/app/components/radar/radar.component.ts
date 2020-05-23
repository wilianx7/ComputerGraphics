import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  QueryList,
  SkipSelf,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { AppComponent } from 'src/app/app.component';
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
  @ViewChildren('airplaneTemplate', { read: ViewContainerRef }) public airplaneContainers: QueryList<ViewContainerRef>;

  public tableData: Array<Airplane> = [];
  public radarSquares: Array<Square>;
  public squareWidth: number;
  public middlePointTranslation: string;
  public middlePointXPosition: number;
  public middlePointYPosition: number;

  constructor(
    @SkipSelf() private appComponent: AppComponent,
    private changeDetector: ChangeDetectorRef,
  ) { }

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
    const xTranlation = this.middlePointXPosition + ((this.squareWidth - 6) * airplane.x);
    const yTranlation = this.middlePointYPosition + (((this.squareWidth - 10) * airplane.y) * -1);
    airplane.translation = `translate(${xTranlation + 'px'}, ${yTranlation + 'px'})`;
  }

  private loadTableData() {
    this.tableData = this.appComponent.tableData;
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
