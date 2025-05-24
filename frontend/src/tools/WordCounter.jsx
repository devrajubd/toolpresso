import { useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

function WordCounter() {
  const [text, setText] = useState("");
  const [copyStatus, setCopyStatus] = useState("Copy All Text");
  const [error, setError] = useState("");

  // Memoized counting functions for efficiency
  const countWords = useCallback((str) => {
    const trimmedStr = str.trim();
    if (trimmedStr === "") return 0;
    return trimmedStr.split(/\s+/).length;
  }, []);

  const countCharacters = useCallback((str) => {
    return str.length;
  }, []);

  const countCharactersNoSpaces = useCallback((str) => {
    return str.replace(/\s/g, "").length;
  }, []);

  const countSentences = useCallback((str) => {
    const trimmedStr = str.trim();
    if (trimmedStr === "") return 0;
    // Split by common sentence endings, followed by optional whitespace
    // Filter Boolean to remove empty strings if multiple delimiters appear consecutively
    return trimmedStr.split(/[.!?]+/).filter((s) => s.trim() !== "").length;
  }, []);

  const countParagraphs = useCallback((str) => {
    const trimmedStr = str.trim();
    if (trimmedStr === "") return 0;
    // Split by one or more newline characters
    return trimmedStr.split(/\n+/).filter((s) => s.trim() !== "").length;
  }, []);

  const calculateReadingTime = useCallback((wordCount) => {
    const wordsPerMinute = 200; // Average reading speed
    const minutes = wordCount / wordsPerMinute;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return `${Math.floor(minutes)} min ${seconds} sec`;
  }, []);

  const handleCopy = useCallback(() => {
    if (text.trim() === "") {
      setCopyStatus("No text to copy!");
      setError("Please enter some text to copy.");
      setTimeout(() => setCopyStatus("Copy All Text"), 2000);
    } else {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopyStatus("Copied!");
          setError(""); // Clear any previous error
          setTimeout(() => setCopyStatus("Copy All Text"), 2000);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
          setCopyStatus("Failed to copy!");
          setError("Failed to copy text. Please try again.");
          setTimeout(() => setCopyStatus("Copy All Text"), 2000);
        });
    }
  }, [text]);

  const handleClear = useCallback(() => {
    setText("");
    setCopyStatus("Copy All Text");
    setError("");
  }, []);

  const currentWordCount = countWords(text);
  const currentCharacterCount = countCharacters(text);
  const currentCharacterNoSpacesCount = countCharactersNoSpaces(text);
  const currentSentenceCount = countSentences(text);
  const currentParagraphCount = countParagraphs(text);
  const currentReadingTime = calculateReadingTime(currentWordCount);

  return (
    <>
      <Helmet>
        <title>
          Free Online Word Counter – Words, Characters, Sentences & Reading Time
          | Toolpresso
        </title>
        <meta
          name="description"
          content="Count words, characters, sentences, paragraphs, and estimate reading time instantly with Toolpresso's free online word counter. Perfect for writers, students, and content creators."
        />
        <meta
          name="keywords"
          content="word counter, character counter, sentence counter, paragraph counter, reading time calculator, online word counter, text analysis, word count tool, free word counter, Toolpresso"
        />
        <meta name="author" content="Toolpresso" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://toolpresso.com/tools/word-counter"
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Free Online Word Counter – Words, Characters, Sentences & Reading Time | Toolpresso"
        />
        <meta
          property="og:description"
          content="Count words, characters, sentences, and paragraphs in your text instantly. Get reading time estimates with our free online word counter tool."
        />
        <meta
          property="og:url"
          content="https://toolpresso.com/tools/word-counter"
        />
        {/* <meta property="og:image" content="https://toolpresso.com/images/word-counter-og.jpg" /> */}
        <meta property="og:site_name" content="Toolpresso" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Toolpresso" />
        <meta name="twitter:creator" content="@Toolpresso" />
        <meta name="twitter:title" content="Word Counter by Toolpresso" />
        <meta
          name="twitter:description"
          content="Count words, characters, sentences, paragraphs, and estimate reading time instantly with our free online word counter."
        />
        {/* <meta name="twitter:image" content="https://toolpresso.com/images/word-counter-twitter.jpg" /> */}
      </Helmet>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-white text-gray-900 transition-colors duration-300">
        <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 border border-gray-200 mb-10">
          <h1 className="text-4xl font-extrabold text-center mb-6 sm:mb-8 text-blue-700 leading-tight">
            ✍️ Online Word Counter
          </h1>
          <p className="text-center text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Instantly count words, characters, sentences, and paragraphs in your
            text. Get a quick reading time estimate!
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Enter Your Text
          </h2>

          <textarea
            className="w-full h-60 p-4 border border-gray-300 rounded-lg resize-y text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="Start typing or paste your text here to get instant statistics..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setError(""); // Clear error on text change
              setCopyStatus("Copy All Text"); // Reset copy status
            }}
            aria-label="Text input for word counting"
          ></textarea>
          {error && (
            <p className="text-red-600 bg-red-100 p-3 rounded-md mt-4 text-sm font-medium text-center">
              {error}
            </p>
          )}

          <div className="flex justify-end mt-4">
            <button
              onClick={handleClear}
              className="bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition duration-200 ease-in-out font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer flex items-center gap-2"
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
              Clear Text
            </button>
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 border border-gray-200 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Statistics
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm text-center">
              <p className="text-lg font-semibold text-gray-700">Words</p>
              <p className="text-4xl font-bold text-blue-600">
                {currentWordCount}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg shadow-sm text-center">
              <p className="text-lg font-semibold text-gray-700">Characters</p>
              <p className="text-4xl font-bold text-green-600">
                {currentCharacterCount}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg shadow-sm text-center">
              <p className="text-lg font-semibold text-gray-700">No Spaces</p>
              <p className="text-4xl font-bold text-purple-600">
                {currentCharacterNoSpacesCount}
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg shadow-sm text-center">
              <p className="text-lg font-semibold text-gray-700">Sentences</p>
              <p className="text-4xl font-bold text-yellow-600">
                {currentSentenceCount}
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg shadow-sm text-center">
              <p className="text-lg font-semibold text-gray-700">Paragraphs</p>
              <p className="text-4xl font-bold text-red-600">
                {currentParagraphCount}
              </p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg shadow-sm text-center col-span-2 sm:col-span-1">
              <p className="text-lg font-semibold text-gray-700">
                Reading Time (Avg.)
              </p>
              <p className="text-4xl font-bold text-indigo-600">
                {currentReadingTime}
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleCopy}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg cursor-pointer transition duration-200 ease-in-out font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center gap-2 mx-auto"
              aria-label="Copy all text"
            >
              {copyStatus === "Copied!" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 animate-pulse"
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
              {copyStatus}
            </button>
          </div>
        </div>
      </div>
      {/* blog post  */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Free Online Word Counter Tool – Count Words & Characters Instantly
        </h1>

        <p className="text-lg text-gray-700 mb-4">
          Whether you're a student, blogger, copywriter, or developer, word and
          character limits matter. With Toolpresso’s{" "}
          <strong>online word counter</strong>, you can instantly check how many
          words, characters, paragraphs, and sentences your content contains —
          all in real-time. No need to install any software or app — just paste
          and count!
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          What is a Word Counter?
        </h2>
        <p className="text-gray-700 mb-4">
          A <strong>word counter tool</strong> is a utility that counts the
          total number of words, characters (with or without spaces), sentences,
          and paragraphs in a piece of text. It’s extremely useful for meeting
          word count requirements in assignments, articles, social media posts,
          product descriptions, SEO meta tags, and more.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Features of Toolpresso’s Online Word Counter
        </h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>Real-time word and character counting</li>
          <li>Counts spaces, paragraphs, and sentences</li>
          <li>Distraction-free and minimal interface</li>
          <li>No ads, no popups, no account needed</li>
          <li>Works on all devices and browsers</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Who Should Use This Word Counter?
        </h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>
            <strong>Writers & Bloggers:</strong> Ensure articles meet required
            word count
          </li>
          <li>
            <strong>Students:</strong> Track essay length to match assignment
            guidelines
          </li>
          <li>
            <strong>Content Creators:</strong> Optimize social media or ad copy
            limits
          </li>
          <li>
            <strong>Developers:</strong> Monitor string length for code, JSON,
            or form input
          </li>
          <li>
            <strong>SEO Professionals:</strong> Stay within Google’s character
            limits for meta tags
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Why Use an Online Word Counter?
        </h2>
        <p className="text-gray-700 mb-4">
          Word processors like Microsoft Word or Google Docs have built-in
          counters, but they're often slow or buried in menus. A dedicated{" "}
          <strong>real-time word counter tool</strong> like Toolpresso is
          instant, lightweight, and doesn't require login. Plus, it’s available
          on mobile and desktop – anytime, anywhere.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          SEO-Friendly Writing Made Easy
        </h2>
        <p className="text-gray-700 mb-4">
          Google favors content that's focused, concise, and within optimal
          length. Use Toolpresso’s <strong>word and character counter</strong>{" "}
          to ensure your blog posts, titles, and meta descriptions are
          SEO-optimized. For instance, keep your meta titles under 60 characters
          and meta descriptions under 160 characters.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Benefits of Using Toolpresso’s Word Counter
        </h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>
            <strong>Instant Results:</strong> No lag, no processing time
          </li>
          <li>
            <strong>Privacy First:</strong> We never store your data or track
            your input
          </li>
          <li>
            <strong>Multi-Language Support:</strong> Works with English,
            Spanish, French, and more
          </li>
          <li>
            <strong>Zero Installation:</strong> Use directly from your browser
          </li>
          <li>
            <strong>Accessible:</strong> Fully responsive on phones, tablets,
            and desktops
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          How to Use the Word Counter
        </h2>
        <p className="mb-4">
          Our <strong className="text-gray-800">Online Word Counter</strong> is
          a free and easy-to-use tool designed to provide instant statistics
          about your text. It's invaluable for writers, students, content
          creators, and anyone who needs to meet specific word count
          requirements or analyze text length.
        </p>
        <p className="mb-4">
          Simply paste or type your text into the input box, and the tool will
          automatically calculate:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong className="text-gray-800">Words: </strong> The total number
            of words in your text.
          </li>
          <li>
            <strong className="text-gray-800">Characters:</strong> The total
            number of characters, including spaces.
          </li>
          <li>
            <strong className="text-gray-800"> Characters (No Spaces):</strong>{" "}
            The total number of characters, excluding spaces.
          </li>
          <li>
            <strong className="text-gray-800">Sentences:</strong> The count of
            complete sentences.
          </li>
          <li>
            <strong className="text-gray-800">Paragraphs:</strong> The number of
            distinct paragraphs.
          </li>
          <li>
            <strong className="text-gray-800"> Reading Time:</strong> An
            estimated time it would take an average person to read your text.
          </li>
        </ul>
        <p className="mt-4">
          This tool helps you keep track of your writing progress and ensures
          your content fits within specified limits.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-700 mb-2">
          <strong>Does this tool work on mobile?</strong> – Yes, it’s fully
          responsive and works perfectly on Android, iOS, tablets, and all major
          browsers.
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Is there a limit to how much text I can paste?</strong> – No,
          you can paste as much text as you like.
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Does it support multiple languages?</strong> – Absolutely. It
          works for most languages, including Unicode characters.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Final Words
        </h2>
        <p className="text-gray-700 mb-4">
          Toolpresso’s <strong>online word counter</strong> is the ultimate
          writing companion. Whether you need to hit a word count, stay under a
          character limit, or write SEO-perfect content — we’ve got you covered.
          Fast, reliable, and completely free. Try it now and take control of
          your content!
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
              <a href="/tools/case-converter" className="underline">
                Case Converter
              </a>
            </strong>
          </li>
        </ul>

        <div className="bg-blue-50 p-4 rounded-lg text-center text-blue-700 font-medium ">
          🚀 Try the{" "}
          <a className="underline" href="/tools/word-counter">
            Word Counter
          </a>{" "}
          now and boost your productivity today!
        </div>
      </div>
      <Footer />
    </>
  );
}

export default WordCounter;
