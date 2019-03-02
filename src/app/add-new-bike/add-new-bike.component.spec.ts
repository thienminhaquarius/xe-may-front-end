import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBikeComponent } from './add-new-bike.component';

describe('AddNewBikeComponent', () => {
  let component: AddNewBikeComponent;
  let fixture: ComponentFixture<AddNewBikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewBikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewBikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
