import csv
from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os

# # Load environment variables
load_dotenv()
llm = ChatGroq(groq_api_key=os.getenv("GROQ_API_KEY"), model_name="llama-3.3-70b-versatile")

# Define CSV file
csv_file = "case_summaries.csv"

# Read each text file and extract structured data
input_dir = "case_summaries"  # Folder containing your legal text files
output_data = []

for file_name in os.listdir(input_dir):
    if file_name.endswith(".txt"):
        with open(os.path.join(input_dir, file_name), "r", encoding="utf-8") as file:
            case_summary_text = file.read()

        # Use LLM to extract structured data
        response = llm.invoke(f"""
        Extract the following structured fields from the given legal case summary:
        
        **Input:** {case_summary_text}
        
        **Output format:**
        Case Title: [Case title]
        Case Type: [General Legal Domain]
        Case Category: [Specific Case Category]
        Legal Provisions & Charges: [Relevant legal sections]
        Judgment & Legal Reasoning: [Court decision & reasoning]
        Claims, Settlements & Fines: [Compensation, settlements, fines]
        """)  

        extracted_data = response.content.strip().split("\n")


        



        # Convert structured output into a dictionary
        case_details = {k.strip(): v.strip() for k, v in (line.split(":", 1) for line in extracted_data if ":" in line)}

        output_data.append([
            case_details.get("Case Title", "N/A"),
            case_details.get("Case Type", "N/A"),
            case_details.get("Case Category", "N/A"),
            case_details.get("Legal Provisions & Charges", "N/A"),
            case_details.get("Judgment & Legal Reasoning", "N/A"),
            case_details.get("Claims, Settlements & Fines", "N/A")
        ])

# Write to CSV
with open(csv_file, "w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerow(["Case Title", "Case Type", "Case Category", "Legal Provisions & Charges", "Judgment & Legal Reasoning", "Claims, Settlements & Fines"])
    writer.writerows(output_data)

print(f"CSV file saved at {csv_file}")


