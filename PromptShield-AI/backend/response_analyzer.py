"""
response_analyzer.py

Basic response statistics.
"""


def analyze_response(response: str):

    return {

        "characters": len(response),

        "words": len(response.split()),

        "lines": len(response.splitlines())
    }