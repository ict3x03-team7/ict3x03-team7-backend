class LoginRequestDTO {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}

class LoginResponseDTO {
  constructor(isSuccess, mfaEnabled) {
    this.isSuccess = isSuccess;
    this.mfaEnabled = mfaEnabled;
  }
}

module.exports = { LoginRequestDTO, LoginResponseDTO };
