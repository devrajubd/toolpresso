import React, { useState, useCallback } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SketchPicker from "@uiw/react-color-sketch";
import { colord, extend } from "colord";
import cmykPlugin from "colord/plugins/cmyk";
import hwbPlugin from "colord/plugins/hwb";
import labPlugin from "colord/plugins/lab";
import lchPlugin from "colord/plugins/lch";
import a11yPlugin from "colord/plugins/a11y";
import { Helmet } from "react-helmet-async";

// Extend colord with plugins outside the component to avoid re-extension on re-renders
extend([cmykPlugin, hwbPlugin, labPlugin, lchPlugin, a11yPlugin]);

const CopyButton = ({ value, label, copiedState, setCopiedState }) => {
  const handleCopy = useCallback(() => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setCopiedState(true);
        setTimeout(() => setCopiedState(false), 2000);
      })
      .catch((err) => {
        console.error(`Failed to copy ${label}:`, err);
        // Optionally show a user-friendly error message
      });
  }, [value, label, setCopiedState]);

  return (
    // This is the actual button element
    <button
      onClick={handleCopy}
      className={`p-2 rounded-full cursor-pointer ${
        copiedState ? "bg-green-500" : "bg-gray-700 hover:bg-gray-600"
      } text-white transition-all duration-200 ease-in-out flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-500`}
      aria-label={`Copy ${label} color code ${value}`}
      title={copiedState ? "Copied!" : `Copy ${label}`}
    >
      {copiedState ? (
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
    </button>
  );
};

function ColorPicker() {
  const [hexColor, setHexColor] = useState("#FCBA03"); // Initial color from the screenshot
  const [copiedHex, setCopiedHex] = useState(false);
  const [copiedRgb, setCopiedRgb] = useState(false);
  const [copiedCmyk, setCopiedCmyk] = useState(false);
  const [copiedHsv, setCopiedHsv] = useState(false);
  const [copiedHsl, setCopiedHsl] = useState(false);

  // Derived color formats using colord
  const colorInstance = colord(hexColor);
  const rgb = colorInstance.toRgbString();
  const cmyk = colorInstance.toCmyk(); // Returns { c, m, y, k, a? }
  const hsv = colorInstance.toHsv(); // Returns { h, s, v, a? }
  const hsl = colorInstance.toHslString();

  // Round CMYK values to 0 decimal places for better display
  const formattedCmyk = `cmyk(${Math.round(cmyk.c)}%, ${Math.round(
    cmyk.m
  )}%, ${Math.round(cmyk.y)}%, ${Math.round(cmyk.k)}%)`;
  const formattedHsv = `hsv(${Math.round(hsv.h)}°, ${Math.round(
    hsv.s * 100
  )}%, ${Math.round(hsv.v * 100)}%)`;

  const handleChangeColor = (newColor) => {
    setHexColor(newColor.hex);
    // Reset copy states when color changes
    setCopiedHex(false);
    setCopiedRgb(false);
    setCopiedCmyk(false);
    setCopiedHsv(false);
    setCopiedHsl(false);
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>
          Free Online Color Picker – Hex, RGB, CMYK, HSV, HSL Converter |
          Toolpresso
        </title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Pick colors easily with Toolpresso's free online color picker. Get Hex, RGB, CMYK, HSV, and HSL values instantly. Perfect for designers, developers, and print artists."
        />
        <meta
          name="keywords"
          content="color picker, online color picker, hex color, rgb color, cmyk color, hsv color, hsl color, color converter, free color tool, color code, web colors, print colors, Toolpresso"
        />
        <meta name="author" content="Toolpresso" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://toolpresso.com/tools/color-picker"
        />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Free Online Color Picker – Hex, RGB, CMYK, HSV, HSL Converter | Toolpresso"
        />
        <meta
          property="og:description"
          content="Select colors and get their Hex, RGB, CMYK, HSV, and HSL values instantly with Toolpresso’s free online color picker tool."
        />
        <meta
          property="og:url"
          content="https://toolpresso.com/tools/color-picker"
        />
        <meta property="og:site_name" content="Toolpresso" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Toolpresso" />{" "}
        {/* Replace with your Twitter handle */}
        <meta name="twitter:creator" content="@Toolpresso" />{" "}
        {/* Replace with your Twitter handle */}
        <meta name="twitter:title" content="Color Picker by Toolpresso" />
        <meta
          name="twitter:description"
          content="Pick colors and get Hex, RGB, CMYK, HSV, HSL values instantly with our free online color picker."
        />
      </Helmet>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8 bg-white text-gray-900">
        {" "}
        {/* Added bg-white and text-gray-900 */}
        <h1 className="text-4xl font-extrabold text-center mb-6 sm:mb-8 text-blue-700 leading-tight">
          {" "}
          {/* Added text-blue-700 */}
          🎨 Advanced Color Picker
        </h1>
        <p className="text-center text-lg text-gray-600 mb-10 max-w-2xl">
          {" "}
          {/* Added text-gray-600 */}
          Visually select colors and instantly retrieve their codes in **Hex**,
          **RGB**, **CMYK**, **HSV**, and **HSL** formats. Perfect for web,
          print, and digital design!
        </p>
        <div className="w-full max-w-3xl  shadow-2xl rounded-xl p-6 sm:p-8 border border-gray-700">
          {" "}
          {/* Changed bg-white to bg-gray-800 for contrast as per screenshot */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold ">Colour picker</h2>{" "}
            {/* Changed text-gray-800 to text-white */}
            {/* Share button can be added here if needed */}
          </div>
          {/* SketchPicker takes care of the main color area and hue slider */}
          <div className="mb-6 ">
            <SketchPicker
              color={hexColor}
              onChange={handleChangeColor}
              disableAlpha={true} // If you don't need alpha channel
              style={{
                width: "100%",
                padding: "0",
                boxShadow: "none",
                background: "transparent",
                fontFamily: "inherit",
                overflow: "hidden",
                height: "300px",
                border: "1px solid gray",
              }}
            />
          </div>
          {/* Color Details & Copy Options */}
          <div className="space-y-4">
            {/* HEX */}
            <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg border border-gray-600 ">
              <span className="font-semibold text-base sm:text-lg text-gray-300 w-16 text-left">
                HEX:
              </span>
              <span className="font-mono text-base sm:text-xl text-gray-50 select-all flex-grow text-right pr-4">
                {hexColor.toUpperCase()}
              </span>
              {/* Removed the extra <button> wrapper here */}
              <CopyButton
                value={hexColor.toUpperCase()}
                label="HEX"
                copiedState={copiedHex}
                setCopiedState={setCopiedHex}
              />
            </div>

            {/* RGB */}
            <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg border border-gray-600">
              <span className="font-semibold text-base sm:text-lg text-gray-300 w-16 text-left">
                RGB:
              </span>
              <span className="font-mono text-base sm:text-xl text-gray-50 select-all flex-grow text-right pr-4">
                {rgb}
              </span>
              {/* Removed the extra <button> wrapper here */}
              <CopyButton
                value={rgb}
                label="RGB"
                copiedState={copiedRgb}
                setCopiedState={setCopiedRgb}
              />
            </div>

            {/* CMYK */}
            <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg border border-gray-600">
              <span className="font-semibold text-base sm:text-lg text-gray-300 w-16 text-left">
                CMYK:
              </span>
              <span className="font-mono text-base sm:text-xl text-gray-50 select-all flex-grow text-right pr-4">
                {formattedCmyk}
              </span>
              {/* Removed the extra <button> wrapper here */}
              <CopyButton
                value={formattedCmyk}
                label="CMYK"
                copiedState={copiedCmyk}
                setCopiedState={setCopiedCmyk}
              />
            </div>

            {/* HSV */}
            <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg border border-gray-600">
              <span className="font-semibold text-base sm:text-lg text-gray-300 w-16 text-left">
                HSV:
              </span>
              <span className="font-mono text-base sm:text-xl text-gray-50 select-all flex-grow text-right pr-4">
                {formattedHsv}
              </span>
              {/* Removed the extra <button> wrapper here */}
              <CopyButton
                value={formattedHsv}
                label="HSV"
                copiedState={copiedHsv}
                setCopiedState={setCopiedHsv}
              />
            </div>

            {/* HSL */}
            <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg border border-gray-600">
              <span className="font-semibold text-base sm:text-lg text-gray-300 w-16 text-left">
                HSL:
              </span>
              <span className="font-mono text-base sm:text-xl text-gray-50 select-all flex-grow text-right pr-4">
                {hsl}
              </span>
              {/* Removed the extra <button> wrapper here */}
              <CopyButton
                value={hsl}
                label="HSL"
                copiedState={copiedHsl}
                setCopiedState={setCopiedHsl}
              />
            </div>
          </div>
          {/* A small arrow for more options/feedback section similar to the screenshot */}
        </div>
      </div>

      {/* blog post  */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Online Color Picker Tool – Instantly Pick, Copy, and Customize Colors
        </h1>

        <p className="text-lg mb-6">
          Finding the perfect color just got easier with Toolpresso’s{" "}
          <strong>Color Picker</strong>. Whether you're a web designer,
          developer, artist, or brand creator, our{" "}
          <strong>online color picker tool</strong> lets you instantly select
          and copy any color with HEX, RGB, or HSL codes. Say goodbye to
          guesswork and hello to precision in every pixel.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          What is a Color Picker Tool?
        </h2>
        <p className="mb-6">
          A <strong>color picker</strong> is a visual interface that allows you
          to choose colors from a palette or gradient. It provides you with
          accurate color codes that can be used in websites, apps, graphics, and
          other creative projects. Toolpresso's color picker makes this process
          quick and reliable by displaying the HEX, RGB, and HSL codes as you
          pick a color.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Why Use Toolpresso’s Online Color Picker?
        </h2>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>
            <strong>Instant Color Detection:</strong> Pick colors in real-time
            and get exact codes instantly.
          </li>
          <li>
            <strong>Copy with One Click:</strong> Copy HEX, RGB, or HSL values
            for immediate use.
          </li>
          <li>
            <strong>HEX to RGB Converter:</strong> View your chosen color in
            multiple formats.
          </li>
          <li>
            <strong>Responsive and Fast:</strong> Use it smoothly on desktop,
            tablet, or mobile.
          </li>
          <li>
            <strong>No Login Required:</strong> 100% free, secure, and
            accessible to everyone.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Features of Our Color Picker Tool
        </h2>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>Interactive color gradient and palette</li>
          <li>Copy buttons for HEX, RGB, and HSL</li>
          <li>Live preview of selected color</li>
          <li>HEX to RGB/HSL conversion</li>
          <li>Dark and light UI mode (optional)</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Benefits of Using a Color Picker Tool
        </h2>
        <p className="mb-6">
          Whether you're building a <strong>website</strong>, designing a{" "}
          <strong>logo</strong>, or creating <strong>UI/UX components</strong>,
          choosing the right color impacts branding and user engagement. With
          Toolpresso’s <strong>online color picker</strong>:
        </p>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>Maintain brand consistency with accurate color codes</li>
          <li>Quickly find complementary or similar shades</li>
          <li>Improve productivity with an easy-to-use tool</li>
          <li>Ensure WCAG-compliant contrast for accessibility</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Who Can Use This Tool?
        </h2>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>
            <strong>Web Designers:</strong> Select brand or theme colors quickly
          </li>
          <li>
            <strong>Frontend Developers:</strong> Get CSS-ready color codes
          </li>
          <li>
            <strong>Graphic Artists:</strong> Design print-ready palettes
          </li>
          <li>
            <strong>Students:</strong> Learn about color codes and design tools
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          How to Use Toolpresso’s Color Picker Tool
        </h2>
        <ol className="list-decimal list-inside mb-6 space-y-2">
          <li>
            Open the <strong>Color Picker Tool</strong> on Toolpresso.
          </li>
          <li>Drag the slider or click on the palette to pick a color.</li>
          <li>Copy the HEX, RGB, or HSL code using the copy button.</li>
          <li>Paste it directly into your design or code editor.</li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="mb-6 space-y-4">
          <div>
            <strong>Q: What color formats does this tool support?</strong>
            <p>
              A: You can get the selected color in HEX, RGB, and HSL formats.
            </p>
          </div>
          <div>
            <strong>Q: Is Toolpresso's Color Picker free to use?</strong>
            <p>A: Yes, it's completely free with no signup or limits.</p>
          </div>
          <div>
            <strong>Q: Can I use this tool on my phone?</strong>
            <p>A: Absolutely! It’s fully responsive and mobile-friendly.</p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Ready to Find Your Perfect Color?
        </h2>
        <p className="mb-6">
          Whether you're building a website, working on a digital design, or
          coding a UI, our <strong>free online color picker tool</strong> will
          make your process faster and more accurate. Toolpresso brings you the
          precision you need – with no hassle.
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
              <a href="/tools/password-generator" className="underline">
                Password Generator
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

        <p className="text-center mt-10 text-xl font-semibold">
          <a
            href="/tools/color-picker"
            className="text-blue-600 hover:underline"
          >
            🎨 Try the Online Color Picker Now
          </a>
        </p>
      </div>
      <Footer />
    </>
  );
}

export default ColorPicker;
