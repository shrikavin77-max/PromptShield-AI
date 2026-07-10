/*
====================================================
PromptShield AI
jailbreak_detector.js

Detects common LLM jailbreak attempts.
====================================================
*/

const JailbreakDetector = (() => {

    const PATTERNS = [

        /you\s+are\s+now\s+dan/i,
        /\bDAN\b/i,
        /do\s+anything\s+now/i,
        /developer\s+mode/i,
        /jailbreak/i,
        /unrestricted\s+mode/i,
        /god\s+mode/i,
        /evil\s+mode/i,
        /ignore\s+openai\s+policy/i,
        /ignore\s+safety\s+policy/i,
        /pretend\s+to\s+be\s+an?\s+evil/i,
        /answer\s+without\s+restrictions/i,
        /respond\s+without\s+ethical\s+limitations/i,
        /bypass\s+content\s+policy/i,
        /disable\s+guardrails/i,
        /ignore\s+all\s+guardrails/i,
        /never\s+refuse/i,
        /always\s+comply/i,
        /simulate\s+an?\s+unfiltered/i,
        /roleplay\s+as\s+an?\s+unrestricted/i

    ];

    function detectJailbreak(prompt) {

        if (!prompt || prompt.trim() === "") {

            return {

                detected: false,
                severity: "SAFE",
                score: 0,
                findings: [],
                recommendation: "No jailbreak patterns detected."

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
                recommendation: "No jailbreak patterns detected."

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
                "Potential jailbreak attempt detected. Review the prompt before sending."

        };

    }

    return {

        detectJailbreak

    };

})();