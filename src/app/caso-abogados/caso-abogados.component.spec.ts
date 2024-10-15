import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasoAbogadosComponent } from './caso-abogados.component';

describe('CasoAbogadosComponent', () => {
  let component: CasoAbogadosComponent;
  let fixture: ComponentFixture<CasoAbogadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasoAbogadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CasoAbogadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
