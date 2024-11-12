import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCasosAdministradorComponent } from './lista-casos-administrador.component';

describe('ListaCasosAdministradorComponent', () => {
  let component: ListaCasosAdministradorComponent;
  let fixture: ComponentFixture<ListaCasosAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCasosAdministradorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaCasosAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
