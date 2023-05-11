import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminContatoComponent } from './edit-admin-contato.component';

describe('EditAdminContatoComponent', () => {
  let component: EditAdminContatoComponent;
  let fixture: ComponentFixture<EditAdminContatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdminContatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdminContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
