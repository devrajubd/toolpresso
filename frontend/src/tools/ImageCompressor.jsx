import { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

function ImageCompressor() {
  const [originalImageFile, setOriginalImageFile] = useState(null);
  const [originalImageSrc, setOriginalImageSrc] = useState(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [originalDimensions, setOriginalDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [compressedImageSrc, setCompressedImageSrc] = useState(null);
  const [compressedSize, setCompressedSize] = useState(0);
  const [quality, setQuality] = useState(0.7);
  const [targetSizeKB, setTargetSizeKB] = useState("");
  const [mode, setMode] = useState("quality");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef(null);

  // Helper to format bytes into readable size
  const readableSize = useCallback((bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }, []);

  // Effect to trigger compression when original image or quality/mode changes
  useEffect(() => {
    if (originalImageFile) {
      if (mode === "quality") {
        compressImageByQuality(originalImageFile, quality);
      }
    }
  }, [originalImageFile, quality, mode, targetSizeKB]); // Added targetSizeKB as dependency for target mode

  // Handles file selection via input or drag-and-drop
  const handleFileSelect = (file) => {
    if (!file) {
      setError("No file selected.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (e.g., JPG, PNG).");
      return;
    }

    setOriginalImageFile(file);
    setOriginalSize(file.size);
    setError("");
    setCompressedImageSrc(null); // Clear previous compressed image

    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImageSrc(e.target.result);
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        setOriginalDimensions({ width: img.width, height: img.height });
      };
    };
    reader.readAsDataURL(file);
  };

  // Compression by Quality
  const compressImageByQuality = useCallback(
    (imageFile, compressionQuality) => {
      setLoading(true);
      setError("");

      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Set canvas dimensions to image dimensions
          canvas.width = img.width;
          canvas.height = img.height;

          // Draw image onto canvas
          ctx.drawImage(img, 0, 0, img.width, img.height);

          // Get data URL with specified quality
          const dataUrl = canvas.toDataURL("image/jpeg", compressionQuality);

          // Calculate size from data URL
          const base64Length = dataUrl.split(",")[1].length;
          const sizeInBytes = base64Length * 0.75; // Base64 is 4 chars for 3 bytes, so 3/4

          setCompressedImageSrc(dataUrl);
          setCompressedSize(sizeInBytes);
          setLoading(false);
        };
        img.onerror = () => {
          setError("Failed to load image for compression.");
          setLoading(false);
        };
      };
      reader.onerror = () => {
        setError("Failed to read image file.");
        setLoading(false);
      };
    },
    []
  );

  // Compression by Target Size (using binary search for quality)
  const handleTargetSizeCompression = useCallback(
    (imageFile, targetKB) => {
      setLoading(true);
      setError("");

      const targetBytes = targetKB * 1024;
      if (targetBytes <= 0) {
        setError("Target size must be a positive number.");
        setLoading(false);
        setCompressedImageSrc(null);
        setCompressedSize(0);
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);

          let minQuality = 0.1;
          let maxQuality = 1.0;
          let bestDataUrl = null;
          let bestSize = Infinity;
          let finalQuality = 0.7; // Default if no perfect match

          // Binary search for optimal quality
          for (let i = 0; i < 15; i++) {
            // Increased iterations for better precision
            const midQuality = (minQuality + maxQuality) / 2;
            const dataUrl = canvas.toDataURL("image/jpeg", midQuality);
            const size = dataUrl.split(",")[1].length * 0.75; // Calculate size

            if (size > targetBytes) {
              maxQuality = midQuality;
            } else {
              minQuality = midQuality;
              bestDataUrl = dataUrl;
              bestSize = size;
              finalQuality = midQuality;
            }
          }

          // After binary search, try to get closer if a bestDataUrl was found
          if (bestDataUrl) {
            // One last attempt with the found quality
            const finalDataUrl = canvas.toDataURL("image/jpeg", finalQuality);
            const finalSize = finalDataUrl.split(",")[1].length * 0.75;

            setCompressedImageSrc(finalDataUrl);
            setCompressedSize(finalSize);
            setQuality(parseFloat(finalQuality.toFixed(2))); // Update quality slider
            setError("");
          } else {
            // This case means even at minQuality (0.1), the image is larger than target
            const minQualityDataUrl = canvas.toDataURL("image/jpeg", 0.1);
            const minQualitySize =
              minQualityDataUrl.split(",")[1].length * 0.75;
            setCompressedImageSrc(minQualityDataUrl);
            setCompressedSize(minQualitySize);
            setQuality(0.1);
            setError(
              `Unable to compress to ${readableSize(
                targetBytes
              )}. Smallest possible size at 10% quality is ${readableSize(
                minQualitySize
              )}.`
            );
          }
          setLoading(false);
        };
        img.onerror = () => {
          setError("Failed to load image for compression.");
          setLoading(false);
        };
      };
      reader.onerror = () => {
        setError("Failed to read image file.");
        setLoading(false);
      };
    },
    [readableSize]
  );

  // Handle drag over event
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  }, []);

  // Handle drag leave event
  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  }, []);

  // Handle drop event
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  }, []);

  // Trigger hidden file input click
  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleClear = () => {
    setOriginalImageFile(null);
    setOriginalImageSrc(null);
    setOriginalSize(0);
    setOriginalDimensions({ width: 0, height: 0 });
    setCompressedImageSrc(null);
    setCompressedSize(0);
    setQuality(0.7);
    setTargetSizeKB("");
    setMode("quality");
    setError("");
    setLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input
    }
  };

  const handleDownload = () => {
    if (!compressedImageSrc) {
      setError("No compressed image to download.");
      return;
    }
    const link = document.createElement("a");
    link.href = compressedImageSrc;
    // Suggest filename based on original, or default
    const originalFileName = originalImageFile
      ? originalImageFile.name.split(".").slice(0, -1).join(".")
      : "compressed-image";
    link.download = `${originalFileName}_compressed.jpg`; // Always save as JPG for consistency
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link); // Clean up
  };

  const handleShare = async () => {
    if (!compressedImageSrc || !originalImageFile) {
      setError("No compressed image to share.");
      return;
    }

    try {
      // Convert data URL to Blob
      const response = await fetch(compressedImageSrc);
      const blob = await response.blob();
      const file = new File([blob], `compressed_${originalImageFile.name}`, {
        type: "image/jpeg",
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Compressed Image",
          text: `Check out this compressed image! Original: ${readableSize(
            originalSize
          )}, Compressed: ${readableSize(compressedSize)}.`,
        });
      } else {
        alert("Sharing is not supported on this device or for this file type.");
      }
    } catch (err) {
      console.error("Error sharing image:", err);
      setError("Failed to share image. Please try again.");
    }
  };

  return (
    <>
      <Helmet>
        <title>
          Free Online Image Compressor – Reduce Image Size | Toolpresso
        </title>
        <meta
          name="description"
          content="Compress images online for free. Reduce file size of JPG, PNG, and WebP images by adjusting quality or targeting a specific file size. Fast and easy image optimization by Toolpresso."
        />
        <meta
          name="keywords"
          content="image compressor, compress image, reduce image size, image optimizer, online image compressor, free image compressor, JPG compressor, PNG compressor, WebP compressor, Toolpresso"
        />
        <meta name="author" content="Toolpresso" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://toolpresso.com/tools/image-compressor"
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Free Online Image Compressor – Reduce Image Size | Toolpresso"
        />
        <meta
          property="og:description"
          content="Quickly compress your images to reduce file size without losing quality. Optimize JPG, PNG, and WebP images online."
        />
        <meta
          property="og:url"
          content="https://toolpresso.com/tools/image-compressor"
        />
        {/* <meta property="og:image" content="https://toolpresso.com/images/image-compressor-og.jpg" /> */}
        <meta property="og:site_name" content="Toolpresso" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Toolpresso" />
        <meta name="twitter:creator" content="@Toolpresso" />
        <meta name="twitter:title" content="Image Compressor by Toolpresso" />
        <meta
          name="twitter:description"
          content="Compress images online for free. Reduce file size of JPG, PNG, and WebP images by adjusting quality or targeting a specific file size."
        />
        {/* <meta name="twitter:image" content="https://toolpresso.com/images/image-compressor-twitter.jpg" /> */}
      </Helmet>

      <Navbar />
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8  bg-white text-gray-900 transition-colors duration-300">
        <h1 className="text-4xl font-extrabold text-center mb-6 sm:mb-8 text-blue-700 leading-tight">
          🗜️ Online Image Compressor
        </h1>
        <p className="text-center text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Effortlessly reduce the file size of your images while maintaining
          visual quality. Optimize for web, email, or storage.
        </p>

        <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 border border-gray-200 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Upload Your Image
          </h2>

          {/* Amazing Image Input Area */}
          <div
            className={`relative flex flex-col items-center justify-center p-6 border-2 ${
              dragOver
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-gray-50"
            } border-dashed rounded-lg cursor-pointer transition-all duration-200 ease-in-out hover:border-blue-400 hover:bg-blue-25`}
            onClick={handleDivClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            aria-label="Drag and drop or click to upload image"
          >
            <input
              type="file"
              accept="image/jpeg, image/png, image/webp" // Specify accepted types
              onChange={(e) => handleFileSelect(e.target.files[0])}
              className="hidden"
              ref={fileInputRef}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-400 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-lg text-gray-600 font-semibold mb-1">
              Drag & drop an image here
            </p>
            <p className="text-sm text-gray-500">or click to browse files</p>
            <p className="text-xs text-gray-400 mt-2">
              (JPG, PNG, WebP supported)
            </p>
          </div>

          {error && (
            <p className="text-red-600 bg-red-100 p-3 rounded-md mt-4 text-sm font-medium text-center">
              {error}
            </p>
          )}

          {originalImageFile && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                Original Image Details
              </h3>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
                <div className="text-center">
                  <img
                    src={originalImageSrc}
                    alt="Original"
                    className="max-w-full max-h-64 rounded-lg shadow-md border border-gray-200"
                  />
                </div>
                <div className="text-left space-y-2 text-gray-700">
                  <p>
                    <strong>File Name:</strong> {originalImageFile.name}
                  </p>
                  <p>
                    <strong>Type:</strong> {originalImageFile.type}
                  </p>
                  <p>
                    <strong>Size:</strong> {readableSize(originalSize)}
                  </p>
                  <p>
                    <strong>Dimensions:</strong> {originalDimensions.width} x{" "}
                    {originalDimensions.height} px
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-4 mb-6">
                <button
                  onClick={() => setMode("quality")}
                  className={`px-6 py-3 rounded-lg text-lg font-semibold transition duration-200 ease-in-out cursor-pointer ${
                    mode === "quality"
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  aria-pressed={mode === "quality"}
                >
                  Adjust Quality
                </button>
                <button
                  onClick={() => setMode("target")}
                  className={`px-6 py-3 rounded-lg text-lg font-semibold transition duration-200 ease-in-out cursor-pointer ${
                    mode === "target"
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  aria-pressed={mode === "target"}
                >
                  Target Size
                </button>
              </div>

              {mode === "quality" && (
                <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <label
                    htmlFor="quality-slider"
                    className="block mb-2 font-medium text-gray-700 text-center text-lg"
                  >
                    🎚️ Compression Quality:{" "}
                    <span className="font-bold text-blue-600">
                      {(quality * 100).toFixed(0)}%
                    </span>
                  </label>
                  <input
                    type="range"
                    id="quality-slider"
                    min="0.1"
                    max="1"
                    step="0.01" // More granular control
                    value={quality}
                    onChange={(e) => {
                      const q = parseFloat(e.target.value);
                      setQuality(q);
                      // Compression is handled by useEffect
                    }}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer range-lg [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-600"
                    aria-valuenow={quality}
                    aria-valuemin="0.1"
                    aria-valuemax="1"
                    aria-valuetext={`${(quality * 100).toFixed(0)} percent`}
                  />
                </div>
              )}

              {mode === "target" && (
                <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <label
                    htmlFor="target-size-input"
                    className="block mb-2 font-medium text-gray-700 text-center text-lg"
                  >
                    🎯 Target Size (KB)
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      id="target-size-input"
                      placeholder="e.g., 200"
                      value={targetSizeKB}
                      onChange={(e) => setTargetSizeKB(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                      aria-label="Enter target size in kilobytes"
                    />
                    <button
                      onClick={() =>
                        handleTargetSizeCompression(
                          originalImageFile,
                          parseInt(targetSizeKB)
                        )
                      }
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      aria-label="Apply target size compression"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="ml-4 text-lg text-blue-600 font-semibold">
              Compressing image...
            </p>
          </div>
        )}

        {compressedImageSrc && !loading && (
          <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 border border-gray-200 mb-10 text-center">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">
              Compressed Image
            </h2>
            <img
              src={compressedImageSrc}
              alt="Compressed"
              className="mx-auto max-w-full max-h-[400px] rounded-lg shadow-md border border-gray-200 mb-4"
            />
            <div className="text-lg text-gray-700 mb-6">
              <p>
                Original Size:{" "}
                <span className="font-semibold text-gray-800">
                  {readableSize(originalSize)}
                </span>
              </p>
              <p>
                Compressed Size:{" "}
                <span className="font-semibold text-green-600">
                  {readableSize(compressedSize)}
                </span>
              </p>
              <p>
                Reduction:{" "}
                <span className="font-semibold text-purple-600">
                  {((1 - compressedSize / originalSize) * 100).toFixed(1)}%
                </span>
              </p>
              <p>
                Quality Used:{" "}
                <span className="font-semibold text-blue-600">
                  {(quality * 100).toFixed(0)}%
                </span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleDownload}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition duration-200 ease-in-out font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer flex items-center justify-center gap-2"
                aria-label="Download compressed image"
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
                Download Image
              </button>
              <button
                onClick={handleShare}
                className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition duration-200 ease-in-out font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer flex items-center justify-center gap-2"
                aria-label="Share compressed image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M15 8a3 3 0 10-2.977-2.977l-1.287 1.287a3 3 0 00-3.071 3.071l-1.287 1.287A3 3 0 103 16a3 3 0 003-3.071l1.287-1.287a3 3 0 003.071-3.071l1.287-1.287A3 3 0 0015 8z" />
                </svg>
                Share Image
              </button>
              <button
                onClick={handleClear}
                className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition duration-200 ease-in-out font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer flex items-center justify-center gap-2"
                aria-label="Clear all images and reset"
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
        )}
      </div>
      {/* blog post  */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Compress Images Online Without Losing Quality – Fast & Free Image
          Compressor
        </h1>

        <p className="text-lg text-gray-700 mb-4">
          Looking for a way to reduce your image file size without losing visual
          quality? Toolpresso’s free <strong>online image compressor</strong>{" "}
          helps you compress JPG, PNG, and other image formats in seconds.
          Whether you're optimizing images for websites, blogs, social media, or
          email – our tool gets the job done effortlessly.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          What is an Image Compressor?
        </h2>
        <p className="text-gray-700 mb-4">
          An <strong>image compressor</strong> reduces the file size of an image
          by optimizing its data while maintaining as much quality as possible.
          Smaller file sizes mean faster load times, better SEO performance, and
          easier sharing across platforms.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Why Use Toolpresso’s Online Image Compressor?
        </h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>100% free and no account required</li>
          <li>Compress JPG, PNG, GIF, WebP, and more</li>
          <li>Maintain image quality while reducing size</li>
          <li>Privacy-focused: no file storage or tracking</li>
          <li>Works instantly on all devices and browsers</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Benefits of Image Compression
        </h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>
            <strong>Faster Website Loading:</strong> Reduce image size to
            improve loading time and user experience
          </li>
          <li>
            <strong>Better SEO Rankings:</strong> Google favors faster websites,
            and compressed images help
          </li>
          <li>
            <strong>Mobile Optimization:</strong> Smaller images load quicker on
            smartphones and tablets
          </li>
          <li>
            <strong>Reduced Bandwidth:</strong> Great for users with limited
            data or slow connections
          </li>
          <li>
            <strong>Storage Savings:</strong> Store more images using less space
            on cloud drives or local storage
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          How to Compress an Image Using Toolpresso
        </h2>
        <p className="mb-4">
          Our <strong className="text-gray-800">Online Image Compressor</strong>{" "}
          helps you reduce the file size of your images quickly and efficiently.
          This is crucial for faster website loading, easier email attachments,
          and saving storage space.
        </p>
        <p className="mb-4">You can compress images in two ways:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong className="text-gray-800">Adjust Quality:</strong> Use a
            slider to control the compression level. A lower quality percentage
            results in a smaller file size but might slightly reduce visual
            fidelity.
          </li>
          <li>
            <strong className="text-gray-800">**Target Size:**</strong> Specify
            a desired file size in Kilobytes (KB). The tool will automatically
            find the best quality setting to get as close as possible to your
            target.
          </li>
        </ul>
        <p className="mt-4">
          The tool supports{" "}
          <strong className="text-gray-800">JPG, PNG, and WebP</strong> formats
          for input, and outputs compressed images as **JPG** for maximum
          compatibility and compression efficiency.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Who Should Use Our Image Compression Tool?
        </h2>
        <p className="text-gray-700 mb-4">
          Our <strong>free image compressor</strong> is perfect for:
        </p>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>Web developers and designers</li>
          <li>Bloggers and content creators</li>
          <li>eCommerce store owners (Shopify, Amazon, Etsy)</li>
          <li>Students submitting online assignments</li>
          <li>Anyone wanting fast-loading and shareable images</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Supported Formats and Devices
        </h2>
        <p className="text-gray-700 mb-4">
          Toolpresso’s <strong>online image compression</strong> supports all
          popular image formats including:
        </p>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>JPG / JPEG</li>
          <li>PNG</li>
          <li>GIF</li>
          <li>WebP</li>
          <li>BMP and more</li>
        </ul>
        <p className="text-gray-700 mb-4">
          It works on all devices – desktops, laptops, tablets, and smartphones
          – and in all modern browsers like Chrome, Safari, Firefox, and Edge.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          SEO and Performance Benefits of Image Compression
        </h2>
        <p className="text-gray-700 mb-4">
          Search engines like Google take page speed seriously. Oversized images
          slow down your site, resulting in lower rankings. By using our{" "}
          <strong>image compressor tool</strong>, you enhance your site’s speed
          and SEO performance. It also helps improve your Core Web Vitals –
          especially LCP (Largest Contentful Paint).
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Why Choose Toolpresso?
        </h2>
        <p className="text-gray-700 mb-4">
          Toolpresso is your go-to platform for smart, fast, and efficient web
          tools. Our <strong>image compression tool</strong> is built with
          privacy and performance in mind. You don’t need to download anything
          or share your email. Just upload, compress, and download.
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
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Final Thoughts
        </h2>
        <p className="text-gray-700 mb-4">
          If you're searching for a{" "}
          <strong>fast and secure image compressor</strong> that works directly
          in your browser, Toolpresso has you covered. Compress images for free,
          reduce file sizes, and maintain stunning visual quality. Try it now
          and see the difference for yourself!
        </p>

        <div className="bg-blue-50 p-4 rounded-lg text-center text-blue-700 font-medium ">
          🚀 Try the{" "}
          <a className="underline" href="/tools/image-compressor">
            Image Compressor
          </a>{" "}
          now and boost your productivity today!
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ImageCompressor;
