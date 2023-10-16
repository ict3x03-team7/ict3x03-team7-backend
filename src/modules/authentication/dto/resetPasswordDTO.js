class ResetPasswordRequestDTO {
  constructor(email, newPassword) {
    this.email = email;
    this.newPassword = newPassword;
  }
}

class ResetPasswordResponseDTO {
  constructor(isSuccess) {
    this.isSuccess = isSuccess;
  }
}

module.exports = {
  ResetPasswordRequestDTO,
  ResetPasswordResponseDTO,
};
