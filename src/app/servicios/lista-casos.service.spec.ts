import { TestBed } from '@angular/core/testing';

import { ListaCasosService } from './lista-casos.service';

describe('ListaCasosService', () => {
  let service: ListaCasosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaCasosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
