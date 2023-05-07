import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineLoadingIconComponent } from './inline-loading-icon.component';

describe('InlineLoadingIconComponent', () => {
  let component: InlineLoadingIconComponent;
  let fixture: ComponentFixture<InlineLoadingIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlineLoadingIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineLoadingIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
