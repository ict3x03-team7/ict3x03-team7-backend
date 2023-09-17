const generateBuffer = require('./../../shared/utils/generateBuffer');

class MockFilePersistance {
  constructor(FileID, OriginalFileName, FileSize) {
    this.FileID = FileID;
    this.OriginalFileName = OriginalFileName;
    this.FileSize = FileSize;
  }
}

const MockFilePersistance1 = new MockFilePersistance(
  generateBuffer('3b4baa37-0ef9-47d0-9302-3b84235aa763'),
  'file.png',
  120,
);

module.exports = MockFilePersistance1;
