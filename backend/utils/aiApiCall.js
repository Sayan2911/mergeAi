// utils/aiApiCall.js
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.SITE_URL || "http://localhost:5173",
    "X-Title": process.env.SITE_NAME || "mergeAi",
  },
});

export const aiApiCall = async (prompt, isFirstAi, isSecondAi, isThirdAi) => {
  const responses = {};

  // if (isFirstAi) {
  //   const completion = await openai.chat.completions.create({
  //     model: "google/gemma-3-4b-it:free",
  //     messages: [{ role: "user", content: prompt }],
  //     stream: true,
  //   });

  //   let finalText = "";
  //   for await (const chunk of completion) {
  //     // make sure the chunk has choices and delta content
  //     if (!chunk.choices || !chunk.choices.length) {
  //       continue; // skip empty or non-content chunks
  //     }

  //     const delta = chunk.choices[0].delta?.content || "";
  //     finalText += delta;

  //     // live console log (no newline so it looks like typing)
  //     process.stdout.write(delta);
  //   }
  //    responses.firstAi = { role: "assistant", content: finalText };
  // }

  if (isFirstAi) {
    const completion = await openai.chat.completions.create({
      model: "google/gemma-3-4b-it:free",
      messages: [{ role: "user", content: prompt }],
    });
    responses.firstAi = completion.choices[0].message;
  }
  if (isSecondAi) {
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-oss-20b:free",
      messages: [{ role: "user", content: prompt }],
    });
    responses.secondAi = completion.choices[0].message;
  }

  if (isThirdAi) {
    const completion = await openai.chat.completions.create({
      model: "x-ai/grok-4-fast:free",
      messages: [{ role: "user", content: prompt }],
    });
    responses.thirdAi = completion.choices[0].message;
  }

  return responses;
};
