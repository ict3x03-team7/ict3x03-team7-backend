class MockSessionService {
  constructor() {}

  async get(key) {
    return null;
  }
  set(key, value) {
    return null;
  }
  expire(key, duration) {
    return null;
  }
  del(key) {
    return null;
  }
}

module.exports = MockSessionService;
