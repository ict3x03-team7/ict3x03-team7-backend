const IFileRepo = require('./../repositories/iFileRepo');

class MockFileRepo extends IFileRepo {
  constructor(prisma) {
    super();
  }

  async getFileById(fileID) {
    return null;
  }
  async addFile(fileToAdd) {
    return null;
  }
  async deleteFile(file) {
    return null;
  }
}

module.exports = MockFileRepo;
