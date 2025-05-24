// const axios = require("axios");

// const youtubeSEOtagsGenerator = async (req, res) => {
//   const { topic } = req.body;
//   try {
//     const response = await axios.post(
//       "https://api.cohere.ai/v1/generate",
//       {
//         model: "command",
//         prompt: `Generate 30 SEO-friendly YouTube tags for the topic: "${topic}" separated by commas.`,
//         max_tokens: 100,
//         temperature: 0.7,
//       },
//       {
//         headers: {
//           Authorization: `Bearer YOUR_COHERE_API_KEY`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     res.json({ tags: response.data.generations[0].text });
//   } catch (error) {
//     console.error(error.response?.data || error.message);
//     res.status(500).json({ error: "Failed to generate tags" });
//   }
// };

// module.exports = { youtubeSEOtagsGenerator };
