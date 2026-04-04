import GigaChat from "gigachat";
import { Agent } from "node:https";

const credentials = process.env.GIGACHAT_CREDENTIALS;
if (!credentials) {
  throw new Error(
    "GIGACHAT_CREDENTIALS is not set.",
  );
}

const httpsAgent = new Agent({
  rejectUnauthorized: false,
});

export const gigachat = new GigaChat({
  timeout: 600,
  model: "GigaChat",
  credentials,
  httpsAgent: httpsAgent,
});

