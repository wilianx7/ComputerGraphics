import { Component, SkipSelf, ViewChild } from '@angular/core';
import { NgtInputComponent, NgtModalComponent } from 'ng-tailwind';
import { HomeComponent } from 'src/app/pages/home/home.component';

import { SidenavMenuComponent } from '../sidenav-menu/sidenav-menu.component';

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
    private errors: string;

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

        this.homeComponent.clearReport;

        for (const data of HomeComponent.tableData) {
            if ((Math.sqrt(Math.pow(data.x, 2) + Math.pow(data.y, 2))) < this.minDistance) {
                this.errors = 'Avião ' + data.id + ' está próximo ao aeroporto';
                this.homeComponent.updateReport(this.errors);
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
                const distancia = (Math.sqrt(Math.pow(data.x - data2.x, 2) +
                    Math.pow(data.y - data2.y, 2)));

                nearbyPlane.push(String(data.id) + String(data2.id));
                if ((distancia < this.minDistance) && nearbyPlane.indexOf(String(data2.id) + String(data.id)) == -1) {
                    if (data.id != data2.id) {
                        this.homeComponent.updateReport('O avião ' + data.id + ' está próximo do avião '
                            + data2.id + ' - Distância de ' + distancia.toFixed(2) + 'KM');
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
                            const message = 'Os aviões ' + data.id + ' e ' + data2.id
                                + ' irão se colidir no tempo ' + px1 + ' na posição ( ' + (Number(data.x) + Number(Vx1) * Number(px1))
                                + ',' + (Number(data.y) + Number(Vy1) * Number(px1)) + ')';

                            this.homeComponent.updateReport(message);
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
}
