import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateConfigurationComponent } from './add-update-configuration.component';

describe('AddUpdateConfigurationComponent', () => {
  let component: AddUpdateConfigurationComponent;
  let fixture: ComponentFixture<AddUpdateConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
