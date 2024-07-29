import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateOrganizationUserComponent } from './add-update-organization-user.component';

describe('AddUpdateOrganizationUserComponent', () => {
  let component: AddUpdateOrganizationUserComponent;
  let fixture: ComponentFixture<AddUpdateOrganizationUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateOrganizationUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateOrganizationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
