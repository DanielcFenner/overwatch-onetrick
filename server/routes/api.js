async function routes(fastify, options) {
  const collection = fastify.mongodb.db.collection("owonetrick");

  fastify.get("/", async (request, reply) => {
    return { hello: "world" };
  });

  const heroBodyJsonSchema = {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "integer" },
    },
  };

  const schema = {
    body: heroBodyJsonSchema,
  };

  fastify.post("/hero", { schema }, async (request, reply) => {
    const result = await collection.findOne({ id: request.body.id });
  });
}

export default routes;
