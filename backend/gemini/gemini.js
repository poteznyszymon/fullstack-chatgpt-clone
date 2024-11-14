import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const geminiAiModel = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const safetySetting = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

const aiModel = geminiAiModel.getGenerativeModel({
  model: "gemini-1.5-flash",
  safetySettings: safetySetting,
});

export default aiModel;
