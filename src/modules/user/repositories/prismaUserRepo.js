const generateBuffer = require('../../../shared/utils/generateBuffer');
const { convertUUIDToBuffer } = require('./../../../shared/utils/generateUUID');
const UserMap = require('../mapper/userMap.js');
const IUserRepo = require('./iUserRepo');

class PrismaUserRepo extends IUserRepo {
  constructor(prisma) {
    super();
    this.prisma = prisma;
  }

  async getUserByID(userID) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          UserID: convertUUIDToBuffer(userID),
        },
        include: {
          file: true,
        },
      });
      let mappedUser;
      if (user) {
        mappedUser = UserMap.toDomain(user);
        return mappedUser;
      }
      return null;
    } catch (err) {
      console.error(err);
      throw new Error('Server Error');
    }
  }

  async addUser(
    userID,
    firstName,
    lastName,
    email,
    hashedPassword,
    role,
    gender,
    mobileNumber,
    studentID,
    profilePictureID,
  ) {
    const data = {
      UserID: convertUUIDToBuffer(userID),
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Role: role,
      Gender: gender,
      MobileNumber: mobileNumber,
      StudentID: studentID,
      ProfilePictureID: convertUUIDToBuffer(profilePictureID),
      Password: hashedPassword,
    };

    try {
      const addedUser = await this.prisma.user.create({
        data,
      });
      return true;
    } catch (err) {
      console.error(err);
      throw new Error('Server Error');
    }
  }
  async updatePassword(userID, newHashedPassword) {
    try {
      const user = await this.prisma.user.update({
        where: {
          UserID: convertUUIDToBuffer(userID),
        },
        include: {
          file: true,
        },
        data: {
          Password: newHashedPassword,
        },
      });
      let mappedUser;
      if (user) {
        mappedUser = UserMap.toDomain(user);
        return mappedUser;
      }
      return null;
    } catch (err) {
      console.error(err);
      throw new Error('Server Error');
    }
  }
}

module.exports = PrismaUserRepo;
