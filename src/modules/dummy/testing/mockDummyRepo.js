class MockDummyRepo {
  constructor(mockDummies) {
    this.mockDummies = mockDummies;
    this.throwError = false;
    this.numberOfTimesGetDummyByNameIsCalled = 0;
  }

  async getDummyByName(name) {
    this.numberOfTimesGetDummyByNameIsCalled++;
    this.simulateError();
    for (dummy in this.mockDummies) {
      if (dummy.Name == name) {
        return dummy;
      } else {
        return null;
      }
    }
  }
  simulateError() {
    if (this.throwError) {
      throw new Error("Simulated error from repository.");
    }
  }
  getNumberOfTimesGetDummyByNameIsCalled() {
    return this.numberOfTimesGetDummyByNameIsCalled;
  }
}

module.exports = MockDummyRepo;
