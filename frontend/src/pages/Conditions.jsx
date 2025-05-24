import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PrivacyPolicy() {
  return (
    <>
      <head>
        <title>Privacy Policy – Toolpresso</title>
        <meta name="title" content="Privacy Policy – Toolpresso" />
        <meta
          name="description"
          content="Learn how Toolpresso collects, uses, and protects your data. Read our privacy policy to understand your rights and how your information is handled."
        />

        {/* <!-- Keywords Meta Tag --> */}
        <meta
          name="keywords"
          content="Toolpresso Privacy Policy, Data Privacy Toolpresso, Personal Data Protection, User Information Policy, Privacy Online Tools, GDPR Compliance, Secure Tool Usage, Online Privacy Terms"
        ></meta>
      </head>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
        <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
        <p className="mb-4">
          At <strong>Toolpresso.tools</strong>, your privacy is extremely
          important to us. This Privacy Policy outlines what information we
          collect and how we use, store, and protect it.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">
          1. Information We Collect
        </h2>
        <p className="mb-4">
          We do not collect any personally identifiable information when you use
          our free tools like Text Summarizer, QR Code Generator, Case
          Converter, Emoji Picker, and others.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">2. Log Data</h2>
        <p className="mb-4">
          Our servers may collect standard log files when you visit the site.
          This includes your IP address, browser type, date/time stamp, and
          pages visited. This data is used to monitor website performance and
          security.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">3. Cookies</h2>
        <p className="mb-4">
          We may use cookies to improve your user experience, analyze traffic,
          and display relevant ads (e.g., through Google AdSense). You can
          control cookies via your browser settings.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">
          4. Third-Party Services
        </h2>
        <p className="mb-4">
          We may use third-party tools or APIs (e.g., Google Ads, YouTube API)
          that may collect usage data. These are governed by their respective
          privacy policies.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">5. Data Security</h2>
        <p className="mb-4">
          We implement basic security measures to protect the data processed
          through our site. However, we do not store any sensitive user
          information on our servers.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">
          6. Children’s Privacy
        </h2>
        <p className="mb-4">
          Our site is not intended for children under the age of 13. We do not
          knowingly collect personal data from children.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">
          7. Changes to This Policy
        </h2>
        <p className="mb-4">
          We may update this policy from time to time. Any changes will be
          posted on this page with an updated effective date.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">8. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, feel free to
          contact us at <strong>support@toolpresso.tools</strong>.
        </p>

        <p className="mt-10 text-center text-sm text-gray-500">
          Effective Date: May 10, 2025
        </p>
      </div>
      <Footer />
    </>
  );
}

export default PrivacyPolicy;
