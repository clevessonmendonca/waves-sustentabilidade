// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();

// async function main() {
//   try {
//     // Criar recicladores
//     const recycler1 = await prisma.recycler.create({
//       data: {
//         name: "Reciclador 1",
//         organization: "Organização Reciclagem 1",
//         phone: "1234567890",
//         cpfCnpj: "1234567890",
//         cep: "12345-678",
//         isoCertification: true,
//         marketTime: "5 anos",
//         recyclingServiceDescription: "Reciclagem de plástico e papel",
//         kgRecycled: 10000,
//         socialDonations: true,
//         donationDetails: "Doamos para comunidades carentes.",
//         userId: "clo3nqocm0000rjfoaz0jzqbs",
//       },
//     });

//     // Criar coletores
//     const collector1 = await prisma.collector.create({
//       data: {
//         name: "Coletor 1",
//         organization: "Organização Coleta 1",
//         phone: "1111111111",
//         cpfCnpj: "1111111111",
//         isoCertification: true,
//         marketTime: "4 anos",
//         collectionServiceDescription: "Coleta de papel e plástico",
//         kgCollected: 12000,
//         userId: "clo3nqocm0000rjfoaz0jzqbs",
//       },
//     });

//     console.log("Dados de recicladores e coletores inseridos com sucesso!");
//   } catch (error) {
//     console.error("Erro ao criar os registros:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
