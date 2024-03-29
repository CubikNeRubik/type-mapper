import { TypeMapper, Types } from "../../src/";
import { Animal } from "../models/animal";
import { AnimalDto } from "../models/animal.dto";

export class Mapper extends TypeMapper {
  constructor() {
    super();
    this.config();
  }

  private config(): void {
    this.createMap(AnimalDto, Animal)
      .forMember('name', p => `${p.firstname} ${p.lastname}`)
      .forMember('age', p => p.age)
      .is(Types.NUMBER);
  }
}
