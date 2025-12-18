const { JSDOM } = require('jsdom');
const path = require('path');
const renderDOM = async (file) => {
  const filePath = path.resolve(__dirname, file);
  const dom = await JSDOM.fromFile(filePath, {
    runScripts: 'dangerously',
    resources: 'usable',
    beforeParse(window) {
      // :white_tick: fetch stub (prevents fetch errors during script load)
      window.fetch = window.fetch || jest.fn(() =>
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({ token: 'fake-token' })
        })
      );
      // :white_tick: localStorage stub (prevents ReferenceError)
      window.localStorage = window.localStorage || {
        _store: {},
        setItem(key, value) {
          this._store[key] = String(value);
        },
        getItem(key) {
          return this._store.hasOwnProperty(key)
            ? this._store[key]
            : null;
        },
        removeItem(key) {
          delete this._store[key];
        },
        clear() {
          this._store = {};
        }
      };
    }
  });
  // Wait for scripts to finish loading
  await new Promise(resolve => {
    dom.window.addEventListener('load', resolve);
  });
  return dom;
};
module.exports = { renderDOM };