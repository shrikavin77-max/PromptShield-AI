import streamlit as st
from backend.evaluation_engine import evaluate

def show_home():

    st.title("🛡️ PromptShield AI")
    st.caption("AI Privacy Firewall for Large Language Models")

    st.markdown("---")

    st.subheader("📝 Enter Your Prompt")

    prompt = st.text_area(
        label="",
        placeholder="Example: My Aadhaar number is 1234 5678 9012. Explain Income Tax...",
        height=220
    )

    analyze = st.button(
        "🔍 Analyze Prompt",
        use_container_width=True
    )

    if analyze:

        if prompt.strip() == "":
            st.warning("Please enter a prompt.")
            return

        with st.spinner("Analyzing Prompt..."):

            result = evaluate(prompt)

        st.success("Analysis Completed")

        st.markdown("---")

        col1, col2, col3 = st.columns(3)

        with col1:
            st.metric(
                "Risk Level",
                result["risk_level"]
            )

        with col2:
            st.metric(
                "Privacy Level",
                result["privacy_level"]
            )

        with col3:
            st.metric(
                "Privacy Score",
                f'{100-result["risk_score"]}%'
            )

        st.progress((100-result["risk_score"]) / 100)

        st.markdown("---")

        st.subheader("🚨 Sensitive Data Found")

        if len(result["findings"]) == 0:

            st.success("✅ No sensitive information detected.")

        else:

            for item in result["findings"]:

                st.error(item)

        st.markdown("---")

        st.subheader("🛡️ Protected Prompt")

        st.code(result["masked_prompt"])

        st.markdown("---")

        st.subheader("🤖 AI Response")

        st.write(result["response"])

        st.markdown("---")

        st.subheader("💡 AI Safety Tips")

        tips = [
            "Never share passwords with AI.",
            "Avoid exposing API keys.",
            "Mask personal identifiers before prompting.",
            "Review AI responses before using them."
        ]

        for tip in tips:

            st.info(tip)