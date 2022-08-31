import { FastifyInstance, FastifyReply } from "fastify";
import { slugify } from "../helpers";

const fastifyPlugin = require("fastify-plugin");
const NodeCache = require("node-cache");
const CACHE_TTL = 15;

async function cache(fastify: FastifyInstance) {
  const cache = new NodeCache();

  cache.on("expired", function (key: string) {
    console.log("CACHE KEY EXPIRED = ", key);
  });

  fastify.addHook("onRequest", async (request: any, reply: FastifyReply) => {
    console.log("Request URL", request.url);

    let key = request.query.city;
    if (request.routerPath === "/weather/check") {
      key += "-check";
    }
    key = slugify(key);
    const response = cache.get(key);
    console.log("Response", response);
    if (response != undefined) {
      console.log("RETURNING FROM CACHE FOR KEY =", key, " VALUE =", response);
      reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(response);
    }
  });

  fastify.addHook(
    "onSend",
    (request: any, reply: FastifyReply, payload, done) => {
      let key = request.query.city;
      if (request.routerPath === "/weather/check") {
        key += "-check";
      }
      key = slugify(key);
      const response = cache.get(key);
      if (response == undefined) {
        console.log("CACHING RESPONSE FOR KEY =", key, " AND VALUE =", payload);
        cache.set(key, payload, CACHE_TTL);
      }
      done();
    }
  );
}

export default fastifyPlugin(cache);
