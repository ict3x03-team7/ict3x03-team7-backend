import DummyMapper from "../mapper/dummyMap.js";
export default class PrismaDummyRepo {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async getDummy(name) {
    try {
      const dummy = await this.prisma.dummy.findFirst({
        where: {
          Name: name,
        },
      });
      let mappedDummy;
      if (dummy) {
        mappedDummy = DummyMapper.toDomain(dummy);
      }
      return mappedDummy;
    } catch (err) {
      console.error(err);
      throw new Error("Server Error");
    }
  }
}
