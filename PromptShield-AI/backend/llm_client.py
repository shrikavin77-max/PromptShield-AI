import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

API_KEY = os.getenv("GROQ_API_KEY")
MODEL = os.getenv("MODEL_NAME", "llama-3.3-70b-versatile")

if not API_KEY:
    raise ValueError(
        "Groq API Key not found. Please create a .env file and add GROQ_API_KEY."
    )

client = Groq(api_key=API_KEY)


def generate_response(prompt: str) -> str:
    """
    Sends a prompt to Groq and returns the model response.
    """

    try:

        chat = client.chat.completions.create(
            model=MODEL,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.3,
            max_tokens=800
        )

        return chat.choices[0].message.content

    except Exception as e:

        return f"Groq Error: {e}"