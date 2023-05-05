import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfissionaisDeRodeioComponent } from './profissionais-de-rodeio.component';

describe('ProfissionaisDeRodeioComponent', () => {
  let component: ProfissionaisDeRodeioComponent;
  let fixture: ComponentFixture<ProfissionaisDeRodeioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfissionaisDeRodeioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfissionaisDeRodeioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
