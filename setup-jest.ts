// Use jest-preset-angular setup which initializes the Angular testing environment
// Use the setup helper from jest-preset-angular v15 to initialize the Angular test env
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

// initialize the Zone-based Angular test environment (similar to old setup-jest)
setupZoneTestEnv();

// Provide Zone.js testing support (jest-preset-angular normally sets this up, but keep explicit import)
import 'zone.js';
import 'zone.js/testing';

// Shim minimal Jasmine API used by some specs (createSpyObj, spyOn) to map to Jest
if (!(global as any).jasmine) {
  const makeJasmineSpy = (impl?: Function) => {
    const spy: any = jest.fn(impl as any);
    spy.and = {
      returnValue: (v: any) => {
        spy.mockImplementation(() => v);
        return spy;
      },
      callFake: (fn: Function) => {
        spy.mockImplementation(fn as any);
        return spy;
      },
    };
    spy.calls = {
      argsFor: (i: number) => spy.mock.calls[i],
    };
    return spy;
  };

  (global as any).jasmine = {
    createSpy: (_name: string) => makeJasmineSpy(),
    createSpyObj: (_baseName: string, methods: string[]) => {
      const obj: Record<string, any> = {};
      methods.forEach((m) => (obj[m] = makeJasmineSpy()));
      return obj;
    },
  };
}

// Provide spyOn global (maps to jest.spyOn for objects)
if (!(global as any).spyOn) {
  (global as any).spyOn = function (obj: any, methodName: string) {
    // Create a jest spy for the property and attach jasmine-like `.and` helpers
    const original = obj[methodName];
    const jestSpy: any = jest.spyOn(obj, methodName as any);
    jestSpy.and = {
      returnValue: (v: any) => {
        jestSpy.mockImplementation(() => v);
        return jestSpy;
      },
      callFake: (fn: Function) => {
        jestSpy.mockImplementation(fn as any);
        return jestSpy;
      },
    };
    return jestSpy;
  };
}

// Mock do localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock do window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock do IntersectionObserver
class MockIntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
}

Object.defineProperty(global, 'IntersectionObserver', {
  value: MockIntersectionObserver,
  writable: true,
});
