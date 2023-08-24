import React, { useState } from 'react';
import OpenAI from 'openai';
import Layout from '../Layout';

const SentimentAnalyzer = () => {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState('');

  const analyzeSentiment = async () => {
    const openai = new OpenAI({
      apiKey: 'TU_API_KEY_DE_OPENAI', // Reemplaza con tu API Key de OpenAI
    });

    try {
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Cambia al modelo adecuado
        messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: text }],
      });

      const sentimentResult = chatCompletion.choices[0].message?.content?.trim();
      setSentiment(sentimentResult);
    } catch (error) {
      console.error('Sentiment analysis failed:', error);
    }
  };

  return (
    <Layout>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={analyzeSentiment}>Analyze Sentiment</button>
      {sentiment && <p>Sentiment: {sentiment}</p>}
    </Layout>
  );
};

export default SentimentAnalyzer;
