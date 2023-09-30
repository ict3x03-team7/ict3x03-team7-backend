class MFAEnableRequestDTO {
  constructor(userID) {
    this.userID = userID;
  }
}

class MFAEnableResponseDTO {
  constructor(isEnabled) {
    this.isEnabled = isEnabled;
  }
}

module.exports = {
  MFAEnableRequestDTO,
  MFAEnableResponseDTO,
};
