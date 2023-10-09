const IFileRepo = require('./../repositories/iFileRepo');

class MockFileRepo extends IFileRepo {
  constructor(mockFiles) {
    super();
    this.mockFiles = mockFiles;
  }

  async getFileById(fileID) {
    for (const file of this.mockFiles) {
      if (file.getID() === fileID) {
        return true;
      }
    }
    return false;
  }
  async addFile(fileToAdd) {
    return fileToAdd;
  }
  async deleteFile(file) {
    return file;
  }
}

module.exports = MockFileRepo;
