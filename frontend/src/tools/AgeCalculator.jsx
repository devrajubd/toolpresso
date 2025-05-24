import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

const calculateAgeDuration = (startDate, endDate) => {
  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  let days = endDate.getDate() - startDate.getDate();

  // Adjust months and years if days are negative
  if (days < 0) {
    months -= 1;
    // Get the number of days in the previous month of the end date
    days += new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
  }

  // Adjust years if months are negative
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // Calculate total days for more detailed stats (ignoring leap seconds/minutes for simplicity)
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;
  const totalSeconds = totalMinutes * 60;

  return {
    years,
    months,
    days,
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds,
  };
};

function AgeCalculator() {
  const [mode, setMode] = useState("current");
  const [birthDateInput, setBirthDateInput] = useState("");
  const [deathDateInput, setDeathDateInput] = useState("");
  const [ageDetails, setAgeDetails] = useState(null);
  const [countdownDays, setCountdownDays] = useState(null);
  const [message, setMessage] = useState("");

  // Effect to re-calculate age whenever birthDateInput, deathDateInput, or mode changes
  useEffect(() => {
    if (birthDateInput) {
      calculateAge();
    } else {
      setAgeDetails(null);
      setCountdownDays(null);
      setMessage("");
    }
  }, [birthDateInput, deathDateInput, mode]);

  // Function to calculate countdown to next birthday
  const calculateBirthdayCountdown = useCallback((birth) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let nextBirthday = new Date(
      today.getFullYear(),
      birth.getMonth(),
      birth.getDate()
    );
    nextBirthday.setHours(0, 0, 0, 0);

    // If birthday has already passed this year, set it for next year
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const diff = nextBirthday.getTime() - today.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    setCountdownDays(days);
  }, []);

  // Main age calculation logic
  const calculateAge = useCallback(() => {
    if (!birthDateInput) {
      setAgeDetails(null);
      setCountdownDays(null);
      setMessage("Please enter a valid Birth Date.");
      return;
    }

    const birth = new Date(birthDateInput);
    // Validate birth date
    if (isNaN(birth.getTime())) {
      setAgeDetails(null);
      setCountdownDays(null);
      setMessage("Invalid Birth Date format. Please use YYYY-MM-DD.");
      return;
    }

    const endDate =
      mode === "death" && deathDateInput
        ? new Date(deathDateInput)
        : new Date();

    // Validate death date if applicable
    if (mode === "death" && deathDateInput && isNaN(endDate.getTime())) {
      setAgeDetails(null);
      setCountdownDays(null);
      setMessage("Invalid Death Date format. Please use YYYY-MM-DD.");
      return;
    }

    if (endDate < birth && mode === "death") {
      setAgeDetails(null);
      setCountdownDays(null);
      setMessage("Death Date cannot be earlier than Birth Date.");
      return;
    }

    const ageCalculated = calculateAgeDuration(birth, endDate);
    setAgeDetails(ageCalculated);
    setMessage("");

    if (mode === "current") {
      calculateBirthdayCountdown(birth);
    } else {
      setCountdownDays(null);
    }
  }, [birthDateInput, deathDateInput, mode, calculateBirthdayCountdown]);

  const handleShare = async () => {
    if (!ageDetails) {
      setMessage("Calculate age first before sharing!");
      return;
    }

    let shareText = "";
    if (mode === "death") {
      shareText = `Age at Death: ${ageDetails.years} years, ${ageDetails.months} months, ${ageDetails.days} days.`;
    } else {
      shareText = `My current age is ${ageDetails.years} years, ${ageDetails.months} months, ${ageDetails.days} days.`;
      if (countdownDays !== null) {
        shareText += `\n🎂 My next birthday is in ${countdownDays} days!`;
      }
    }
    shareText += `\n\nCalculated using Toolpresso's Age Calculator!`; // Branding for sharing

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Age Information",
          text: shareText,
          url: window.location.href, // Share the tool's URL
        });
      } catch (error) {
        console.error("Error sharing:", error);
        setMessage("Failed to share. Please try again.");
      }
    } else {
      alert(
        "Sharing not supported on this browser. You can manually copy the age information."
      );
    }
  };

  const handleClear = () => {
    setBirthDateInput("");
    setDeathDateInput("");
    setAgeDetails(null);
    setCountdownDays(null);
    setMessage("Inputs cleared!");
  };

  return (
    <>
      <Helmet>
        <title>
          Online Age Calculator – Calculate Your Age or Between Dates |
          Toolpresso
        </title>
        <meta
          name="description"
          content="Calculate current age, age at death, or the exact duration between any two dates in years, months, days, and total days, hours, minutes. Free online age calculator by Toolpresso."
        />
        <meta
          name="keywords"
          content="age calculator, date calculator, calculate age, age at death, how old am I, years months days, date difference, birthday countdown, online tool, Toolpresso"
        />
        <meta name="author" content="Toolpresso" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://toolpresso.com/tools/age-calculator"
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Online Age Calculator – Calculate Your Age or Between Dates | Toolpresso"
        />
        <meta
          property="og:description"
          content="Find out your exact age or calculate the duration between any two dates with Toolpresso's free and easy-to-use age calculator."
        />
        <meta
          property="og:url"
          content="https://toolpresso.com/tools/age-calculator"
        />
        {/* <meta property="og:image" content="https://toolpresso.com/images/age-calculator-og.jpg" /> */}
        <meta property="og:site_name" content="Toolpresso" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Toolpresso" />
        <meta name="twitter:creator" content="@Toolpresso" />
        <meta name="twitter:title" content="Age Calculator by Toolpresso" />
        <meta
          name="twitter:description"
          content="Calculate your age, age at death, or duration between dates. Get years, months, days, and even total days, hours, minutes with our free online tool."
        />
        {/* <meta name="twitter:image" content="https://toolpresso.com/images/age-calculator-twitter.jpg" /> */}
      </Helmet>

      <Navbar />
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8  transition-colors duration-300">
        <h1 className="text-4xl font-extrabold text-center mb-6 sm:mb-8 text-blue-600  leading-tight">
          ⏳ Age Calculator
        </h1>
        <p className="text-center text-lg mb-10 max-w-2xl mx-auto">
          Calculate your exact age or the duration between any two dates, down
          to the day, hour, and minute.
        </p>

        <div className="bg-white  shadow-xl rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 mb-10">
          <h2 className="text-2xl font-bold mb-6">Calculation Options</h2>

          <div className="flex justify-center flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={() => setMode("current")}
              className={`px-6 py-3 rounded-lg text-lg font-semibold transition duration-200 ease-in-out cursor-pointer ${
                mode === "current"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              }`}
              aria-pressed={mode === "current"}
            >
              Current Age
            </button>
            <button
              onClick={() => setMode("death")}
              className={`px-6 py-3 rounded-lg text-lg font-semibold transition duration-200 ease-in-out cursor-pointer ${
                mode === "death"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              }`}
              aria-pressed={mode === "death"}
            >
              Age at a Past Date
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="birthDate"
                className="block text-lg font-medium mb-2"
              >
                Date of Birth:
              </label>
              <input
                type="date"
                id="birthDate"
                value={birthDateInput}
                onChange={(e) => setBirthDateInput(e.target.value)}
                className="w-full cursor-pointer p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-lg  bg-white  focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition duration-200"
                aria-required="true"
              />
            </div>

            {mode === "death" && (
              <div>
                <label
                  htmlFor="deathDate"
                  className="block  text-lg font-medium mb-2"
                >
                  End Date:
                </label>
                <input
                  type="date"
                  id="deathDate"
                  value={deathDateInput}
                  onChange={(e) => setDeathDateInput(e.target.value)}
                  className="w-full p-3 border cursor-pointer border-gray-300 dark:border-gray-600 rounded-lg text-lg  bg-white  focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition duration-200"
                  aria-required="true"
                />
              </div>
            )}
          </div>
          {message && (
            <div
              className={`mt-4 p-3 rounded-md text-sm font-medium text-center ${
                message.includes("Invalid") || message.includes("cannot")
                  ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                  : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
              }`}
            >
              {message}
            </div>
          )}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleClear}
              className="bg-red-500 cursor-pointer hover:bg-red-600 text-white py-3 px-6 rounded-lg font-semibold transition duration-200 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400"
              aria-label="Clear all inputs"
            >
              Clear
            </button>
          </div>
        </div>

        {ageDetails && (
          <div className="bg-white  shadow-xl rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 mb-10">
            <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-6 text-center">
              {mode === "current" ? "Your Current Age" : "Calculated Age"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg shadow-sm">
                <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Years
                </p>
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-300">
                  {ageDetails.years}
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg shadow-sm">
                <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Months
                </p>
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-300">
                  {ageDetails.months}
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg shadow-sm">
                <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Days
                </p>
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-300">
                  {ageDetails.days}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
                Detailed Breakdown
              </h3>
              <ul className="space-y-3 text-lg text-gray-700 dark:text-gray-300">
                <li className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                  <span>Total Days:</span>
                  <span className="font-mono text-gray-900 dark:text-gray-50">
                    {ageDetails.totalDays.toLocaleString()}
                  </span>
                </li>
                <li className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                  <span>Total Hours:</span>
                  <span className="font-mono text-gray-900 dark:text-gray-50">
                    {ageDetails.totalHours.toLocaleString()}
                  </span>
                </li>
                <li className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                  <span>Total Minutes:</span>
                  <span className="font-mono text-gray-900 dark:text-gray-50">
                    {ageDetails.totalMinutes.toLocaleString()}
                  </span>
                </li>
                <li className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                  <span>Total Seconds:</span>
                  <span className="font-mono text-gray-900 dark:text-gray-50">
                    {ageDetails.totalSeconds.toLocaleString()}
                  </span>
                </li>
              </ul>
            </div>

            {mode === "current" && countdownDays !== null && (
              <div className="mt-8 text-center bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg shadow-sm">
                <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  🎂 Days Left for Next Birthday:
                </p>
                <p className="text-5xl font-bold text-yellow-700 dark:text-yellow-300">
                  {countdownDays}
                </p>
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <button
                onClick={handleShare}
                className="bg-green-600 cursor-pointer hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition duration-200 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 flex items-center gap-2"
                aria-label="Share age calculation"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M15 8a3 3 0 10-2.977-2.977l-1.287 1.287a3 3 0 00-3.071 3.071l-1.287 1.287A3 3 0 103 16a3 3 0 003-3.071l1.287-1.287a3 3 0 003.071-3.071l1.287-1.287A3 3 0 0015 8z" />
                </svg>
                Share Results
              </button>
            </div>
          </div>
        )}
      </div>
      {/* blog post  */}

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Age Calculator – Instantly Calculate Your Exact Age
        </h1>

        <p className="text-lg text-gray-700 mb-4">
          Looking for a fast and accurate way to calculate your age? Try our
          free Age Calculator at <strong>Toolpresso</strong>. This tool tells
          you your exact age in years, months, and days within seconds. Whether
          you're planning a birthday, filling out a form, or just curious, our
          Age Calculator gives you the most precise result instantly.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          What is an Age Calculator?
        </h2>
        <p className="text-gray-700 mb-4">
          An Age Calculator is an online tool that calculates your age from your
          date of birth to the current date. It's accurate, easy to use, and
          ideal for personal use, job applications, school admissions, and more.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Features of Our Online Age Calculator
        </h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>Calculates exact age in years, months, and days</li>
          <li>User-friendly and responsive design</li>
          <li>No sign-up or downloads needed</li>
          <li>Works on any device: mobile, tablet, desktop</li>
          <li>100% free and instant results</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          How This Age Calculator Works
        </h2>
        <p className="my-4">
          Our **Online Age Calculator** provides a precise breakdown of age in
          years, months, and days. It also offers advanced metrics like total
          days, hours, minutes, and seconds lived.
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            **Current Age Mode:** Enter your birth date to find out your exact
            age today and how many days are left until your next birthday.
          </li>
          <li>
            **Age at a Past Date Mode:** Input a birth date and an end date
            (e.g., a death date) to determine the exact age of an individual at
            that specific point in time.
          </li>
          <li>
            **Accuracy:** Our calculations account for leap years and the
            varying number of days in each month for precise results.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Why Use an Age Calculator?
        </h2>
        <p className="text-gray-700 mb-4">
          Manually calculating your age can be confusing, especially when
          figuring out leap years and months. Our Age Calculator does all the
          math for you, ensuring accuracy and saving time. Whether it's for
          school, job applications, passport forms, or curiosity—this tool is
          the perfect solution.
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
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Try Toolpresso’s Age Calculator Today!
        </h2>
        <p className="text-gray-700 mb-8">
          Don’t guess your age—know it! Use our Age Calculator tool at{" "}
          <strong>
            <a href="/" className="underline">
              Toolpresso.com
            </a>
          </strong>{" "}
          for quick, accurate age calculations. It’s free, fast, and made for
          everyone.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg text-center text-blue-700 font-medium ">
          🚀 Try the{" "}
          <a className="underline" href="/tools/age-calculator">
            Age Calculator
          </a>{" "}
          now and boost your productivity today!
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AgeCalculator;
