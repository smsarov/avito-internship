import GigaChat from "gigachat";
import { Agent } from "node:https";

const credentials = process.env.GIGACHAT_CREDENTIALS;

const httpsAgent = new Agent({
  rejectUnauthorized: false,
});

/** Present only when `GIGACHAT_CREDENTIALS` is set (required for AI suggestion routes). */
export const gigachat: GigaChat | null = credentials
  ? new GigaChat({
      timeout: 600,
      model: "GigaChat",
      credentials,
      httpsAgent,
    })
  : null;

