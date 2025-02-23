import streamlit as st
import os
import shutil
from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyPDFDirectoryLoader
from dotenv import load_dotenv
import time

# Load environment variables
load_dotenv()
os.environ['GROQ_API_KEY'] = os.getenv("GROQ_API_KEY")
os.environ['HF_TOKEN'] = os.getenv("HF_TOKEN")

# Define paths
parent_dir = os.getcwd()  # Current working directory
pdf_dir = os.path.join(parent_dir, "research_papers")  # Directory where one PDF will be placed
output_dir = os.path.join(parent_dir, "outputs")  # Directory to store outputs

# Ensure output directory exists
os.makedirs(output_dir, exist_ok=True)

# Initialize LLM
llm = ChatGroq(
    groq_api_key=os.environ['GROQ_API_KEY'], 
    model_name="deepseek-r1-distill-qwen-32b", 
    temperature=0
)

# Define Chat Prompt Template
prompt = ChatPromptTemplate.from_template(
    """
    Answer the question concisely and accurately based on the given context.
    
    <context>
    {context}
    </context>
    
    Question: {input}
    """
)

# Function to create vector embeddings
def create_vector_embedding():
    st.session_state.clear()  # Clear session state before processing each new PDF

    st.session_state.embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    st.session_state.loader = PyPDFDirectoryLoader(pdf_dir)  # Load only one PDF
    st.session_state.docs = st.session_state.loader.load()  

    if not st.session_state.docs:
        print("No documents loaded! Skipping...")
        return False

    st.session_state.text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    st.session_state.final_documents = st.session_state.text_splitter.split_documents(st.session_state.docs)
    st.session_state.vectors = FAISS.from_documents(st.session_state.final_documents, st.session_state.embeddings)

    return True  # Successfully created vectors

# Process PDFs one by one
for pdf_file in os.listdir(parent_dir):
    if pdf_file.endswith(".pdf"):
        # Move the PDF to research_papers directory
        pdf_path = os.path.join(parent_dir, pdf_file)
        dest_path = os.path.join(pdf_dir, pdf_file)
        shutil.move(pdf_path, dest_path)
        print(f"Processing: {pdf_file}")

        # Run the program
        if create_vector_embedding():
            user_prompt = """

Provide a structured legal case summary strictly based on the following format:

Case Type:

Specify the general legal domain (Labor,Consumer Protection,Corporate, Criminal, Intellectual property,Tax, Civil, Human Rights, Family, Real Estate, Constitutional, Media, Entertainment, Medical, Immigration,Environmental, Finance, Banking).
Mention the specific case category (Unfair Labor Practices, Workplace Harassment, Defective Product Claims, Unfair Trade Practices, Corporate Governance Disputes, Breach of Fiduciary Duty, Financial Crimes (Fraud & Embezzlement), Drug-Related Offenses, Trade Secret Theft, Domain Name Disputes, Corporate Tax Litigation, International Taxation Issues, Tort Claims (Personal Injury & Negligence), Breach of Contract, Right to Equality Cases, Freedom of Speech Violations, Divorce & Alimony, Child Custody & Adoption, Property Disputes, Landlord-Tenant Disputes, Fundamental Rights Violations, Judicial Review Cases, Defamation & Libel, Music & Film Copyright Infringement, Medical Negligence & Malpractice, Pharmaceutical Liability, Deportation & Visa Violations, Citizenship & Naturalization Disputes, Pollution & Ecological Damage, Illegal Wildlife Trade & Poaching, Bankruptcy & Insolvency, Securities Fraud).
Legal Provisions & Charges:

Cite the relevant legal sections, statutes, or codes applicable to the case (e.g., Section 420 of IPC for fraud).
Parties Involved:

Identify the nature of the parties (Induvidual, Small Business, Large Corporation, Government).
If relevant, specify whether the case is between private entities, a public institution, or a regulatory authority.
Judgment & Legal Reasoning:

Provide the court's decision (e.g., Guilty, Not Guilty, Liable, Dismissed).
Summarize the legal reasoning or precedents that influenced the ruling.
Claims, Settlements & Fines:

Specify any compensation, settlement amounts, or fines imposed by the court.
Mention relevant legal provisions under which financial penalties or damages were awarded.

"""


            document_chain = create_stuff_documents_chain(llm, prompt)
            retriever = st.session_state.vectors.as_retriever()
            retrieval_chain = create_retrieval_chain(retriever, document_chain)

            start = time.process_time()
            response = retrieval_chain.invoke({'input': user_prompt})
            summary = response['answer']
            print(f"Response time: {time.process_time() - start}")

            # Save output to a text file
            output_file = os.path.join(output_dir, pdf_file.replace(".pdf", ".txt"))
            with open(output_file, "w", encoding="utf-8") as f:
                f.write(summary)

        # Move the processed PDF back
        shutil.move(dest_path, pdf_path)
        print(f"Completed: {pdf_file}")

print("Processing complete. Check the 'outputs' folder for results.")
