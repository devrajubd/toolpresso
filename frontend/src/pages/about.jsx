import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <head>
        <title>About Toolpresso – Free Online Tools for Everyday Needs</title>
        <meta
          name="title"
          content="About Toolpresso – Free Online Tools for Everyday Needs"
        />
        <meta
          name="description"
          content="Toolpresso is your hub for fast, free, and reliable online tools including text summarizers, QR code generators, password tools, image compressors, and more. Learn about our mission and vision."
        />

        {/* <!-- Keywords Meta Tag --> */}
        <meta
          name="keywords"
          content="About Toolpresso, Free Online Tools, Toolpresso Mission, Toolpresso Vision, Toolpresso Features, Text Summarizer, QR Code Generator, Image Compressor, Tool Website, Web Tools, Productivity Tools, Developer Tools"
        ></meta>
      </head>

      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-5xl w-full bg-white shadow-lg rounded-2xl p-8 md:p-12">
          <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
            About <span className="text-blue-600">Toolpresso</span>
          </h1>

          <p className="text-lg text-gray-700 mb-4 text-justify">
            <strong>Toolpresso</strong> is a collection of modern, easy-to-use,
            and completely free online utilities designed to boost your
            productivity and solve everyday digital tasks — all in your browser,
            with no installation or signups required.
          </p>

          <p className="text-lg text-gray-700 mb-4 text-justify">
            Our tool suite includes essential utilities like the{" "}
            <strong>Text Summarizer</strong>, <strong>QR Code Generator</strong>
            ,<strong> Case Converter</strong>,{" "}
            <strong>Password Generator</strong>,<strong> Color Picker</strong>,{" "}
            <strong>YouTube Thumbnail Downloader</strong>, and a smart{" "}
            <strong>YouTube Tags Extractor</strong> &{" "}
            <strong>SEO Tags Generator</strong>. Whether you're a student,
            content creator, marketer, or developer — Toolpresso gives you what
            you need, when you need it.
          </p>

          <p className="text-lg text-gray-700 mb-4 text-justify">
            You can also find helpful tools like an{" "}
            <strong>Age Calculator</strong>, <strong>EMI Calculator</strong>,{" "}
            <strong>Online Countdown Timer</strong>, and a highly responsive{" "}
            <strong>Emoji Picker</strong> for creative workflows. For
            professionals and freelancers, the{" "}
            <strong>Invoice Generator</strong> helps you create downloadable
            invoices in just seconds.
          </p>

          <p className="text-lg text-gray-700 mb-4 text-justify">
            We’ve recently added more powerful tools like the{" "}
            <strong>Image Resizer</strong>, <strong>Image Compressor</strong>,
            and <strong>Word Counter</strong> — perfect for handling content and
            media quickly and easily.
          </p>

          <p className="text-lg text-gray-700 text-justify">
            Our mission is to make your digital life easier by providing{" "}
            <strong>free online tools</strong> with zero complexity and full
            functionality — all in one place. Toolpresso is SEO-optimized,
            mobile-friendly, and built with accessibility and speed in mind.
          </p>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Toolpresso - Your Productivity Toolbox for Everyday Digital Tasks.
            </p>
            <p>
              Tags: Text Summarizer, QR Code Generator, Case Converter, Password
              Generator, Color Picker, YouTube Thumbnail Downloader, YouTube
              Tags Extractor, SEO Tags Generator, Age Calculator, EMI
              Calculator, Countdown Timer, Emoji Picker, Invoice Generator,
              Image Resizer, Image Compressor, Word Counter
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default About;
