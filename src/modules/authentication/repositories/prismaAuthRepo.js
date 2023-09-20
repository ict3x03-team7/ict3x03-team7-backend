const generateBuffer = require('../../../shared/utils/generateBuffer');
const { convertUUIDToBuffer } = require('./../../../shared/utils/generateUUID');
const authUserMap = require('../mapper/authUserMap');

class PrismaAuthRepo {
  constructor(prisma) {
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
        mappedUser = authUserMap.toDomain(user);
        return mappedUser;
      }
      return null;
    } catch (err) {
      console.error(err);
      throw new Error('Server Error');
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          Email: email,
        },
        include: {
          file: true,
        },
      });
      let mappedUser;
      if (user) {
        mappedUser = authUserMap.toDomain(user);
        return mappedUser;
      }
      return null;
    } catch (err) {
      console.error(err);
      throw new Error('Server Error');
    }
  }
}

module.exports = PrismaAuthRepo;
