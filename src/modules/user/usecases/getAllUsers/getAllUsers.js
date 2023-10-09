const isValidUUIDv4 = require('../../../../shared/utils/validateUUID');
const {
  generateUUID,
  convertUUIDToBuffer,
  convertUUIDFromBuffer,
} = require('./../../../../shared/utils/generateUUID');
const UserMap = require('./../../mapper/userMap');

class GetAllUsers {
  constructor(userRepo, fileService) {
    this.UserRepo = userRepo;
    this.FileService = fileService;
  }

  async execute(input) {
    // if (!isValidUUIDv4(input.userID)) {
    //   return { Error: 'Invalid User ID' };
    // }
    let userResult;
    let profilePictureLink;
    try {
      userResult = await this.UserRepo.getAllUsers();
      if (userResult == null) return { Error: 'Users Not Found' };

      const mappedUsers = userResult.map(async (user) => {
        let profilePictureLink;

        if (user.profilePicture) {
          profilePictureLink = await this.FileService.getFile(user.profilePicture);
        } else {
          profilePictureLink = null;
        }

        return {
          ...user,
          profilePictureLink,
        };
      });

      const resolvedMappedUsers = await Promise.all(mappedUsers);

      const responseDTO = UserMap.toGetAllUsersResponseDTO(resolvedMappedUsers);
      return responseDTO;
    } catch (err) {
      console.error(err);
      throw new Error('Server/Database is down');
    }
  }
}

module.exports = GetAllUsers;
