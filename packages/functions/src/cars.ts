//lambda.ts
import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

const app = new Hono();

app.get("/cars", (c) => {
  return c.json({ cars: {} });
});

app.post("/cars", (c) => {
  return c.json({ car: {} });
});

export const handler = handle(app);