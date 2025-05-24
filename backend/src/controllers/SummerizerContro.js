// const axios = require("axios");
// const dotenv = require("dotenv");

// import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

// const HF_API_TOKEN = process.env.HF_API_TOKEN;
// if (!HF_API_TOKEN) {
//   console.log("Error: HF_API_TOKEN is not defined in .env file");
// }

import Summarizer from "node-summarizer";
const summarizerManager = Summarizer.SummarizerManager;

const Summnerize = async (req, res) => {
  const { text, ratio } = req.body;

  if (!text || text.length < 250) {
    return res.status(200).json({ error: "Please provide longer text." });
  }

  try {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    const totalSentences = sentences.length;

    if (totalSentences === 0) {
      return res.status(400).json({
        error: "Unable to process the text. Please provide valid input.",
      });
    }

    const percent = ratio || 30;
    const numSentences = Math.max(
      1,
      Math.round((percent / 100) * totalSentences)
    );

    const summarizer = new summarizerManager(text, numSentences);
    const summary = await summarizer.getSummaryByRank();

    res.status(200).json({ summary: summary.summary });
  } catch (error) {
    console.error("Summarization error:", error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
};

export default Summnerize;

// const { text } = req.body;
// try {
//   const response = await axios.post(
//     "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
//     { inputs: text },
//     {
//       headers: {
//         Authorization: `Bearer ${HF_API_TOKEN}`,
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       timeout: 30000,
//     }
//   );
//   res.json({ summary: response.data[0].summary_text });
// } catch (err) {
//   console.error("Summarization error:", err.response?.data || err.message);
//   res.status(500).json({ error: "Failed to summarize text" });
// }

// const tokenizer = new natural.SentenceTokenizer();
// const sentences = tokenizer.tokenize(text, 3);
// const summary = sentences.slice(0, 3).join(" ");
// const pipe = await pipeline("summarization");
// const summary = await pipe(text, { max_length: 30, min_length: 20 });
// console.log(summary);
// res.json({ summary });
