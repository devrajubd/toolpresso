import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center text-sm text-gray-700">
        <div>
          <h2 className="font-bold text-lg mb-3 text-blue-600">Toolpresso</h2>
          <p>Your daily toolbox for smarter digital tasks.</p>
        </div>

        <div>
          <h2 className="font-semibold mb-3 text-gray-900">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/tools" className="hover:text-blue-600">
                Tools
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-600">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-600">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-3 text-gray-900">Support</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/contact" className="hover:text-blue-600">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-blue-600">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        {/* 
        <div>
          <h2 className="font-semibold mb-3 text-gray-900">Stay Connected</h2>
          <form className="space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div> */}
      </div>

      <div className="border-t text-center py-4 text-gray-500 text-xs">
        © {new Date().getFullYear()} Toolpresso. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
