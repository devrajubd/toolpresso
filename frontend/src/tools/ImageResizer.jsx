import { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

function ImageResizer() {
  const [originalImageFile, setOriginalImageFile] = useState(null);
  const [originalImageSrc, setOriginalImageSrc] = useState(null); // Data URL for display
  const [originalSize, setOriginalSize] = useState(0);
  const [originalDimensions, setOriginalDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [resizedImageSrc, setResizedImageSrc] = useState(null); // Data URL for display
  const [resizedSize, setResizedSize] = useState(0);
  const [resizedDimensions, setResizedDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [outputFormat, setOutputFormat] = useState("image/jpeg"); // Default output format

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false); // State for drag-and-drop visual feedback

  const fileInputRef = useRef(null); // Ref for the hidden file input

  // Helper to format bytes into readable size
  const readableSize = useCallback((bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }, []);

  // Helper to calculate size from Data URL
  const calculateSizeFromDataUrl = useCallback((dataUrl) => {
    const base64Length = dataUrl.split(",")[1].length;
    // Base64 is 4 chars for 3 bytes, so 3/4. This is an approximation.
    return base64Length * 0.75;
  }, []);

  // Effect to pre-fill dimensions when a new image is selected
  useEffect(() => {
    if (originalImageFile) {
      const img = new Image();
      img.onload = () => {
        setOriginalDimensions({ width: img.width, height: img.height });
        setWidth(img.width);
        setHeight(img.height);
        setLoading(false);
      };
      img.onerror = () => {
        setError("Failed to load original image dimensions.");
        setLoading(false);
      };
      img.src = URL.createObjectURL(originalImageFile);
    }
  }, [originalImageFile]);

  // Handles file selection via input or drag-and-drop
  const handleFileSelect = (file) => {
    if (!file) {
      setError("No file selected.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (e.g., JPG, PNG, WebP).");
      return;
    }

    setOriginalImageFile(file);
    setOriginalSize(file.size);
    setError("");
    setResizedImageSrc(null); // Clear previous resized image
    setResizedSize(0);
    setResizedDimensions({ width: 0, height: 0 });
    setLoading(true); // Start loading for dimension reading

    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImageSrc(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle width/height changes with aspect ratio logic
  const handleWidthChange = (e) => {
    const newWidth = Number(e.target.value);
    setWidth(newWidth);
    if (maintainAspectRatio && originalDimensions.width > 0) {
      setHeight(
        Math.round(
          (newWidth / originalDimensions.width) * originalDimensions.height
        )
      );
    }
    setError("");
  };

  const handleHeightChange = (e) => {
    const newHeight = Number(e.target.value);
    setHeight(newHeight);
    if (maintainAspectRatio && originalDimensions.height > 0) {
      setWidth(
        Math.round(
          (newHeight / originalDimensions.height) * originalDimensions.width
        )
      );
    }
    setError("");
  };

  // Main resize logic
  const handleResize = useCallback(() => {
    if (!originalImageFile) {
      setError("Please upload an image first.");
      return;
    }
    if (
      !width ||
      !height ||
      isNaN(width) ||
      isNaN(height) ||
      width <= 0 ||
      height <= 0
    ) {
      setError(
        "Please enter valid positive numbers for both width and height."
      );
      return;
    }

    setLoading(true);
    setError("");
    setResizedImageSrc(null);
    setResizedSize(0);
    setResizedDimensions({ width: 0, height: 0 });

    const img = new Image();
    img.src = URL.createObjectURL(originalImageFile);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      // Draw image onto canvas with new dimensions
      ctx.drawImage(img, 0, 0, width, height);

      // Get data URL in selected output format (default to JPEG if original is not supported or for better compression)
      const finalOutputFormat = outputFormat; // Use state for output format
      const resizedDataUrl = canvas.toDataURL(finalOutputFormat, 0.9); // 0.9 quality for resized JPEG

      setResizedImageSrc(resizedDataUrl);
      setResizedSize(calculateSizeFromDataUrl(resizedDataUrl));
      setResizedDimensions({ width: canvas.width, height: canvas.height });
      setLoading(false);
      URL.revokeObjectURL(img.src); // Clean up object URL
    };
    img.onerror = () => {
      setError("Failed to load image for resizing. Please try another image.");
      setLoading(false);
    };
  }, [
    originalImageFile,
    width,
    height,
    maintainAspectRatio,
    outputFormat,
    calculateSizeFromDataUrl,
  ]);

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

  const handleDownload = () => {
    if (!resizedImageSrc) {
      setError("No resized image to download.");
      return;
    }
    const link = document.createElement("a");
    link.href = resizedImageSrc;
    // Suggest filename based on original, or default
    const originalFileName = originalImageFile
      ? originalImageFile.name.split(".").slice(0, -1).join(".")
      : "resized-image";
    const extension = outputFormat.split("/")[1] || "jpg"; // Get extension from output format
    link.download = `${originalFileName}_${width}x${height}.${extension}`;
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link); // Clean up
  };

  const handleShare = async () => {
    if (!resizedImageSrc || !originalImageFile) {
      setError("No resized image to share.");
      return;
    }

    try {
      const response = await fetch(resizedImageSrc);
      const blob = await response.blob();
      const file = new File([blob], `resized_${originalImageFile.name}`, {
        type: outputFormat,
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "Resized Image",
          text: `Check out this resized image! Original: ${readableSize(
            originalSize
          )}, Resized: ${readableSize(resizedSize)}. Dimensions: ${
            resizedDimensions.width
          }x${resizedDimensions.height}.`,
        });
      } else {
        alert("Sharing is not supported on this device or for this file type.");
      }
    } catch (err) {
      console.error("Error sharing image:", err);
      setError("Failed to share image. Please try again.");
    }
  };

  const handleClear = () => {
    setOriginalImageFile(null);
    setOriginalImageSrc(null);
    setOriginalSize(0);
    setOriginalDimensions({ width: 0, height: 0 });
    setResizedImageSrc(null);
    setResizedSize(0);
    setResizedDimensions({ width: 0, height: 0 });
    setWidth("");
    setHeight("");
    setMaintainAspectRatio(true);
    setOutputFormat("image/jpeg");
    setError("");
    setLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input
    }
  };

  return (
    <>
      <Helmet>
        <title>
          Free Online Image Resizer – Resize Images by Pixels or Percentage |
          Toolpresso
        </title>
        <meta
          name="description"
          content="Resize images online for free. Change image dimensions by pixels or percentage. Maintain aspect ratio, custom output formats. Fast and easy image resizing by Toolpresso."
        />
        <meta
          name="keywords"
          content="image resizer, resize image, change image dimensions, image size converter, online image resizer, free image resizer, resize by pixels, resize by percentage, Toolpresso"
        />
        <meta name="author" content="Toolpresso" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://toolpresso.com/tools/image-resizer"
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Free Online Image Resizer – Resize Images by Pixels or Percentage | Toolpresso"
        />
        <meta
          property="og:description"
          content="Quickly resize your images to any custom dimensions. Maintain aspect ratio or set custom width and height."
        />
        <meta
          property="og:url"
          content="https://toolpresso.com/tools/image-resizer"
        />
        {/* <meta property="og:image" content="https://toolpresso.com/images/image-resizer-og.jpg" /> */}
        <meta property="og:site_name" content="Toolpresso" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Toolpresso" />
        <meta name="twitter:creator" content="@Toolpresso" />
        <meta name="twitter:title" content="Image Resizer by Toolpresso" />
        <meta
          name="twitter:description"
          content="Resize images online for free. Change image dimensions by pixels or percentage. Maintain aspect ratio, custom output formats."
        />
        {/* <meta name="twitter:image" content="https://toolpresso.com/images/image-resizer-twitter.jpg" /> */}
      </Helmet>

      <Navbar />
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-white text-gray-900 transition-colors duration-300">
        <h1 className="text-4xl font-extrabold text-center mb-6 sm:mb-8 text-blue-700 leading-tight">
          📐 Online Image Resizer
        </h1>
        <p className="text-center text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Easily change the dimensions of your images by specifying exact pixels
          or maintaining aspect ratio.
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
                  {loading ? (
                    <div className="animate-pulse bg-gray-200 rounded-lg w-48 h-48 flex items-center justify-center">
                      <span className="text-gray-500">Loading...</span>
                    </div>
                  ) : (
                    <img
                      src={originalImageSrc}
                      alt="Original"
                      className="max-w-full max-h-64 rounded-lg shadow-md border border-gray-200"
                    />
                  )}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="width-input"
                    className="block text-gray-700 text-lg font-medium mb-2"
                  >
                    Width (px):
                  </label>
                  <input
                    type="number"
                    id="width-input"
                    value={width}
                    onChange={handleWidthChange}
                    placeholder="e.g., 800"
                    className="w-full p-3 border border-gray-300 rounded-lg text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    aria-label="Set new width in pixels"
                  />
                </div>
                <div>
                  <label
                    htmlFor="height-input"
                    className="block text-gray-700 text-lg font-medium mb-2"
                  >
                    Height (px):
                  </label>
                  <input
                    type="number"
                    id="height-input"
                    value={height}
                    onChange={handleHeightChange}
                    placeholder="e.g., 600"
                    className="w-full p-3 border border-gray-300 rounded-lg text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    aria-label="Set new height in pixels"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center mb-6">
                <input
                  type="checkbox"
                  id="maintain-aspect-ratio"
                  checked={maintainAspectRatio}
                  onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                />
                <label
                  htmlFor="maintain-aspect-ratio"
                  className="ml-2 text-gray-700 text-base font-medium cursor-pointer"
                >
                  Maintain Aspect Ratio
                </label>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="output-format"
                  className="block text-gray-700 text-lg font-medium mb-2"
                >
                  Output Format:
                </label>
                <select
                  id="output-format"
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-lg text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 cursor-pointer"
                  aria-label="Select output image format"
                >
                  <option value="image/jpeg">JPEG</option>
                  <option value="image/png">PNG</option>
                  <option value="image/webp">WebP</option>
                </select>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={handleResize}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer flex items-center gap-2"
                  aria-label="Resize image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L10 5.414V14a1 1 0 11-2 0V5.414L6.293 6.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Resize Image
                </button>
              </div>
            </div>
          )}
        </div>

        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="ml-4 text-lg text-blue-600 font-semibold">
              Resizing image...
            </p>
          </div>
        )}

        {resizedImageSrc && !loading && (
          <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 border border-gray-200 mb-10 text-center">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">
              Resized Image
            </h2>
            <img
              src={resizedImageSrc}
              alt="Resized"
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
                Resized Size:{" "}
                <span className="font-semibold text-green-600">
                  {readableSize(resizedSize)}
                </span>
              </p>
              <p>
                Dimensions:{" "}
                <span className="font-semibold text-blue-600">
                  {resizedDimensions.width} x {resizedDimensions.height} px
                </span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleDownload}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition duration-200 ease-in-out font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer flex items-center justify-center gap-2"
                aria-label="Download resized image"
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
                aria-label="Share resized image"
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
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Free Online Image Resizer – Resize Images Instantly Without Losing
          Quality
        </h1>

        <p className="text-lg text-gray-700 mb-4">
          Looking to resize your images quickly and easily? Toolpresso’s{" "}
          <strong>free online image resizer</strong> allows you to resize images
          without compromising quality. Whether you're preparing images for web,
          social media, email, or printing – our tool delivers the perfect size
          with just a few clicks.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          What is an Image Resizer?
        </h2>
        <p className="text-gray-700 mb-4">
          An <strong>image resizer</strong> is a tool that changes the
          dimensions of an image while maintaining its visual quality. You can
          resize photos by specifying width, height, or percentage, making your
          images fit perfectly on websites, eCommerce platforms, or digital
          campaigns.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Why Use Toolpresso's Image Resizer Tool?
        </h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>Resize any image format (JPG, PNG, GIF, BMP, etc.)</li>
          <li>Maintain original quality after resizing</li>
          <li>Fast, free, and no registration required</li>
          <li>Fully browser-based and responsive design</li>
          <li>Supports both pixel and percentage resizing</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Common Use Cases for Image Resizing
        </h2>
        <p className="text-gray-700 mb-4">
          The Toolpresso <strong>image resizer online</strong> is ideal for:
        </p>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>
            Resizing profile pictures for LinkedIn, Facebook, Twitter, and
            Instagram
          </li>
          <li>Optimizing product images for Shopify, Etsy, Amazon, and eBay</li>
          <li>
            Preparing images for blog posts, websites, and email marketing
          </li>
          <li>Adjusting banner sizes for Google Ads or social ads</li>
          <li>Compressing large images for faster web loading</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          How to Resize an Image Using Toolpresso
        </h2>
        <p className="mb-4">
          Our{" "}
          <span className="font-bold text-gray-600">Online Image Resizer</span>{" "}
          allows you to quickly change the dimensions (width and height) of your
          images. This is useful for optimizing images for web use, social
          media, or specific print requirements.
        </p>
        <p className="mb-4">
          Simply upload your image, then specify the desired{" "}
          <span className="font-bold text-gray-600">width</span> and{" "}
          <span className="font-bold text-gray-600">height </span>
          in pixels. You can choose to:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <span className="font-bold text-gray-600">
              {" "}
              Maintain Aspect Ratio:
            </span>{" "}
            Keep this option checked to automatically adjust the other dimension
            when you change one, preventing image distortion.
          </li>
          <li>
            <span className="font-bold text-gray-600">Custom Dimensions: </span>{" "}
            Uncheck "Maintain Aspect Ratio" if you need to set exact,
            independent width and height values, though this may distort the
            image.
          </li>
        </ul>
        <p className="mt-4">
          You can also select your preferred{" "}
          <span className="font-bold text-gray-600">output format</span> (JPEG,
          PNG, or WebP) for the resized image.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Features of Toolpresso’s Online Image Resizer
        </h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>Instant image preview before and after resizing</li>
          <li>Aspect ratio lock/unlock option</li>
          <li>No watermarks added to resized images</li>
          <li>100% privacy – your files are not stored</li>
          <li>Mobile-friendly – works on any device</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Why Choose Toolpresso for Your Image Resizing Needs?
        </h2>
        <p className="text-gray-700 mb-4">
          Toolpresso’s <strong>image resizer tool</strong> is built for speed,
          simplicity, and privacy. We don’t ask you to sign up or download any
          software. Everything is done in your browser in real-time. Whether you
          are a web designer, marketer, content creator, or student – Toolpresso
          makes image resizing simple and fast.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          SEO Benefits of Properly Sized Images
        </h2>
        <p className="text-gray-700 mb-4">
          Search engines favor websites with fast-loading images. Oversized
          images slow down your site, which can harm SEO. By using our{" "}
          <strong>online image resizer</strong>, you can adjust your visuals to
          load faster and look better, boosting performance and rankings.
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
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Conclusion
        </h2>
        <p className="text-gray-700 mb-4">
          Whether you're uploading product images, blog illustrations, or
          profile pictures, Toolpresso’s <strong>Image Resizer</strong> makes
          the job fast and easy. It’s completely free, secure, and works across
          all devices. Say goodbye to bulky software and hello to smart online
          resizing. Resize your images perfectly – only on Toolpresso.com!
        </p>

        <div className="bg-blue-50 p-4 rounded-lg text-center text-blue-700 font-medium ">
          🚀 Try the{" "}
          <a className="underline" href="/tools/image-resizer">
            Image Resizer
          </a>{" "}
          now and boost your productivity today!
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ImageResizer;
