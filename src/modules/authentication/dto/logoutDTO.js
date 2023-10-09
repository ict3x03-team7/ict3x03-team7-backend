class LogoutRequestDTO {
  constructor(userID, sessionID) {
    this.userID = userID;
    this.sessionID = sessionID;
  }
}

class LogoutResponseDTO {
  constructor(isSuccess) {
    this.isSuccess = isSuccess;
  }
}

module.exports = { LogoutRequestDTO, LogoutResponseDTO };
