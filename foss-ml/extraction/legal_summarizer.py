import fitz  # PyMuPDF for PDF text extraction
from transformers import BartTokenizer, BartForConditionalGeneration

# Load the LEXSUM model and tokenizer
def load_lexsum_model():
    model_name = "jpwahle/LEXSUM"
    tokenizer = BartTokenizer.from_pretrained(model_name)
    model = BartForConditionalGeneration.from_pretrained(model_name)
    return tokenizer, model

# Extract text from a PDF file
def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text("text") + "\n"
    return text.strip()

# Summarize text using LEXSUM
def summarize_text(text, tokenizer, model, max_length=512):
    inputs = tokenizer(text, return_tensors="pt", max_length=1024, truncation=True)
    summary_ids = model.generate(inputs.input_ids, max_length=max_length, min_length=50, length_penalty=2.0, num_beams=4, early_stopping=True)
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return summary

if __name__ == "__main__":
    pdf_path = "part1.pdf"  # Change this to your PDF file path
    tokenizer, model = load_lexsum_model()
    
    print("Extracting text from PDF...")
    text = extract_text_from_pdf(pdf_path)

    print("\nGenerating summary...")
    summary = summarize_text(text, tokenizer, model)

    print("\n=== Legal Document Summary ===")
    print(summary)
