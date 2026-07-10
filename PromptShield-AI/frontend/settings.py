import streamlit as st


def show_settings():

    st.title("⚙ Settings")

    st.subheader("Model")

    st.info("Groq • Llama 3.3 70B Versatile")

    st.subheader("Application")

    st.write("Version : 1.0")

    st.write("Developer : Shri Kavin DK")

    st.write("Framework : Streamlit")

    st.write("Database : In-Memory (SQLite coming in v2)")

    st.success("PromptShield AI is ready.")