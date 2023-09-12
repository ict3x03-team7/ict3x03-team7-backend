import { Entity } from "./entity";

class File extends Entity {
  constructor(id, originalFileName, fileSize) {
    super(id);
    this.originalFileName = originalFileName;
    this.fileSize = fileSize;
  }
}
