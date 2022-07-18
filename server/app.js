import Fastify from "fastify";
import dbConnector from "./dbConnector.js";
import api from "./routes/api.js";
import dotenv from "dotenv";

dotenv.config();

const fastify = Fastify({
  logger: true,
});

fastify.register(api, { prefix: "/api" });
fastify.register(dbConnector);

fastify.listen({ port: process.env.PORT || 3001 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
