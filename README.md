# Hollow 🤖

**Hollow** is a friendly, AI-powered Discord bot built with Node.js and Cohere. It uses slash commands to chat with users and provides context-aware responses by remembering recent conversation history. Ideal for help, Q&A, or just casual conversation in your Discord server.

![Hollow Bot](https://img.shields.io/badge/Built%20With-Discord.js-blue?style=flat&logo=discord) ![Cohere](https://img.shields.io/badge/Powered%20By-Cohere-orange?style=flat&logo=cohere)

---

## ✨ Features

- `/ask` slash command for natural conversations  
- Per-user memory for context-aware replies  
- Uses Cohere's `command` model for generating responses  
- Friendly personality with customizable prompt  
- 24/7 hosting compatible with Render and UptimeRobot  

---

## 🧠 Example Usage

```bash
/ask question: What's the meaning of life?
```

🚀 Getting Started
1. Clone the Repository
```bash
Copy
Edit
git clone https://github.com/your-username/hollow.git
cd hollow
2. Install Dependencies
```
Copy
Edit
npm install
3. Create a .env File
Make a .env file in the root directory with the following content:

env
Copy
Edit
DISCORD_TOKEN=your_discord_bot_token
COHERE_API_KEY=your_cohere_api_key
CLIENT_ID=your_discord_client_id
GUILD_ID=your_test_server_id
PORT=3000
You can find your Discord IDs in the Discord Developer Portal.

🔧 Build & Run
Run Locally
bash
Copy
Edit
node index.js
Deploy on Render
Connect your GitHub repo

Create a Web Service

Set the Build Command:

nginx
Copy
Edit
npm install
Set the Start Command:

nginx
Copy
Edit
node index.js
Add these environment variables:

DISCORD_TOKEN

COHERE_API_KEY

CLIENT_ID

GUILD_ID

PORT = 3000

Deploy your service!

🔁 Keep Alive (Optional)
To keep Hollow running 24/7 on Render (free tier), use:

A simple Express server that responds to GET /

UptimeRobot to ping your Render URL every 5 minutes

js
Copy
Edit
// Add this to index.js
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Hollow is alive!'));
app.listen(process.env.PORT || 3000);
🧩 Tech Stack
Discord.js v14

Cohere AI

Node.js

Express

📜 License
MIT License.
Feel free to use, modify, and improve!

👤 Author
Made with 💙 by LostInDark
Your friendly ghost-bot 👻
