class UnlockUserRequestDTO {
  constructor(userID) {
    this.userID = userID;
  }
}

class UnlockUserResponseDTO {
  constructor(isUnlocked) {
    this.isUnlocked = isUnlocked;
  }
}

module.exports = { UnlockUserRequestDTO, UnlockUserResponseDTO };
