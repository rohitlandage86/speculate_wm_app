import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdatePeriodComponent } from './add-update-period.component';

describe('AddUpdatePeriodComponent', () => {
  let component: AddUpdatePeriodComponent;
  let fixture: ComponentFixture<AddUpdatePeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdatePeriodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdatePeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
