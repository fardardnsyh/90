import { PROMPT_EXPLANATION } from "@/utils/prompt-explanation";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const POST = async (request: NextRequest) => {
  try {
    const promptExplanation = PROMPT_EXPLANATION;
    const data = await request.json();
    const content = `${data} ${promptExplanation}`;
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPEN_ROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3-8b-instruct:free",
      messages: [{ role: "system", content: content }],
    });
    console.log(completion);
    return NextResponse.json({ content: completion }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error sending openai request" },
      { status: 500 }
    );
  }
};
