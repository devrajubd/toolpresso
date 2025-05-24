import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

function CountdownTimer() {
  const [inputMinutes, setInputMinutes] = useState("");
  const [time, setTime] = useState(0); // total time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const intervalRef = useRef(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0 && isRunning) {
      clearInterval(intervalRef.current);
      alert("⏰ Time's up!");
      setIsRunning(false);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, time]);

  const handleStart = () => {
    if (!inputMinutes) return setMessage("This field is required");
    const totalSeconds = parseInt(inputMinutes) * 60;
    setTime(totalSeconds);
    setIsRunning(true);
    setHasStarted(true);
  };

  const handlePause = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const handleResume = () => {
    if (time > 0) {
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setInputMinutes("");
    setTime(0);
    setIsRunning(false);
    setHasStarted(false);
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <>
      <Helmet>
        {/* <!-- Primary Meta Tags --> */}
        <title>Countdown Timer – Online Timer Tool | Toolpresso</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Set a countdown timer online with Toolpresso’s free Countdown Timer tool. Perfect for productivity, workouts, cooking, and events. No download needed!"
        />
        <meta
          name="keywords"
          content="countdown timer, online timer, timer tool, stopwatch, timer for events, productivity timer, workout timer, Toolpresso tools"
        />
        <meta name="author" content="Toolpresso" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://toolpresso.com/tools/countdown-timer"
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Countdown Timer – Free Online Timer Tool | Toolpresso"
        />
        <meta
          property="og:description"
          content="Use Toolpresso’s simple and effective Countdown Timer to track time for tasks, exercises, cooking, or events. Accessible anytime, anywhere."
        />
        <meta
          property="og:url"
          content="https://toolpresso.com/tools/countdown-timer"
        />
        <meta property="og:site_name" content="Toolpresso" />
      </Helmet>

      <Navbar />
      <div className="max-w-md mx-auto mt-6 text-center p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">⏳ Online Countdown Timer</h2>

        <input
          type="number"
          placeholder="Enter minutes"
          value={inputMinutes}
          onChange={(e) => {
            setInputMinutes(e.target.value);
            if (message) setMessage("");
          }}
          className="w-full p-3 border mb-4 rounded-lg"
          disabled={isRunning || hasStarted}
        />
        {message && <div className="text-red-600 ">{message}</div>}
        <div className="text-4xl font-mono mb-6">{formatTime(time)}</div>

        <div className="space-x-2">
          {!hasStarted && (
            <button
              onClick={handleStart}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
            >
              Start
            </button>
          )}

          {hasStarted && !isRunning && time > 0 && (
            <button
              onClick={handleResume}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
            >
              Resume
            </button>
          )}

          {isRunning && (
            <button
              onClick={handlePause}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 cursor-pointer"
            >
              Pause
            </button>
          )}

          {hasStarted && (
            <button
              onClick={handleReset}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>
      {/* blog post  */}

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Online Countdown Timer – Set, Track, and Stay Focused
        </h1>

        <p className="text-lg text-gray-700 mb-4">
          Toolpresso’s <strong>Online Countdown Timer</strong> is a simple,
          fast, and reliable tool designed to help you track time effectively.
          Whether you're studying, cooking, working, or exercising, this free
          countdown timer makes it easy to stay on schedule. No downloads, no
          signups — just set your desired time and hit start.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          What is a Countdown Timer?
        </h2>
        <p className="text-gray-700 mb-4">
          A countdown timer counts backward from a set time to zero. It's used
          for time tracking, productivity, reminders, and time management. With
          Toolpresso’s web-based <strong>countdown timer</strong>, you don’t
          need any app or hardware — just use your browser!
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Key Features of Toolpresso's Countdown Timer
        </h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>Clean and distraction-free interface</li>
          <li>Custom time settings in hours, minutes, or seconds</li>
          <li>Instant alert when time ends</li>
          <li>Responsive and mobile-friendly</li>
          <li>Works in real-time in your browser</li>
          <li>Free to use with no account required</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Benefits of Using an Online Countdown Timer
        </h2>
        <p className="text-gray-700 mb-4">
          Time management is essential whether you’re working remotely or
          preparing for a workout. A <strong>countdown timer online</strong>{" "}
          offers numerous benefits:
        </p>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>Boosts productivity with focused work sessions</li>
          <li>Improves concentration using Pomodoro technique</li>
          <li>Helps in time-blocking during tasks</li>
          <li>Perfect for kids’ study or break time tracking</li>
          <li>Essential for cooking, workouts, and meetings</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          How to Use Toolpresso’s Countdown Timer
        </h2>
        <ol className="list-decimal ml-6 text-gray-700 mb-4">
          <li>
            Visit Toolpresso’s <strong>Countdown Timer</strong> page
          </li>
          <li>Set the desired time (HH:MM:SS)</li>
          <li>Click the “Start Timer” button</li>
          <li>The timer runs in real time — even in the background</li>
          <li>Get notified when the countdown reaches zero</li>
        </ol>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Who Can Use This Online Countdown Tool?
        </h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>Students for study sessions and breaks</li>
          <li>Teachers for classroom activities</li>
          <li>Chefs for cooking timers</li>
          <li>Fitness trainers for workouts and intervals</li>
          <li>Office workers for meetings or task time-blocking</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Why Choose Toolpresso for Your Countdown Needs?
        </h2>
        <p className="text-gray-700 mb-4">
          Toolpresso offers a fast, secure, and user-friendly{" "}
          <strong>online countdown timer</strong> that’s available anytime,
          anywhere. You don't need to install anything — just open your browser
          and set your timer. Whether you need a 5-minute timer or a 2-hour
          session, it’s built to help you stay on track.
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
        <p className="text-gray-700 mb-8">
          Managing time effectively has never been easier. Try the{" "}
          <strong>Toolpresso Countdown Timer</strong> today to stay focused and
          productive. It’s simple, accurate, and always ready to go — directly
          in your browser.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg text-center text-blue-700 font-medium ">
          🚀 Try the{" "}
          <a className="underline" href="/tools/countdown-timer">
            Countdown Timer
          </a>{" "}
          now and boost your productivity today!
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CountdownTimer;
