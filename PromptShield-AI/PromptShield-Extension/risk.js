/*
====================================================
PromptShield AI
risk.js

Calculates overall AI Safety Risk based on
detected sensitive information.
====================================================
*/

const RiskEngine = (() => {

    const WEIGHTS = {

        LOW: 5,

        MEDIUM: 15,

        HIGH: 25,

        CRITICAL: 40

    };

    function calculateRisk(findings) {

        if (!findings || findings.length === 0) {

            return {

                score: 100,

                risk: "SAFE",

                color: "#16a34a",

                recommendation:
                    "No sensitive information detected."

            };

        }

        let deduction = 0;

        findings.forEach(item => {

            deduction += WEIGHTS[item.severity] || 0;

        });

        deduction = Math.min(deduction, 100);

        const score = 100 - deduction;

        let risk = "LOW";
        let color = "#22c55e";
        let recommendation =
            "Prompt is mostly safe.";

        if (score >= 90) {

            risk = "SAFE";
            color = "#16a34a";
            recommendation =
                "No action required.";

        }

        else if (score >= 70) {

            risk = "LOW";
            color = "#84cc16";
            recommendation =
                "Consider masking personal information.";

        }

        else if (score >= 50) {

            risk = "MEDIUM";
            color = "#eab308";
            recommendation =
                "Mask sensitive information before sending.";

        }

        else if (score >= 25) {

            risk = "HIGH";
            color = "#f97316";
            recommendation =
                "Prompt contains high-risk information. Review before sending.";

        }

        else {

            risk = "CRITICAL";
            color = "#dc2626";
            recommendation =
                "Prompt contains critical information. Mask or remove before sending.";

        }

        return {

            score,

            risk,

            color,

            recommendation

        };

    }

    return {

        calculateRisk

    };

})();