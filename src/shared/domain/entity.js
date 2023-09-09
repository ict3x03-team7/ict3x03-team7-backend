import { v4 as uuidv4 } from "uuid";

export class Entity {
  constructor(id, props) {
    if (this.constructor === Entity) {
      console.error("Can't instantiate abstract class");
    }
    this.id = id || new uuidv4();
    this.props = props;
  }
  getId() {
    return this.id;
  }
}
