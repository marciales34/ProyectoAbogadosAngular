import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoAbogadosComponent } from './contacto-abogados.component';

describe('ContactoAbogadosComponent', () => {
  let component: ContactoAbogadosComponent;
  let fixture: ComponentFixture<ContactoAbogadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactoAbogadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactoAbogadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
