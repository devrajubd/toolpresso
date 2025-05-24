import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

function Home() {
  return (
    <>
      <Helmet>
        {/* <!-- Primary Meta Tags --> */}
        <title>
          Toolpresso – Free Online Tools: Text Summarizer, QR Code Generator,
          Image Compressor & More
        </title>
        <meta
          name="title"
          content="Toolpresso – Free Online Tools: Text Summarizer, QR Code Generator, Image Compressor & More"
        />
        <meta
          name="description"
          content="Toolpresso offers free online tools including Text Summarizer, QR Code Generator, Password Generator, YouTube Thumbnail Downloader, URL Shortener, Image Compressor, and more. Fast, secure, no sign-up required."
        />

        {/* <!-- Keywords Meta Tag --> */}
        <meta
          name="keywords"
          content="Text Summarizer, QR Code Generator, Case Converter, Password Generator, Color Picker, YouTube Thumbnail Downloader, YouTube Tags Extractor, URL Shortener, Age Calculator, EMI Calculator, Countdown Timer, Emoji Picker, Invoice Generator, Image Resizer, Image Compressor, Word Counter, Free Online Tools, Toolpresso Tools"
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://toolpresso.com/" />
        <meta
          property="og:title"
          content="Toolpresso – All-in-One Free Online Tool Hub"
        />
        <meta
          property="og:description"
          content="Access 100% free online tools like QR Code Generator, Image Resizer, Text Summarizer, EMI Calculator, and more at Toolpresso. No login. No hassle."
        />

        {/* <!-- Twitter --> */}
        <meta name="twitter:url" content="https://toolpresso.com/" />
        <meta
          name="twitter:title"
          content="Toolpresso – All-in-One Free Online Tool Hub"
        />
        <meta
          name="twitter:description"
          content="Instantly use free tools like QR Code Generator, Countdown Timer, Password Generator, Word Counter, YouTube Tags Extractor and more – all on Toolpresso."
        />
      </Helmet>
      <Navbar />
      <div className="flex flex-col items-center text-center px-4 py-12 bg-gray-50">
        {/* Hero Section */}
        <section className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-blue-600">Toolpresso</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl mb-6">
            Your daily dose of smart, free, and powerful online tools — all in
            one place.
          </p>
          <Link to="/tools">
            <button className="bg-blue-600 text-white px-6 py-3 cursor-pointer rounded-lg text-lg hover:bg-blue-700 transition">
              Explore Tools
            </button>
          </Link>
        </section>

        {/* Features Section */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-blue-700">
              No Login Needed
            </h3>
            <p className="text-gray-600">
              Use all tools instantly without sign-up or registration.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-blue-700">
              Free Forever
            </h3>
            <p className="text-gray-600">
              All tools are 100% free to use, with no hidden fees.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-blue-700">
              Useful Daily
            </h3>
            <p className="text-gray-600">
              Text, file, image, SEO & productivity tools you need every day.
            </p>
          </div>
        </section>

        <section className="mt-16 max-w-4xl w-full">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Popular Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/tools/text-summarizer"
              className="block bg-white p-4 rounded-lg border hover:shadow"
            >
              <h3 className="font-semibold text-blue-600">
                📝 Text Summarizer
              </h3>
              <p className="text-sm text-gray-600">
                Summarize long articles or texts in seconds.
              </p>
            </Link>
            <Link
              to="/tools/qr-code-generator"
              className="block bg-white p-4 rounded-lg border hover:shadow"
            >
              <h3 className="font-semibold text-blue-600">QR Code Generator</h3>
              <p className="text-sm text-gray-600">
                Create scannable QR codes instantly.
              </p>
            </Link>
            <Link
              to="/tools/password-generator"
              className="block bg-white p-4 rounded-lg border hover:shadow"
            >
              <h3 className="font-semibold text-blue-600">
                Password Generator
              </h3>
              <p className="text-sm text-gray-600">
                Generate secure, strong passwords.
              </p>
            </Link>
            <Link
              to="/tools/youtube-tags-extractor"
              className="block bg-white p-4 rounded-lg border hover:shadow"
            >
              <h3 className="font-semibold text-blue-600">
                YouTube Tags Extractor
              </h3>
              <p className="text-sm text-gray-600">
                Extract tags from YouTube videos.
              </p>
            </Link>
            <Link
              to="/tools/emi-calculator"
              className="block bg-white p-4 rounded-lg border hover:shadow"
            >
              <h3 className="font-semibold text-blue-600">EMI Calculator</h3>
              <p className="text-sm text-gray-600">
                Calculate your EMI easily.
              </p>
            </Link>{" "}
            <Link
              to="/tools/invoice-generator"
              className="block bg-white p-4 rounded-lg border hover:shadow"
            >
              <h3 className="font-semibold text-blue-600">Invoice Generator</h3>
              <p className="text-sm text-gray-600">
                Create professional invoices effortlessly.
              </p>
            </Link>{" "}
            <Link
              to="/tools/youtube-thumbnail-downloader"
              className="block bg-white p-4 rounded-lg border hover:shadow"
            >
              <h3 className="font-semibold text-blue-600">
                YouTube Thumbnail Downloader
              </h3>
              <p className="text-sm text-gray-600">
                Download YouTube video thumbnails.
              </p>
            </Link>
            <Link
              to="/tools/image-resizer"
              className="block bg-white p-4 rounded-lg border hover:shadow"
            >
              <h3 className="font-semibold text-blue-600">Image Resizer</h3>
              <p className="text-sm text-gray-600">
                Resize images to your desired dimensions.
              </p>
            </Link>
            <Link
              to="/tools/image-compressor"
              className="block bg-white p-4 rounded-lg border hover:shadow"
            >
              <h3 className="font-semibold text-blue-600">Image Compressor</h3>
              <p className="text-sm text-gray-600">
                Compress images to reduce file size.
              </p>
            </Link>
            <Link
              to="/tools/word-counter"
              className="block bg-white p-4 rounded-lg border hover:shadow"
            >
              <h3 className="font-semibold text-blue-600">Word Counter</h3>
              <p className="text-sm text-gray-600">
                Count words, characters, and reading time.
              </p>
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Home;
