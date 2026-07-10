import streamlit as st
from backend.history_manager import get_history


def show_dashboard():

    st.title("📊 Dashboard")

    history = get_history()

    total = len(history)

    low = sum(1 for item in history if item["risk_level"] == "LOW")
    medium = sum(1 for item in history if item["risk_level"] == "MEDIUM")
    high = sum(1 for item in history if item["risk_level"] == "HIGH")
    critical = sum(1 for item in history if item["risk_level"] == "CRITICAL")

    c1, c2, c3, c4, c5 = st.columns(5)

    c1.metric("Total", total)
    c2.metric("Low", low)
    c3.metric("Medium", medium)
    c4.metric("High", high)
    c5.metric("Critical", critical)

    st.divider()

    if total == 0:
        st.info("No prompts analyzed yet.")
        return

    st.subheader("Recent Evaluations")

    st.dataframe(history, use_container_width=True)