import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openAi = new OpenAI({
  baseURL: process.env.DEEPSEEK_BASE_URL,
  apiKey: process.env.DEEPSEEK_API_KEY,
})

export const askQuestion = async (prompt) => {
    const completion = await openAi.chat.completions.create({
      messages: [{role: 'system', content: `You are a helpful assistant answer to ${prompt}`}],
      model: 'deepseek-chat'
    })

  return completion.choices[0].message.content;
}