import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGamblerUserComponent } from './view-gambler-user.component';

describe('ViewGamblerUserComponent', () => {
  let component: ViewGamblerUserComponent;
  let fixture: ComponentFixture<ViewGamblerUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGamblerUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewGamblerUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
