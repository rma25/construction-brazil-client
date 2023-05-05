import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractBaseComponent } from './abstract-base.component';

describe('AbstractBaseComponent', () => {
  let component: AbstractBaseComponent;
  let fixture: ComponentFixture<AbstractBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbstractBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
