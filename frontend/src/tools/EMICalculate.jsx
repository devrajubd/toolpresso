import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar"; // Assuming these exist
import Footer from "../components/Footer"; // Assuming these exist
import { Helmet } from "react-helmet-async"; // For managing document head

// Helper function for number formatting (without currency symbol)
const formatNumber = (amount) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

function EMICalculator() {
  const [principal, setPrincipal] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState(""); // in months
  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [error, setError] = useState("");

  // Recalculate EMI whenever inputs change
  useEffect(() => {
    if (principal && interestRate && tenure) {
      handleCalculate();
    } else {
      setEmi(null);
      setTotalInterest(null);
      setTotalAmount(null);
      // Only show error if user has interacted and fields are empty
      if (principal === "" && interestRate === "" && tenure === "") {
        setError(""); // Don't show error on initial load
      } else if (principal === "" || interestRate === "" || tenure === "") {
        setError("Please fill in all fields to calculate EMI.");
      }
    }
  }, [principal, interestRate, tenure]); // Dependencies updated to remove currency

  const handleCalculate = useCallback(() => {
    const p = parseFloat(principal);
    const r = parseFloat(interestRate);
    const n = parseInt(tenure, 10);

    if (isNaN(p) || isNaN(r) || isNaN(n) || p <= 0 || r < 0 || n <= 0) {
      setError("Please enter valid positive numbers for all fields.");
      setEmi(null);
      setTotalInterest(null);
      setTotalAmount(null);
      return;
    }

    setError(""); // Clear previous errors

    // Monthly interest rate
    const monthlyRate = r / 100 / 12;

    let calculatedEmi;
    if (monthlyRate === 0) {
      // Handle 0% interest rate to avoid division by zero
      calculatedEmi = p / n;
    } else {
      const numerator = p * monthlyRate * Math.pow(1 + monthlyRate, n);
      const denominator = Math.pow(1 + monthlyRate, n) - 1;
      calculatedEmi = numerator / denominator;
    }

    const totalAmountPayable = calculatedEmi * n;
    const totalInterestPayable = totalAmountPayable - p;

    setEmi(calculatedEmi);
    setTotalInterest(totalInterestPayable);
    setTotalAmount(totalAmountPayable);
  }, [principal, interestRate, tenure]);

  const handleReset = () => {
    setPrincipal("");
    setInterestRate("");
    setTenure("");
    setEmi(null);
    setTotalInterest(null);
    setTotalAmount(null);
    setError("");
  };

  const handleShare = async () => {
    if (!emi || !principal || !interestRate || !tenure) {
      setError("Calculate EMI first before sharing!");
      return;
    }

    const shareText = `EMI Calculation:
Loan Amount: ${formatNumber(parseFloat(principal))}
Annual Interest Rate: ${interestRate}%
Loan Tenure: ${tenure} months
Monthly EMI: ${formatNumber(emi)}
Total Interest Payable: ${formatNumber(totalInterest)}
Total Amount Payable: ${formatNumber(totalAmount)}

Calculated using Toolpresso's EMI Calculator!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "EMI Calculation",
          text: shareText,
          url: window.location.href, // Share the tool's URL
        });
      } catch (error) {
        console.error("Error sharing:", error);
        setError("Failed to share. Please try again.");
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      alert(
        "Sharing not supported on this browser. You can manually copy the EMI information."
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>
          Free Online EMI Calculator – Loan EMI, Interest & Total Payable |
          Toolpresso
        </title>
        <meta
          name="description"
          content="Calculate your Equated Monthly Installment (EMI) for home loans, car loans, or personal loans. Find out monthly EMI, total interest, and total amount payable easily with Toolpresso's free EMI calculator."
        />
        <meta
          name="keywords"
          content="EMI calculator, loan EMI, monthly installment, interest calculator, loan calculator, home loan EMI, car loan EMI, personal loan EMI, total interest, total amount payable, online tool, Toolpresso"
        />
        <meta name="author" content="Toolpresso" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://toolpresso.com/tools/emi-calculator"
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Free Online EMI Calculator – Loan EMI, Interest & Total Payable | Toolpresso"
        />
        <meta
          property="og:description"
          content="Calculate your EMI, total interest, and total amount payable for any loan quickly and accurately with Toolpresso's free online EMI calculator."
        />
        <meta
          property="og:url"
          content="https://toolpresso.com/tools/emi-calculator"
        />
        {/* <meta property="og:image" content="https://toolpresso.com/images/emi-calculator-og.jpg" /> */}
        <meta property="og:site_name" content="Toolpresso" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Toolpresso" />
        <meta name="twitter:creator" content="@Toolpresso" />
        <meta name="twitter:title" content="EMI Calculator by Toolpresso" />
        <meta
          name="twitter:description"
          content="Calculate your loan EMI, total interest, and total amount payable easily with our free online tool."
        />
        {/* <meta name="twitter:image" content="https://toolpresso.com/images/emi-calculator-twitter.jpg" /> */}
      </Helmet>

      <Navbar />
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8  bg-white text-gray-900 transition-colors duration-300">
        <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 border border-gray-200 mb-10">
          <h1 className="text-4xl font-extrabold text-center mb-6 sm:mb-8 text-blue-700 leading-tight">
            📊 EMI Calculator
          </h1>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Loan Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="principal"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Loan Amount:
              </label>
              <input
                type="number"
                id="principal"
                placeholder="e.g., 100000"
                className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                aria-label="Loan Amount"
              />
            </div>

            <div>
              <label
                htmlFor="interestRate"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Annual Interest Rate (%):
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="interestRate"
                  placeholder="e.g., 8.5"
                  className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  aria-label="Annual Interest Rate in percent"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
                  %
                </span>
              </div>
            </div>

            <div>
              <label
                htmlFor="tenure"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Loan Tenure (months):
              </label>
              <input
                type="number"
                id="tenure"
                placeholder="e.g., 120 (for 10 years)"
                className="w-full p-3 border border-gray-300 rounded-lg text-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                aria-label="Loan Tenure in months"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-600 bg-red-100 p-3 rounded-md mb-4 text-sm font-medium text-center">
              {error}
            </p>
          )}

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handleReset}
              className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition duration-200 ease-in-out font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer flex items-center gap-2"
              aria-label="Reset all fields"
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
              Reset
            </button>
          </div>
        </div>

        {emi !== null && (
          <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 border border-gray-200 mb-10">
            <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
              💰 EMI Breakdown
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg shadow-sm">
                <span className="font-medium text-gray-800">Monthly EMI:</span>
                <span className="font-bold text-green-600 text-3xl">
                  {formatNumber(emi)}
                </span>
              </div>
              <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                <span className="font-medium text-gray-800">Loan Amount:</span>
                <span className="font-semibold text-blue-600">
                  {formatNumber(parseFloat(principal))}
                </span>
              </div>
              <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                <span className="font-medium text-gray-800">
                  Total Interest Payable:
                </span>
                <span className="font-semibold text-red-600">
                  {formatNumber(totalInterest)}
                </span>
              </div>
              <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                <span className="font-medium text-gray-800">
                  Total Amount Payable:
                </span>
                <span className="font-semibold text-blue-600">
                  {formatNumber(totalAmount)}
                </span>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={handleShare}
                className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition duration-200 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer flex items-center gap-2"
                aria-label="Share EMI calculation results"
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
          EMI Calculator – Plan Your Loan Payments Smartly
        </h1>

        <p className="text-lg text-gray-700 mb-4">
          Planning to take a loan? Use the <strong>EMI Calculator</strong> by{" "}
          <strong>Toolpresso</strong> to calculate your monthly loan payments
          easily. Whether it's a personal loan, car loan, or home loan, our
          online EMI calculator gives you accurate results in seconds. Just
          enter your loan amount, interest rate, and loan tenure to know your
          monthly EMI.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          What is an EMI?
        </h2>
        <p className="text-gray-700 mb-4">
          EMI stands for Equated Monthly Installment. It’s the fixed amount you
          pay every month to repay a loan over a specified period. It includes
          both the principal amount and interest. Knowing your EMI in advance
          helps you plan your finances efficiently.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Why Use an EMI Calculator?
        </h2>
        <p className="text-gray-700 mb-4">
          An EMI Calculator saves you time and eliminates guesswork. Instead of
          doing complex math, just input a few loan details and instantly get:
        </p>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>Monthly EMI amount</li>
          <li>Total payment (Principal + Interest)</li>
          <li>Total interest payable</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          How Does the Toolpresso EMI Calculator Work?
        </h2>
        <p className="mb-4">
          Our **Equated Monthly Installment (EMI) Calculator** helps you quickly
          determine your monthly loan payments. It's an essential tool for
          planning your finances, whether you're considering a home loan, car
          loan, or personal loan.
        </p>
        <p className="mb-4">
          Simply input the **Loan Amount**, the **Annual Interest Rate**, and
          the **Loan Tenure (in months)**. The calculator will instantly
          provide:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>**Monthly EMI:** The fixed amount you'll pay each month.</li>
          <li>
            **Total Interest Payable:** The total interest amount you will pay
            over the entire loan tenure.
          </li>
          <li>
            **Total Amount Payable:** The sum of your principal loan amount and
            the total interest.
          </li>
        </ul>
        <p className="mt-4">
          Use this tool to compare different loan scenarios and make informed
          financial decisions!
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Key Benefits of Our EMI Calculator
        </h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>100% Free and Easy to Use</li>
          <li>Instant Results with a Clean UI</li>
          <li>Mobile-Responsive – Use it on any device</li>
          <li>Accurate EMI Breakdown for Better Planning</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Who Should Use an EMI Calculator?
        </h2>
        <p className="text-gray-700 mb-4">Our EMI Calculator is helpful for:</p>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>Home buyers looking to finance property</li>
          <li>Vehicle buyers applying for car or bike loans</li>
          <li>Students planning for education loans</li>
          <li>Anyone taking a personal or business loan</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Why Choose Toolpresso’s EMI Calculator?
        </h2>
        <p className="text-gray-700 mb-4">
          Toolpresso offers a fast, reliable, and user-friendly EMI calculator
          that works seamlessly across devices. Whether you are comparing loan
          offers or planning your budget, our EMI calculator helps you make
          informed financial decisions.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Plan Smart, Borrow Smart
        </h2>
        <p className="text-gray-700 mb-8">
          Knowing your EMI in advance allows you to manage your monthly budget
          better. Use the <strong>Toolpresso EMI Calculator</strong> today and
          borrow with confidence. No login required, no cost, and works on any
          device!
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          🛠️ Explore More Useful Tools
        </h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
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
          <a className="underline" href="/tools/text-summarizer">
            EMI Calculator
          </a>{" "}
          now and boost your productivity today!
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EMICalculator;
