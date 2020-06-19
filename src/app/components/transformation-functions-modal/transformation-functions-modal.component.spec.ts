import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformationFunctionsModalComponent } from './transformation-functions-modal.component';

describe('TransformationFunctionsModalComponent', () => {
  let component: TransformationFunctionsModalComponent;
  let fixture: ComponentFixture<TransformationFunctionsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransformationFunctionsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformationFunctionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
