import { useEffect, useState } from "react";
import emojisData from "../emojis/Emojis.json";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

function EmojiPicker() {
  const [selectedCategory, setSelectedCategory] = useState("Smileys & People");
  const [emojis, setEmojis] = useState([]);
  const [copied, setCopied] = useState("");
  const [selectedEmojis, setSelectedEmojis] = useState([]);

  useEffect(() => {
    setEmojis(emojisData[selectedCategory] || []);
  }, [selectedCategory]);

  const handleCopy = (emoji) => {
    navigator.clipboard.writeText(emoji);
    setCopied(emoji);
    setTimeout(() => setCopied(""), 1500);
  };

  const handleAddEmoji = (emoji) => {
    setSelectedEmojis((prev) => [...prev, emoji]);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(selectedEmojis.join(" "));
    setCopied("All emojis copied!");
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <>
      <Helmet>
        {/* <!-- Primary Meta Tags --> */}
        <title>Emoji Picker – Copy & Use Emojis Online | Toolpresso</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Use Toolpresso's free Emoji Picker to browse, search, and copy emojis instantly. Perfect for chats, social posts, and creative content."
        />
        <meta
          name="keywords"
          content="emoji picker, online emoji, copy emoji, emoji keyboard, emoji tool, search emojis, Toolpresso tools"
        />
        <meta name="author" content="Toolpresso" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://toolpresso.com/tools/emoji-picker"
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Emoji Picker – Copy & Use Emojis Online | Toolpresso"
        />
        <meta
          property="og:description"
          content="Quickly find and copy emojis using Toolpresso’s Emoji Picker. Boost your creativity in chats, emails, and social media posts."
        />
        <meta
          property="og:url"
          content="https://toolpresso.com/tools/emoji-picker"
        />
        <meta property="og:site_name" content="Toolpresso" />
      </Helmet>

      <Navbar />
      <div className="max-w-5xl mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-6">🎉 Emoji Picker</h1>
        <div className="mb-6">
          <select
            className="p-2 border rounded text-lg cursor-pointer"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {Object.keys(emojisData).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {selectedEmojis.length > 0 && (
          <div className="my-6 sticky top-5 bg-white p-4  rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Selected Emojis</h2>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {selectedEmojis.map((emoji, idx) => (
                <span
                  key={idx}
                  className="text-3xl p-2 border rounded cursor-pointer"
                  onClick={() => handleCopy(emoji)}
                >
                  {emoji}
                </span>
              ))}
            </div>

            <div className="space-y-2 sm:space-x-2">
              <button
                onClick={handleCopyAll}
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 cursor-pointer w-full sm:w-auto"
              >
                Copy All Selected Emojis
              </button>
              <button
                onClick={() => setSelectedEmojis("")}
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 cursor-pointe cursor-pointer w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
            {copied && (
              <p className="mt-4 text-green-600 font-semibold">
                {copied} copied to clipboard!
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 ">
          {emojis.map((emoji, idx) => (
            <div
              key={idx}
              className="bg-white border rounded-lg p-4 shadow hover:shadow-md flex flex-col items-center transition cursor-pointer"
              onClick={() => handleAddEmoji(emoji)}
            >
              <span className="text-3xl mb-2 ">{emoji}</span>
            </div>
          ))}
        </div>
      </div>
      {/* blog post  */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Emoji Picker – Copy and Use Emojis Easily Online
        </h1>

        <p className="text-lg text-gray-700 mb-4">
          Looking for a fast and easy way to copy emojis? Toolpresso’s{" "}
          <strong>Emoji Picker</strong> is a free online tool that allows you to
          browse, search, and copy emojis in just one click. Whether you’re
          writing a message, posting on social media, or designing content, our{" "}
          <strong>online emoji picker</strong> helps you add the perfect emoji
          instantly.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          What is an Emoji Picker?
        </h2>
        <p className="text-gray-700 mb-4">
          An <strong>emoji picker</strong> is an online tool that displays
          emojis categorized by type (like smileys, animals, symbols, etc.),
          allowing users to browse and select emojis to copy and paste.
          Toolpresso’s emoji picker offers a clean interface, fast search, and
          seamless copy functionality.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Features of Toolpresso Emoji Picker
        </h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>
            Browse emojis by category – Smileys, Animals, Food, Symbols, and
            more
          </li>
          <li>Instant search to find any emoji by name or keyword</li>
          <li>Click to copy emoji to clipboard</li>
          <li>Mobile-friendly and responsive design</li>
          <li>Free and no sign-up required</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Why Use an Online Emoji Picker?
        </h2>
        <p className="text-gray-700 mb-4">
          Emojis are everywhere — in social media, marketing, emails, and
          personal chats. Using an <strong>emoji picker online</strong> saves
          time, avoids switching apps, and provides quick access to a wide range
          of emojis in one place.
        </p>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>Save time while messaging</li>
          <li>Improve communication with expressive emojis</li>
          <li>Enhance your social media posts</li>
          <li>Use emojis in design and content creation</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          How to Use Toolpresso's Emoji Picker?
        </h2>
        <ol className="list-decimal ml-6 text-gray-700 mb-4">
          <li>Go to the Toolpresso Emoji Picker tool</li>
          <li>Search or browse emojis by category</li>
          <li>Click on any emoji to copy it</li>
          <li>Paste the emoji in any document, chat, or post</li>
        </ol>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Categories You’ll Find in Toolpresso’s Emoji Picker
        </h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>😀 Smileys & Emotion</li>
          <li>🐶 Animals & Nature</li>
          <li>🍔 Food & Drink</li>
          <li>⚽ Activities</li>
          <li>🚗 Travel & Places</li>
          <li>💡 Objects</li>
          <li>🏳️‍🌈 Flags</li>
          <li>🔣 Symbols</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Who Can Benefit from an Emoji Picker?
        </h2>
        <p className="text-gray-700 mb-4">
          Toolpresso’s emoji picker is designed for everyone:
        </p>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>Content creators and bloggers</li>
          <li>Social media managers</li>
          <li>Students and teachers</li>
          <li>Designers and marketers</li>
          <li>Everyday chat users who want fun messages</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Why Choose Toolpresso’s Emoji Picker Tool?
        </h2>
        <p className="text-gray-700 mb-4">
          Toolpresso provides a clean, user-friendly, and{" "}
          <strong>responsive emoji picker</strong> for every platform. It’s
          lightweight, loads fast, and requires no extra software. Just open the
          tool, pick your emoji, and paste it where needed.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          🛠️ Explore More Useful Tools
        </h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
          <li>
            ✅{" "}
            <strong>
              <a href="/tools/emi-calculator" className="underline">
                EMI Calculator
              </a>
            </strong>
          </li>
          <li>
            ✅{" "}
            <strong>
              <a href="/tools/countdown-timer" className="underline">
                Online Countdown Timer
              </a>
            </strong>
          </li>

          <li>
            ✅{" "}
            <strong>
              <a href="/tools/invoice-generator" className="underline">
                Invoice Generator
              </a>
            </strong>
          </li>
          <li>
            ✅{" "}
            <strong>
              <a href="/tools/image-resizer" className="underline">
                Image Resizer
              </a>
            </strong>
          </li>
          <li>
            ✅{" "}
            <strong>
              <a href="/tools/image-compressor" className="underline">
                Image Compressor
              </a>
            </strong>
          </li>
          <li>
            ✅{" "}
            <strong>
              <a href="/tools/word-counter" className="underline">
                Word Counter
              </a>
            </strong>{" "}
          </li>
          <li>
            ✅{" "}
            <strong>
              <a href="/tools/case-converter" className="underline">
                Case Converter
              </a>
            </strong>
          </li>
        </ul>
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Final Thoughts
        </h2>
        <p className="text-gray-700 mb-4">
          Emojis are the universal language of the internet. Make your messages
          more expressive and your content more fun with Toolpresso’s{" "}
          <strong>Emoji Picker</strong>. Fast, easy, and always available — try
          it now and take your emoji game to the next level!
        </p>

        <div className="bg-blue-50 p-4 rounded-lg text-center text-blue-700 font-medium ">
          🚀 Try the{" "}
          <a className="underline" href="/tools/emoji-picker">
            Emoji Picker
          </a>{" "}
          now and boost your productivity today!
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EmojiPicker;
