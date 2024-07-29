import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateOutcomeComponent } from './add-update-outcome.component';

describe('AddUpdateOutcomeComponent', () => {
  let component: AddUpdateOutcomeComponent;
  let fixture: ComponentFixture<AddUpdateOutcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateOutcomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
