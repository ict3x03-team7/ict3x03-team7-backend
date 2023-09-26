class LoginRequestDTO {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}

class LoginResponseDTO {
  constructor(isSuccess) {
    this.isSuccess = isSuccess;
  }
}

module.exports = { LoginRequestDTO, LoginResponseDTO };
