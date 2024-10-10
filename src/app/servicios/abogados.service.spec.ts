import { TestBed } from '@angular/core/testing';

import { AbogadosService } from './abogados.service';

describe('AbogadosService', () => {
  let service: AbogadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbogadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
