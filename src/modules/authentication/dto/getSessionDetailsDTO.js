class GetSessionDetailsRequestDTO {
  constructor(req) {
    this.req = req;
  }
}

class GetSessionDetailsResponseDTO {
  constructor(userID, role) {
    this.userID = userID;
    this.role = role;
  }
}

module.exports = { GetSessionDetailsRequestDTO, GetSessionDetailsResponseDTO };
