// content.js
// PromptShield AI - Chrome Extension Content Integration

let promptBox = null;
let safetyWidgetLoaded = false;

function loadScript(file) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = chrome.runtime.getURL("scripts/" + file);
        script.onload = () => {
            script.remove();
            resolve();
        };
        document.documentElement.appendChild(script);
    });
}

async function initializePromptShield() {

    const scripts = [
        "scanner.js",
        "masker.js",
        "risk.js",
        "prompt_injection.js",
        "jailbreak_detector.js",
        "safety_engine.js",
        "safe_send.js",
        "widget.js"
    ];

    for (const script of scripts) {
        await loadScript(script);
    }

    if (typeof createSafetyWidget === "function") {
        createSafetyWidget();
        safetyWidgetLoaded = true;
    }

    console.log("PromptShield AI loaded");
}


function findInputBox() {

    const selectors = [
        "textarea",
        "textarea[placeholder]",
        "div[contenteditable='true']"
    ];

    for (const selector of selectors) {
        const element = document.querySelector(selector);

        if (element) {
            return element;
        }
    }

    return null;
}


function getPromptText() {

    if (!promptBox)
        return "";

    if (promptBox.tagName === "TEXTAREA") {
        return promptBox.value;
    }

    return promptBox.innerText;
}


async function scanPrompt() {

    const text = getPromptText();

    if (!text)
        return;


    let result = {};

    try {

        if (typeof runSafetyEngine === "function") {

            result = await runSafetyEngine(text);

        }

    } catch(error){

        console.log(
            "Safety engine error:",
            error
        );

    }


    if (safetyWidgetLoaded &&
        typeof updateSafetyWidget === "function") {

        updateSafetyWidget(result);
    }


    chrome.runtime.sendMessage({

        type:"PROMPT_SCAN",

        data:result

    });

}



function attachInputListener(){

    promptBox = findInputBox();


    if(!promptBox)
        return;


    console.log(
        "Prompt box detected",
        promptBox
    );


    promptBox.addEventListener(
        "input",
        scanPrompt
    );


    interceptSendButtons();

}



function interceptSendButtons(){

    document.addEventListener(
        "click",
        async(event)=>{


        const button =
        event.target.closest(
            "button"
        );


        if(!button)
            return;


        const text =
        button.innerText.toLowerCase();


        if(
            text.includes("send") ||
            text.includes("submit")
        ){

            const prompt =
            getPromptText();


            let decision =
            {
                allow:true
            };


            if(
                typeof safeSendCheck === "function"
            ){

                decision =
                await safeSendCheck(
                    prompt
                );

            }


            if(
                decision.allow === false
            ){

                event.preventDefault();

                event.stopPropagation();


                alert(
                "🛡 PromptShield blocked this prompt.\n\nReason:\n"
                +
                (decision.reason ||
                "Safety risk detected")
                );


                return false;
            }


        }

    },
    true
    );

}



setTimeout(
    initializePromptShield,
    1000
);


setInterval(
    attachInputListener,
    2000
);