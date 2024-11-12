import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosAdminCuentaComponent } from './datos-admin-cuenta.component';

describe('DatosAdminCuentaComponent', () => {
  let component: DatosAdminCuentaComponent;
  let fixture: ComponentFixture<DatosAdminCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosAdminCuentaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosAdminCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
