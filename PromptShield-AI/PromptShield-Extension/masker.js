/*
====================================================
PromptShield AI
masker.js

Masks sensitive information detected by scanner.js
====================================================
*/

const Masker = (() => {

    const MASKS = {

        "Email Address": "[EMAIL]",

        "Phone Number": "[PHONE]",

        "Aadhaar Number": "[AADHAAR]",

        "PAN Number": "[PAN]",

        "Passport Number": "[PASSPORT]",

        "Bank Account Number": "[BANK_ACCOUNT]",

        "IFSC Code": "[IFSC]",

        "Credit Card": "[CARD]",

        "CVV": "[CVV]",

        "UPI ID": "[UPI_ID]",

        "API Key": "[API_KEY]",

        "Password": "[PASSWORD]",

        "JWT Token": "[JWT_TOKEN]",

        "IPv4 Address": "[IP_ADDRESS]"

    };

    function escapeRegex(text) {

        return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    }

    function maskPrompt(prompt) {

        if (!prompt || prompt.trim() === "")
            return "";

        let maskedPrompt = prompt;

        const findings = Scanner.scanPrompt(prompt);

        findings.forEach(item => {

            const replacement = MASKS[item.type] || "[REDACTED]";

            const regex = new RegExp(
                escapeRegex(item.value),
                "g"
            );

            maskedPrompt = maskedPrompt.replace(
                regex,
                replacement
            );

        });

        return maskedPrompt;

    }

    return {

        maskPrompt

    };

})();