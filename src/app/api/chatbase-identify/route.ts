import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const secret = process.env.CHATBOT_IDENTITY_SECRET;
    if (!secret) {
      console.error("Missing CHATBOT_IDENTITY_SECRET env var");
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    const payload = { user_id: "anonymous_user" };
    const token = jwt.sign(payload, secret, { algorithm: "HS256", expiresIn: "1h" });
    return NextResponse.json({ token });
  } catch (err) {
    console.error("chatbase-identify error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
