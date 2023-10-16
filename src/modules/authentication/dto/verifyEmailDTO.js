class VerifyEmailRequestDTO {
  constructor(email) {
    this.email = email;
  }
}

class VerifyEmailResponseDTO {
  constructor(isVerified, mfaEnabled) {
    this.isVerified = isVerified;
    this.mfaEnabled = mfaEnabled;
  }
}

module.exports = {
  VerifyEmailRequestDTO,
  VerifyEmailResponseDTO,
};
