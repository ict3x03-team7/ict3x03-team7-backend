export class GetDummyByNameRequestDTO {
  constructor(dummyName) {
    this.dummyName = dummyName;
  }
}

export class GetDummyByNameResponseDTO {
  constructor(dummyID, dummyName) {
    this.dummyID = dummyID;
    this.dummyName = dummyName;
  }
}
