import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAbogadosComponent } from './lista-abogados.component';

describe('ListaAbogadosComponent', () => {
  let component: ListaAbogadosComponent;
  let fixture: ComponentFixture<ListaAbogadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAbogadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaAbogadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
