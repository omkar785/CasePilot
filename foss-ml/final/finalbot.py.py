import streamlit as st
import lamini

# Initialize the Lamini LLM with API key and model name
LLM_API_KEY = "your_key"
llm = lamini.Lamini(api_key=LLM_API_KEY, model_name="480e81c47a63225c1e85da14852fa0c17843b9a6967405931c7fc87d9478bba0")

# Streamlit UI
st.set_page_config(page_title="Legal Chatbot", page_icon="🤖")
st.title("⚖️ Legal Chatbot")
st.write("Ask me anything about IPC, CrPC, or the Constitution!")

# Session State for Conversational Memory
if "messages" not in st.session_state:
    st.session_state["messages"] = []

# Display chat history
for message in st.session_state["messages"]:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# User Input
user_input = st.chat_input("Type your legal query here...")

if user_input:
    # Display user message
    st.session_state["messages"].append({"role": "user", "content": user_input})
    with st.chat_message("user"):
        st.markdown(user_input)

    # Get response from Lamini LLM
    response = llm.generate(user_input)

    # Display chatbot response
    st.session_state["messages"].append({"role": "assistant", "content": response})
    with st.chat_message("assistant"):
        st.markdown(response)
