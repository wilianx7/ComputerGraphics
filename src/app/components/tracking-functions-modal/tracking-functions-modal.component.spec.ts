import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingFunctionsModalComponent } from './tracking-functions-modal.component';

describe('TrackingFunctionsModalComponent', () => {
  let component: TrackingFunctionsModalComponent;
  let fixture: ComponentFixture<TrackingFunctionsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingFunctionsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingFunctionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
