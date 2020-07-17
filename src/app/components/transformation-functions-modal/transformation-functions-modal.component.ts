import { Component, SkipSelf, ViewChild } from '@angular/core';
import { NgtInputComponent, NgtModalComponent } from 'ng-tailwind';
import { HomeComponent } from 'src/app/pages/home/home.component';

import { SidenavMenuComponent } from '../sidenav-menu/sidenav-menu.component';

@Component({
  selector: 'transformation-functions-modal',
  templateUrl: './transformation-functions-modal.component.html',
  styleUrls: ['./transformation-functions-modal.component.css']
})
export class TransformationFunctionsModalComponent {
  @ViewChild(NgtModalComponent) ngtModal: NgtModalComponent;
  @ViewChild('inputPositionXComponent') inputPositionXComponent: NgtInputComponent;

  /** Transformation Data */
  public inputPositionX: number;
  public inputPositionY: number;
  public rotateAngle: number;

  constructor(@SkipSelf() private homeComponent: HomeComponent) {
    SidenavMenuComponent.onOpenTransformationFunctionsModal.subscribe(() => {
      this.openModal();
    });
  }

  public openModal() {
    this.clearInputs();
    this.inputPositionXComponent.setFocus();
    this.ngtModal.open();
  }

  public closeModal() {
    this.ngtModal.close();
  }

  /**
  * Função para translandar os selecionados
  */
  public translande() {
    for (const data of this.homeComponent.ngtDatatable.selectedElements) {
      data.reference.x = Number((Number(data.reference.x) + Number(this.inputPositionX)));
      data.reference.y = Number((Number(data.reference.y) + Number(this.inputPositionY)));

      // Calcular polar
      data.reference.radius = this.homeComponent.calculatePolarCoordinatesRadius(data.reference.x, data.reference.y) || 0;
      data.reference.angle = this.homeComponent.calculatePolarCoordinatesAngle(data.reference.x, data.reference.y) || 0;
    }

    this.homeComponent.updateTableData();
    this.closeModal();
  }

  /**
   * Função para escalonar os selecionados
   */
  public stagger() {
    for (const data of this.homeComponent.ngtDatatable.selectedElements) {
      data.reference.x = Number((Number(data.reference.x) * Number(this.inputPositionX / 100)));
      data.reference.y = Number((Number(data.reference.y) * Number(this.inputPositionY / 100)));

      // Calcular polar
      data.reference.radius = this.homeComponent.calculatePolarCoordinatesRadius(data.reference.x, data.reference.y) || 0;
      data.reference.angle = this.homeComponent.calculatePolarCoordinatesAngle(data.reference.x, data.reference.y) || 0;
    }

    this.homeComponent.updateTableData();
    this.closeModal();
  }

  /**
   * Função para rotacionar os selecionados
   */
  public rotate() {
    // Calcula o cos(B) e sen(B) de acordo com o angulo preenchido
    const cos = Number((Math.cos(this.rotateAngle / (180 / Math.PI))));
    const sen = Number((Math.sin(this.rotateAngle / (180 / Math.PI))));

    // Percorre todos os dados da grid
    for (const data of this.homeComponent.ngtDatatable.selectedElements) {
      // Armazena pois os valores se alteram
      const x = Number(data.reference.x) - Number(this.inputPositionX);
      const y = Number(data.reference.y) - Number(this.inputPositionY);

      // Função equivalente as linhas abaixos
      // x' = x.cos(B) - y.sen(B)
      data.reference.x = (x * cos) - (y * sen);
      // y' = y.sen(B) + x.cos(B)
      data.reference.y = (x * sen) + (y * cos);

      // Volta para os pontos com o calculo de rotação feito
      data.reference.x = Number((data.reference.x + Number(this.inputPositionX)));
      data.reference.y = Number((data.reference.y + Number(this.inputPositionY)));

      // Calcular polar
      data.reference.radius = this.homeComponent.calculatePolarCoordinatesRadius(data.reference.x, data.reference.y) || 0;
      data.reference.angle = this.homeComponent.calculatePolarCoordinatesAngle(data.reference.x, data.reference.y) || 0;
    }

    this.homeComponent.updateTableData();
    this.closeModal();
  }

  /**
   * Limpa as variaveis de entrada
   */
  private clearInputs() {
    this.inputPositionX = undefined;
    this.inputPositionY = undefined;
    this.rotateAngle = undefined;
  }
}
