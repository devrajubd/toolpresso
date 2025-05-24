import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

function YoutubeTagsExtractor() {
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const extractTags = async () => {
    const youtubeRegex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;

    if (!url || !youtubeRegex.test(url.trim())) {
      return setError("Please enter a valid YouTube video URL.");
    }

    setError("");
    setCopied(false);
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5000/api/youtube-tags-extractor",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        }
      );

      const data = await res.json();
      if (data.tags && data.tags.length > 0) {
        setTags(data.tags);
      } else {
        setError("No tags found.");
      }
    } catch (err) {
      setError("Failed to extract tags.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const tagString = tags.map((t) => `${t}`).join(" ");
    navigator.clipboard.writeText(tagString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <Helmet>
        {/* <!-- Primary Meta Tags --> */}
        <title>
          YouTube Tags Extractor – Extract SEO Tags from Any Video | Toolpresso
        </title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Extract YouTube video tags instantly using Toolpresso’s free YouTube Tags Extractor. Discover hidden SEO tags to improve your own video performance."
        />
        <meta
          name="keywords"
          content="YouTube tags extractor, extract video tags, YouTube SEO, find YouTube tags, YouTube tag finder, SEO video tool, Toolpresso tools"
        />
        <meta name="author" content="Toolpresso" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://toolpresso.com/tools/youtube-tags-extractor"
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="YouTube Tags Extractor – Discover Hidden Tags | Toolpresso"
        />
        <meta
          property="og:description"
          content="Paste any YouTube video URL and extract its SEO tags in seconds with Toolpresso’s free YouTube Tags Extractor."
        />
        <meta
          property="og:url"
          content="https://toolpresso.com/tools/youtube-tags-extractor"
        />

        <meta property="og:site_name" content="Toolpresso" />
      </Helmet>

      <Navbar />
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          🎯 YouTube Tags Extractor
        </h1>
        <input
          type="text"
          placeholder="Paste YouTube video URL"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            if (error) {
              setError("");
            }
          }}
          className="w-full p-2 border rounded mb-3"
        />
        <button
          onClick={extractTags}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full cursor-pointer"
        >
          Extract Tags
        </button>

        {loading && <p className="mt-3">⏳ Extracting...</p>}
        {error && <p className="text-red-500 mt-3">{error}</p>}

        {tags.length > 0 && (
          <div className="mt-4">
            <h2 className="font-semibold mb-2">Extracted Tags:</h2>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-gray-200 rounded text-sm">
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={handleCopy}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
            >
              {copied ? "✅ Copied!" : "📋 Copy All Tags"}
            </button>
          </div>
        )}
      </div>
      {/* blog post  */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          YouTube Tags Extractor – Find Hidden Tags Instantly
        </h1>

        <p className="text-gray-700 text-lg mb-4">
          Discover the exact tags that help top YouTube videos rank. With our
          free YouTube Tags Extractor tool, you can easily extract tags from any
          video and use them to optimize your own content for better visibility
          and search rankings.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          What is a YouTube Tags Extractor?
        </h2>
        <p className="text-gray-700 mb-4">
          A YouTube Tags Extractor is an online tool that pulls the hidden tags
          used in a YouTube video’s metadata. These tags play a major role in
          SEO, helping videos appear in search results, suggested videos, and
          recommended feeds.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Key Features of Our YouTube Tags Extractor Tool
        </h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>Extract tags from any public YouTube video</li>
          <li>Instant results with one click</li>
          <li>Copy all tags with a single button</li>
          <li>Mobile-friendly and responsive UI</li>
          <li>No sign-up required and 100% free</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          How to Use the YouTube Tags Extractor?
        </h2>
        <ol className="list-decimal ml-6 text-gray-700 mb-4">
          <li>Find the YouTube video you want to analyze</li>
          <li>Copy its URL from the address bar</li>
          <li>Paste the link into the YouTube Tags Extractor tool</li>
          <li>Click the "Extract Tags" button</li>
          <li>Get all visible and hidden tags in seconds</li>
        </ol>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Why Use a YouTube Tags Extractor Tool?
        </h2>
        <p className="text-gray-700 mb-4">
          If you're a content creator, marketer, or SEO expert, knowing what
          tags your competitors use is key to growing your channel. By analyzing
          top-performing videos, you can gain insights into trending topics and
          keyword strategies that actually work.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Are Tags Still Important for YouTube SEO?
        </h2>
        <p className="text-gray-700 mb-4">
          Yes! Although YouTube’s algorithm has evolved, tags are still used to
          help understand the context of your content. They’re especially useful
          for correcting misspellings, category signals, and improving discovery
          for your videos.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Start Using the YouTube Tags Extractor Today!
        </h2>
        <p className="text-gray-700 mb-8">
          Take your YouTube SEO to the next level with our free YouTube Tags
          Extractor. Whether you're a beginner or pro, toolpresso.com makes it
          easy to find, copy, and apply the tags that matter.
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

        <div className="bg-blue-50 p-4 rounded-lg text-center text-blue-700 font-medium ">
          🚀 Try the{" "}
          <a className="underline" href="/tools/youtube-tags-extractor">
            YouTube Tags Extractor
          </a>{" "}
          now and boost your productivity today!
        </div>
      </div>
      <Footer />
    </>
  );
}

export default YoutubeTagsExtractor;
