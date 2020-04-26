import { Component } from '@angular/core';
import { NgtDatatableType } from 'ng-tailwind';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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

  public ngtDatatableType: NgtDatatableType = NgtDatatableType.fixed;

  public saveInputData() { }

  public translande() { }

  public stagger() { }

  public rotate() { }

  public trackPlanesNearAirport() { }

  public trackNearbyPlanes() { }

  public trackCollision() { }
}
