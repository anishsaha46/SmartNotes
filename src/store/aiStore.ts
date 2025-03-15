import { create } from 'zustand';

interface AIState {
  isGenerating: boolean;
  isSummarizing: boolean;
  error: string | null;
  generateContent: (prompt: string) => Promise<string>;
  summarizeContent: (content: string) => Promise<string>;
}

// Gemini API configuration
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// For debugging
console.log('API Key available:', !!GEMINI_API_KEY);

export const useAIStore = create<AIState>((set) => ({
  isGenerating: false,
  isSummarizing: false,
  error: null,

  generateContent: async (prompt: string) => {
    try {
      set({ isGenerating: true, error: null });
      
      if (!GEMINI_API_KEY) {
        throw new Error('Gemini API key is not configured');
      }
      
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
          }
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to generate content');
      }
      
      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      set({ isGenerating: false });
      return generatedText;
    } catch (error: any) {
      set({ error: error.message, isGenerating: false });
      return '';
    }
  },

  summarizeContent: async (content: string) => {
    try {
      set({ isSummarizing: true, error: null });
      
      if (!GEMINI_API_KEY) {
        throw new Error('Gemini API key is not configured');
      }
      
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Please summarize the following content concisely:

${content}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 400,
          }
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to summarize content');
      }
      
      const data = await response.json();
      const summary = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      set({ isSummarizing: false });
      return summary;
    } catch (error: any) {
      set({ error: error.message, isSummarizing: false });
      return '';
    }
  },
}));