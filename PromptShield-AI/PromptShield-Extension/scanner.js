/*
====================================================
PromptShield AI
scanner.js

Detects sensitive information using regular expressions.
Returns standardized findings used across the extension.
====================================================
*/

const Scanner = (() => {

    const RULES = [

        {
            type: "Email Address",
            severity: "HIGH",
            regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g
        },

        {
            type: "Phone Number",
            severity: "MEDIUM",
            regex: /\b(?:\+91[-\s]?)?[6-9]\d{9}\b/g
        },

        {
            type: "Aadhaar Number",
            severity: "CRITICAL",
            regex: /\b\d{4}\s?\d{4}\s?\d{4}\b/g
        },

        {
            type: "PAN Number",
            severity: "HIGH",
            regex: /\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/g
        },

        {
            type: "Passport Number",
            severity: "HIGH",
            regex: /\b[A-PR-WYa-pr-wy][1-9]\d{6}\b/g
        },

        {
            type: "Bank Account Number",
            severity: "CRITICAL",
            regex: /\b\d{9,18}\b/g
        },

        {
            type: "IFSC Code",
            severity: "HIGH",
            regex: /\b[A-Z]{4}0[A-Z0-9]{6}\b/g
        },

        {
            type: "Credit Card",
            severity: "CRITICAL",
            regex: /\b(?:\d[ -]*?){13,19}\b/g
        },

        {
            type: "CVV",
            severity: "CRITICAL",
            regex: /\b\d{3,4}\b/g
        },

        {
            type: "UPI ID",
            severity: "HIGH",
            regex: /\b[\w.-]+@[a-zA-Z]+\b/g
        },

        {
            type: "API Key",
            severity: "CRITICAL",
            regex: /\b(?:sk|gsk|AIza|AKIA|ghp|gho|xoxb|xoxp)[A-Za-z0-9_\-]{16,}\b/g
        },

        {
            type: "Password",
            severity: "CRITICAL",
            regex: /password\s*[:=]\s*['"]?.+?['"]?(?:\s|$)/gi
        },

        {
            type: "JWT Token",
            severity: "CRITICAL",
            regex: /\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/g
        },

        {
            type: "IPv4 Address",
            severity: "LOW",
            regex: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g
        }

    ];

    function scanPrompt(text) {

        const findings = [];

        if (!text || text.trim() === "")
            return findings;

        RULES.forEach(rule => {

            const matches = text.match(rule.regex);

            if (!matches)
                return;

            matches.forEach(match => {

                findings.push({

                    type: rule.type,

                    severity: rule.severity,

                    value: match

                });

            });

        });

        return findings;

    }

    return {

        scanPrompt

    };

})();