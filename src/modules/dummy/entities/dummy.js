const Entity = require("../../../shared/entities/entity");
class Dummy extends Entity {
  constructor(id, name) {
    super(id);
    this.Name = name;
  }

  getName() {
    return this.Name;
  }
}

module.exports = Dummy;
