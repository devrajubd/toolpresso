import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copy, setcopied] = useState("copy");

  const generatePassword = () => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const number = "0123456789";
    const symbol = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let chars = "";
    if (includeUppercase) chars += upper;
    if (includeLowercase) chars += lower;
    if (includeNumbers) chars += number;
    if (includeSymbols) chars += symbol;

    if (!chars) {
      setPassword("Please select at least one option.");
      return;
    }

    let pass = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      pass += chars[randomIndex];
    }
    setPassword(pass);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setcopied("Copied!");
    setTimeout(() => {
      setcopied("Copy");
    }, 3000);
  };

  return (
    <>
      <Helmet>
        {/* <!-- Primary Meta Tags --> */}
        <title>
          Free Password Generator – Strong & Secure Passwords | Toolpresso
        </title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Generate strong, secure, and random passwords with Toolpresso’s free online Password Generator. Customize length, symbols, numbers & more."
        />
        <meta
          name="keywords"
          content="password generator, secure password, strong password generator, create password, random password tool, Toolpresso"
        />
        <meta name="author" content="Toolpresso" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://toolpresso.com/tools/password-generator"
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Free Password Generator – Create Strong Passwords | Toolpresso"
        />
        <meta
          property="og:description"
          content="Use Toolpresso's Password Generator to instantly create strong and secure passwords with adjustable options."
        />
        <meta
          property="og:url"
          content="https://toolpresso.com/tools/password-generator"
        />
        <meta property="og:site_name" content="Toolpresso" />
      </Helmet>

      <Navbar />
      <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Strong Password Generator
        </h1>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Password Length: {length}
          </label>
          <input
            type="range"
            min="6"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-700">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={() => setIncludeUppercase(!includeUppercase)}
            />
            <span>Include Uppercase</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={() => setIncludeLowercase(!includeLowercase)}
            />
            <span>Include Lowercase</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
            />
            <span>Include Numbers</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
            />
            <span>Include Symbols</span>
          </label>
        </div>

        <button
          onClick={generatePassword}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition cursor-pointer"
        >
          Generate Password
        </button>

        {password && (
          <div className="mt-4 bg-gray-100 p-4 rounded flex justify-between items-center">
            <span className="break-words">{password}</span>
            <button
              onClick={handleCopy}
              className="ml-4 text-sm bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
            >
              {copy}
            </button>
          </div>
        )}
      </div>
      {/* blog post  */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Free Online Password Generator – Create Strong, Secure Passwords
          Instantly
        </h1>

        <p className="text-lg mb-6">
          In today’s digital world, creating a strong and unique password is
          crucial for protecting your online identity. Toolpresso’s{" "}
          <strong>Password Generator</strong> helps you generate secure, random
          passwords with a single click. Whether you're setting up a new
          account, managing team credentials, or simply improving your digital
          hygiene, our <strong>free password generator tool</strong> is the
          easiest way to create hack-proof passwords.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          What is a Password Generator?
        </h2>
        <p className="mb-6">
          A <strong>password generator</strong> is an online tool that creates
          random, complex passwords that are hard to guess or crack. These
          passwords typically contain a mix of{" "}
          <strong>
            uppercase and lowercase letters, numbers, and special characters
          </strong>
          . Our tool is designed to be{" "}
          <strong>secure, customizable, and fast</strong> – making it ideal for
          personal, professional, and enterprise use.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Why Use Toolpresso’s Password Generator?
        </h2>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>
            <strong>Free Forever:</strong> Use our password tool without any
            registration or cost.
          </li>
          <li>
            <strong>Random & Secure:</strong> Generates strong, unpredictable
            passwords.
          </li>
          <li>
            <strong>Customizable:</strong> Set the password length and
            include/exclude characters.
          </li>
          <li>
            <strong>Mobile Friendly:</strong> Works smoothly on any device.
          </li>
          <li>
            <strong>Fast & Easy:</strong> Just click "Generate Password" and
            you’re done.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Why Strong Passwords Matter
        </h2>
        <p className="mb-6">
          Weak or reused passwords are the most common way hackers access
          personal accounts. A <strong>strong password</strong> significantly
          reduces the risk of:
        </p>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>Identity theft</li>
          <li>Email and social media hacks</li>
          <li>Banking fraud and phishing attacks</li>
          <li>Data breaches</li>
        </ul>
        <p className="mb-6">
          That’s why we built Toolpresso’s{" "}
          <strong>online password generator</strong> – to help users like you
          stay safe online.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Features of Our Password Generator Tool
        </h2>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>
            <strong>Password Length:</strong> Choose from 8 to 32+ characters.
          </li>
          <li>
            <strong>Include:</strong> Uppercase, lowercase, numbers, and special
            characters.
          </li>
          <li>
            <strong>Copy Button:</strong> Copy the generated password with one
            click.
          </li>
          <li>
            <strong>Regenerate:</strong> Instantly get a new password if needed.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          How to Use the Password Generator
        </h2>
        <ol className="list-decimal list-inside mb-6 space-y-2">
          <li>
            Visit the Toolpresso <strong>Password Generator</strong> page.
          </li>
          <li>
            Set the desired password length and options (e.g., symbols,
            numbers).
          </li>
          <li>
            Click the <strong>Generate Password</strong> button.
          </li>
          <li>Copy and use your secure password!</li>
        </ol>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Best Practices for Password Security
        </h2>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>Never reuse the same password on multiple websites.</li>
          <li>Use a password manager to store and manage passwords.</li>
          <li>Enable two-factor authentication wherever possible.</li>
          <li>Change your passwords regularly.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="mb-6 space-y-4">
          <div>
            <strong>Q: Is Toolpresso’s password generator free?</strong>
            <p>A: Yes! Our tool is 100% free to use with no signup required.</p>
          </div>
          <div>
            <strong>Q: Can I customize the password length?</strong>
            <p>
              A: Absolutely. You can choose any length suitable for your needs.
            </p>
          </div>
          <div>
            <strong>Q: Do you store the passwords?</strong>
            <p>
              A: No. We never store or save any generated passwords. Your
              privacy is our priority.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Generate Your Strong Password Now
        </h2>
        <p className="mb-6">
          Don’t risk using weak or repeated passwords. Use Toolpresso’s{" "}
          <strong>strong password generator</strong> to stay safe and secure
          online. It’s fast, free, and always accessible.
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
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          🚀 Try Our Password Generator Tool Now!
        </h2>
        <p className="text-gray-700 mb-6">
          Secure your digital life in seconds. Use our{" "}
          <strong>free, easy-to-use, and reliable password generator</strong>{" "}
          today and stay protected from cyber threats.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg text-center text-blue-700 font-medium">
          ✍️ Generate your strong password now with Toolpresso’s{" "}
          <a href="/tools/password-generator" className="underline">
            Password Generator Tool
          </a>{" "}
          – fast, simple, and free!
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PasswordGenerator;
