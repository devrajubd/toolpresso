// import { useState } from "react";
// import axios from "axios";

// function YouTubeSEOTagsGenerator() {
//   const [topic, setTopic] = useState("");
//   const [tags, setTags] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const generateTags = async () => {
//     if (!topic.trim()) return;

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         "https://api.cohere.ai/v1/generate",
//         {
//           model: "command",
//           prompt: `Generate 30 highly SEO-optimized YouTube tags for the topic: "${topic}". Separate each tag by comma.`,
//           max_tokens: 100,
//           temperature: 0.7,
//         },
//         {
//           headers: {
//             Authorization: `Bearer YOUR_COHERE_API_KEY`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const result = response.data.generations[0].text;
//       const cleanedTags = result
//         .split(",")
//         .map((tag) => tag.trim())
//         .filter((tag) => tag.length > 0);
//       setTags(cleanedTags);
//     } catch (err) {
//       alert("Error generating tags. Please try again.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(tags.join(", "));
//     alert("Tags copied to clipboard!");
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 text-center">
//       <h1 className="text-2xl font-bold mb-4">
//         YouTube SEO Tags Generator (AI)
//       </h1>
//       <input
//         type="text"
//         placeholder="Enter video topic (e.g. photoshop tutorial)"
//         className="w-full p-3 border rounded mb-4"
//         value={topic}
//         onChange={(e) => setTopic(e.target.value)}
//       />
//       <button
//         onClick={generateTags}
//         disabled={loading}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         {loading ? "Generating..." : "Generate with AI"}
//       </button>

//       {tags.length > 0 && (
//         <div className="mt-6 text-left">
//           <h2 className="font-semibold mb-2">Generated Tags:</h2>
//           <div className="bg-gray-100 p-3 rounded text-sm">
//             {tags.join(", ")}
//           </div>
//           <button
//             onClick={handleCopy}
//             className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             Copy Tags
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default YouTubeSEOTagsGenerator;
