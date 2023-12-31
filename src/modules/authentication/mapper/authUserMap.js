const AuthUser = require('../entities/authUser');
const { convertUUIDFromBuffer } = require('./../../../shared/utils/generateUUID.js');
const FileMap = require('../../../shared/mapper/fileMap.js');
const { LoginResponseDTO } = require('./../dto/loginDTO');
const { MFAVerifyResponseDTO } = require('./../dto/mfaVerifyDTO');
const { MFAEnableResponseDTO } = require('./../dto/mfaEnableDTO');
const { VerifyEmailResponseDTO } = require('./../dto/verifyEmailDTO');
const { ResetPasswordResponseDTO } = require('../dto/resetPasswordDTO');
const { GetSessionDetailsResponseDTO } = require('../dto/getSessionDetailsDTO');

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
      authUserPersistance.Locked,
    );
    if (mapped) {
      return mapped;
    } else {
      throw new Error('Auth User Mapping Failed');
    }
  }

  static toLoginResponseDTO(isSuccess, mfaEnabled) {
    return new LoginResponseDTO(isSuccess, mfaEnabled);
  }

  static toMFAVerifyResponseDTO(isVerified) {
    return new MFAVerifyResponseDTO(isVerified);
  }

  static toMFAEnableResponseDTO(isEnabled) {
    return new MFAEnableResponseDTO(isEnabled);
  }

  static toVerifyEmailResponseDTO(isVerified, mfaEnabled) {
    return new VerifyEmailResponseDTO(isVerified, mfaEnabled);
  }

  static toResetPasswordResponseDTO(isSuccess) {
    return new ResetPasswordResponseDTO(isSuccess);
  }

  static toGetSessionDetailsResponseDTO(userID, role) {
    return new GetSessionDetailsResponseDTO(userID, role);
  }
}

module.exports = AuthUserMap;
