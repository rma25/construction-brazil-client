import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminInformacoesGeraisComponent } from './edit-admin-informacoes-gerais.component';

describe('EditAdminInformacoesGeraisComponent', () => {
  let component: EditAdminInformacoesGeraisComponent;
  let fixture: ComponentFixture<EditAdminInformacoesGeraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdminInformacoesGeraisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdminInformacoesGeraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
