const { v4: uuidv4 } = require("uuid");

class Entity {
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

module.exports = Entity;
