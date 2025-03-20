const openaiConfig = require('../config/openaiConfig');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// Carregar os prompts de treinamento do arquivo JSON
const promptsPath = path.join(__dirname, '../prompts/prompts.json');
const promptsData = JSON.parse(fs.readFileSync(promptsPath, 'utf8'));

async function askChatGPT(message) {
  try {
    // Verifica se há uma resposta pré-definida nos exemplos
    const foundExample = promptsData.examples.find(example => example.input.toLowerCase() === message.toLowerCase());
    if (foundExample) {
      console.log("🎯 Respondendo com base nos prompts treinados.");
      return foundExample.response;
    }

    // Se não houver resposta pré-definida, usa o ChatGPT
    console.log("💬 Enviando mensagem ao ChatGPT...");
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiConfig.openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Use "gpt-4" se sua conta permitir
        messages: [
          { role: "system", content: promptsData.context },
          { role: "user", content: message }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error("❌ Erro da OpenAI:", data.error.message);
      return "Desculpe, ocorreu um erro ao processar sua solicitação.";
    }

    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("❌ Erro ao se comunicar com o ChatGPT:", error);
    return "Desculpe, ocorreu um erro ao processar sua solicitação.";
  }
}

module.exports = { askChatGPT };
