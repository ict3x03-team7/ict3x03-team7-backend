import { Dummy } from "../entities/dummy.js";
import convertBufferToUUID from "../../../shared/utils/convertBufferToUUID.js";
import { GetDummyByNameResponseDTO } from "../dto/getDummyByNameDTO.js";

export default class DummyMapper {
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
