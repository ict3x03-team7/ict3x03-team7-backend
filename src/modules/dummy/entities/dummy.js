import { Entity } from "../../../shared/entities/entity.js";
export class Dummy extends Entity {
  constructor(id, name) {
    super(id);
    this.Name = name;
  }

  getName() {
    return this.Name;
  }
}
