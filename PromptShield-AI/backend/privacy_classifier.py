"""
privacy_classifier.py

Assigns a privacy level based on detected sensitive data.
"""


def classify_privacy(findings: list) -> str:

    count = len(findings)

    if count == 0:
        return "SAFE"

    elif count <= 2:
        return "PRIVATE"

    elif count <= 4:
        return "CONFIDENTIAL"

    else:
        return "HIGHLY CONFIDENTIAL"