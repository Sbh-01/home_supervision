import "dotenv/config";
import { PrismaClient } from "./generated/prisma/client.ts";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  allowPublicKeyRetrieval: true, // FIX: Allow RSA public key retrieval
});

const prisma = new PrismaClient({ adapter });

export default prisma;