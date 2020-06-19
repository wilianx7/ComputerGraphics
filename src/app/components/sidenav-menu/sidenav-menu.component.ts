import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.css']
})
export class SidenavMenuComponent {
  @Output() public static onOpenInputDataModal: EventEmitter<any> = new EventEmitter();
  @Output() public static onOpenTransformationFunctionsModal: EventEmitter<any> = new EventEmitter();
  @Output() public static onOpenTrackingFunctionsModal: EventEmitter<any> = new EventEmitter();

  public menus = [
    {
      name: 'Entrada de Dados',
      icon: 'hard-drive.svg',
      action: () => {
        SidenavMenuComponent.onOpenInputDataModal.emit();
      }
    },
    {
      name: 'Funções de Transformação',
      icon: 'screen-full.svg',
      action: () => {
        SidenavMenuComponent.onOpenTransformationFunctionsModal.emit();
      }
    },
    {
      name: 'Funções de Rastreamento',
      icon: 'radar.svg',
      action: () => {
        SidenavMenuComponent.onOpenTrackingFunctionsModal.emit();
      }
    },
  ];
}
