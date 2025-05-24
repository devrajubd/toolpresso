import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { Helmet } from "react-helmet-async";

function TextSummarizer() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [ratio, setRatio] = useState(30);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setSummary("");
    setCopied(false);
    setError(false);

    const start = Date.now();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/text-summarizer",
        {
          text,
          ratio,
        }
      );
      if (response.data.error) {
        setSummary(response.data.error);
        setError(true);
      } else {
        setSummary(response.data.summary);
      }

      const end = Date.now();
    } catch (err) {
      setSummary("An error occurred during summarization.");
      setError(true);
      console.error("Summarization error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Helmet>
        {/* <!-- Primary Meta Tags --> */}
        <title>
          Free AI Text Summarizer Tool – Summarize Articles Instantly |
          Toolpresso
        </title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Summarize long texts, articles, essays, and documents instantly with Toolpresso's free AI Text Summarizer tool. Save time and boost productivity."
        />
        <meta
          name="keywords"
          content="text summarizer, AI text summarizer, article summarizer, summarize tool, free text summary tool, document summarizer, Toolpresso summarizer"
        />
        <meta name="author" content="Toolpresso" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://toolpresso.com/tools/text-summarizer"
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Free AI Text Summarizer – Summarize Instantly | Toolpresso"
        />
        <meta
          property="og:description"
          content="Use Toolpresso's free AI-powered Text Summarizer to reduce large texts, articles, and essays into concise summaries with a single click."
        />
        <meta
          property="og:url"
          content="https://toolpresso.com/tools/text-summarizer"
        />

        <meta property="og:site_name" content="Toolpresso" />

        {/* <!-- Twitter --> */}
        <meta
          name="twitter:title"
          content="Free AI Text Summarizer Tool – Summarize Articles Instantly | Toolpresso"
        />
        <meta
          name="twitter:description"
          content="Easily summarize any article, essay, or document with Toolpresso's smart AI summarizer. Fast, accurate, and 100% free."
        />
      </Helmet>
      <Navbar />
      <div id="text-summarizer" className="max-w-4xl mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          AI Text Summarizer
        </h1>
        <p className="text-center text-gray-500 max-w-2xl mx-auto mb-8">
          Summarize long texts using AI. Adjust the summary percentage below.
        </p>

        <textarea
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here..."
          className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
        />

        {/* Summary Length Percentage Slider */}
        <div className="mb-6 text-center">
          <label className="block mb-2 font-medium text-gray-700">
            Summary Length: {ratio}%
          </label>
          <input
            type="range"
            min="10"
            max="90"
            step="10"
            value={ratio}
            onChange={(e) => setRatio(Number(e.target.value))}
            className="w-64"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1 w-64 mx-auto">
            <span>Short</span>
            <span>Long</span>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSummarize}
            disabled={loading || !text.trim()}
            className={`bg-blue-600 text-white font-medium px-6 py-2 rounded hover:bg-blue-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Summarizing..." : "Summarize"}
          </button>
        </div>

        {/* Loading Message */}
        {loading && (
          <p className="text-center text-gray-500 mt-6">
            Please wait, summarizing your text...
          </p>
        )}

        {/* Summary Output */}
        {summary && !loading && (
          <div className="mt-10 bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-sm relative">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Summary
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {summary}
            </p>

            <div className="mt-4 flex justify-between items-center">
              {!error && (
                <button
                  onClick={handleCopy}
                  className="text-sm bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  {copied ? "✅ Copied!" : "📋 Copy"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      {/* blog post  */}

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Text Summarizer – Simplify Your Reading with Toolpresso
        </h1>

        <p className="text-lg mb-6">
          In today’s fast-paced digital world, consuming lengthy content quickly
          is a real challenge. Whether you're a student, professional, content
          writer, or researcher, our <strong>online Text Summarizer</strong>{" "}
          tool helps you shorten long articles, paragraphs, or essays in seconds
          while retaining the essential meaning. With Toolpresso’s free{" "}
          <strong>AI-powered text summarizer</strong>, you can boost
          productivity and understand more in less time.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          What is a Text Summarizer?
        </h2>
        <p className="mb-6">
          A <strong>text summarizer</strong> is a tool that automatically
          shortens a long piece of content while keeping the core information
          intact. Toolpresso’s summarizer uses advanced natural language
          processing (NLP) algorithms to analyze content and deliver short,
          meaningful summaries. It’s perfect for summarizing articles, blog
          posts, essays, reports, and more.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Why Use Toolpresso’s Text Summarizer?
        </h2>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>
            <strong>Free and Fast:</strong> Instantly summarize any text online
            for free.
          </li>
          <li>
            <strong>AI-powered Summarization:</strong> Smart algorithms provide
            accurate and concise summaries.
          </li>
          <li>
            <strong>Multiple Summary Lengths:</strong> Choose between short and
            long summaries based on your needs.
          </li>
          <li>
            <strong>Improves Reading Efficiency:</strong> Understand long
            articles quickly without missing key points.
          </li>
          <li>
            <strong>Works in Browser:</strong> No installation or login
            required.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Who Can Benefit from Our Text Summarizer?
        </h2>
        <p className="mb-6">
          Our online <strong>text summarization tool</strong> is beneficial for
          a wide audience:
        </p>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>
            <strong>Students:</strong> Summarize educational content and prepare
            study notes quickly.
          </li>
          <li>
            <strong>Writers:</strong> Shorten drafts, get quick content
            overviews, or create article snippets.
          </li>
          <li>
            <strong>Marketers:</strong> Generate short summaries for social
            media posts or email newsletters.
          </li>
          <li>
            <strong>Researchers:</strong> Extract key points from long reports,
            papers, and studies.
          </li>
          <li>
            <strong>Professionals:</strong> Summarize meeting notes, emails, or
            lengthy documents.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          How to Use the Toolpresso Text Summarizer
        </h2>
        <ol className="list-decimal list-inside mb-6 space-y-2">
          <li>
            Go to the <strong>Text Summarizer</strong> page on Toolpresso.com.
          </li>
          <li>Paste or type your long content in the input box.</li>
          <li>Select the summary type: Short or Long.</li>
          <li>Click the “Summarize” button and get your summary instantly.</li>
          <li>Use the “Copy” button to save or share your summary.</li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Key Features</h2>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>
            <strong>Instant Summarization</strong>
          </li>
          <li>
            <strong>Supports Long-form Content</strong>
          </li>
          <li>
            <strong>No Login Required</strong>
          </li>
          <li>
            <strong>Responsive and Mobile-friendly</strong>
          </li>
          <li>
            <strong>Secure and Privacy-focused</strong>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          SEO Benefits of Using a Text Summarizer
        </h2>
        <p className="mb-6">
          Summarizing content isn't just useful for readers—it's also helpful
          for content creators and SEO professionals. Shorter versions of
          content can be repurposed as meta descriptions, snippets, and
          previews, improving your website’s search visibility. A{" "}
          <strong>text summarizer tool online</strong> makes your workflow
          faster and enhances your site's search engine optimization.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Frequently Asked Questions (FAQs)
        </h2>
        <div className="mb-6 space-y-4">
          <div>
            <strong>Q: Is Toolpresso’s text summarizer free?</strong>
            <p>A: Yes, our tool is 100% free to use with no hidden charges.</p>
          </div>
          <div>
            <strong>Q: Does the summarizer work with any text?</strong>
            <p>A: Yes, you can paste any English text to get a summary.</p>
          </div>
          <div>
            <strong>Q: Can I use it on mobile?</strong>
            <p>
              A: Absolutely! Our tool is responsive and works seamlessly on
              mobile devices.
            </p>
          </div>
          <div>
            <strong>Q: Does it store my data?</strong>
            <p>
              A: No, we respect your privacy. Your text is not saved or shared.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Start Summarizing with Toolpresso Today
        </h2>
        <p className="mb-6">
          Toolpresso’s <strong>text summarizer tool</strong> is your go-to
          solution for turning complex content into digestible summaries. Try it
          now and experience how AI can make your reading and writing process
          smoother, faster, and more effective.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-3">
          🧩 More Tools at Toolpresso
        </h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
          <li>
            ✅{" "}
            <a className="underline" href="/tools/qr-code-generator">
              QR Code Generator
            </a>
          </li>
          <li>
            ✅{" "}
            <a className="underline" href="/tools/word-counter">
              Word Counter
            </a>
          </li>
          <li>
            ✅{" "}
            <a href="/tools/case-converter" className="underline">
              Case Converter
            </a>
          </li>
          <li>
            ✅{" "}
            <a href="/tools/emoji-picker" className="underline">
              Emoji Picker
            </a>
          </li>
          <li>
            ✅{" "}
            <a href="/tools/invoice-generator" className="underline">
              Invoice Generator
            </a>
          </li>
          <li>
            ✅{" "}
            <a href="/tools/age-calculator" className="underline">
              Age Calculator
            </a>
          </li>
          <li>
            ✅{" "}
            <a href="/tools/image-compressor" className="underline">
              Image Compressor
            </a>
          </li>
          <li>
            ✅{" "}
            <a href="/tools/image-resizer" className="underline">
              Image Resizer
            </a>
          </li>
        </ul>
        <div className="bg-blue-50 p-4 rounded-lg text-center text-blue-700 font-medium ">
          🚀 Try the AI{" "}
          <a className="underline" href="/tools/text-summarizer">
            Text Summarizer
          </a>{" "}
          now and boost your productivity today!
        </div>
      </div>

      <Footer />
    </>
  );
}

export default TextSummarizer;
