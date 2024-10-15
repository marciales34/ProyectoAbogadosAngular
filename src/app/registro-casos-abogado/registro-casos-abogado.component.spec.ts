import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCasosAbogadoComponent } from './registro-casos-abogado.component';

describe('RegistroCasosAbogadoComponent', () => {
  let component: RegistroCasosAbogadoComponent;
  let fixture: ComponentFixture<RegistroCasosAbogadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroCasosAbogadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroCasosAbogadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
