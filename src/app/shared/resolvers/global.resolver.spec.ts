import { TestBed } from '@angular/core/testing';

import { GlobalResolver } from './global.resolver';

describe('GlobalResolver', () => {
  let resolver: GlobalResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GlobalResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
