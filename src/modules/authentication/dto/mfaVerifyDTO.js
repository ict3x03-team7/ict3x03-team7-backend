class MFAVerifyRequestDTO {
  constructor(userID, TOTP) {
    this.userID = userID;
    this.TOTP = TOTP;
  }
}

class MFAVerifyResponseDTO {
  constructor(isVerified) {
    this.isVerified = isVerified;
  }
}

module.exports = {
  MFAVerifyRequestDTO,
  MFAVerifyResponseDTO,
};
