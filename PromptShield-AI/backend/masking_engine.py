import re


def mask_prompt(prompt: str):

    prompt = re.sub(

        r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}",

        "[EMAIL]",

        prompt

    )

    prompt = re.sub(

        r"\b[6-9]\d{9}\b",

        "[PHONE]",

        prompt

    )

    prompt = re.sub(

        r"\b\d{4}\s?\d{4}\s?\d{4}\b",

        "[AADHAAR]",

        prompt

    )

    prompt = re.sub(

        r"\b[A-Z]{5}[0-9]{4}[A-Z]\b",

        "[PAN]",

        prompt

    )

    prompt = re.sub(

        r"(gsk_[A-Za-z0-9_-]{20,}|sk-[A-Za-z0-9]{20,})",

        "[API_KEY]",

        prompt

    )

    return prompt