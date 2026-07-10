// safe_send.js

async function safeSend(prompt) {

    const sensitiveFindings = scanPrompt(prompt);

    const injectionResult = detectPromptInjection(prompt);

    const jailbreakResult = detectJailbreak(prompt);

    const aiResult = await classifyPrompt(prompt);

    const maskedPrompt = maskPrompt(prompt);

    return {

        originalPrompt: prompt,

        safePrompt: maskedPrompt,

        sensitiveFindings: sensitiveFindings,

        promptInjection: injectionResult,

        jailbreak: jailbreakResult,

        aiClassification: aiResult,

        allowSend:

            !injectionResult.detected &&

            jailbreakResult.severity !== "CRITICAL"

    };

}