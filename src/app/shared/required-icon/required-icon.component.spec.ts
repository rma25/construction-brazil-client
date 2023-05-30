import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredIconComponent } from './required-icon.component';

describe('RequiredIconComponent', () => {
  let component: RequiredIconComponent;
  let fixture: ComponentFixture<RequiredIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequiredIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiredIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
