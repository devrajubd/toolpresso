import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

function YouTubeThumbnailDownloader() {
  const [videoId, setVideoId] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [imageSize, setImageSize] = useState(null);
  const imgRef = useRef(null);
  const [message, setMessage] = useState("");

  const extractVideoId = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&]+)/;
    const match = url.match(regex);
    return match ? match[1] : url;
  };

  const handleGenerate = () => {
    const id = extractVideoId(videoId.trim());
    const isValid = /^[a-zA-Z0-9_-]{11}$/.test(id);

    if (!videoId || !isValid) {
      setMessage("Please enter a valid YouTube URL or Video ID.");
      setThumbnailUrl("");
      setImageSize(null);
    } else {
      const url = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
      setThumbnailUrl(url);
      setImageSize(null); // reset previous size
      setMessage("");
    }
  };

  const handleDownload = async () => {
    const response = await fetch(thumbnailUrl);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "youtube-thumbnail.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  };

  useEffect(() => {
    if (imgRef.current && thumbnailUrl) {
      imgRef.current.onload = () => {
        setImageSize({
          width: imgRef.current.naturalWidth,
          height: imgRef.current.naturalHeight,
        });
      };
    }
  }, [thumbnailUrl]);

  return (
    <>
      <Helmet>
        {/* <!-- Primary Meta Tags --> */}
        <title>
          YouTube Thumbnail Downloader – Free HD Thumbnail Grabber | Toolpresso
        </title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Download YouTube video thumbnails in HD quality for free. Paste the video link and grab the image instantly using Toolpresso's YouTube Thumbnail Downloader."
        />
        <meta
          name="keywords"
          content="YouTube thumbnail downloader, download YouTube thumbnail, HD thumbnail downloader, YouTube image grabber, Toolpresso tools"
        />
        <meta name="author" content="Toolpresso" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://toolpresso.com/tools/youtube-thumbnail-downloader"
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Free YouTube Thumbnail Downloader | Toolpresso"
        />
        <meta
          property="og:description"
          content="Grab high-quality thumbnails from YouTube videos instantly. No login needed. Try Toolpresso's free tool now!"
        />
        <meta
          property="og:url"
          content="https://toolpresso.com/tools/youtube-thumbnail-downloader"
        />
        <meta property="og:site_name" content="Toolpresso" />

        {/* <!-- Twitter --> */}

        <meta
          name="twitter:title"
          content="YouTube Thumbnail Downloader – Grab HD Thumbnails | Toolpresso"
        />
        <meta
          name="twitter:description"
          content="Download high-quality YouTube thumbnails instantly with Toolpresso's free tool. Fast and easy to use!"
        />
        <meta name="twitter:site" content="@toolpresso" />
      </Helmet>

      <Navbar />
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          YouTube Thumbnail Downloader
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Paste a YouTube video URL or ID to get the HD thumbnail.
        </p>

        <input
          type="text"
          placeholder="Enter YouTube URL or Video ID"
          value={videoId}
          onChange={(e) => {
            setVideoId(e.target.value);
            if (message) setMessage("");
          }}
          className="w-full p-3 border rounded-lg mb-4"
        />
        {message && <div className="text-red-500 mb-4">{message}</div>}

        <div className="flex justify-center mb-6">
          <button
            onClick={handleGenerate}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer"
          >
            Generate Thumbnail
          </button>
        </div>

        {thumbnailUrl && (
          <div className="text-center">
            <img
              src={thumbnailUrl}
              alt="YouTube Thumbnail"
              className="w-full max-w-md mx-auto rounded shadow mb-4"
              ref={imgRef}
            />
            {imageSize && (
              <p className="text-gray-500 mb-2">
                Size: {imageSize.width}px × {imageSize.height}px
              </p>
            )}
            <button
              onClick={handleDownload}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Download Thumbnail
            </button>
          </div>
        )}
      </div>
      {thumbnailUrl && (
        <div className="mt-8">
          <img
            src={thumbnailUrl}
            alt="YouTube Thumbnail"
            className="rounded shadow max-w-full mx-auto"
          />
          <p className="mt-2 text-sm text-gray-500">
            {imageSize ? `Image Size: ${imageSize}` : "Loading size..."}
          </p>
          <button
            onClick={handleDownload}
            className="mt-4 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
          >
            Download Image
          </button>
        </div>
      )}

      {/* Blog content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          YouTube Thumbnail Downloader – Download HD Thumbnails Instantly
        </h1>

        <p className="text-gray-700 text-lg mb-4">
          Looking to download YouTube video thumbnails in high resolution? Our
          free YouTube Thumbnail Downloader makes it incredibly easy to fetch
          and save any video’s thumbnail in HD, SD, or custom quality formats.
          No sign-up, no watermark—just copy, paste, and download.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          What is a YouTube Thumbnail Downloader?
        </h2>
        <p className="text-gray-700 mb-4">
          A YouTube Thumbnail Downloader is an online tool that allows users to
          extract and download the preview image (thumbnail) of any YouTube
          video by simply pasting the video URL. These thumbnails are useful for
          designers, content creators, or anyone wanting to repurpose or
          reference visuals from a YouTube video.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Key Features of Our Thumbnail Downloader Tool
        </h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>Free and unlimited access</li>
          <li>Supports HD, HQ, and SD thumbnail quality</li>
          <li>Responsive and mobile-friendly interface</li>
          <li>No watermarks or third-party branding</li>
          <li>Instant YouTube thumbnail preview and download</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          How to Use the YouTube Thumbnail Downloader?
        </h2>
        <ol className="list-decimal ml-6 text-gray-700 mb-4">
          <li>Go to your desired YouTube video.</li>
          <li>Copy the video URL from the browser.</li>
          <li>Paste the link into our tool's input field.</li>
          <li>Click on "Download Thumbnail".</li>
          <li>Select and download the resolution you prefer.</li>
        </ol>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Why Download YouTube Thumbnails?
        </h2>
        <p className="text-gray-700 mb-4">
          YouTube thumbnails serve as visual previews that influence a viewer's
          click decision. Designers may use them for mockups, research,
          presentations, or branding purposes. Whether you’re a student,
          influencer, or marketer, our YouTube Thumbnail Downloader ensures you
          have access to the right visuals when you need them.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Is it Legal to Use Downloaded Thumbnails?
        </h2>
        <p className="text-gray-700 mb-4">
          While our tool helps you download YouTube thumbnails easily, we advise
          you to respect copyright and use thumbnails ethically—especially when
          publishing on public platforms. Always credit the original creators or
          use thumbnails for educational and research purposes only.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Start Using Our YouTube Thumbnail Downloader Today!
        </h2>
        <p className="text-gray-700 mb-8">
          Try our fast, simple, and efficient tool to grab any YouTube
          thumbnail. Whether you want to download high-quality YouTube
          thumbnails or just preview them, toolpresso.com offers the most
          reliable thumbnail downloader online.
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
          🚀 Try the{" "}
          <a className="underline" href="/tools/youtube-thumbnail-downloader">
            YouTube Thumbnail Downloader
          </a>{" "}
          now and boost your productivity today!
        </div>
      </div>

      <Footer />
    </>
  );
}

export default YouTubeThumbnailDownloader;
