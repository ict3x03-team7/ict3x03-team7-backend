const AuthUser = require('../entities/authUser');
const { convertUUIDFromBuffer } = require('./../../../shared/utils/generateUUID.js');
const FileMap = require('../../../shared/mapper/fileMap.js');
const { LoginResponseDTO } = require('./../dto/loginDTO');
const { MFALoginResponseDTO } = require('./../dto/mfaLoginDTO');

class AuthUserMap {
  constructor() {}

  static toDomain(authUserPersistance) {
    const domainUUID = convertUUIDFromBuffer(authUserPersistance.UserID);
    let userProfilePicture;
    if (authUserPersistance.ProfilePictureID) {
      const mappedProfilePicture = FileMap.toDomain(authUserPersistance.file);
      userProfilePicture = mappedProfilePicture;
    } else {
      userProfilePicture = null;
    }
    const mapped = new AuthUser(
      domainUUID,
      authUserPersistance.FirstName,
      authUserPersistance.LastName,
      authUserPersistance.Email,
      authUserPersistance.Password,
      authUserPersistance.Role,
      authUserPersistance.LastLogin,
      userProfilePicture,
      authUserPersistance.MFA_QR,
      authUserPersistance.MFA_Secret,
    );
    if (mapped) {
      return mapped;
    } else {
      throw new Error('Auth User Mapping Failed');
    }
  }

  static toLoginResponseDTO(mappedUser) {
    return new LoginResponseDTO(mappedUser.id, mappedUser.role);
  }

  static toMFALoginResponseDTO(isVerified) {
    return new MFALoginResponseDTO(isVerified);
  }
}

module.exports = AuthUserMap;
