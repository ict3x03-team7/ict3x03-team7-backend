class MFALoginRequestDTO {
  constructor(userID, TOTP) {
    this.userID = userID;
    this.TOTP = TOTP;
  }
}

class MFALoginResponseDTO {
  constructor(isVerified) {
    this.isVerified = isVerified;
  }
}

module.exports = { MFALoginRequestDTO, MFALoginResponseDTO };
