import json
import lamini
from lamini import Lamini

# Set API Key
lamini.api_key = "1ca583a43d9fe7b9fa12f447fe32c34bf1e89c64b08ad2980f63a5a2bd93f16d"

# Initialize LLaMA 3 model on Lamini
llm = Lamini(model_name="meta-llama/Meta-Llama-3-8B-Instruct")

# Function to load and preprocess dataset
def get_data():
    dataset_paths = [
        "datasets/ipc_qa.json",
        "datasets/crpc_qa.json",
        "datasets/constitution_qa.json"
    ]
    
    combined_data = []
    
    for path in dataset_paths:
        try:
            with open(path, "r", encoding="utf-8") as f:  # ✅ FIXED encoding issue
                data = json.load(f)
                
                # Validate data format
                if not isinstance(data, list):
                    raise ValueError(f"Dataset at {path} is not a list.")
                
                # Convert from 'question' & 'answer' to 'input' & 'output'
                cleaned_data = [
                    {"input": entry["question"], "output": entry["answer"]}
                    for entry in data
                    if isinstance(entry, dict) and "question" in entry and "answer" in entry and entry["question"] and entry["answer"]
                ]
                
                if not cleaned_data:
                    print(f"Warning: No valid data found in {path}")
                
                combined_data.extend(cleaned_data)
        
        except Exception as e:
            print(f"Error loading {path}: {e}")
    
    if not combined_data:
        raise ValueError("No valid data found in all datasets.")
    
    return combined_data

# Load and validate dataset
data = get_data()
print(f"Loaded {len(data)} valid samples for fine-tuning.")
print("Sample Data:", data[:3])  # Print first 3 samples for verification

# Start fine-tuning with appropriate learning rate
llm.tune(
    data_or_dataset_id=data,
    finetune_args={
        'learning_rate': 5.0e-5,  # Lower learning rate for stability
        'batch_size': 8,  # Adjust based on GPU memory
        'num_train_epochs': 3  # Experiment with more epochs if needed
    }
)

print("Fine-tuning started successfully.")
