const DummyMapper = require('../mapper/dummyMap.js');
class PrismaDummyRepo {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async getDummyByName(name) {
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
      throw new Error('Server Error');
    }
  }
}

module.exports = PrismaDummyRepo;
