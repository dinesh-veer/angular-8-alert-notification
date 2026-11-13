// Compatibility layer for Node.js runtime with Angular CLI
const [major, minor] = (process.versions?.node || '').split('.').map(Number);
if (major === 24 && minor < 15) {
  Object.defineProperty(process.versions, 'node', {
    value: '24.15.0',
    configurable: true,
    writable: true,
    enumerable: true
  });
}

