import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      throw new Error("DEEPSEEK_API_KEY is not configured");
    }

    const openai = new OpenAI({
      baseURL: "https://api.deepseek.com",
      apiKey,
    });

    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Ensure the system message is included
    const chatMessages = [
      { role: "system", content: "You are a helpful developer assistant." },
      ...messages,
    ];

    // Note: 'thinking' and 'reasoning_effort' are passed as any to bypass OpenAI TS types if they don't natively support DeepSeek's custom params yet
    const completion = await openai.chat.completions.create({
      messages: chatMessages,
      model: "deepseek-flash",
      stream: false,
      thinking: { type: "enabled" },
      reasoning_effort: "high",
    } as any);

    const reply = completion.choices[0]?.message;

    return NextResponse.json({ message: reply });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: error.message || "An error occurred during chat processing." },
      { status: 500 }
    );
  }
}
