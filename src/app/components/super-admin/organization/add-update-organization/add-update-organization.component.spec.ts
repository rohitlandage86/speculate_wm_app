import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateOrganizationComponent } from './add-update-organization.component';

describe('AddUpdateOrganizationComponent', () => {
  let component: AddUpdateOrganizationComponent;
  let fixture: ComponentFixture<AddUpdateOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateOrganizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
