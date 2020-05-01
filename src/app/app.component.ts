import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgtDatatableComponent, NgtDatatableType } from 'ng-tailwind';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  @ViewChild('ngtDatatable') ngtDatatable: NgtDatatableComponent;

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
  public tableData: Array<DataGridModel> = [
    {
      id: 1,
      x: 2,
      y: 3,
      radius: 1,
      angle: 360,
      speed: 200,
      direction: 90
    }, /** Exemplo */
  ];

  public saveInputData() { }

  public translande() { }

  public stagger() { }

  public rotate() { }

  public trackPlanesNearAirport() { }

  public trackNearbyPlanes() { }

  public trackCollision() { }
}

export class DataGridModel {
  public id: number;
  public x: number;
  public y: number;
  public radius: number;
  public angle: number;
  public speed: number;
  public direction: number;
}