class MFALoginRequestDTO {
  constructor(userID, TOTP) {
    this.userID = userID;
    this.TOTP = TOTP;
  }
}

class MFALoginResponseDTO {
  constructor(userID, role) {
    this.userID = userID;
    this.role = role;
  }
}

module.exports = { MFALoginRequestDTO, MFALoginResponseDTO };
