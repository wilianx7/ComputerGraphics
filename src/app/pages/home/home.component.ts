import { AfterViewInit, ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgtDatatableComponent } from 'ng-tailwind';
import { RadarComponent } from 'src/app/components/radar/radar.component';
import { Airplane } from 'src/app/resources/airplane';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('ngtDatatable') ngtDatatable: NgtDatatableComponent;
  @ViewChild(RadarComponent) radarComponent: RadarComponent;

  public static tableData: Array<Airplane> = [];
  public static report: Array<string> = [];

  constructor(private changeDetector: ChangeDetectorRef) { }

  public ngAfterViewInit() {
    HomeComponent.tableData = JSON.parse(localStorage.getItem('tableData')) ? JSON.parse(localStorage.getItem('tableData')) : [];
    this.changeDetector.detectChanges();
  }

  public getTableData() {
    return HomeComponent.tableData;
  }

  public getReport() {
    return HomeComponent.report;
  }

  /**
     * Retorna o raio
     * @param x Coordenada cartesiana X
     * @param y Coordenada cartesiana Y
     */
  public calculatePolarCoordinatesRadius(x: number, y: number): number {
    // Calculo equivalente a linha abaixo: r = √x² + y²
    return Number((Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))).toFixed(2)) || 0;
  }

  /**
   * Retorna o angulo
   * @param x Coordenada cartesiana x
   * @param y Coordenada cartesiana y
   */
  public calculatePolarCoordinatesAngle(x: number, y: number): number {
    // Calculo equivalente a linha abaixo: tag(teta)
    let theta = Number((Math.atan2(y, x) * 180 / Math.PI).toFixed(2)) || 0;
    if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta;
  }

  public removeAirplane(airplane: Airplane) {
    HomeComponent.tableData = HomeComponent.tableData.filter(element => element.id != airplane.id);
    this.updateTableData();
  }

  public updateTableData() {
    localStorage.removeItem('tableData');
    localStorage.setItem('tableData', JSON.stringify(HomeComponent.tableData));

    this.radarComponent.loadTableData();
  }

  public updateReport(error :string){
    HomeComponent.report.push(error);
  }

  public clearReport(){
    HomeComponent.report = undefined;
  }

}
