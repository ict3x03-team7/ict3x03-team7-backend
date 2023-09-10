class GetDummyByNameRequestDTO {
  constructor(dummyName) {
    this.dummyName = dummyName;
  }
}

class GetDummyByNameResponseDTO {
  constructor(dummyID, dummyName) {
    this.dummyID = dummyID;
    this.dummyName = dummyName;
  }
}

module.exports = { GetDummyByNameRequestDTO, GetDummyByNameResponseDTO };
