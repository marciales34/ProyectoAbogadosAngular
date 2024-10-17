import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListaUsuariosComponent } from './admin-lista-usuarios.component';

describe('AdminListaUsuariosComponent', () => {
  let component: AdminListaUsuariosComponent;
  let fixture: ComponentFixture<AdminListaUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminListaUsuariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminListaUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
