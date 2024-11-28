function isBrowser() {
  return typeof window !== 'undefined';
}

const storage = {
  set(key, value) {
    // eslint-disable-next-line no-unused-expressions
    isBrowser() && localStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    if (isBrowser()) {
      try {
        return JSON.parse(localStorage.getItem(key));
      } catch (e) {
        return undefined;
      }
    }
  },
  remove(key) {
    if (isBrowser()) {
      localStorage.removeItem(key);
    }
  },
  clear() {
    if (isBrowser()) {
      localStorage.clear();
    }
  },
};

export default storage;
