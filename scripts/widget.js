/*
========================================================
PromptShield AI
Floating AI Safety Widget
========================================================
*/

const PromptShieldWidget = (() => {

    let widget;

    function createWidget() {

        if (document.getElementById("promptshield-widget"))
            return;

        widget = document.createElement("div");

        widget.id = "promptshield-widget";

        widget.innerHTML = `
            <div class="ps-header">
                🛡 PromptShield AI
            </div>

            <div class="ps-score">
                Safety Score:
                <span id="ps-score">100</span>/100
            </div>

            <div id="ps-risk">
                🟢 SAFE
            </div>

            <div id="ps-details">
                No issues detected.
            </div>
        `;

        widget.style.position = "fixed";
        widget.style.top = "20px";
        widget.style.right = "20px";
        widget.style.width = "280px";
        widget.style.background = "#111827";
        widget.style.color = "white";
        widget.style.padding = "16px";
        widget.style.borderRadius = "12px";
        widget.style.boxShadow = "0 6px 20px rgba(0,0,0,.3)";
        widget.style.zIndex = "999999";
        widget.style.fontFamily = "Arial";
        widget.style.fontSize = "14px";

        document.body.appendChild(widget);

    }

    function update(score, risk, details) {

        createWidget();

        document.getElementById("ps-score").innerText = score;

        const riskDiv = document.getElementById("ps-risk");

        riskDiv.innerText = risk;

        if (risk === "SAFE")
            riskDiv.style.color = "#22c55e";

        else if (risk === "LOW")
            riskDiv.style.color = "#84cc16";

        else if (risk === "MEDIUM")
            riskDiv.style.color = "#facc15";

        else if (risk === "HIGH")
            riskDiv.style.color = "#fb923c";

        else
            riskDiv.style.color = "#ef4444";

        document.getElementById("ps-details").innerHTML = details;

    }

    return {

        createWidget,

        update

    };

})();