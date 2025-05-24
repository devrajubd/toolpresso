import { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Html5Qrcode } from "html5-qrcode";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

function QRCodeTool() {
  const [text, setText] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [scanResult, setScanResult] = useState("");
  const [message, setMessage] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const qrRef = useRef();
  const html5QrCode = useRef(null); // Use a ref to store the Html5Qrcode instance

  // Initialize Html5Qrcode once when the component mounts
  useEffect(() => {
    html5QrCode.current = new Html5Qrcode("scanner");
    return () => {
      // Cleanup scanner if it's running when the component unmounts
      if (html5QrCode.current && html5QrCode.current.isScanning) {
        html5QrCode.current
          .stop()
          .catch((err) =>
            console.error("Failed to stop scanner on unmount", err)
          );
      }
    };
  }, []);

  const handleGenerate = () => {
    if (text.trim() === "") {
      setMessage("Please enter text or a URL to generate a QR code.");
      setShowQR(false); // Hide QR if text is empty
    } else {
      setShowQR(true);
      setMessage(""); // Clear any previous messages
    }
  };

  const handleDownload = () => {
    if (!qrRef.current) {
      console.error("QR code canvas not found for download.");
      return;
    }
    const canvas = qrRef.current.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = "qr-code.png";
      document.body.appendChild(link); // Append to body to ensure it's in the DOM
      link.click();
      document.body.removeChild(link); // Clean up
    } else {
      console.error("Canvas element not found for QR code.");
    }
  };

  const handleShare = async () => {
    if (!qrRef.current) {
      alert("QR code not generated yet to share.");
      return;
    }
    const canvas = qrRef.current.querySelector("canvas");
    if (canvas) {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          alert("Failed to generate image for sharing.");
          return;
        }
        const file = new File([blob], "qr-code.png", { type: "image/png" });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: "My QR Code",
              text: "Check out this QR code I generated!",
            });
            console.log("QR Code shared successfully!");
          } catch (error) {
            console.error("Error sharing QR code:", error);
            alert("Sharing failed or was cancelled.");
          }
        } else {
          alert(
            "Your browser does not support sharing this file type directly."
          );
        }
      });
    } else {
      alert("QR code canvas not found to share.");
    }
  };

  const startScanner = async () => {
    if (isScanning) {
      alert("Scanner is already running.");
      return;
    }
    setScanResult(""); // Clear previous scan results
    setMessage(""); // Clear any messages

    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    };

    try {
      setIsScanning(true);
      await html5QrCode.current.start(
        { facingMode: "environment" }, // Prefer rear camera
        config,
        (decodedText) => {
          setScanResult(decodedText);
          setIsScanning(false);
          html5QrCode.current
            .stop()
            .catch((err) => console.error("Failed to stop scanner", err));
        },
        (errorMessage) => {
          // You can log or display scan errors, but don't stop on every frame error
          console.warn(`QR Code scanning error: ${errorMessage}`);
        }
      );
      setMessage("Scanner started. Point your camera at a QR code.");
    } catch (err) {
      console.error("Failed to start scanner:", err);
      setMessage(
        `Error starting scanner: ${err.message}. Please ensure camera access is granted.`
      );
      setIsScanning(false);
    }
  };

  const stopScanner = () => {
    if (html5QrCode.current && html5QrCode.current.isScanning) {
      html5QrCode.current
        .stop()
        .then(() => {
          setIsScanning(false);
          setMessage("Scanner stopped.");
        })
        .catch((err) => {
          console.error("Failed to stop scanner:", err);
          setMessage("Error stopping scanner.");
        });
    } else {
      setMessage("Scanner is not running.");
    }
  };

  const handleImageScan = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setMessage("Please select an image file to scan.");
      return;
    }

    setScanResult(""); // Clear previous scan results
    setMessage("Scanning image...");

    try {
      const result = await html5QrCode.current.scanFile(file, true);
      setScanResult(result);
      setMessage("Image scanned successfully!");
    } catch (err) {
      console.error("Image scan failed:", err);
      setMessage(
        `Failed to scan image: ${err.message}. Please try another image.`
      );
    }
  };

  return (
    <>
      <Helmet>
        {/* <!-- Primary Meta Tags --> */}
        <title>
          Free QR Code Generator and Scanner – Create & Scan QR Codes Instantly
          | Toolpresso
        </title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Generate and scan QR codes easily with Toolpresso’s free QR Code Generator and Scanner. Create QR codes for URLs, text, emails, and more."
        />
        <meta
          name="keywords"
          content="QR code generator, free QR code scanner, create QR code, scan QR code, generate QR codes, Toolpresso QR tool, QR code creator"
        />
        <meta name="author" content="Toolpresso" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://toolpresso.com/tools/qr-code-generator-scanner"
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Free QR Code Generator and Scanner – Create & Scan QR Codes | Toolpresso"
        />
        <meta
          property="og:description"
          content="Generate and scan QR codes for websites, text, and more with Toolpresso’s free QR Code Generator and Scanner tool."
        />
        <meta
          property="og:url"
          content="https://toolpresso.com/tools/qr-code-generator-scanner"
        />

        <meta property="og:site_name" content="Toolpresso" />
      </Helmet>

      <Navbar />
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900 leading-tight">
          QR Code Generator & Scanner
        </h1>
        <p className="text-center text-lg text-gray-600 mb-10">
          Instantly create and scan QR codes for text, URLs, and more. Fast,
          free, and efficient!
        </p>

        {/* Generator Section */}
        <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 mb-10 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-5">
            Generate QR Code
          </h2>
          <div className="mb-4">
            <label
              htmlFor="qr-text-input"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Enter text or URL:
            </label>
            <input
              id="qr-text-input"
              type="text"
              placeholder="e.g., https://toolpresso.com or Hello World!"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setShowQR(false); // Hide QR when input changes
                if (message) setMessage(""); // Clear message on input
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out text-gray-800"
              aria-label="Enter text or URL for QR code"
            />
          </div>

          {message && (
            <div className="text-red-600 bg-red-100 p-3 rounded-md mb-4 text-sm font-medium">
              {message}
            </div>
          )}

          <button
            onClick={handleGenerate}
            className="w-full sm:w-auto bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md  cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out"
          >
            Generate QR Code
          </button>

          {showQR && (
            <div className="mt-8 text-center space-y-6" ref={qrRef}>
              <div className="flex justify-center items-center p-4 bg-gray-50 rounded-lg shadow-inner">
                <QRCodeCanvas
                  value={text}
                  size={256} // Slightly larger for better clarity
                  level="H" // High error correction level
                  includeMargin={true} // Add a margin around the QR code
                  className="rounded-md"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={handleDownload}
                  className="flex cursor-pointer items-center justify-center gap-2 bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-300 ease-in-out"
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
                  Download QR
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center cursor-pointer justify-center gap-2 bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-300 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M15 8a3 3 0 10-2.977-2.977l-1.121 1.121a3 3 0 00-4.242 0L6.023 7.023A3 3 0 003 10a3 3 0 003.023 2.977l1.121-1.121a3 3 0 004.242 0l1.121 1.121A3 3 0 0017 12a3 3 0 000-4h-2zm-6 4a2 2 0 11-4 0 2 2 0 014 0zm7-4a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Share QR
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Scanner Section */}
        <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-5">
            Scan QR Code
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={isScanning ? stopScanner : startScanner}
              className={`flex items-center justify-center gap-2 cursor-pointer ${
                isScanning
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white font-semibold px-6 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 ${
                isScanning ? "focus:ring-red-500" : "focus:ring-blue-500"
              } focus:ring-offset-2 transition duration-300 ease-in-out`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M4 8V4a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0V4a2 2 0 00-2-2H4a2 2 0 00-2 2v4m16 0V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v4m6 0h-6m6 0v4a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4m-6 0h6m-6 0v4a2 2 0 00-2 2H4a2 2 0 00-2-2v-4" />
              </svg>
              {isScanning ? "Stop Camera Scan" : "Scan with Camera"}
            </button>
            <label className="cursor-pointer flex items-center justify-center gap-2 bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-gray-500 focus-within:ring-offset-2 transition duration-300 ease-in-out">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              Upload Image to Scan
              <input
                type="file"
                accept="image/*"
                onChange={handleImageScan}
                className="hidden"
                aria-label="Upload image to scan"
              />
            </label>
          </div>

          <div
            id="scanner"
            className={`w-full bg-gray-100 rounded-lg overflow-hidden ${
              isScanning ? "h-72" : "h-0 hidden"
            } transition-all duration-300 ease-in-out flex items-center justify-center text-gray-500`}
          >
            {!isScanning && <p>Click "Scan with Camera" to activate.</p>}
          </div>
          {/* reader div is for Html5Qrcode.scanFile, but we don't need to display it */}
          <div id="reader" className="hidden"></div>

          {scanResult && (
            <div className="mt-6 bg-green-100 border border-green-300 p-4 rounded-lg text-green-800 break-words shadow-sm">
              <strong className="font-semibold text-lg flex items-center gap-2 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Scanned Result:
              </strong>
              <p className="text-base text-gray-700">{scanResult}</p>
              {scanResult.startsWith("http://") ||
              scanResult.startsWith("https://") ? (
                <a
                  href={scanResult}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline mt-2 font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Visit Link
                </a>
              ) : null}
            </div>
          )}
          {message && !scanResult && (
            <div
              className={`mt-4 ${
                message.includes("Error")
                  ? "bg-red-100 border-red-300 text-red-800"
                  : "bg-blue-100 border-blue-300 text-blue-800"
              } p-4 rounded-lg shadow-sm text-sm font-medium`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
      {/* blog post  */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Free QR Code Generator & Scanner – Instantly Create & Read QR Codes
        </h1>

        <p className="text-lg mb-6">
          QR codes are transforming the way we share and access information.
          Whether you're promoting a website, sharing contact details, or
          embedding product info, a <strong>QR Code Generator</strong> helps you
          create scannable codes instantly. At Toolpresso, we offer a free and
          fast <strong>QR Code Generator and Scanner</strong> that works
          seamlessly online with no registration required.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">What is a QR Code?</h2>
        <p className="mb-6">
          A <strong>QR Code (Quick Response Code)</strong> is a two-dimensional
          barcode that can store URLs, text, phone numbers, emails, or any type
          of data. It can be scanned using any smartphone or QR scanner to
          quickly open links or read the content without typing anything
          manually.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Why Use Toolpresso’s QR Code Generator?
        </h2>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>
            <strong>Free and Easy:</strong> Generate unlimited QR codes without
            paying or signing up.
          </li>
          <li>
            <strong>Instant Output:</strong> Create and download high-quality QR
            codes in seconds.
          </li>
          <li>
            <strong>Secure:</strong> No data is stored or shared.
          </li>
          <li>
            <strong>Multiple Data Types:</strong> Create QR codes for URLs,
            emails, phone numbers, vCards, and more.
          </li>
          <li>
            <strong>Responsive:</strong> Fully optimized for desktop and mobile
            browsers.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Free QR Code Scanner Online
        </h2>
        <p className="mb-6">
          Toolpresso also offers a built-in <strong>QR Code Scanner</strong> to
          read and decode any QR code using your device's camera. It's the
          perfect all-in-one tool to both create and read codes on the go.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          How to Use the QR Code Generator
        </h2>
        <ol className="list-decimal list-inside mb-6 space-y-2">
          <li>
            Visit the <strong>QR Code Generator & Scanner</strong> tool page on
            Toolpresso.
          </li>
          <li>
            Enter your desired content (URL, text, email, etc.) in the input
            box.
          </li>
          <li>Click on “Generate QR Code.”</li>
          <li>
            Your QR code will be displayed instantly. You can download it as an
            image.
          </li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          How to Use the QR Code Scanner
        </h2>
        <ol className="list-decimal list-inside mb-6 space-y-2">
          <li>Click the “Scan QR Code” button.</li>
          <li>Allow camera access when prompted.</li>
          <li>Point your camera at the QR code you want to scan.</li>
          <li>The decoded information will be displayed instantly.</li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Who Can Use It?</h2>
        <p className="mb-6">
          Our <strong>QR code maker and scanner</strong> is ideal for:
        </p>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>
            <strong>Business Owners:</strong> Link to websites, menus, or
            contact forms.
          </li>
          <li>
            <strong>Marketers:</strong> Promote campaigns and offers through
            scannable QR codes.
          </li>
          <li>
            <strong>Students:</strong> Share project links and presentations
            easily.
          </li>
          <li>
            <strong>Event Planners:</strong> Share event details and tickets
            with QR codes.
          </li>
          <li>
            <strong>Developers:</strong> Test QR functionality in apps and
            websites.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Benefits of Using Online QR Code Tools
        </h2>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>
            <strong>Accessibility:</strong> Available on any device, no
            installation needed.
          </li>
          <li>
            <strong>Speed:</strong> Generate and scan within seconds.
          </li>
          <li>
            <strong>Convenience:</strong> Use it anytime, anywhere online.
          </li>
          <li>
            <strong>Zero Data Collection:</strong> Your content stays private
            and secure.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Frequently Asked Questions (FAQs)
        </h2>
        <div className="mb-6 space-y-4">
          <div>
            <strong>Q: Is the QR code generator free to use?</strong>
            <p>
              A: Yes, it's completely free with no hidden costs or sign-ups.
            </p>
          </div>
          <div>
            <strong>Q: What can I link to with a QR code?</strong>
            <p>
              A: You can link to websites, YouTube videos, social media, contact
              numbers, and more.
            </p>
          </div>
          <div>
            <strong>Q: Is the QR scanner secure?</strong>
            <p>
              A: Yes. It uses your local camera and doesn’t store or transmit
              your data.
            </p>
          </div>
          <div>
            <strong>Q: Can I customize my QR code?</strong>
            <p>
              A: Currently, Toolpresso supports default black-and-white QR codes
              for simplicity and speed.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Start Generating QR Codes Today
        </h2>
        <p className="mb-6">
          With Toolpresso’s <strong>free QR Code Generator and Scanner</strong>,
          you can generate, download, and scan QR codes all in one place. It's
          the fastest and easiest way to boost engagement, share info, and
          streamline your workflow. Try it now and make QR codes part of your
          digital strategy.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-3">
          🧩 More Free Tools You Might Like
        </h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
          <li>
            🧠{" "}
            <strong>
              <a href="/tools/text-summarizer" className="underline">
                AI Text Summarizer
              </a>
            </strong>
          </li>
          <li>
            📊{" "}
            <strong>
              <a href="/tools/emi-calculator" className="underline">
                EMI Calculator
              </a>
            </strong>
          </li>
          <li>
            🔡{" "}
            <strong>
              <a href="/tools/case-converter" className="underline">
                Case Converter
              </a>
            </strong>
          </li>
          <li>
            🏞️{" "}
            <strong>
              <a
                href="/tools/youtube-thumbnail-downloader"
                className="underline"
              >
                YouTube Thumbnail Downloader
              </a>
            </strong>
          </li>
          <li>
            🎯{" "}
            <strong>
              {" "}
              <a href="/tools/youtube-tags-extractor" className="underline">
                YouTube Tags Extractor
              </a>
            </strong>
          </li>
          <li>
            🧾{" "}
            <strong>
              <a href="/tools/word-counter" className="underline">
                Word Counter
              </a>
            </strong>
          </li>
        </ul>

        <div className="bg-blue-50 p-4 rounded-lg text-center text-blue-700 font-medium">
          🚀 Try the{" "}
          <a href="/tools/qr-code-generator" className="underline">
            QR Code Generator & Scanner
          </a>{" "}
          today — fast, free, and reliable!
        </div>
      </div>
      <Footer />
    </>
  );
}

export default QRCodeTool;
