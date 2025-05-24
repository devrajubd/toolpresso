import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

function CaseConverter() {
  const [text, setText] = useState("");
  const [convertedText, setConvertedText] = useState("");
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");

  // Effect to clear "Copied!" message after a short delay
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000); // 2 seconds
      return () => clearTimeout(timer);
    }
  }, [copied]);

  // Utility function to clean text for various case conversions
  const cleanTextForCase = (str) => {
    // Replace non-alphanumeric characters with spaces, then trim multiple spaces
    return str
      .replace(/[^a-zA-Z0-9\s]/g, " ") // Keep spaces for word separation
      .replace(/\s+/g, " ")
      .trim();
  };

  const toTitleCase = (str) => {
    const cleaned = cleanTextForCase(str);
    return cleaned
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const toSentenceCase = (str) => {
    if (!str) return "";
    // Lowercase the whole string, then uppercase the first letter
    const lowerStr = str.toLowerCase();
    return lowerStr.charAt(0).toUpperCase() + lowerStr.slice(1);
  };

  const toCamelCase = (str) => {
    const cleaned = cleanTextForCase(str);
    return cleaned
      .toLowerCase()
      .split(" ")
      .map((word, i) =>
        i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join("");
  };

  const toPascalCase = (str) => {
    const cleaned = cleanTextForCase(str);
    return cleaned
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  };

  // Your existing comma and dot case functions need slight refinement for robustness
  const toCommaCase = (str) => {
    const cleaned = cleanTextForCase(str); // Clean text to handle special chars
    return cleaned.split(" ").filter(Boolean).join(", "); // filter(Boolean) removes empty strings
  };

  const toDotCase = (str) => {
    const cleaned = cleanTextForCase(str);
    return cleaned.toLowerCase().split(" ").filter(Boolean).join(".");
  };

  // Add more common case conversions
  const toAlternatingCase = (str) => {
    return str
      .split("")
      .map((char, index) =>
        index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
      )
      .join("");
  };

  const toInverseCase = (str) => {
    return str
      .split("")
      .map((char) =>
        char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
      )
      .join("");
  };

  const convertText = (type) => {
    if (text.trim() === "") {
      setMessage("Please enter some text to convert.");
      setConvertedText(""); // Clear previous converted text if input is empty
      return; // Exit early
    }

    let result = "";
    switch (type) {
      case "upper":
        result = text.toUpperCase();
        break;
      case "lower":
        result = text.toLowerCase();
        break;
      case "title":
        result = toTitleCase(text);
        break;
      case "sentence":
        result = toSentenceCase(text);
        break;
      case "camel":
        result = toCamelCase(text);
        break;
      case "pascal":
        result = toPascalCase(text);
        break;
      case "snake":
        // Converts spaces and hyphens to underscores, handles multiple spaces
        result = text.toLowerCase().replace(/[\s-]/g, "_").replace(/_+/g, "_");
        break;
      case "kebab":
        // Converts spaces and underscores to hyphens, handles multiple spaces
        result = text.toLowerCase().replace(/[\s_]/g, "-").replace(/-+/g, "-");
        break;
      case "comma":
        result = toCommaCase(text);
        break;
      case "dot":
        result = toDotCase(text);
        break;
      case "alternating":
        result = toAlternatingCase(text);
        break;
      case "inverse":
        result = toInverseCase(text);
        break;
      case "original":
        result = text;
        break;
      default:
        result = text; // Fallback to original
    }
    setConvertedText(result);
    setMessage(""); // Clear any previous messages
    setCopied(false); // Reset copy status
  };

  const handleCopy = () => {
    if (convertedText) {
      navigator.clipboard
        .writeText(convertedText)
        .then(() => {
          setCopied(true);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
          setMessage("Failed to copy text. Please try again.");
        });
    } else {
      setMessage("No text to copy!");
    }
  };

  const handleDownload = () => {
    if (convertedText.trim() === "") {
      setMessage("No text to download!");
      return;
    }
    const element = document.createElement("a");
    const file = new Blob([convertedText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "converted-text.txt";
    document.body.appendChild(element); // Required for Firefox
    element.click();
    document.body.removeChild(element); // Clean up
    setMessage("Text downloaded successfully!");
  };

  const handleClear = () => {
    setText("");
    setConvertedText("");
    setCopied(false);
    setMessage("Input and output cleared.");
  };

  return (
    <>
      <Helmet>
        {/* <!-- Primary Meta Tags --> */}
        <title>
          Free Online Case Converter – Convert Text to Uppercase, Lowercase &
          More | Toolpresso
        </title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Instantly convert text to uppercase, lowercase, title case, or sentence case with Toolpresso’s free online Case Converter tool."
        />
        <meta
          name="keywords"
          content="case converter, text case converter, uppercase converter, lowercase converter, title case tool, sentence case converter, Toolpresso"
        />
        <meta name="author" content="Toolpresso" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://toolpresso.com/tools/case-converter"
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Free Online Case Converter – Change Text Case Easily | Toolpresso"
        />
        <meta
          property="og:description"
          content="Convert text to uppercase, lowercase, title case, or sentence case with Toolpresso’s fast and simple case converter tool."
        />
        <meta
          property="og:url"
          content="https://toolpresso.com/tools/case-converter"
        />
        <meta property="og:site_name" content="Toolpresso" />

        {/* <!-- Twitter --> */}
        <meta
          name="twitter:title"
          content="Free Online Case Converter – Change Text Case Easily | Toolpresso"
        />
        <meta
          name="twitter:description"
          content="Toolpresso's Case Converter lets you switch between uppercase, lowercase, title case, and more in one click."
        />
      </Helmet>

      <Navbar />
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900 leading-tight">
          🔤 Online Case Converter
        </h1>
        <p className="text-center text-lg text-gray-600 mb-10">
          Transform your text instantly into various cases: uppercase,
          lowercase, title case, camel case, snake case, and more!
        </p>

        <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 mb-10 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-5">
            Enter Your Text
          </h2>
          <textarea
            className="w-full h-40 border border-gray-300 rounded-lg p-4 text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out resize-y"
            placeholder="Type or paste your text here to convert..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              // Clear messages when user starts typing again
              if (message) setMessage("");
              // Optional: Clear converted text immediately when input changes
              // setConvertedText('');
            }}
            aria-label="Input text for case conversion"
          ></textarea>
          {message && (
            <div
              className={`mt-3 p-3 rounded-md text-sm font-medium ${
                message.includes("Error") || message.includes("No text")
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {message}
            </div>
          )}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleClear}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200 ease-in-out flex items-center gap-2"
              aria-label="Clear all text"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm1 5a1 1 0 100 2h4a1 1 0 100-2H8z"
                  clipRule="evenodd"
                />
              </svg>
              Clear
            </button>
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 mb-10 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-5">Convert To:</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 my-6">
            {[
              ["UPPERCASE", "upper"],
              ["lowercase", "lower"],
              ["Title Case", "title"],
              ["Sentence case", "sentence"],
              ["camelCase", "camel"],
              ["PascalCase", "pascal"],
              ["snake_case", "snake"],
              ["kebab-case", "kebab"],
              ["comma, case", "comma"],
              ["dot.case", "dot"],
              ["aLtErNaTiNg cAsE", "alternating"],
              ["InVeRsE cAsE", "inverse"],
              ["Original Text", "original"],
            ].map(([label, type]) => (
              <button
                key={type}
                onClick={() => convertText(type)}
                className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out text-base font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label={`Convert to ${label}`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg mb-4 min-h-[120px] relative">
            <p className="text-gray-800 whitespace-pre-wrap break-words text-lg">
              {convertedText || "Converted text will appear here..."}
            </p>
            {convertedText && (
              <button
                onClick={handleCopy}
                className={`absolute top-2 right-2 p-2 rounded-full ${
                  copied ? "bg-green-500" : "bg-gray-300 hover:bg-gray-400"
                } text-white transition duration-200 ease-in-out flex items-center justify-center`}
                aria-label={copied ? "Copied!" : "Copy converted text"}
              >
                {copied ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                  </svg>
                )}
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <button
              onClick={handleCopy}
              disabled={!convertedText}
              className={`flex-1 px-6 py-3 text-white rounded-lg transition duration-200 ease-in-out font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                copied
                  ? "bg-green-600 cursor-default focus:ring-green-500"
                  : "bg-gray-800 hover:bg-gray-900 focus:ring-gray-700"
              } flex items-center justify-center gap-2`}
              aria-label="Copy converted text"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
              {copied ? "Copied!" : "Copy All"}
            </button>
            <button
              onClick={handleDownload}
              disabled={!convertedText}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition duration-200 ease-in-out font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center justify-center gap-2"
              aria-label="Download converted text as .txt file"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Download .txt
            </button>
          </div>
        </div>
      </div>

      {/* Blog Post  */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Free Online Case Converter – Change Text Case Instantly
        </h1>

        <p className="text-lg mb-6">
          Looking for a quick and easy way to convert text to uppercase,
          lowercase, title case, or sentence case? Toolpresso’s{" "}
          <strong>Case Converter</strong> is your go-to online solution. Whether
          you're formatting emails, social media posts, blog content, or
          programming code, our free <strong>text case converter tool</strong>{" "}
          helps you transform any text in one click — no installation, no
          registration.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          What is a Case Converter?
        </h2>
        <p className="mb-6">
          A <strong>case converter tool</strong> is a simple utility that
          changes the capitalization of your text. You can easily switch
          between:
        </p>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>
            <strong>UPPER CASE</strong> – Makes all characters uppercase.
          </li>
          <li>
            <strong>lower case</strong> – Makes all characters lowercase.
          </li>
          <li>
            <strong>Title Case</strong> – Capitalizes the first letter of each
            word.
          </li>
          <li>
            <strong>Sentence case</strong> – Capitalizes only the first letter
            of each sentence.
          </li>
          <li>
            <strong>Capitalize Each Word</strong> – Similar to title case but
            more general.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Why Use Toolpresso's Case Converter?
        </h2>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>
            <strong>Free & Instant:</strong> No registration or payment
            required.
          </li>
          <li>
            <strong>Fast Output:</strong> Instantly convert long paragraphs or
            short snippets.
          </li>
          <li>
            <strong>SEO-Ready Formatting:</strong> Perfect for blog titles, meta
            descriptions, and headers.
          </li>
          <li>
            <strong>Web-Based:</strong> No need to download any software or
            extension.
          </li>
          <li>
            <strong>Mobile Friendly:</strong> Works smoothly on phones and
            tablets.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Use Cases of Online Text Case Converter
        </h2>
        <p className="mb-6">
          Our online <strong>text case changer</strong> is loved by writers,
          bloggers, developers, students, and marketers. Here's how people use
          it:
        </p>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>
            <strong>Bloggers & Writers:</strong> Format headings or titles.
          </li>
          <li>
            <strong>Students:</strong> Clean up assignments and notes.
          </li>
          <li>
            <strong>Coders:</strong> Change variable names or format strings.
          </li>
          <li>
            <strong>Marketers:</strong> Ensure proper text for ads, emails, and
            social posts.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          How to Use the Case Converter Tool
        </h2>
        <ol className="list-decimal list-inside mb-6 space-y-2">
          <li>
            Go to the Toolpresso <strong>Case Converter</strong> page.
          </li>
          <li>Paste or type your text in the input box.</li>
          <li>
            Click the desired case format button:{" "}
            <em>Uppercase, Lowercase, Title Case</em>, etc.
          </li>
          <li>Copy your formatted text using the "Copy" button.</li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Examples of Case Formats
        </h2>
        <div className="bg-gray-100 p-4 rounded mb-6">
          <p>
            <strong>Original:</strong> "this is a case converter tool"
          </p>
          <p>
            <strong>UPPERCASE:</strong> THIS IS A CASE CONVERTER TOOL
          </p>
          <p>
            <strong>lowercase:</strong> this is a case converter tool
          </p>
          <p>
            <strong>Title Case:</strong> This Is A Case Converter Tool
          </p>
          <p>
            <strong>Sentence case:</strong> This is a case converter tool.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          SEO Benefits of Proper Case Usage
        </h2>
        <p className="mb-6">
          Consistently formatted text improves <strong>readability</strong> and{" "}
          <strong>user experience</strong>. Search engines also favor
          well-structured content. Using our{" "}
          <strong>case formatting tool</strong> can help you create professional
          titles, meta descriptions, and blog content that looks clean and ranks
          better.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="mb-6 space-y-4">
          <div>
            <strong>Q: Is the Toolpresso Case Converter free?</strong>
            <p>A: Yes, it's 100% free with no ads, login, or restrictions.</p>
          </div>
          <div>
            <strong>Q: Can I convert large text blocks?</strong>
            <p>
              A: Absolutely. There’s no word limit — paste entire documents if
              needed.
            </p>
          </div>
          <div>
            <strong>Q: Will it work on my phone?</strong>
            <p>
              A: Yes, it's fully responsive and works on all modern browsers.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Try It Now – Convert Text Case in Seconds
        </h2>
        <p className="mb-6">
          Don’t waste time manually editing capitalization. Use Toolpresso's{" "}
          <strong>free case converter</strong> to clean up, format, and style
          your text in one click. It's fast, user-friendly, and always available
          online.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-3">
          🧩 Try More Free Tools
        </h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
          <li>
            <strong>
              <a href="/tools/text-summarizer" className="underline">
                AI Text Summarizer
              </a>
            </strong>
          </li>
          <li>
            <strong>
              <a href="/tools/qr-code-generator" className="underline">
                QR Code Generator
              </a>
            </strong>
          </li>
          <li>
            <strong>
              <a href="/tools/password-generator" className="underline">
                Strong Password Generator
              </a>
            </strong>
          </li>
          <li>
            <strong>
              <a
                href="tools/youtube-thumbnail-downloader"
                className="underline"
              >
                YouTube Thumbnail Downloader
              </a>
            </strong>
          </li>
          <li>
            <strong>
              <a href="/tools/color-picker" className="underline">
                Color Picker
              </a>
            </strong>
          </li>
          <li>
            <strong>
              <a href="/tools/youtube-tags-extractor" className="underline">
                YouTube Tags Extractor
              </a>
            </strong>
          </li>
          <li>
            <strong>
              <a href="/tools/url-shortener" className="underline">
                URL Shortener
              </a>
            </strong>
          </li>
          <li>
            <strong>
              <a href="/tools/age-calculator" className="underline">
                Age Calculator
              </a>
            </strong>
          </li>
        </ul>

        <div className="bg-blue-50 p-4 rounded-lg text-center text-blue-700 font-medium">
          ✍️ Convert your text to the right format with the{" "}
          <a href="/tools/case-converter" className="underline">
            Case Converter
          </a>{" "}
          Tool now – fast, simple, and free!
        </div>
      </div>

      <Footer />
    </>
  );
}

export default CaseConverter;
