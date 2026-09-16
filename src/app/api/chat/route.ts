import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize the OpenAI client with Deepseek configuration
const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function POST(req: Request) {
  try {
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
