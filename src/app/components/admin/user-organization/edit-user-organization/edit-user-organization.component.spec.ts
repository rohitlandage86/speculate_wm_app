import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserOrganizationComponent } from './edit-user-organization.component';

describe('EditUserOrganizationComponent', () => {
  let component: EditUserOrganizationComponent;
  let fixture: ComponentFixture<EditUserOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserOrganizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
