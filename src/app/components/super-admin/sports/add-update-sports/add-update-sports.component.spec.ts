import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateSportsComponent } from './add-update-sports.component';

describe('AddUpdateSportsComponent', () => {
  let component: AddUpdateSportsComponent;
  let fixture: ComponentFixture<AddUpdateSportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateSportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateSportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
