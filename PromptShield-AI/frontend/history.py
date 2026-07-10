import streamlit as st
from backend.history_manager import get_history


def show_history():

    st.title("📜 Prompt History")

    history = get_history()

    if len(history) == 0:
        st.info("No history available.")
        return

    for index, item in enumerate(history, start=1):

        with st.expander(f"Prompt {index}"):

            st.write("### Original Prompt")
            st.write(item["original_prompt"])

            st.write("### Masked Prompt")
            st.code(item["masked_prompt"])

            st.write("### Risk Level")
            st.write(item["risk_level"])

            st.write("### Privacy Level")
            st.write(item["privacy_level"])

            st.write("### Findings")
            st.write(item["findings"])

            st.write("### AI Response")
            st.write(item["response"])