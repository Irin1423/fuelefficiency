
import OpenAI from "openai";

// const { Configuration, OpenAIApi } = require("openai");

const OPENAI_API_KEY = "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";

// const configuration = new Configuration({
//   apiKey: OPENAI_API_KEY
// });
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function sendMessageToOpenAI(message) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: message}]
    // prompt: message,
    // temperature: 0.7,
    // max_tokens: 256,
    // top_p: 1,
    // frequency_penalty: 0,
    // presence_penalty: 0,
  });
  return response.choices[0].message.content;
}