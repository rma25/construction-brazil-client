import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfissionaisDeRodeioRowComponent } from './profissionais-de-rodeio-row.component';

describe('ProfissionaisDeRodeioRowComponent', () => {
  let component: ProfissionaisDeRodeioRowComponent;
  let fixture: ComponentFixture<ProfissionaisDeRodeioRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfissionaisDeRodeioRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfissionaisDeRodeioRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
