import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacoesGeraisComponent } from './informacoes-gerais.component';

describe('InformacoesGeraisComponent', () => {
  let component: InformacoesGeraisComponent;
  let fixture: ComponentFixture<InformacoesGeraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacoesGeraisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacoesGeraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
