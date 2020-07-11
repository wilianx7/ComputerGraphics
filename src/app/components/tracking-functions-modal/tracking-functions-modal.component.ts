import { Component, SkipSelf, ViewChild } from '@angular/core';
import { NgtInputComponent, NgtModalComponent } from 'ng-tailwind';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { Report } from 'src/app/resources/report';
import { ReportTypeEnum } from 'src/app/resources/report-type.enum';

import { SidenavMenuComponent } from '../sidenav-menu/sidenav-menu.component';

let moment = require('moment');

@Component({
    selector: 'tracking-functions-modal',
    templateUrl: './tracking-functions-modal.component.html',
    styleUrls: ['./tracking-functions-modal.component.css']
})
export class TrackingFunctionsModalComponent {
    @ViewChild(NgtModalComponent) ngtModal: NgtModalComponent;
    @ViewChild('minDistanceInput') minDistanceInput: NgtInputComponent;

    /** Track Data */
    public minDistance: number;
    public minTime: number;

    constructor(@SkipSelf() private homeComponent: HomeComponent) {
        SidenavMenuComponent.onOpenTrackingFunctionsModal.subscribe(() => {
            this.openModal();
        });
    }

    public openModal() {
        this.clearInputs();
        this.minDistanceInput.setFocus();
        this.ngtModal.open();
    }

    public closeModal() {
        this.ngtModal.close();
    }

    /**
     * Verifica se os aviões próximo ao aeroporto
     */
    public trackPlanesNearAirport() {
        for (const data of HomeComponent.tableData) {
            const airplaneRadius = (Math.sqrt(Math.pow(data.x, 2) + Math.pow(data.y, 2)));

            if (airplaneRadius < this.minDistance) {
                let report = new Report();

                report.id = this.getNextReportId();
                report.distance = this.formatNumber(airplaneRadius);
                report.airplanes = `[${data.id}]`;
                report.position = `(${this.formatNumber(data.x)}, ${this.formatNumber(data.y)})`;
                report.time = moment().format('DD/MM/YYYY HH:mm:ss');
                report.type = ReportTypeEnum.AIRPORT;

                this.homeComponent.addReport(report);
            }
        }

        this.closeModal();
    }

    /**
     * Verifica os aviões que estão próximos
     */
    public trackNearbyPlanes() {
        let nearbyPlane = [];

        let dataFor = HomeComponent.tableData;
        let dataFor2 = HomeComponent.tableData;

        for (const data of dataFor) {
            for (const data2 of dataFor2) {
                const distance = (Math.sqrt(Math.pow(data.x - data2.x, 2) +
                    Math.pow(data.y - data2.y, 2)));

                nearbyPlane.push(String(data.id) + String(data2.id));
                if ((distance < this.minDistance) && nearbyPlane.indexOf(String(data2.id) + String(data.id)) == -1) {
                    if (data.id != data2.id) {
                        let report = new Report();

                        report.id = this.getNextReportId();
                        report.distance = this.formatNumber(distance);
                        report.airplanes = `[${data.id}, ${data2.id}]`;
                        report.position = `[(${this.formatNumber(data.x)}, ${this.formatNumber(data.y)}), (${this.formatNumber(data2.x)}, ${this.formatNumber(data2.y)})]`;
                        report.time = moment().format('DD/MM/YYYY HH:mm:ss');
                        report.type = ReportTypeEnum.NEARBY;

                        this.homeComponent.addReport(report);
                    }
                }
            }
        }

        this.closeModal();
    }

    /**
     * Verifica os aviões que vão se colidir
     */
    public trackCollision() {
        //Calcular velocidade de cada avião
        let trackCollision = [];

        //Percorre todos os aviões
        for (const data of HomeComponent.tableData) {
            //Percorre o restantes dos aviões
            for (const data2 of HomeComponent.tableData) {
                //Se for o mesmo avião, não realiza o calculo
                if (data.id == data2.id) {
                    continue;
                }

                //Adiciona no array para controle de não repetição de calculo
                trackCollision.push(String(data.id) + String(data2.id));

                //Se não foi calculado a distancia de um avião para outro
                if (trackCollision.indexOf(String(data2.id) + String(data.id)) == -1) {
                    //Calcula os componentes de velocidade do Avião 1
                    const Vx1 = Number(data.speed) * Number((Math.cos(data.direction / (180 / Math.PI))).toFixed(2));
                    const Vy1 = Number(data.speed) * Number((Math.sin(data.direction / (180 / Math.PI))).toFixed(2));

                    //Calcula os componentes de velocidade do Avião 2
                    const Vx2 = Number(data2.speed) * Number((Math.cos(data2.direction / (180 / Math.PI))).toFixed(2));
                    const Vy2 = Number(data2.speed) * Number((Math.sin(data2.direction / (180 / Math.PI))).toFixed(2));

                    //Calcular posição em função do tempo
                    const px1 = (Number(data2.x) + Number(Vx2)) / (Number(data.x) + Number(Vx1));
                    const px2 = (Number(data2.y) + Number(Vy2)) / (Number(data.y) + Number(Vy1));

                    //Verifica se os tempos são iguais
                    if (
                        (Number((Number(px1) < Number(px2))) < 0.01) &&
                        (Number((Number(px1) < Number(px2))) > -0.01)
                    ) {
                        if (px1 < this.minTime) {
                            const xColision = (Number(data.x) + Number(Vx1) * Number(px1));
                            const yColision = (Number(data.y) + Number(Vy1) * Number(px1));

                            let report = new Report();

                            report.id = this.getNextReportId();
                            report.airplanes = `[${data.id}, ${data2.id}]`;
                            report.position = `(${this.formatNumber(xColision)}, ${this.formatNumber(yColision)})`;
                            report.time = px1.toString();
                            report.type = ReportTypeEnum.COLISION;

                            this.homeComponent.addReport(report);
                        }
                    }

                    this.closeModal();
                }
            }
        }
    }


    /**
     * Limpa as variaveis de entrada
     */
    private clearInputs() {
        this.minDistance = undefined;
        this.minTime = undefined;
    }

    private getNextReportId() {
        if (!HomeComponent.reportData || HomeComponent.reportData && !HomeComponent.reportData.length) {
            return 1;
        }

        return Math.max.apply(Math, HomeComponent.reportData.map(element => element.id)) + 1;
    }

    private formatNumber(number: number) {
        return new Intl.NumberFormat('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number);
    }
}
