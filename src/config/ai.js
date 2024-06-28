import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyCNAC1KiCmFiUovDJhl4_yXcSDSKar1_yU');

export const ai_model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
