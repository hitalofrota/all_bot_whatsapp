const fetch = require('node-fetch');
require('dotenv').config();

console.log("env", process.env.OPENAI_API_KEY)

async function testAPI() {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Olá, como você está?" }],
        temperature: 0.7
      })
    });

    const data = await response.json();
    console.log("💬 Resposta do ChatGPT:", data);
  } catch (error) {
    console.error("❌ Erro ao acessar a API:", error);
  }
}

testAPI();
