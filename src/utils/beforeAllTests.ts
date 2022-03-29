// import { prisma } from "../database/prismaClient";
import { PrismaClient } from "@prisma/client";

const globalSetup = async () => {
  console.log("\n##########################");
  console.log("/src/beforeAllTests.ts");
  console.log("\nBefore all Test");

  console.log(` - Switch to TESTING Database`);
  // check if has a DATABASE_URL_TEST configured different than the default
  if (process.env.DATABASE_URL_TEST === process.env.DATABASE_URL) {
    throw new Error(
      "TESTS CANCELED, DATABASE_URL_TEST and DATABASE_URL cannot be the same"
    );
  } else {
    process.env.NODE_ENV = "TESTING";
    // I could  prisma from database/prismaClient using
    // const { prisma } = await import("../database/prismaClient")
    // but doing so, will cause this test to ignore the .env file and crash
    // so I'm doing the same logic from database/prismaClient file
    const prisma = new PrismaClient({
      datasources: { db: { url: process.env.DATABASE_URL_TEST } },
    });

    console.log(" - Cleaning TESTING DB");
    await prisma.$transaction([
      prisma.$executeRaw`TRUNCATE refresh_tokens CASCADE`,
      prisma.$executeRaw`TRUNCATE user_on_place CASCADE`,
      prisma.$executeRaw`TRUNCATE place CASCADE`,
      prisma.$executeRaw`TRUNCATE users CASCADE`,
    ]);

    console.log(" - Done Cleaning DB");
  }

  console.log("##########################\n");
};

export default globalSetup;
