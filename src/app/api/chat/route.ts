import OpenAI from "openai";
import { NextResponse } from "next/server";
import { ZEIN_SYSTEM_PROMPT } from "@/lib/zein-prompt";

const MAX_MESSAGE_CHARS = 500;
const MAX_HISTORY = 8;
const RATE_LIMIT = 15; // requests
const RATE_WINDOW_MS = 60_000; // per minute, per IP

const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT;
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Chat is not configured." }, { status: 503 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
  if (limited(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Try again in a minute." },
      { status: 429 },
    );
  }

  try {
    const { message, messages } = await request.json();

    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }
    if (message.length > MAX_MESSAGE_CHARS) {
      return NextResponse.json(
        { error: `Keep it under ${MAX_MESSAGE_CHARS} characters.` },
        { status: 400 },
      );
    }

    // Only user/assistant turns are accepted from the client, never "system".
    const history = (Array.isArray(messages) ? messages : [])
      .filter(
        (m): m is { role: "user" | "assistant"; content: string } =>
          !!m &&
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string",
      )
      .slice(-MAX_HISTORY)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 1500) }));

    const client = new OpenAI({ apiKey });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
      max_output_tokens: 600,
      input: [
        { role: "system", content: ZEIN_SYSTEM_PROMPT },
        ...history,
        { role: "user", content: message.trim() },
      ],
    });

    return NextResponse.json({ reply: response.output_text });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Something went wrong while generating a response." },
      { status: 500 },
    );
  }
}
