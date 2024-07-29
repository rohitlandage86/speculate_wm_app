import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeculateDashboardComponent } from './speculate-dashboard.component';

describe('SpeculateDashboardComponent', () => {
  let component: SpeculateDashboardComponent;
  let fixture: ComponentFixture<SpeculateDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeculateDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeculateDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
