import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from "./src/schema.js";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "@apollo/server";

dotenv.config();

const prisma = new PrismaClient();

const apolloServer = new ApolloServer({
    schema
})

const port = process.env.PORT || 4001;

startStandaloneServer(apolloServer, {
    listen: {port}
}).then((engine) => console.log(`Server ready at: ${engine?.url}`))