const { GetSessionDetailsRequestDTO } = require('./../../dto/getSessionDetailsDTO');
const dotenv = require('dotenv');
dotenv.config();

class GetSessionDetailsController {
  constructor(getSessionDetails) {
    this.GetSessionDetails = getSessionDetails;
  }

  async execute(req, res) {
    const requestDTO = new GetSessionDetailsRequestDTO(req);
    try {
      const result = await this.GetSessionDetails.execute(requestDTO);
      if (result.Error) {
        res.status(400).json({ result });
      } else {
        res.status(200).json({ result });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Error: 'Server Error' });
    }
  }
}

module.exports = GetSessionDetailsController;
