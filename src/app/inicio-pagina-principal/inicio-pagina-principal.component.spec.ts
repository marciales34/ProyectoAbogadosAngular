import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioPaginaPrincipalComponent } from './inicio-pagina-principal.component';

describe('InicioPaginaPrincipalComponent', () => {
  let component: InicioPaginaPrincipalComponent;
  let fixture: ComponentFixture<InicioPaginaPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioPaginaPrincipalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InicioPaginaPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
