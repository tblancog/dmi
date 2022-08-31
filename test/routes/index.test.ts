import { test } from "tap";
import { build, Test } from "../helper";

test("/weather/check returns json", async (t: Test) => {
  const app = await build(t);

  const res = await app.inject().get("/weather/check").query({
    city: "Río Cuarto,Córdoba,AR",
  });
  t.ok(res.payload);
  t.equal(res.headers["content-type"], "application/json; charset=utf-8");
  t.equal(res.statusCode, 200);
});

test("/weather returns json", async (t) => {
  const app = await build(t);

  const res = await app.inject().get("/weather").query({
    city: "Río Cuarto,Córdoba,AR",
  });
  t.ok(res.payload);
  t.equal(res.headers["content-type"], "application/json; charset=utf-8");
  t.equal(res.statusCode, 200);
});
