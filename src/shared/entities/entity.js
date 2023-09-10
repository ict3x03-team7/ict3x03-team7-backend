import { v4 as uuidv4 } from "uuid";

export class Entity {
  constructor(id) {
    if (this.constructor === Entity) {
      console.error("Can't instantiate abstract class");
    }
    this.id = id || new uuidv4();
  }
  getId() {
    return this.id;
  }
}
