// model Subject {
//     id       String   @id @default(uuid())
//     name     String   @unique
//     modules  Module[]
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
//   }

//   model Module {
//     id          String   @id @default(uuid())
//     name        String
//     description String
//     subjectId   String
//     subject     Subject  @relation(fields: [subjectId], references: [id], onDelete: Cascade)
//     tasks       Task[]
//     createdAt   DateTime @default(now())
//     updatedAt   DateTime @updatedAt
//   }

//   model Task {
//     id        String  @id @default(uuid())
//     task      String
//     answer    String  // Can be a number or string
//     moduleId  String
//     module    Module  @relation(fields: [moduleId], references: [id], onDelete: Cascade)
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
//   }

//   import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//   const math = await prisma.subject.create({
//     data: {
//       name: "Mathematics",
//       modules: {
//         create: [
//           {
//             name: "Module 1: Addition Basics",
//             description: "Learn the basics of addition and solve simple problems.",
//             tasks: {
//               create: [
//                 { task: "What is 2 + 3?", answer: "5" },
//                 { task: "What is 4 + 6?", answer: "10" },
//               ],
//             },
//           },
//           {
//             name: "Module 2: Subtraction Basics",
//             description: "Learn the basics of subtraction and solve simple problems.",
//             tasks: {
//               create: [
//                 { task: "What is 5 - 3?", answer: "2" },
//                 { task: "What is 10 - 7?", answer: "3" },
//               ],
//             },
//           },
//         ],
//       },
//     },
//   });

//   console.log("Database seeded with subjects and modules.");
// }

// main()
//   .catch((e) => console.error(e))
//   .finally(async () => await prisma.$disconnect());
