// background.js

chrome.runtime.onInstalled.addListener(() => {

    console.log("🛡 PromptShield AI installed successfully.");

});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.action === "ping") {

        sendResponse({
            status: "PromptShield Active"
        });

    }

    return true;

});