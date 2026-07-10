import os
import streamlit as st

from backend.history_manager import get_history
from backend.report_generator import create_pdf


def show_reports():

    st.title("📄 Reports")

    history = get_history()

    if len(history) == 0:
        st.warning("No reports available.")
        return

    latest = history[-1]

    if st.button("Generate PDF Report", use_container_width=True):

        os.makedirs("reports", exist_ok=True)

        filename = "reports/PromptShield_Report.pdf"

        create_pdf(latest, filename)

        st.success("Report Generated Successfully!")

        with open(filename, "rb") as file:

            st.download_button(
                label="⬇ Download Report",
                data=file,
                file_name="PromptShield_Report.pdf",
                mime="application/pdf"
            )