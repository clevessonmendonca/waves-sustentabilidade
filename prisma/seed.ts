const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    const person = await prisma.person.create({
      data: {
        name: 'John Doe',
        phone: '123456789',
        cpfCnpj: '12345678900',
        sex: 'male',
        birthDate: new Date('1990-01-01'),
        uf: 'SP',
        city: 'Sao Paulo',
        cep: '01234567',
        timeInMarket: '2 years',
      },
    });

    const recycler = await prisma.recycler.create({
      data: {
        recyclingServiceDescription: 'Recycling services',
        kgRecycled: 100,
        socialDonations: true,
        donationDetails: 'Donation details',
        personId: person.id,
      },
    });

    const collector = await prisma.collector.create({
      data: {
        collectionServiceDescription: 'Collection services',
        kgCollected: 200,
        marketTime: '2 years',
        organization: 'Collector Org',
        cpfCnpj: '987654321',
        isoCertification: true,
        purchases: 'Purchases',
        biography: 'Biography',
        personId: person.id,
      },
    });

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });
