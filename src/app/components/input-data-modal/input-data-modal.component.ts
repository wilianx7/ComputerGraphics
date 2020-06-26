import { Component, SkipSelf, ViewChild } from '@angular/core';
import { NgtModalComponent } from 'ng-tailwind';
import { HomeComponent } from 'src/app/pages/home/home.component';

import { SidenavMenuComponent } from '../sidenav-menu/sidenav-menu.component';

@Component({
  selector: 'input-data-modal',
  templateUrl: './input-data-modal.component.html',
  styleUrls: ['./input-data-modal.component.css']
})
export class InputDataModalComponent {
  @ViewChild(NgtModalComponent) ngtModal: NgtModalComponent;

  /** Input Data */
  public inputPositionX: number;
  public inputPositionY: number;
  public radiusInput: number;
  public angleInput: number;
  public speedInput: number;
  public directionInput: number;

  constructor(@SkipSelf() private homeComponent: HomeComponent) {
    SidenavMenuComponent.onOpenInputDataModal.subscribe(() => {
      this.openModal();
    });
  }

  public openModal() {
    this.clearInputs();
    this.ngtModal.open();
  }

  public closeModal() {
    this.ngtModal.close();
  }

  /**
   * Responsavel por salvar os dados digitados pelo usuario
   */
  public saveInputData() {
    this.closeModal();

    // Adiciona as variaveis para salvar no array vinculado a Grid
    HomeComponent.tableData.push({
      id: this.getNextId(),
      x: this.inputPositionX,
      y: this.inputPositionY,
      radius: this.radiusInput,
      angle: this.angleInput,
      speed: this.speedInput,
      direction: this.directionInput,
      translation: null,
    });

    this.homeComponent.updateTableData();
  }

  /**
   * Calcula as coordenadas polares de acordo com as coordenadas cartesianas
   * @param x Coordenada cartesiana X
   * @param y Coordenada cartesiana Y
   */
  public calculatePolarCoordinates(x?: number, y?: number) {
    // Seta os valores default para calculo
    x = x || this.inputPositionX;
    y = y || this.inputPositionY;

    // Calcula os dados da polar
    this.radiusInput = this.homeComponent.calculatePolarCoordinatesRadius(x, y);
    this.angleInput = this.homeComponent.calculatePolarCoordinatesAngle(x, y);
  }

  /**
   * Calcula as coordenadas cartesianas de acordo com as coordenadas polares
   */
  public calculateCartesianCoordinates() {

    //Tratamento de angulos problematicos
    switch (Number(this.angleInput)) {
      //Caso possuir angulo 0, o 'x' varia de acordo com o raio
      case 0:
      case 360:
        this.inputPositionX = this.radiusInput;
        this.inputPositionY = 0;
        break;
      case 90:
        //Caso possuir angulo 90, o 'y' varia de acordo com o raio
        this.inputPositionY = this.radiusInput;
        this.inputPositionX = 0;
        break;
      case 180:
        this.inputPositionY = 0;
        this.inputPositionX = this.radiusInput * -1;
        break;
      default:
        // Seta os valores default
        this.angleInput = this.angleInput || 0;
        this.radiusInput = this.radiusInput || 0;

        // Calcula os dados coordenadas cartesianas
        // Calculo equivalentes:
        // raio * cos(angulo)
        this.inputPositionX = Number((this.radiusInput * Math.cos(this.angleInput / (180 / Math.PI))).toFixed(2)) || 0;
        // raio * sen(angulo)
        this.inputPositionY = Number((this.radiusInput * Math.sin(this.angleInput / (180 / Math.PI))).toFixed(2)) || 0;
    }
  }

  /**
   * Limpa as variaveis de entrada
   */
  private clearInputs() {
    this.inputPositionX = undefined;
    this.inputPositionY = undefined;
    this.angleInput = undefined;
    this.radiusInput = undefined;
    this.speedInput = undefined;
    this.directionInput = undefined;
  }

  private getNextId() {
    if (!HomeComponent.tableData || HomeComponent.tableData && !HomeComponent.tableData.length) {
      return 1;
    }

    return Math.max.apply(Math, HomeComponent.tableData.map(element => element.id)) + 1;
  }
}
