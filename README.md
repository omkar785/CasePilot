# CasePilot

## Created During : 
<table>
    <tr>
      <th>Event Logo</th>
      <th>Event Name</th>
      <th>Event Description</th>
    </tr>
    <tr>
        <td><img src="foss-hack-logo.png" width="200" height="auto"/></td>
        <td>FossHack 2025</td>
        <td>FOSS Hack 2025 is the fifth edition of FOSS Hack, a hybrid hackathon to promote Free and Open Source Software by bringing together students and professionals to build or extend FOSS projects.
    </tr>
</table>

## Introduction

- [Introduction](#-Introduction)
- [Demo Video](#-Demo-Video)
- [Features](#-Features)
- [Future Plans](#-Future-Plans)
- [Installation](#-Installation)
- [How to Contribute?](#-How-to-Contribute)
- [Tech Stack](#-Tech-Stack)
- [Datasets Used](#-Datasets)

## 📝 Introduction

Welcome to **CasePilot**, a comprehensive platform designed to bridge the gap between clients and lawyers while simplifying the legal process. CasePilot empowers users to find affordable legal assistance, helps lawyers manage cases efficiently, and provides intelligent tools like a precedent finder, legal chatbot, and automated legal notice generator. Whether you're a lawyer or someone seeking legal support, CasePilot makes legal navigation easier and more accessible.

## 🎥 Demo Video


## 📸 Screenshots

## ⭐ Features

- **Lawyer-Client Matching:** Connects users with lawyers based on expertise, fees, and past cases.
- **Precedent Finder:** Uses cosine similarity to find and present legal precedents related to a given case description.
- **Legal Chatbot:** Provides instant responses to legal queries through an AI-powered chatbot fine-tuned on legal Q&A.
- **Automated Legal Notice Generation:** Generates legal notices from customizable templates with user inputs.
- **Lawyer Dashboard:** Displays case histories, documents, and client interactions for seamless case management.

## 🚀 Future Plans

- **AI Case Summarization:** Implementing AI-driven case summaries to provide concise overviews of complex cases.
- **Multi-Language Support:** Enabling the platform to work across multiple languages for broader accessibility.
- **Section finding form text:** Automating the identification of legal sections relevant to a case description.

## ⚙️ Installation

1. Clone the Repository

```bash
git clone https://github.com/FOSS-Hack/CasePilot.git
```

2. Install Dependencies

```bash
cd CasePilot
npm install
```

3. Set Up Environment Variables

Create a `.env` file in the root directory and add your Supabase and other required credentials.

4. Run the Application

```bash
npm run dev
```

## 🤝 How to Contribute?

CasePilot is an open-source project, and we welcome contributions from the community! Follow these steps to get started:

1. **Fork the Repository:** Click "Fork" on GitHub to copy the repository to your account.
2. **Clone Your Fork:**

```bash
git clone https://github.com/your-username/CasePilot.git
```

3. **Create a Branch:**

```bash
git checkout -b feature-or-bugfix-name
```

4. **Make Changes & Commit:**

```bash
git commit -m "Add your change description"
```

5. **Push to Your Fork:**

```bash
git push origin feature-or-bugfix-name
```

6. **Submit a Pull Request:** Open a pull request and provide a detailed explanation of your changes.

If you encounter any issues, feel free to open a ticket in the [Issues](https://github.com/FOSS-Hack/CasePilot/issues) section.

## 💻 Tech Stack

- **Next.js:** Framework for the frontend and server-side rendering.
- **Supabase:** Open-source backend for authentication and database management.
- **Python:** For advanced AI models like precedent finding using cosine similarity and chatbot functionalities.

## 📊 Datasets

LLM Fine-Tuning Dataset of Indian Legal Texts - https://www.kaggle.com/datasets/akshatgupta7/llm-fine-tuning-dataset-of-indian-legal-texts

Supreme Court of India - 2025 Volumes 1 & 2 - https://digiscr.sci.gov.in/

Thank you for being a part of CasePilot! Your contributions and support make a difference. 🚀


