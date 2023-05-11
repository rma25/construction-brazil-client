import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminEnderecoComponent } from './edit-admin-endereco.component';

describe('EditAdminEnderecoComponent', () => {
  let component: EditAdminEnderecoComponent;
  let fixture: ComponentFixture<EditAdminEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdminEnderecoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdminEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
