class MFAVerifyRequestDTO {
  constructor(email, TOTP) {
    this.email = email;
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
