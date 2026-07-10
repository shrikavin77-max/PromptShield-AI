/*
========================================================
PromptShield AI
Safety Engine

Combines all detection modules.
========================================================
*/

const SafetyEngine = (() => {

    function analyze(prompt) {

        const findings = Scanner.scanPrompt(prompt);

        const risk = RiskEngine.calculateRisk(findings);

        const promptInjection =
            PromptInjectionDetector.detectPromptInjection(prompt);

        const jailbreak =
            JailbreakDetector.detectJailbreak(prompt);

        const maskedPrompt =
            Masker.maskPrompt(prompt);

        return {

            originalPrompt: prompt,

            maskedPrompt,

            findings,

            risk,

            promptInjection,

            jailbreak,

            timestamp: new Date().toISOString()

        };

    }

    return {

        analyze

    };

})();