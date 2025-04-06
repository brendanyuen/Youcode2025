import Groq from "groq-sdk";

const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY, dangerouslyAllowBrowser: true });

export async function analyzeEventDescription(description, title) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert at analyzing outdoor event descriptions. Your task is to determine if the event is primarily a hiking, climbing, or running event. If none of these clearly apply, return 'default'. Only return one of these exact words: 'hiking', 'climbing', 'running', or 'default'."
        },
        {
          role: "user",
          content: `Analyze this event description and determine the primary activity type: ${description} + ${title}`
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.1,
      max_tokens: 10
    });

    const activityType = chatCompletion.choices[0]?.message?.content?.toLowerCase().trim();
    return ['hiking', 'climbing', 'running', 'default'].includes(activityType) 
      ? activityType 
      : 'default';
  } catch (error) {
    console.error('Error analyzing event description:', error);
    return 'default';
  }
} 