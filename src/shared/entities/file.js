import { Entity } from "./entity";

class FileProps {
  constructor(originalFileName, fileSize) {
    this.originalFileName = originalFileName;
    this.fileSize = fileSize;
  }
}

class File extends Entity {
  constructor(id) {
    super(id);
  }
}
