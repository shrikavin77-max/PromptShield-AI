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

pages = {
    "🏠 Home": show_home,
    "📊 Dashboard": show_dashboard,
    "📜 History": show_history,
    "📄 Reports": show_reports,
    "⚙ Settings": show_settings,
}

st.sidebar.title("🛡 PromptShield AI")

selection = st.sidebar.radio(
    "Navigation",
    list(pages.keys())
)

pages[selection]()