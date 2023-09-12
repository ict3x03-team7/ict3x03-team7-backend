const { v4: uuidv4 } = require("uuid");
const validateUUID = require("../utils/validateUUID");
const generateUUID = require("../utils/generateUUID");

class Entity {
  constructor(id) {
    if (this.constructor === Entity) {
      console.error("Can't instantiate abstract class");
    }
    if (id) {
      if (validateUUID(id)) {
        this.id = id;
      } else {
        this.id = generateUUID();
      }
    }
  }
  getId() {
    return this.id;
  }
}

module.exports = Entity;
