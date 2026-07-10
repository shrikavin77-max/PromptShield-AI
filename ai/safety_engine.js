// safety_engine.js

async function analyzePrompt(prompt) {

    const sensitiveFindings = scanPrompt(prompt);

    const riskResult = calculateRisk(sensitiveFindings);

    const injectionResult = detectPromptInjection(prompt);

    const jailbreakResult = detectJailbreak(prompt);

    let aiResult = {

        category: "SAFE",

        risk: riskResult.risk,

        explanation: "No AI analysis performed.",

        recommendation: "Safe to continue."

    };

    try {

        aiResult = await classifyPrompt(prompt);

    }

    catch (e) {

        console.log("Groq unavailable.");

    }

    return {

        originalPrompt: prompt,

        maskedPrompt: maskPrompt(prompt),

        findings: sensitiveFindings,

        risk: riskResult,

        promptInjection: injectionResult,

        jailbreak: jailbreakResult,

        ai: aiResult,

        allowSend:

            !injectionResult.detected &&

            jailbreakResult.severity !== "CRITICAL"

    };

}