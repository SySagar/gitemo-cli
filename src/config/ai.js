import { GoogleGenerativeAI } from '@google/generative-ai';
import configurationVault from '@utils/configurationVault/index.js';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(configurationVault.getAIKey());

export const ai_model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
