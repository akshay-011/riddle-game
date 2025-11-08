# **🧠 The Gemini Riddle Engine**

A personal project combining web development and puzzle-solving, featuring challenging logic riddles generated and validated by the Gemini AI model.

## **🌟 Project Overview**

This application serves up complex logic riddles to the user. The core mechanics involve:

1. **Riddle Generation:** Using the **Gemini API** to generate fresh, unique riddles in a structured JSON format.  
2. **User Interaction:** Displaying the riddle and allowing the user up to **three attempts** to input the correct solution.  
3. **Answer Validation:** Sending both the user's input and the stored correct answer to the Gemini model for a flexible, robust, boolean comparison.

## **🛠️ Tech Stack**

| Technology | Purpose |
| :---- | :---- |
| **Next.js** | Full-stack React framework (using API Routes for secure backend logic). |
| **TypeScript** | For type safety and robust development. |
| **Gemini API** | Generates riddles and validates user answers securely on the server. |
| **Vercel / Netlify** | Free hosting platform supporting Next.js serverless functions. |

## **🚀 Getting Started**

### **Prerequisites**

* Node.js (LTS version)  
* A Gemini API Key (get yours from Google AI Studio)  
* A GitHub account (for easy deployment)

### **Installation**

1. **Clone the Repository:**  
   git clone \[your-repo-link\]  
   cd riddle-app

2. **Install Dependencies:**  
   npm install  
   \# or  
   yarn install

3. Setup Environment Variables:  
   Create a file named .env.local in the project root and add your API key:  
   \# Your Gemini API Key \- CRITICAL for API Routes  
   GEMINI\_API\_KEY="YOUR\_API\_KEY\_HERE"

4. **Run Locally:**  
   npm run dev

The application will be accessible at http://localhost:3000.

## **🔑 Core AI Logic**

The application uses two primary API calls to the Gemini model: one for generation and one for validation. Both calls are executed securely within **Next.js API Routes** (e.g., pages/api/generateRiddle.ts and pages/api/checkAnswer.ts) to prevent API key exposure.

### **1\. Riddle Generation Prompt**

This prompt ensures the model returns a structured riddle perfect for immediate use in the application state.

{  
  "role": "system",  
  "content": "You are an expert riddle generator. Your task is to create a single, challenging, multi-step logic riddle. The riddle must be solvable by pure logic and simple arithmetic. Respond ONLY with a single JSON object that strictly adheres to the following structure. Do not include any additional text, explanation, or markdown outside of the JSON block."  
}  
// Followed by the user prompt specifying the JSON structure:  
{  
  "title": "A concise and catchy title for the riddle.",  
  "challenge\_level": "Hard",  
  "riddle\_text": "The full, complete text of the riddle, including all constraints and conditions. Ensure this text is clear and contains everything needed to solve the problem.",  
  "correct\_answer": "The concise, final numerical or textual solution to the riddle (e.g., '17 minutes' or 'The letter N')."  
}

### **2\. Answer Validation Prompt**

When the user submits an answer, this prompt is used to perform a flexible, AI-powered comparison.

{  
  "role": "system",  
  "content": "You are a riddle validator. You are provided with a 'Correct Answer' and a 'User Input'. Your sole task is to determine if the user input is logically and substantively correct, even if phrased differently than the correct answer. For example, '17 minutes' and 'Seventeen minutes' should be true. Respond ONLY with a single JSON object containing a boolean value. Do not add any extra explanation."  
}  
// Followed by the user prompt with the data:  
{  
  "correct\_answer\_string": "\[The stored correct answer from the generated JSON\]",  
  "user\_input\_string": "\[The text submitted by the user\]",  
  "is\_correct": "\[true/false\]"  
}

## **☁️ Deployment**

This application is designed for easy serverless deployment.

1. Commit your code to a Git repository (e.g., GitHub).  
2. Connect your repository to **Vercel** or **Netlify**.  
3. Configure the GEMINI\_API\_KEY as a **Production Environment Variable** within the hosting platform's dashboard.  
4. Deploy\! Vercel/Netlify will handle the build and hosting of your Next.js application, including the API routes.

## **🎨 UI/UX Notes**

The design focus should be on **readability and concentration**.

* **Suggested Theme:** Minimalist, perhaps a dark or muted light theme to reduce distraction.  
* **Key Elements:** A clear display area for the riddle, a single focused input box, and a prominent counter for the **3 remaining attempts**.  
* **Libraries for Quick UI:** Shadcn/UI (using Tailwind CSS) is highly recommended for a modern, component-driven approach.