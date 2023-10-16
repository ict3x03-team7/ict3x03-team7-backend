const Entity = require('../../../shared/entities/entity');

class AuthUser extends Entity {
  constructor(
    id,
    firstName,
    lastName,
    email,
    password,
    role,
    lastLogin,
    profilePicture,
    mfa_qr,
    mfa_secret,
    locked,
  ) {
    super(id);
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.role = role;
    this.lastLogin = lastLogin;
    this.profilePicture = profilePicture;
    this.mfa_qr = mfa_qr;
    this.mfa_secret = mfa_secret;
    this.locked = locked;
  }

  isAdmin() {
    if (this.role == 'Admin') {
      return true;
    }
    return false;
  }

  getProfilePicture() {
    return this.profilePicture;
  }

  getEmail() {
    return this.email;
  }
}

module.exports = AuthUser;
