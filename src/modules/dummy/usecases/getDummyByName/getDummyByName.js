const DummyMapper = require("../../mapper/dummyMap");

class GetDummyByName {
  constructor(dummyRepo) {
    this.dummyRepo = dummyRepo;
  }

  async execute(input) {
    const dummyName = input.dummyName;
    // console.log(dummyName);

    let dummyResult;

    try {
      dummyResult = await this.dummyRepo.getDummyByName(dummyName);
      // console.log(dummyResult);
      if (dummyResult) {
        const responseDTO =
          DummyMapper.toGetDummyByNameResponseDTO(dummyResult);
        return responseDTO;
      }
    } catch (err) {
      console.error(err);
      resizeBy.status(500).json({ Error: "Server Error" });
    }
  }
}

module.exports = GetDummyByName;
