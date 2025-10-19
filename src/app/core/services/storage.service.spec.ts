import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { StorageService } from './storage.service';

describe('StorageService (unit)', () => {
  let svc: StorageService;
  let store: Record<string, string>;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [StorageService] });
    store = {};

    jest.spyOn(localStorage, 'getItem').mockImplementation((k: string) => {
      return (store as any)[k] ?? null;
    });
    jest.spyOn(localStorage, 'setItem').mockImplementation((k: string, v: string) => {
      (store as any)[k] = v;
    });
    jest.spyOn(localStorage, 'removeItem').mockImplementation((k: string) => {
      delete (store as any)[k];
    });
    jest.spyOn(localStorage, 'clear').mockImplementation(() => {
      store = {};
    });

    svc = TestBed.inject(StorageService);
  });

  afterEach(() => jest.restoreAllMocks());

  it('setItem/getItem should store and retrieve JSON values', () => {
    svc.setItem('k1', { a: 1 });
    expect(svc.getItem('k1')).toEqual({ a: 1 });
  });

  it('removeItem and clear should work', () => {
    svc.setItem('x', 2);
    expect(svc.getItem('x')).toBe(2);
    svc.removeItem('x');
    expect(svc.getItem('x')).toBeNull();

    svc.setItem('y', 3);
    svc.clear();
    expect(svc.getItem('y')).toBeNull();
  });

  it('getItem should return null for invalid JSON', () => {
    // simulate malformed value in localStorage
    (store as any)['bad'] = 'not-json';
    expect(svc.getItem('bad')).toBeNull();
  });

  it('should be no-op on server platform', () => {
    TestBed.resetTestingModule();
    // clear any recorded calls on localStorage spies
    jest.clearAllMocks();
    TestBed.configureTestingModule({ providers: [StorageService, { provide: PLATFORM_ID, useValue: 'server' }] });
    const serverSvc = TestBed.inject(StorageService);
    // force not browser just in case
    (serverSvc as any).isBrowser = false;

    serverSvc.setItem('s', 1);
    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(serverSvc.getItem('s')).toBeNull();
  });

  it('setItem should not throw if localStorage.setItem fails', () => {
    (svc as any).isBrowser = true;
    jest.spyOn(localStorage, 'setItem').mockImplementation(() => { throw new Error('fail'); });
    expect(() => svc.setItem('fail', { a: 1 })).not.toThrow();
  });

  it('removeItem should not throw if localStorage.removeItem fails', () => {
    (svc as any).isBrowser = true;
    jest.spyOn(localStorage, 'removeItem').mockImplementation(() => { throw new Error('fail'); });
    expect(() => svc.removeItem('fail')).not.toThrow();
  });

  it('clear should not throw if localStorage.clear fails', () => {
    (svc as any).isBrowser = true;
    jest.spyOn(localStorage, 'clear').mockImplementation(() => { throw new Error('fail'); });
    expect(() => svc.clear()).not.toThrow();
  });

  it('setItem/getItem/removeItem/clear should be no-op if not browser', () => {
    (svc as any).isBrowser = false;
    expect(() => svc.setItem('x', 1)).not.toThrow();
    expect(svc.getItem('x')).toBeNull();
    expect(() => svc.removeItem('x')).not.toThrow();
    expect(() => svc.clear()).not.toThrow();
  });
});
