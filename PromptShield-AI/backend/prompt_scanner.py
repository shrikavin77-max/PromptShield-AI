import re

PATTERNS = {

    "Email Address":
        r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}",

    "Phone Number":
        r"\b[6-9]\d{9}\b",

    "Aadhaar Number":
        r"\b\d{4}\s?\d{4}\s?\d{4}\b",

    "PAN Number":
        r"\b[A-Z]{5}[0-9]{4}[A-Z]\b",

    "IPv4 Address":
        r"\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b",

    "Credit Card":
        r"\b(?:\d[ -]*?){13,16}\b",

    "API Key":
        r"(gsk_[A-Za-z0-9_-]{20,}|sk-[A-Za-z0-9]{20,})",

    "Password":
        r"password\s*[:=]\s*\S+"
}


def scan_prompt(prompt: str):

    findings = []

    for label, pattern in PATTERNS.items():

        if re.search(pattern, prompt, re.IGNORECASE):

            findings.append(label)

    return findings