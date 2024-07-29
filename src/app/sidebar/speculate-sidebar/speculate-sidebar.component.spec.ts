import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeculateSidebarComponent } from './speculate-sidebar.component';

describe('SpeculateSidebarComponent', () => {
  let component: SpeculateSidebarComponent;
  let fixture: ComponentFixture<SpeculateSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeculateSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeculateSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
