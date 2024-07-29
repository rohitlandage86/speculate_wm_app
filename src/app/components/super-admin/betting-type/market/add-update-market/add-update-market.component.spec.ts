import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateMarketComponent } from './add-update-market.component';

describe('AddUpdateMarketComponent', () => {
  let component: AddUpdateMarketComponent;
  let fixture: ComponentFixture<AddUpdateMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateMarketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
