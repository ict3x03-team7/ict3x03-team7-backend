const User = require('../entities/user.js');
const { convertUUIDFromBuffer } = require('./../../../shared/utils/generateUUID.js');
const { GetUserResponseDTO } = require('../dto/getUserDTO.js');
const { CreateUserResponseDTO } = require('./../dto/createUserDTO.js');
const { UpdatePasswordResponseDTO } = require('./../dto/updatePasswordDTO.js');
const { DeleteUserResponseDTO } = require('./../dto/deleteUserDTO.js');
const { GetAllUsersResponseDTO } = require('./../dto/getAllUsersDTO.js');
const FileMap = require('../../../shared/mapper/fileMap.js');

class UserMap {
  constructor() {}

  static toDomain(userPersistance) {
    const domainUUID = convertUUIDFromBuffer(userPersistance.UserID);
    let studentID;
    let userProfilePicture;
    if (userPersistance.StudentID) {
      studentID = userPersistance.StudentID;
    } else {
      studentID = null;
    }
    if (userPersistance.ProfilePictureID) {
      const mappedProfilePicture = FileMap.toDomain(userPersistance.file);
      userProfilePicture = mappedProfilePicture;
    } else {
      userProfilePicture = null;
    }
    const mapped = new User(
      domainUUID,
      userPersistance.FirstName,
      userPersistance.LastName,
      userPersistance.Email,
      userPersistance.Password,
      userPersistance.Role,
      userPersistance.Gender,
      userPersistance.MobileNumber,
      userPersistance.LastLogin,
      studentID,
      userProfilePicture,
      userPersistance.MFA_QR,
      userPersistance.MFA_Secret,
    );
    if (mapped) {
      return mapped;
    } else {
      throw new Error('User Mapping Failed');
    }
  }

  static toGetUserResponseDTO(mappedUser, profilePictureLink) {
    return new GetUserResponseDTO(
      mappedUser.id,
      mappedUser.firstName,
      mappedUser.lastName,
      mappedUser.email,
      mappedUser.role,
      mappedUser.gender,
      mappedUser.mobileNumber,
      mappedUser.lastLogin,
      mappedUser.studentID,
      profilePictureLink ? profilePictureLink : null,
      mappedUser.mfa_qr,
    );
  }

  static toCreateUserResponseDTO(isSuccess) {
    return new CreateUserResponseDTO(isSuccess);
  }

  static toUpdatePasswordResponseDTO(isSuccess) {
    return new UpdatePasswordResponseDTO(isSuccess);
  }

  static toDeleteUserResponseDTO(isSuccess) {
    return new DeleteUserResponseDTO(isSuccess);
  }

  static toGetAllUsersResponseDTO(mappedUsers) {
    const allUsersDTOArray = mappedUsers.map((user) => {
      return new GetAllUsersResponseDTO(
        user.id,
        user.firstName,
        user.lastName,
        user.email,
        user.role,
        user.gender,
        user.mobileNumber,
        user.lastLogin,
        user.studentID,
        user.profilePictureLink,
      );
    });
    return allUsersDTOArray;
  }
}

module.exports = UserMap;
