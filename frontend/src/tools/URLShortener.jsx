import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

function URLShortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [copy, setcopy] = useState("copy");
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL || "https://localhost:8000";
  const handleShorten = async () => {
    if (!url) {
      setError("Please enter a valid URL.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(apiUrl + "/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      console.log(data);
      if (data.shortUrl) {
        setShortUrl(data.shortUrl);
        setError("");
      } else {
        setError("Error occurred while shortening URL.");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setcopy("copied!");
      setTimeout(() => {
        setcopy("copy");
      }, 2000);
    } catch (err) {
      alert("Failed to copy URL.");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Shortened URL",
          url: shortUrl,
        });
      } catch (err) {
        alert("Sharing failed.");
      }
    } else {
      alert("Share not supported on this browser.");
    }
  };

  return (
    <>
      <Helmet>
        {/* <!-- Primary Meta Tags --> */}
        <title>
          Free Online URL Shortener – Instantly Shorten Links | Toolpresso
        </title>
        <meta
          name="title"
          content="Free Online URL Shortener – Instantly Shorten Links | Toolpresso"
        />
        <meta
          name="description"
          content="Use Toolpresso’s free online URL shortener to instantly convert long links into short, clean URLs. Perfect for social media, email marketing, and more. No sign-up required."
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://toolpresso.com/tools/url-shortener"
        />
        <meta
          property="og:title"
          content="Free Online URL Shortener – Instantly Shorten Links | Toolpresso"
        />
        <meta
          property="og:description"
          content="Shorten long URLs in one click using Toolpresso’s fast and secure URL shortener. Share clean links across social platforms, email, and web."
        />

        {/* <!-- Twitter --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:url"
          content="https://toolpresso.com/tools/url-shortener"
        />
        <meta
          name="twitter:title"
          content="Free Online URL Shortener – Instantly Shorten Links | Toolpresso"
        />
        <meta
          name="twitter:description"
          content="Toolpresso URL Shortener lets you shorten links for free — fast, simple, and secure. Try it now!"
        />

        {/* <!-- Keywords for SEO --> */}
        <meta
          name="keywords"
          content="URL shortener, free link shortener, online URL shortener, shorten link, short URL tool, clean link generator, link shortener tool, toolpresso url shortener, url converter, free url tool, custom url shortener, web link shortener"
        />
      </Helmet>
      <Navbar />
      <div className="max-w-xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
        <input
          type="text"
          placeholder="Enter your long URL"
          className="w-full p-3 border rounded-lg"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setError("");
          }}
        />
        {error && <p className="text-red-500 text-start">{error}</p>}
        <button
          onClick={handleShorten}
          className={`bg-blue-600 text-white px-6 py-2 mt-5 rounded hover:bg-blue-700 cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          {loading ? "Shortening..." : "Shorten"}
        </button>

        {shortUrl && (
          <div className="mt-6">
            <p className="text-green-600">Shortened URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {shortUrl}
            </a>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={handleCopy}
                className="bg-gray-200 text-gray-800 px-4 py-1 rounded hover:bg-gray-300 cursor-pointer"
              >
                {copy}
              </button>
              <button
                onClick={handleShare}
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 cursor-pointer"
              >
                Share
              </button>
            </div>
          </div>
        )}
      </div>
      {/* blog post  */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
          Free URL Shortener Tool – Instantly Shorten Your Long Links Online
        </h1>

        <p className="text-lg text-gray-700 mb-4">
          Welcome to Toolpresso's <strong>free online URL shortener</strong> —
          the fastest way to shorten long links, manage URLs, and share clean,
          trackable links across the web. Whether you're sharing on social
          media, email, or anywhere else, our URL shortening tool helps you turn
          bulky links into short, easy-to-read formats in just one click.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          🔗 What is a URL Shortener?
        </h2>
        <p className="text-gray-700 mb-4">
          A <strong>URL shortener</strong> is a tool that converts a long,
          cluttered URL into a concise and readable link. For example, instead
          of sharing:
          <br />
          <code className="bg-gray-100 px-2 py-1 block mt-2 mb-2 text-sm">
            https://toolpresso.com/tools/url-shortener?ref=blog&utm_campaign=social
          </code>
          You can share:
          <br />
          <code className="bg-gray-100 px-2 py-1 block mt-2 text-sm">
            https://toolpresso.com/xYZ123
          </code>
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          🚀 Why Use Toolpresso's Free URL Shortener?
        </h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Completely free and secure</li>
          <li>No sign-up required</li>
          <li>Quick and reliable short links</li>
          <li>Mobile-friendly and responsive design</li>
          <li>
            Perfect for social media, YouTube, Twitter, LinkedIn, and email
            marketing
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          🔍 Use Cases for Shortened URLs
        </h2>
        <p className="text-gray-700 mb-4">
          Our <strong>URL shortener tool</strong> is ideal for bloggers,
          marketers, influencers, students, and developers. You can:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Track clicks with analytics (coming soon)</li>
          <li>
            Fit links into character-limited platforms like Twitter or Instagram
          </li>
          <li>Clean up messy affiliate links</li>
          <li>Boost link sharing performance on social media</li>
          <li>Hide complex UTM parameters in marketing campaigns</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          ⚙️ How Toolpresso’s Online URL Shortener Works
        </h2>
        <ol className="list-decimal list-inside text-gray-700 mb-4">
          <li>Paste your long URL into the input box</li>
          <li>Click the "Shorten" button</li>
          <li>Copy your newly generated short link</li>
          <li>Use it anywhere – websites, social posts, emails, and more</li>
        </ol>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          🔐 Is It Safe to Use a URL Shortener?
        </h2>
        <p className="text-gray-700 mb-4">
          Yes, Toolpresso’s link shortener is completely safe and private. We do
          not track users or store unnecessary data. All shortened URLs are
          encrypted and created anonymously, making it ideal for secure sharing.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          📱 Works on All Devices
        </h2>
        <p className="text-gray-700 mb-4">
          Whether you're using a phone, tablet, or computer, our URL shortener
          is fully responsive. No downloads or installs required — just visit
          the <strong>URL Shortener page</strong> on Toolpresso and shorten
          links instantly.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
          🧠 Final Thoughts
        </h2>
        <p className="text-gray-700 mb-4">
          Toolpresso's <strong>online URL shortener</strong> is fast, free, and
          designed with simplicity in mind. If you want to make your links look
          clean, professional, and shareable, our tool is your best solution.
          Say goodbye to messy URLs and hello to seamless sharing with
          Toolpresso.
        </p>

        <p className="text-gray-700 mt-6">
          Ready to simplify your links? Try our{" "}
          <a
            href="/tools/url-shortener"
            className="text-blue-600 underline hover:text-blue-800"
          >
            free online URL shortener
          </a>{" "}
          now!
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
              <a href="/tools/emoji-picker" className="underline">
                Emoji Picker
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
        <div className="bg-blue-50 p-4 rounded-lg text-center text-blue-700 font-medium ">
          🚀 Ready to simplify your links? Try our free online{" "}
          <a className="underline" href="/tools/url-shortener">
            URL shortener
          </a>{" "}
          now
        </div>
      </section>
      <Footer />
    </>
  );
}

export default URLShortener;
