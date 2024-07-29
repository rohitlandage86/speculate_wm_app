import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrganizationComponent } from './user-organization.component';

describe('UserOrganizationComponent', () => {
  let component: UserOrganizationComponent;
  let fixture: ComponentFixture<UserOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserOrganizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
