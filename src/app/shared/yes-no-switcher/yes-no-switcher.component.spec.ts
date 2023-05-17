import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YesNoSwitcherComponent } from './yes-no-switcher.component';

describe('YesNoSwitcherComponent', () => {
  let component: YesNoSwitcherComponent;
  let fixture: ComponentFixture<YesNoSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YesNoSwitcherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YesNoSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
