import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamblerUserComponent } from './gambler-user.component';

describe('GamblerUserComponent', () => {
  let component: GamblerUserComponent;
  let fixture: ComponentFixture<GamblerUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamblerUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamblerUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
