import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCrearUsuarioComponent } from './admin-crear-usuario.component';

describe('AdminCrearUsuarioComponent', () => {
  let component: AdminCrearUsuarioComponent;
  let fixture: ComponentFixture<AdminCrearUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCrearUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCrearUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
