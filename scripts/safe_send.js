/*
========================================================
PromptShield AI
Safe Send

Intercepts send action and reviews prompt
before it reaches the AI.
========================================================
*/

const SafeSend = (() => {

    function review(prompt) {

        const report = SafetyEngine.analyze(prompt);

        let message =
`🛡 PromptShield AI

Safety Score : ${report.risk.score}/100

Risk Level   : ${report.risk.risk}

----------------------------------

Sensitive Items : ${report.findings.length}

Prompt Injection : ${report.promptInjection.detected ? "YES" : "NO"}

Jailbreak : ${report.jailbreak.detected ? "YES" : "NO"}

----------------------------------

Recommendation

${report.risk.recommendation}

Click OK to continue or Cancel to review your prompt.
`;

        return confirm(message);

    }

    return {

        review

    };

})();