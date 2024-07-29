import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamblerSidebarComponent } from './gambler-sidebar.component';

describe('GamblerSidebarComponent', () => {
  let component: GamblerSidebarComponent;
  let fixture: ComponentFixture<GamblerSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamblerSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamblerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
