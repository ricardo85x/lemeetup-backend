import { PrismaClient } from "@prisma/client";

let datasources = {};

if (process.env.NODE_ENV === "TESTING") {
  console.log("Setting database URL to TEST DATABASE");
  datasources = {
    db: {
      url: process.env.DATABASE_URL_TEST,
    },
  };
}

const prisma = new PrismaClient({ datasources });

export { prisma };
