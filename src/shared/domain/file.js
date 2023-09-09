import { Entity } from "./entity";

class FileProps {
  constructor(originalFileName, fileSize) {
    this.originalFileName = originalFileName;
    this.fileSize = fileSize;
  }
}

class File extends Entity {
  constructor(props, id) {
    super(props, id);
  }
}
