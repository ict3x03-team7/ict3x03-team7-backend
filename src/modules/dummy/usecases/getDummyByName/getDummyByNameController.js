const {
  GetDummyByNameRequestDTO,
  GetDummyByNameResponseDTO,
} = require("../../dto/getDummyByNameDTO.js");

class GetDummyByNameController {
  constructor(GetDummyByName) {
    this.GetDummyByName = GetDummyByName;
  }

  async execute(req, res) {
    const name = req.params.name;

    const requestDTO = new GetDummyByNameRequestDTO(req.params.name);
    // console.log(requestDTO);

    try {
      const result = await this.GetDummyByName.execute(requestDTO);
      // console.log("result", result);
      if (result) {
        res.status(200).json({ result });
      } else if (result == null) {
        res.status(400).json({ Error: "Dummy not found" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Error: "Server Error" });
    }
  }
}

module.exports = GetDummyByNameController;
