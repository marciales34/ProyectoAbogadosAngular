import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListaAComponent } from './admin-lista-a.component';

describe('AdminListaAComponent', () => {
  let component: AdminListaAComponent;
  let fixture: ComponentFixture<AdminListaAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminListaAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminListaAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
