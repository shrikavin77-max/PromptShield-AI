"""
evaluation_engine.py

Main pipeline for PromptShield AI.
"""

from backend.prompt_scanner import scan_prompt
from backend.masking_engine import mask_prompt
from backend.risk_engine import calculate_risk
from backend.privacy_classifier import classify_privacy
from backend.history_manager import add_history
from backend.llm_client import generate_response


def evaluate(prompt: str):

    findings = scan_prompt(prompt)

    risk_level, risk_score = calculate_risk(findings)

    privacy_level = classify_privacy(findings)

    masked_prompt = mask_prompt(prompt)

    ai_response = generate_response(masked_prompt)

    result = {

        "original_prompt": prompt,

        "masked_prompt": masked_prompt,

        "findings": findings,

        "privacy_level": privacy_level,

        "risk_level": risk_level,

        "risk_score": risk_score,

        "response": ai_response

    }

    add_history(result)

    return result