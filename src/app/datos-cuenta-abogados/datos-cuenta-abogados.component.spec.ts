import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosCuentaAbogadosComponent } from './datos-cuenta-abogados.component';

describe('DatosCuentaAbogadosComponent', () => {
  let component: DatosCuentaAbogadosComponent;
  let fixture: ComponentFixture<DatosCuentaAbogadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosCuentaAbogadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosCuentaAbogadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
