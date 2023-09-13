const Entity = require('./entity');

class File extends Entity {
  constructor(id, originalFileName, fileSize) {
    super(id);
    this.originalFileName = originalFileName;
    this.fileSize = fileSize;
  }

  getOriginalFileName() {
    return this.originalFileName;
  }

  getFileSize() {
    return this.fileSize;
  }
}

module.exports = File;
