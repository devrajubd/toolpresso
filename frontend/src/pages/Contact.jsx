import { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import emailjs from "@emailjs/browser";
import { Helmet } from "react-helmet-async";

function Contact() {
  const formForEmailjs = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    title: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, seterror] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    error && seterror("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      form.name.trim() === "" ||
      form.email.trim() === "" ||
      !emailRegex.test(form.email) ||
      form.message.trim() === "" ||
      form.title.trim() === ""
    ) {
      seterror("Please fill in all fields with a valid email.");
    } else {
      emailjs
        .sendForm(
          "service_voduae5",
          "template_57zj4lk",
          formForEmailjs.current,
          {
            publicKey: "f6oNRXul7UzKR-VtB",
          }
        )
        .then(
          () => {
            console.log("SUCCESS!");
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );
      setSubmitted(true);
      setForm({ name: "", email: "", message: "", title: "" });
      seterror("");
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Toolpresso – Get in Touch with Our Team</title>
        <meta
          name="title"
          content="Contact Toolpresso – Get in Touch with Our Team"
        />
        <meta
          name="description"
          content="Have questions, feedback, or suggestions? Contact Toolpresso's team directly. We're here to help you get the most out of our free online tools."
        />

        {/* <!-- Keywords Meta Tag --> */}
        <meta
          name="keywords"
          content="Contact Toolpresso, Toolpresso Support, Contact Free Tools Website, Reach Toolpresso Team, Feedback Toolpresso, Online Tool Help, Developer Contact, Support Email Toolpresso"
        />
      </Helmet>

      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
        <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl p-8 md:p-12">
          <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
            Contact Us | <span className="text-blue-600">Toolpresso</span>
          </h1>
          <p className="text-lg text-gray-700 mb-8 text-center">
            Got questions or feedback? Reach out to Toolpresso — your hub for
            free online tools like Text Summarizer, QR Code Generator, Case
            Converter, and more!
          </p>

          {submitted ? (
            <div className="text-center text-green-600 font-semibold text-lg">
              ✅ Thank you for your message! We'll get back to you shortly.
            </div>
          ) : (
            <form
              ref={formForEmailjs}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  // type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  // type="email"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <textarea
                  name="message"
                  rows="5"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                ></textarea>
              </div>
              {error && (
                <div className="text-red-600 text-sm font-semibold">
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-medium transition"
              >
                Send Message
              </button>
            </form>
          )}

          <div className="mt-10 text-center text-sm text-gray-500">
            {/* <p>📧 Email: support@toolpresso.tools</p> */}
            <p>
              🌐 Explore tools like Text Summarizer, QR Code Generator, Case
              Converter, Password Generator, and more on our homepage.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
