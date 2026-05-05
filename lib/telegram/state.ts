/**
 * Conversation state management via Upstash Redis.
 * Stores the bot session for each Telegram user between messages.
 *
 * Setup: https://upstash.com → Create Redis database → copy URL + TOKEN
 */
import { SessionData } from "./types";

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error("UPSTASH_REDIS_REST_URL und UPSTASH_REDIS_REST_TOKEN müssen gesetzt sein.");
  }

  return { url, token };
}

const SESSION_TTL = 60 * 60 * 2; // 2 Stunden

async function redisCommand(command: unknown[]): Promise<unknown> {
  const { url, token } = getRedis();
  const res = await fetch(`${url}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });
  const data = await res.json() as { result: unknown };
  return data.result;
}

export async function getSession(userId: number): Promise<SessionData> {
  const key = `bot:session:${userId}`;
  const raw = await redisCommand(["GET", key]) as string | null;

  if (!raw) {
    return { state: "idle", photos: [], keywords: [] };
  }

  return JSON.parse(raw) as SessionData;
}

export async function saveSession(userId: number, session: SessionData): Promise<void> {
  const key = `bot:session:${userId}`;
  await redisCommand(["SET", key, JSON.stringify(session), "EX", SESSION_TTL]);
}

export async function clearSession(userId: number): Promise<void> {
  const key = `bot:session:${userId}`;
  await redisCommand(["DEL", key]);
}
