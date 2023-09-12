const Dummy = require("../entities/dummy.js");
const convertBufferToUUID = require("../../../shared/utils/convertBufferToUUID");
const { GetDummyByNameResponseDTO } = require("../dto/getDummyByNameDTO");

class DummyMapper {
  constructor() {}

  static toDomain(dummyPersistance) {
    const domainUUID = convertBufferToUUID(dummyPersistance.DummyID);
    const mapped = new Dummy(domainUUID, dummyPersistance.Name);
    if (mapped) {
      return mapped;
    } else {
      throw new Error("Dummy Mapping Failed");
    }
  }

  static toGetDummyByNameResponseDTO(mappedDummy) {
    return new GetDummyByNameResponseDTO(mappedDummy.id, mappedDummy.Name);
  }
}

module.exports = DummyMapper;
