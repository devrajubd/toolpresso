import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

const tools = [
  {
    name: "QR Code Generator",
    path: "/qr-code-generator",
    description: "Create scannable QR codes instantly.",
  },
  // {
  //   name: "Word Counter",
  //   path: "/word-counter",
  //   description: "Count words, characters, and reading time.",
  // },
  {
    name: "Case Converter",
    path: "/case-converter",
    description: "Change text to upper, lower, title case, etc.",
  },
  {
    name: "Password Generator",
    path: "/password-generator",
    description: "Generate secure, strong passwords.",
  },
  {
    name: "Color Picker",
    path: "/color-picker",
    description: "Pick and copy any color easily.",
  },
  {
    name: "Text Summarizer",
    path: "/text-summarizer",
    description: "Summarize long text with AI-like intelligence.",
  },
  {
    name: "YouTube Thumbnail Downloader",
    path: "/youtube-thumbnail-downloader",
    description: "Download YouTube video thumbnails.",
  },
  {
    name: "YouTube tags extractor / inspector",
    path: "/youtube-tags-extractor",
    description: "Extract tags from YouTube videos.",
  },
  {
    name: "URL Shortener",
    path: "/url-shortener",
    description: "Shorten long URLs quickly.",
  },
  // {
  //   name: "Text to Speech",
  //   path: "/text-to-speech",
  //   description: "Convert your text into natural voice.",
  // },
  // {
  //   name: "Speech to Text",
  //   path: "/speech-to-text",
  //   description: "Transcribe your speech to editable text.",
  // },
  // {
  //   name: "Unit Converter",
  //   path: "/unit-converter",
  //   description: "Convert length, weight, temperature, etc.",
  // },
  {
    name: "Age Calculator",
    path: "/age-calculator",
    description:
      "Find your exact age with years, months, and days, get your zodiac sign, birthday countdown, and share your results instantly!",
  },

  {
    name: "EMI Calculator",
    path: "/emi-calculator",
    description: "Calculate your EMI easily.",
  },
  {
    name: "Online Timer / Countdown",
    path: "/countdown-timer",
    description: "Set timers and countdowns easily.",
  },
  {
    name: "Emoji Picker",
    path: "/emoji-picker",
    description: "Copy emojis with one click.",
  },
  // {
  //   name: "Time Converter",
  //   path: "/time-converter",
  //   description: "Convert between time zones easily.",
  // },
  // {
  //   name: "Random Number Generator",
  //   path: "/random-number",
  //   description: "Generate random numbers securely.",
  // },
  {
    name: "Invoice Generator",
    path: "/invoice-generator",
    description: "Create professional invoices effortlessly.",
  },
  // {
  //   name: "PDF to Word Converter",
  //   path: "/pdf-word-converter",
  //   description: "Convert PDF files to editable Word documents.",
  // },
  {
    name: "Image Resizer",
    path: "/image-resizer",
    description: "Resize images to your desired dimensions.",
  },
  {
    name: "Image Compressor",
    path: "/image-compressor",
    description: " Compress images to reduce file size.",
  },
  {
    name: "Word Counter",
    path: "/word-counter",
    description: "Count words, characters, and reading time.",
  },
];

function Tools() {
  return (
    <>
      <Helmet>
        {/* <!-- Primary Meta Tags --> */}
        <title>
          All Free Online Tools – Text Summarizer, QR Generator, Compressor &
          More | Toolpresso
        </title>
        <meta
          name="title"
          content="All Free Online Tools – Text Summarizer, QR Generator, Compressor & More | Toolpresso"
        />
        <meta
          name="description"
          content="Browse and use free online tools from Toolpresso including Text Summarizer, QR Code Generator, Case Converter, Image Resizer, Invoice Generator, and more. No sign-up, no ads, just tools."
        />

        {/* <!-- Keywords Meta Tag --> */}
        <meta
          name="keywords"
          content="All Online Tools, Text Summarizer, QR Code Generator, Image Compressor, Case Converter, Password Generator, YouTube Thumbnail Downloader, Invoice Generator, EMI Calculator, Word Counter, Emoji Picker, Age Calculator, Countdown Timer, Free Web Tools, Toolpresso Tools"
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://toolpresso.com/tools" />
        <meta
          property="og:title"
          content="All Online Tools – Free & Fast | Toolpresso"
        />
        <meta
          property="og:description"
          content="Instantly access all free tools at Toolpresso – from summarizers and QR code makers to emoji pickers and compressors. No login needed."
        />

        {/* <!-- Twitter --> */}
        <meta name="twitter:url" content="https://toolpresso.com/tools" />
        <meta
          name="twitter:title"
          content="All Online Tools – Free & Fast | Toolpresso"
        />
        <meta
          name="twitter:description"
          content="Explore Toolpresso’s free online tools including case converter, image compressor, YouTube tags extractor, password generator, and more."
        />
      </Helmet>

      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Smart Tools for Everyday Use
        </h1>
        <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
          All-in-one tool suite to boost your productivity — No sign-up just
          pure utility.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {tools.map((tool, index) => (
            <Link
              to={"/tools" + tool.path}
              key={index}
              className="block bg-white border rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {tool.name}
              </h2>
              <p className="text-sm text-gray-500">{tool.description}</p>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Tools;
