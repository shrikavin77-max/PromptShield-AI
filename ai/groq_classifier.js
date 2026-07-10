// groq_classifier.js

const GROQ_API_KEY = "YOUR_GROQ_API_KEY";

const MODEL = "llama-3.3-70b-versatile";

async function classifyPrompt(prompt) {

    const systemPrompt = `
You are an AI Safety Classifier.

Analyze the user's prompt.

Return ONLY valid JSON.

{
  "category":"",
  "risk":"LOW | MEDIUM | HIGH | CRITICAL",
  "explanation":"",
  "recommendation":""
}

Categories

SAFE
PERSONAL_INFORMATION
FINANCIAL_INFORMATION
MEDICAL_INFORMATION
BUSINESS_CONFIDENTIAL
PROMPT_INJECTION
JAILBREAK
API_KEY
PASSWORD
`;

    try {

        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    "Authorization": `Bearer ${GROQ_API_KEY}`

                },

                body: JSON.stringify({

                    model: MODEL,

                    messages: [

                        {
                            role: "system",
                            content: systemPrompt
                        },

                        {
                            role: "user",
                            content: prompt
                        }

                    ],

                    temperature: 0,

                    max_tokens: 250

                })

            }
        );

        const data = await response.json();

        const answer =
            data.choices[0].message.content;

        return JSON.parse(answer);

    }

    catch (error) {

        console.error(error);

        return {

            category: "UNKNOWN",

            risk: "LOW",

            explanation: "Unable to classify prompt.",

            recommendation: "Please try again."

        };

    }

}