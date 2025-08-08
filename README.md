# 📧 Reply with Gemini

**Reply_with_gemini** is an intelligent email assistant that helps users write smart, context-aware replies using the **Gemini (Ollama) AI model**. This project combines a **Chrome extension** for Gmail with a **Spring Boot** backend service.

---

## 🔧 Features

- 🧠 Auto-generate email replies using Gemini (via Ollama API)
- 📩 Integrated with Gmail compose window
- 🔗 Communicates between Chrome extension and backend via REST API
- ☁️ Lightweight and fast
- 💬 Customizable prompt-based reply generation

---

## 📁 Project Structure

Reply_with_gemini/
│
├── email-frontend/                # React frontend
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   └── EmailForm.jsx
│       ├── App.js
│       ├── index.js
│       └── App.css
│   ├── package.json
│   └── vite.config.js
│
├── email-backend/                # Spring Boot backend
│   ├── src/
│   │   └── main/
│   │       └── java/
│   │           └── com/
│   │               └── email/
│   │                   └── writer/
│   │                       ├── EmailWriterApplication.java
│   │                       ├── EmailGeneratorController.java
│   │                       ├── EmailGeneratorService.java
│   │                       ├── EmailRequest.java
│   │                       ├── OllamaService.java
│   │                       ├── OllamaRequest.java
│   │                       └── OllamaResponse.java
│   ├── pom.xml
│   └── application.properties
│
├── Email-extension/              # Chrome Extension
│   ├── content.js
│   ├── hello.html
│   └── manifest.json
│
├── README.md                     # Project documentation
└── .gitignore


yaml
Copy
Edit

---

## 🚀 How it Works

1. **User opens Gmail**  
2. Chrome extension **injects "Reply with Gemini" button**
3. When clicked, the email body is **sent to Spring Boot API**
4. Spring Boot API calls **Ollama (Gemini)** to generate a smart reply
5. Reply is **inserted directly** into the Gmail compose box

---

## 🛠️ Installation & Setup

### ✅ Chrome Extension Setup

1. Go to `chrome://extensions/`
2. Enable **Developer mode**
3. Click **"Load unpacked"**
4. Select the `Email-extension` folder

### ✅ Spring Boot Backend

# Navigate to project folder
cd Reply_with_gemini

# Build and run the Spring Boot app
./mvnw spring-boot:run
Make sure Ollama is installed and running locally with the Gemini model.

🌐 API Endpoint
css
Copy
Edit
POST /generate-email
Content-Type: application/json

Request Body:
{
  "input": "Original email content..."
}

Response:
{
  "response": "AI-generated reply..."
}
⚙️ Requirements
Chrome browser

Java 17+

Maven 3.6+

Ollama with Gemini model installed locally

📌 Future Enhancements
Add support for multiple models (e.g., GPT-4, Mistral)

User configuration panel for tone/formality

Store and suggest canned responses

Gmail API integration (optional)

🤝 Contributing
Pull requests are welcome! Feel free to open issues or suggest features.

📄 License
MIT License. See LICENSE file for details.

🙌 Credits
Built with ❤️ by @tvsantosh

yaml
Copy
Edit

---

Let me know if you want the README tailored further (like including images, demo gifs, or usage videos).








Ask ChatGPT
You said:
write all the content in one folder


ChatGPT said:
To place all your content into one single folder and push it to GitHub cleanly, follow these steps:

✅ STEP 1: Organize All Code into One Folder
Let’s say your single folder will be called: Reply_with_gemini

Inside it, structure everything like this:

pgsql
Copy
Edit
Reply_with_gemini/
│
├── email-frontend/                # React frontend
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   └── EmailForm.jsx
│       ├── App.js
│       ├── index.js
│       └── App.css
│   ├── package.json
│   └── vite.config.js
│
├── email-backend/                # Spring Boot backend
│   ├── src/
│   │   └── main/
│   │       └── java/
│   │           └── com/
│   │               └── email/
│   │                   └── writer/
│   │                       ├── EmailWriterApplication.java
│   │                       ├── EmailGeneratorController.java
│   │                       ├── EmailGeneratorService.java
│   │                       ├── EmailRequest.java
│   │                       ├── OllamaService.java
│   │                       ├── OllamaRequest.java
│   │                       └── OllamaResponse.java
│   ├── pom.xml
│   └── application.properties
│
├── Email-extension/              # Chrome Extension
│   ├── content.js
│   ├── hello.html
│   └── manifest.json
│
├── README.md                     # Project documentation
└── .gitignore

✅ STEP 2: Save the README.md Content
Create a file named README.md in the Reply_with_gemini folder and paste the full markdown content I gave you earlier.

✅ STEP 3: Reinitialize Git & Push
From the terminal:

bash
Copy
Edit
cd path/to/Reply_with_gemini

# Remove any existing git config if needed
rm -rf .git

# Initialize fresh Git repo
git init

# Add your new GitHub repo as origin
git remote add origin https://github.com/tvsantosh/Reply_with_gemini.git

# Stage and commit everything
git add .
git commit -m "Initial commit with combined extension and backend"

# Push to the main branch
git branch -M main
git push -u origin main
🔄 Now your GitHub repo will show:
Chrome extension files

Spring Boot backend

A clear project layout

A complete README file

Let me know if you want help creating a .gitignore, or adding an image/demo to the README.








