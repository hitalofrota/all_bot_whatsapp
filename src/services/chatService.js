const openaiConfig = require('../config/openaiConfig');
const fetch = require('node-fetch');

async function askChatGPT(message) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiConfig.openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
        temperature: 0.7
      })
    });

    const data = await response.json();

    // Verifica se há erro na resposta da OpenAI
    if (data.error) {
      console.error("❌ Erro da OpenAI:", data.error.message);
      return "Desculpe, houve um erro ao processar sua pergunta.";
    }

    // Garante que há uma resposta antes de acessar 'choices'
    if (!data.choices || data.choices.length === 0) {
      console.error("❌ Resposta inesperada da OpenAI:", data);
      return "Não consegui entender sua solicitação. Tente novamente.";
    }

    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("❌ Erro ao se comunicar com o ChatGPT:", error);
    return "Desculpe, ocorreu um erro ao processar sua solicitação.";
  }
}

module.exports = { askChatGPT };
