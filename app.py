import streamlit as st

from frontend.home import show_home
from frontend.dashboard import show_dashboard
from frontend.history import show_history
from frontend.reports import show_reports
from frontend.settings import show_settings

st.set_page_config(
    page_title="PromptShield AI",
    page_icon="🛡️",
    layout="wide"
)

st.sidebar.title("🛡 PromptShield AI")

page = st.sidebar.radio(
    "Navigation",
    [
        "Home",
        "Dashboard",
        "History",
        "Reports",
        "Settings"
    ]
)

if page == "Home":
    show_home()

elif page == "Dashboard":
    show_dashboard()

elif page == "History":
    show_history()

elif page == "Reports":
    show_reports()

elif page == "Settings":
    show_settings()