import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListaClientesComponent } from './admin-lista-c.component';

describe('AdminListaCComponent', () => {
  let component: AdminListaClientesComponent;
  let fixture: ComponentFixture<AdminListaClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminListaClientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminListaClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
