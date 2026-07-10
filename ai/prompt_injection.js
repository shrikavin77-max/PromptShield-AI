/*
====================================================
PromptShield AI
prompt_injection.js

Detects Prompt Injection attacks.
====================================================
*/

const PromptInjectionDetector = (() => {

    const PATTERNS = [

        /ignore\s+(all\s+)?previous\s+instructions?/i,

        /ignore\s+the\s+above/i,

        /forget\s+(everything|all)/i,

        /disregard\s+(all\s+)?instructions?/i,

        /reveal\s+(your\s+)?system\s+prompt/i,

        /show\s+(your\s+)?hidden\s+prompt/i,

        /print\s+(your\s+)?system\s+prompt/i,

        /developer\s+mode/i,

        /act\s+as\s+an?\s+unrestricted/i,

        /bypass\s+(all\s+)?safety/i,

        /disable\s+(your\s+)?filters?/i,

        /do\s+not\s+follow\s+your\s+rules/i,

        /pretend\s+you\s+have\s+no\s+restrictions/i,

        /you\s+are\s+now\s+dan/i,

        /simulate\s+being\s+chatgpt\s+without\s+rules/i

    ];

    function detectPromptInjection(prompt) {

        if (!prompt || prompt.trim() === "") {

            return {

                detected: false,

                severity: "SAFE",

                score: 0,

                findings: [],

                recommendation: "No prompt injection detected."

            };

        }

        const findings = [];

        PATTERNS.forEach(pattern => {

            const match = prompt.match(pattern);

            if (match) {

                findings.push(match[0]);

            }

        });

        if (findings.length === 0) {

            return {

                detected: false,

                severity: "SAFE",

                score: 0,

                findings,

                recommendation: "No prompt injection detected."

            };

        }

        let severity = "LOW";
        let score = 25;

        if (findings.length >= 2) {

            severity = "MEDIUM";
            score = 50;

        }

        if (findings.length >= 4) {

            severity = "HIGH";
            score = 75;

        }

        if (findings.length >= 6) {

            severity = "CRITICAL";
            score = 100;

        }

        return {

            detected: true,

            severity,

            score,

            findings,

            recommendation:
                "This prompt contains prompt injection patterns. Review it before sending."

        };

    }

    return {

        detectPromptInjection

    };

})();