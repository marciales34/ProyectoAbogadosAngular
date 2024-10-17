import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAbogadosComponent } from './login-abogados.component';

describe('LoginAbogadosComponent', () => {
  let component: LoginAbogadosComponent;
  let fixture: ComponentFixture<LoginAbogadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginAbogadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginAbogadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
