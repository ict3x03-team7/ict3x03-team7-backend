import DummyMapper from "../../mapper/dummyMap.js";

export class GetDummyByName {
  constructor(dummyRepo) {
    this.dummyRepo = dummyRepo;
  }

  async execute(input) {
    const dummyName = input.dummyName;
    // console.log(dummyName);

    let dummyResult;

    try {
      dummyResult = await this.dummyRepo.getDummy(dummyName);
      const responseDTO = DummyMapper.toGetDummyByNameResponseDTO(dummyResult);
      return responseDTO;
    } catch (err) {
      console.error(err);
      resizeBy.status(500).json({ Error: "Server Error" });
    }
  }
}
