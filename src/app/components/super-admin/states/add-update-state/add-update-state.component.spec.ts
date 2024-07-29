import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateStateComponent } from './add-update-state.component';

describe('AddUpdateStateComponent', () => {
  let component: AddUpdateStateComponent;
  let fixture: ComponentFixture<AddUpdateStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
