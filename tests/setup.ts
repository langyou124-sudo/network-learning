import '@testing-library/jest-dom/vitest';

// Mock localStorage for Node environment
class LocalStorageMock {
  private store: Record<string, string> = {};

  getItem(key: string) {
    return this.store[key] ?? null;
  }

  setItem(key: string, value: string) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }

  clear() {
    this.store = {};
  }
}

Object.defineProperty(globalThis, 'localStorage', {
  value: new LocalStorageMock(),
});

// Mock URL.createObjectURL / revokeObjectURL
Object.defineProperty(globalThis.URL, 'createObjectURL', {
  value: () => 'blob:mock',
});
Object.defineProperty(globalThis.URL, 'revokeObjectURL', {
  value: () => {},
});
