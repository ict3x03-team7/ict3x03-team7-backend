const Dummy = require('../entities/dummy.js');
const { convertUUIDFromBuffer } = require('./../../../shared/utils/generateUUID.js');
const { GetDummyByNameResponseDTO } = require('../dto/getDummyByNameDTO');
const generateBuffer = require('./../../../shared/utils/generateBuffer.js');

class DummyMapper {
  constructor() {}

  static toDomain(dummyPersistance) {
    const domainUUID = convertUUIDFromBuffer(dummyPersistance.DummyID);
    const mapped = new Dummy(domainUUID, dummyPersistance.Name);
    if (mapped) {
      return mapped;
    } else {
      throw new Error('Dummy Mapping Failed');
    }
  }

  static toGetDummyByNameResponseDTO(mappedDummy) {
    return new GetDummyByNameResponseDTO(mappedDummy.id, mappedDummy.Name);
  }
}

module.exports = DummyMapper;
