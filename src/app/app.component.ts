import { AfterViewInit, ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgtDatatableComponent, NgtDatatableType } from 'ng-tailwind';

import { RadarComponent } from './components/radar/radar.component';
import { Airplane } from './resources/airplane';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
  @ViewChild('ngtDatatable') ngtDatatable: NgtDatatableComponent;
  @ViewChild(RadarComponent) radarComponent: RadarComponent;

  /** Input Data */
  public inputPositionX: number;
  public inputPositionY: number;
  public radiusInput: number;
  public angleInput: number;
  public speedInput: number;
  public directionInput: number;

  /** Translande Data */
  public translandePositionX: number;
  public translandePositionY: number;

  /** Stagger Data */
  public staggerPositionX: number;
  public staggerPositionY: number;

  /** Rotate Data */
  public rotateAngle: number;
  public rotateAngleX: number;
  public rotateAngleY: number;

  /** Track Data */
  public airportDistance: number;
  public nearbyPlanesDistance: number;
  public collisionDistance: number;

  /** DataGrid */
  public ngtDatatableType: NgtDatatableType = NgtDatatableType.fixed;
  public tableData: Array<Airplane> = [];

  constructor(private changeDetector: ChangeDetectorRef) { }

  public ngAfterViewInit() {
    this.tableData = JSON.parse(localStorage.getItem('tableData')) ? JSON.parse(localStorage.getItem('tableData')) : [];
    this.changeDetector.detectChanges();
  }

  /**
   * Responsavel por salvar os dados digitados pelo usuario
   */
  public saveInputData() {
    // Adiciona as variaveis para salvar no array vinculado a Grid
    this.tableData.push({
      id: this.tableData.length + 1,
      x: this.inputPositionX,
      y: this.inputPositionY,
      radius: this.radiusInput,
      angle: this.angleInput,
      speed: this.speedInput,
      direction: this.directionInput,
      translation: null,
    });

    this.updateTableData();
  }

  public removeAirplane(airplane: Airplane) {
    this.tableData = this.tableData.filter(element => element.id != airplane.id);
    this.updateTableData();
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
    this.radiusInput = this.calculatePolarCoordinatesRadius(x, y);
    this.angleInput = this.calculatePolarCoordinatesAngle(x, y);
  }

  /**
   * Retorna o raio
   * @param x Coordenada cartesiana X
   * @param y Coordenada cartesiana Y
   */
  private calculatePolarCoordinatesRadius(x: number, y: number): number {
    // Calculo equivalente a linha abaixo: r = √x² + y²
    return Number((Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))).toFixed(2)) || 0;
  }

  /**
   * Retorna o angulo
   * @param x Coordenada cartesiana x
   * @param y Coordenada cartesiana y
   */
  private calculatePolarCoordinatesAngle(x: number, y: number): number {
    // Calculo equivalente a linha abaixo: tag(teta)
    let theta = Number((Math.atan2(y, x) * 180 / Math.PI).toFixed(2)) || 0;
    if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta
  }

  /**
   * Calcula as coordenadas cartesianas de acordo com as coordenadas polares
   */
  public calculateCartesianCoordinates() {
    // Seta os valores default
    this.angleInput = this.angleInput || 0;
    this.radiusInput = this.radiusInput || 0;

    // Calcula os dados coordenadas cartesianas
    // Calculo equivalentes:
    // raio * cos(angulo)
    this.inputPositionX = this.radiusInput * Math.cos(this.angleInput / (180 / Math.PI));
    // raio * sen(angulo)
    this.inputPositionY = this.radiusInput * Math.sin(this.angleInput / (180 / Math.PI));
  }

  /**
   * Função para translandar os selecionados
   */
  public translande() {
    for (const data of this.ngtDatatable.selectedElements) {
      data.reference.x = Number((Number(data.reference.x) + Number(this.translandePositionX)).toFixed(2));
      data.reference.y = Number((Number(data.reference.y) + Number(this.translandePositionY)).toFixed(2));

      // Calcular polar
      data.reference.radius = this.calculatePolarCoordinatesRadius(data.reference.x, data.reference.y) || 0;
      data.reference.angle = this.calculatePolarCoordinatesAngle(data.reference.x, data.reference.y) || 0;
    }

    this.updateTableData();
  }

  /**
   * Função para escalonar os selecionados
   */
  public stagger() {
    for (const data of this.ngtDatatable.selectedElements) {
      data.reference.x = Number((Number(data.reference.x) * Number(this.staggerPositionX / 100)).toFixed(2));
      data.reference.y = Number((Number(data.reference.y) * Number(this.staggerPositionY / 100)).toFixed(2));

      // Calcular polar
      data.reference.radius = this.calculatePolarCoordinatesRadius(data.reference.x, data.reference.y) || 0;
      data.reference.angle = this.calculatePolarCoordinatesAngle(data.reference.x, data.reference.y) || 0;
    }

    this.updateTableData();
  }

  /**
   * Função para rotacionar os selecionados
   */
  public rotate() {
    // Calcula o cos(B) e sen(B) de acordo com o angulo preenchido
    const cos = Number((Math.cos(this.rotateAngle / (180 / Math.PI))).toFixed(2));
    const sen = Number((Math.sin(this.rotateAngle / (180 / Math.PI))).toFixed(2));
    // Percorre todos os dados da grid
    for (const data of this.ngtDatatable.selectedElements) {
      // Armazena pois os valores se alteram
      const x = Number(data.reference.x) - Number(this.rotateAngleX);
      const y = Number(data.reference.y) - Number(this.rotateAngleY);

      // Função equivalente as linhas abaixos
      // x' = x.cos(B) - y.sen(B)
      data.reference.x = (x * cos) - (y * sen);
      // y' = y.sen(B) + x.cos(B)
      data.reference.y = (x * sen) + (y * cos);

      // Volta para os pontos com o calculo de rotação feito
      data.reference.x = Number((data.reference.x + Number(this.rotateAngleX)).toFixed(2));
      data.reference.y = Number((data.reference.y + Number(this.rotateAngleY)).toFixed(2));

      // Calcular polar
      data.reference.radius = this.calculatePolarCoordinatesRadius(data.reference.x, data.reference.y) || 0;
      data.reference.angle = this.calculatePolarCoordinatesAngle(data.reference.x, data.reference.y) || 0;
    }

    this.updateTableData();
  }

  public trackPlanesNearAirport() { }

  public trackNearbyPlanes() { }

  public trackCollision() { }

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

    this.translandePositionX = undefined;
    this.translandePositionY = undefined;

    this.staggerPositionX = undefined;
    this.staggerPositionY = undefined;

    this.rotateAngle = undefined;
    this.rotateAngleX = undefined;
    this.rotateAngleY = undefined;

    this.airportDistance = undefined;
    this.nearbyPlanesDistance = undefined;
    this.collisionDistance = undefined;
  }

  private updateTableData() {
    localStorage.removeItem('tableData');
    localStorage.setItem('tableData', JSON.stringify(this.tableData));

    this.radarComponent.loadTableData();
    this.clearInputs();
  }
}
