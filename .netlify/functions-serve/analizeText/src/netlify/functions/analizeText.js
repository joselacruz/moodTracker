// netlify/functions/analizeText.js
exports.handler = async (event) => {
  const text = event.queryStringParameters?.text ?? "";
  if (!text) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Text is required!" })
    };
  }
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Eres un especialista en an\xE1lisis de sentimientos, aprovechando tu experiencia en procesamiento de lenguaje natural e inteligencia emocional. Analiza el sentimiento del texto proporcionado y dime a cual mood se acerca mas:\n\n- Feliz\n- Triste\n- Neutral\n- Enojado\n- Horrible\n\nSolo responde con el mood y si no se ajusta a ningun mood responde :debes escribir de una manera mas descriptiva porque te sientes asi "
          },
          {
            role: "user",
            content: text
          }
        ]
      })
    });
    const body = await res.json();
    return {
      statusCode: 200,
      body: JSON.stringify(body)
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error })
    };
  }
};
//# sourceMappingURL=analizeText.js.map
