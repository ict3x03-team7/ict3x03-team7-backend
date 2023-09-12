class MockDummyRepo {
  constructor(mockDummies, throwError) {
    this.mockDummies = mockDummies;
    this.throwError = throwError;
    this.numberOfTimesGetDummyByNameIsCalled = 0;
  }

  async getDummyByName(name) {
    this.numberOfTimesGetDummyByNameIsCalled++;
    this.simulateError();
    for (const dummy of this.mockDummies) {
      if (dummy.Name === name) {
        return dummy;
      }
    }
    return null;
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
