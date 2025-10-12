import { NextResponse } from "next/server"
import OpenAI from "openai"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // store key in .env.local
})

export async function POST(req: Request) {
  const { message } = await req.json()

  // 🧠 Custom MLSA prompt
  const prompt = `
You are an assistant for the Microsoft Learn Student Ambassadors (MLSA) club at our college.
Your job is to answer questions about MLSA activities, joining process, events, resources,
and general tech community queries in a friendly and helpful tone.

User asked: ${message}
`

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  })

  const reply = completion.choices[0].message.content
  return NextResponse.json({ reply })
}
