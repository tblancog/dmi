import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import { IQuerystring } from "../types";

const fastifyPlugin = require("fastify-plugin");
const NodeCache = require("node-cache");
const CACHE_TTL = 15;

async function cache(fastify: FastifyInstance) {
  const cache = new NodeCache();

  fastify.addHook(
    "onRequest",
    (request: FastifyRequest, reply: FastifyReply, done) => {
      const { lat, lon } = request.query as IQuerystring;
      let key = lat.toString() + ":" + lon.toString();
      if (request.routerPath === "/weather/check") {
        key += "-check";
      }
      const response = cache.get(key);
      if (response != undefined) {
        reply
          .code(200)
          .header("Content-Type", "application/json; charset=utf-8")
          .send(response);
      }
      done();
    }
  );

  fastify.addHook(
    "onSend",
    (request: FastifyRequest, _: FastifyReply, payload, done) => {
      const { lat, lon } = request.query as IQuerystring;
      let key = lat.toString() + ":" + lon.toString();
      if (request.routerPath === "/weather/check") {
        key += "-check";
      }
      const response = cache.get(key);
      if (response == undefined) {
        cache.set(key, payload, CACHE_TTL);
      }
      done();
    }
  );
}

export default fastifyPlugin(cache);
