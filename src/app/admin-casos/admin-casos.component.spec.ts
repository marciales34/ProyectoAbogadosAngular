import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCasosComponent } from './admin-casos.component';

describe('AdminCasosComponent', () => {
  let component: AdminCasosComponent;
  let fixture: ComponentFixture<AdminCasosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCasosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCasosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
