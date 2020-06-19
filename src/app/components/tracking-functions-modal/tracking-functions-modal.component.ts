import { Component, SkipSelf, ViewChild } from '@angular/core';
import { NgtModalComponent } from 'ng-tailwind';
import { HomeComponent } from 'src/app/pages/home/home.component';

import { SidenavMenuComponent } from '../sidenav-menu/sidenav-menu.component';

@Component({
  selector: 'tracking-functions-modal',
  templateUrl: './tracking-functions-modal.component.html',
  styleUrls: ['./tracking-functions-modal.component.css']
})
export class TrackingFunctionsModalComponent {
  @ViewChild(NgtModalComponent) ngtModal: NgtModalComponent;

  /** Track Data */
  public minDistance: number;

  constructor(@SkipSelf() private homeComponent: HomeComponent) {
    SidenavMenuComponent.onOpenTrackingFunctionsModal.subscribe(() => {
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

  public trackPlanesNearAirport() { }

  public trackNearbyPlanes() { }

  public trackCollision() { }

  /**
   * Limpa as variaveis de entrada
   */
  private clearInputs() {
    this.minDistance = undefined;
  }
}
