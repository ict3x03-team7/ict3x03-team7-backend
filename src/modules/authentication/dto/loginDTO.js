class LoginRequestDTO {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}

class LoginResponseDTO {
  constructor(userID, role) {
    this.userID = userID;
    this.role = role;
  }
}

module.exports = { LoginRequestDTO, LoginResponseDTO };
