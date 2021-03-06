import { AfterViewInit, ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgtDatatableComponent } from 'ng-tailwind';
import { RadarComponent } from 'src/app/components/radar/radar.component';
import { Airplane } from 'src/app/resources/airplane';
import { Report } from 'src/app/resources/report';

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
    public static reportData: Array<Report> = [];

    constructor(private changeDetector: ChangeDetectorRef) { }

    public ngAfterViewInit() {
        HomeComponent.tableData = JSON.parse(localStorage.getItem('tableData')) ? JSON.parse(localStorage.getItem('tableData')) : [];
        HomeComponent.reportData = JSON.parse(localStorage.getItem('reportData')) ? JSON.parse(localStorage.getItem('reportData')) : [];
        this.changeDetector.detectChanges();
    }

    public getTableData() {
        return HomeComponent.tableData;
    }

    public getReportData() {
        return HomeComponent.reportData;
    }

    /**
       * Retorna o raio
       * @param x Coordenada cartesiana X
       * @param y Coordenada cartesiana Y
       */
    public calculatePolarCoordinatesRadius(x: number, y: number): number {
        // Calculo equivalente a linha abaixo: r = √x² + y²
        return Number((Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)))) || 0;
    }

    /**
     * Retorna o angulo
     * @param x Coordenada cartesiana x
     * @param y Coordenada cartesiana y
     */
    public calculatePolarCoordinatesAngle(x: number, y: number): number {
        // Calculo equivalente a linha abaixo: tag(teta)
        let theta = Number((Math.atan2(y, x) * 180 / Math.PI)) || 0;
        if (theta < 0) theta = 360 + theta; // range [0, 360)
        return theta;
    }

    public removeAirplane(airplane: Airplane) {
        HomeComponent.tableData = HomeComponent.tableData.filter(element => element.id != airplane.id);
        this.updateTableData();
    }

    public clearReport() {
        HomeComponent.reportData = [];
        this.updateReportData();
    }

    public removeReport(report: Report) {
        HomeComponent.reportData = HomeComponent.reportData.filter(element => element.id != report.id);
        this.updateReportData();
    }

    public addReport(report: Report) {
        HomeComponent.reportData.push(report);
        this.updateReportData();
    }

    public updateTableData() {
        localStorage.removeItem('tableData');
        localStorage.setItem('tableData', JSON.stringify(HomeComponent.tableData));

        this.radarComponent.loadTableData();
    }

    public updateReportData() {
        localStorage.removeItem('reportData');
        localStorage.setItem('reportData', JSON.stringify(HomeComponent.reportData));

        this.changeDetector.detectChanges();
    }
}
