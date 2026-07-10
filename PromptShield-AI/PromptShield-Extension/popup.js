const scoreElement = document.getElementById("privacyScore");
const riskElement = document.getElementById("riskLevel");
const findingsElement = document.getElementById("findings");

const scanButton = document.getElementById("scanButton");
const maskButton = document.getElementById("maskButton");

// Update popup UI
function updateUI(result) {

    findingsElement.innerHTML = "";

    if (result.findings.length === 0) {

        findingsElement.innerHTML =
            "<li>✅ No sensitive information detected.</li>";

    } else {

        result.findings.forEach(item => {

            const li = document.createElement("li");
            li.textContent = item;
            findingsElement.appendChild(li);

        });

    }

    scoreElement.textContent = result.score;
    riskElement.textContent = result.risk;

    if (result.score >= 80) {

        scoreElement.style.color = "#16a34a";
        riskElement.style.color = "#16a34a";

    }

    else if (result.score >= 50) {

        scoreElement.style.color = "#f59e0b";
        riskElement.style.color = "#f59e0b";

    }

    else {

        scoreElement.style.color = "#dc2626";
        riskElement.style.color = "#dc2626";

    }

}

// Scan Button
scanButton.addEventListener("click", () => {

    chrome.tabs.query(
        {
            active: true,
            currentWindow: true
        },
        (tabs) => {

            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    action: "scanPrompt"
                },
                (response) => {

                    if (chrome.runtime.lastError) {

                        alert("PromptShield is not active on this page.");
                        return;

                    }

                    updateUI(response);

                }
            );

        }
    );

});

// Mask Button
maskButton.addEventListener("click", () => {

    chrome.tabs.query(
        {
            active: true,
            currentWindow: true
        },
        (tabs) => {

            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    action: "maskPrompt"
                },
                () => {

                    if (chrome.runtime.lastError) {

                        alert("Unable to mask the prompt.");
                        return;

                    }

                    alert("Sensitive information masked successfully.");

                }
            );

        }
    );

});