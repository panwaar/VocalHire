import { NextResponse } from "next/server";
import { FEEDBACK_PROMPT } from "@/services/Constants";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const { conversation } = await req.json();

    if (!conversation || !Array.isArray(conversation)) {
      return NextResponse.json({ error: "Invalid or missing conversation data." }, { status: 400 });
    }

    const FINAL_PROMPT = FEEDBACK_PROMPT.replace('{{conversation}}', JSON.stringify(conversation));

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "mistralai/mistral-7b-instruct",
      messages: [{ role: "user", content: FINAL_PROMPT }],
    });

    console.log("Feedback:", completion.choices[0].message);
    return NextResponse.json(completion.choices[0].message);

  } catch (error) {
    console.error("Feedback generation error:", error.response?.data || error.message || error);
    return NextResponse.json(
      { error: error.response?.data || error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
