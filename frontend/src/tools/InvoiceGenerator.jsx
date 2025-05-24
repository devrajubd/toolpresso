import { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

const currencySymbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  JPY: "¥",
  AUD: "A$",
  CAD: "C$",
  CHF: "Fr",
  CNY: "¥",
  SEK: "kr",
  NZD: "$",
  MXN: "$",
  SGD: "$",
  HKD: "$",
  NOK: "kr",
  KRW: "₩",
  TRY: "₺",
  RUB: "₽",
  BRL: "R$",
  ZAR: "R",
  AED: "د.إ",
  ARS: "$",
  BGN: "лв",
  CLP: "$",
  COP: "$",
  CZK: "Kč",
  DKK: "kr",
  EGP: "£",
  HUF: "Ft",
  IDR: "Rp",
  ILS: "₪",
  MYR: "RM",
  PHP: "₱",
  PKR: "₨",
  PLN: "zł",
  RON: "lei",
  SAR: "﷼",
  THB: "฿",
  TWD: "NT$",
  UAH: "₴",
  VND: "₫",
};

const defaultFrom = {
  name: "",
  email: "",
  address: "",
  phone: "",
  businessNumber: "",
  website: "",
  owner: "",
  logo: "",
};

const defaultTo = {
  clientName: "",
  email: "",
  address: "",
  phone: "",
  fax: "",
  picture: "",
};

function InvoiceGenerator() {
  const [invoiceData, setInvoiceData] = useState(() => {
    const saved = localStorage.getItem("invoiceData");
    return saved
      ? JSON.parse(saved)
      : {
          from: { ...defaultFrom },
          to: { ...defaultTo },
          invoiceNumber: "INV001",
          date: new Date().toISOString().split("T")[0],
          terms: "Due on receipt",
          currency: "USD",
          currencySymbol: "$",
          accentColor: "#4f46e5",
          items: [{ description: "", quantity: 1, price: 0 }],
          tax: 0,
          discount: 0,
        };
  });

  const [showFromDetails, setShowFromDetails] = useState(false);
  const [showToDetails, setShowToDetails] = useState(false);

  const invoiceRef = useRef(null);

  const handleChange = (field, value) => {
    setInvoiceData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFromChange = (field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      from: { ...prev.from, [field]: value },
    }));
  };

  const handleToChange = (field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      to: { ...prev.to, [field]: value },
    }));
  };

  const handleItemChange = (index, field, value) => {
    const items = [...invoiceData.items];
    items[index][field] =
      field === "description" ? value : parseFloat(value) || 0; // Treat empty as 0
    setInvoiceData((prev) => ({ ...prev, items }));
  };

  const addItem = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: 1, price: 0 }],
    }));
  };

  const removeItem = (index) => {
    const items = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData((prev) => ({ ...prev, items }));
  };

  const subtotal = invoiceData.items.reduce(
    (sum, item) =>
      sum + (parseFloat(item.quantity) || 0) * (parseFloat(item.price) || 0), // Treat empty as 0
    0
  );
  const taxAmount = (subtotal * (parseFloat(invoiceData.tax) || 0)) / 100; // Treat empty as 0
  const discountAmount =
    (subtotal * (parseFloat(invoiceData.discount) || 0)) / 100; // Treat empty as 0
  const total = subtotal + taxAmount - discountAmount;

  // Logo upload (remains the same)
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      handleFromChange("logo", ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Picture upload for Bill To (remains the same)
  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (ev) => {
      handleToChange("picture", ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Download invoice as PDF (adjust table body for empty values)
  const handleDownload = () => {
    const doc = new jsPDF();

    // Logo (remains the same)
    if (invoiceData.from.logo) {
      doc.addImage(invoiceData.from.logo, "PNG", 185, 10, 10, 10);
    }

    if (invoiceData.to.picture) {
      doc.addImage(invoiceData.to.picture, "PNG", 70, 2, 40, 40);
    }
    // Header (remains the same)
    doc.setFontSize(18);
    doc.setTextColor(invoiceData.accentColor || "#4f46e5");
    doc.text(`Invoice #${invoiceData.invoiceNumber}`, 20, 20);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Date: ${invoiceData.date}`, 20, 30);
    doc.text(`Terms: ${invoiceData.terms}`, 20, 36);

    // From (remains the same)
    let y = 46;
    doc.setFont(undefined, "bold");
    doc.text("From:", 20, y);
    doc.setFont(undefined, "normal");
    y += 6;
    doc.text("Name: " + invoiceData.from.name || "", 20, y);
    y += 6;
    doc.text("Email: " + invoiceData.from.email || "", 20, y);
    y += 6;
    doc.text("Address " + invoiceData.from.address || "", 20, y);
    y += 6;
    doc.text("Phone: " + invoiceData.from.phone || "", 20, y);
    y += 6;
    if (invoiceData.from.businessNumber)
      doc.text("Business Number: " + invoiceData.from.businessNumber, 20, y);
    if (invoiceData.from.website) {
      y += 6;
      doc.text("Website: " + invoiceData.from.website, 20, y);
    }
    if (invoiceData.from.owner) {
      y += 6;
      doc.text("Owner: " + invoiceData.from.owner, 20, y);
    }

    // Bill To (remains the same)
    let y2 = 46;
    doc.setFont(undefined, "bold");
    doc.text("Bill To:", 110, y2);
    doc.setFont(undefined, "normal");
    y2 += 6;
    doc.text("Client Name: " + invoiceData.to.clientName || "", 110, y2);
    y2 += 6;
    doc.text("Client Email: " + invoiceData.to.email || "", 110, y2);
    y2 += 6;
    doc.text("Email: " + invoiceData.to.address || "", 110, y2);
    y2 += 6;
    doc.text("Phone:" + invoiceData.to.phone || "", 110, y2);
    y2 += 6;
    if (invoiceData.to.fax) doc.text("Fax:" + invoiceData.to.fax, 110, y2);

    // Table
    const tableY = Math.max(y, y2) + 10;
    autoTable(doc, {
      startY: tableY,
      head: [["Description", "Qty", "Price", "Total"]],
      body: invoiceData.items.map((item) => [
        item.description,
        item.quantity || 0, // Ensure 0 if empty
        `${invoiceData.currencySymbol}${(parseFloat(item.price) || 0).toFixed(
          2
        )}`, // Ensure 0 if empty
        `${invoiceData.currencySymbol}${(
          (parseFloat(item.quantity) || 0) * (parseFloat(item.price) || 0)
        ).toFixed(2)}`, // Ensure 0 if empty
      ]),
      headStyles: {
        fillColor: invoiceData.accentColor || "#4f46e5",
      },
    });

    // Totals (remain the same as they use the calculated subtotal, taxAmount, discountAmount)
    const finalY = doc.lastAutoTable?.finalY || tableY + 20;
    let tY = finalY + 8;
    doc.setFont(undefined, "bold");
    doc.text(
      `Subtotal: ${invoiceData.currencySymbol}${subtotal.toFixed(2)}`,
      140,
      tY
    );
    tY += 6;
    doc.text(
      `Tax (${invoiceData.tax}%): ${
        invoiceData.currencySymbol
      }${taxAmount.toFixed(2)}`,
      140,
      tY
    );
    tY += 6;
    doc.text(
      `Discount (${invoiceData.discount}%): ${
        invoiceData.currencySymbol
      }${discountAmount.toFixed(2)}`,
      140,
      tY
    );
    tY += 8;
    doc.setFontSize(14);
    doc.text(
      `Total: ${invoiceData.currencySymbol}${total.toFixed(2)}`,
      140,
      tY
    );

    doc.save("invoice.pdf");
  };

  const ResetData = () => {
    setInvoiceData({
      from: { ...defaultFrom },
      to: { ...defaultTo },
      invoiceNumber: "INV001",
      date: new Date().toISOString().split("T")[0],
      terms: "Due on receipt",
      currency: "USD",
      currencySymbol: "$",
      accentColor: "#4f46e5",
      items: [{ description: "", quantity: 1, price: 0 }],
      tax: 0,
      discount: 0,
    });
    setShowFromDetails(false);
    setShowToDetails(false);
    localStorage.removeItem("invoiceData");
  };

  useEffect(() => {
    localStorage.setItem("invoiceData", JSON.stringify(invoiceData));
  }, [invoiceData]);

  const printInvoice = () => window.print();

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>
          Free Online Invoice Generator – Create Professional Invoices Instantly
          | Toolpresso
        </title>
        <meta
          name="description"
          content="Generate professional invoices online for free with Toolpresso. Create, customize, and download invoices easily for your business, freelancers, or services. Simple and fast."
        />
        <meta
          name="keywords"
          content="invoice generator, online invoice, free invoice, create invoice, professional invoice, invoice maker, generate bill, billing tool, freelancer invoice, small business invoice, digital invoice, easy invoice, Toolpresso"
        />
        <meta name="author" content="Toolpresso" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://toolpresso.com/tools/invoice-generator"
        />
        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Free Online Invoice Generator – Create Professional Invoices Instantly | Toolpresso"
        />
        <meta
          property="og:description"
          content="Create, customize, and download professional invoices online for free. Ideal for freelancers, small businesses, and service providers."
        />
        <meta
          property="og:url"
          content="https://toolpresso.com/tools/invoice-generator"
        />
        {/* Replace with a relevant image for social sharing (e.g., a screenshot of the invoice generator) */}
        {/* <meta property="og:image" content="https://toolpresso.com/images/invoice-generator-og.jpg" /> */}
        <meta property="og:site_name" content="Toolpresso" />
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Toolpresso" />{" "}
        {/* Replace with your actual Twitter handle if you have one */}
        <meta name="twitter:creator" content="@Toolpresso" />{" "}
        {/* Replace with your actual Twitter handle if you have one */}
        <meta
          name="twitter:title"
          content="Online Invoice Generator by Toolpresso"
        />
        <meta
          name="twitter:description"
          content="Generate professional invoices instantly and for free. Simplify your billing process with Toolpresso's invoice maker."
        />
        {/* Replace with a relevant image for social sharing (e.g., a screenshot of the invoice generator) */}
        {/* <meta name="twitter:image" content="https://toolpresso.com/images/invoice-generator-twitter.jpg" /> */}
      </Helmet>

      <Navbar />
      <div className="p-6 max-w-4xl mx-auto text-gray-800 font-sans">
        <h1 className="text-2xl font-bold mb-4">Invoice Generator</h1>

        {/* FROM SECTION */}
        <div className="mb-4 border rounded p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <span className="font-semibold">From</span>
            <button
              className="text-blue-600 underline text-sm cursor-pointer"
              onClick={() => setShowFromDetails((v) => !v)}
            >
              {showFromDetails ? "Hide" : "Show"} additional business details
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            <input
              className="p-2 border rounded"
              placeholder="Name"
              value={invoiceData.from.name}
              onChange={(e) => handleFromChange("name", e.target.value)}
            />
            <input
              className="p-2 border rounded"
              placeholder="Email"
              value={invoiceData.from.email}
              onChange={(e) => handleFromChange("email", e.target.value)}
            />
            <input
              className="p-2 border rounded"
              placeholder="Address"
              value={invoiceData.from.address}
              onChange={(e) => handleFromChange("address", e.target.value)}
            />
            <input
              className="p-2 border rounded"
              placeholder="Phone"
              value={invoiceData.from.phone}
              onChange={(e) => handleFromChange("phone", e.target.value)}
            />
            <input
              className="p-2 border rounded"
              placeholder="Business Number"
              value={invoiceData.from.businessNumber}
              onChange={(e) =>
                handleFromChange("businessNumber", e.target.value)
              }
            />
          </div>
          {showFromDetails && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              <input
                className="p-2 border rounded"
                placeholder="Website"
                value={invoiceData.from.website}
                onChange={(e) => handleFromChange("website", e.target.value)}
              />
              <input
                className="p-2 border rounded"
                placeholder="Owner"
                value={invoiceData.from.owner}
                onChange={(e) => handleFromChange("owner", e.target.value)}
              />
            </div>
          )}
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <label
              htmlFor="logo-upload"
              className="text-gray-700 text-sm font-medium shrink-0"
            >
              Company Logo:
            </label>
            <div className="flex items-center gap-3 w-full">
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="block w-full text-sm text-gray-900
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                        file:bg-indigo-50 file:text-indigo-700
                        hover:file:bg-indigo-100 cursor-pointer"
              />
              {invoiceData.from.logo && (
                <img
                  src={invoiceData.from.logo}
                  alt="Uploaded Logo"
                  className="h-16 w-16 object-contain border border-gray-300 rounded-md shadow-sm p-1 bg-white"
                />
              )}
            </div>
          </div>
        </div>

        {/* BILL TO SECTION */}
        <div className="mb-4 border rounded p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Bill To</span>
            <button
              className="text-blue-600 underline text-sm cursor-pointer"
              onClick={() => setShowToDetails((v) => !v)}
            >
              {showToDetails ? "Hide" : "Show"} additional client details
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            <input
              className="p-2 border rounded"
              placeholder="Client Name"
              value={invoiceData.to.clientName}
              onChange={(e) => handleToChange("clientName", e.target.value)}
            />
            <input
              className="p-2 border rounded"
              placeholder="Email"
              value={invoiceData.to.email}
              onChange={(e) => handleToChange("email", e.target.value)}
            />
            <input
              className="p-2 border rounded"
              placeholder="Address"
              value={invoiceData.to.address}
              onChange={(e) => handleToChange("address", e.target.value)}
            />
            <input
              className="p-2 border rounded"
              placeholder="Phone"
              value={invoiceData.to.phone}
              onChange={(e) => handleToChange("phone", e.target.value)}
            />
          </div>
          {showToDetails && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              <input
                className="p-2 border rounded"
                placeholder="Fax"
                value={invoiceData.to.fax}
                onChange={(e) => handleToChange("fax", e.target.value)}
              />
            </div>
          )}
          <div className="mt-6 p-5 border border-dashed border-gray-300 rounded-lg bg-white text-center flex flex-col items-center justify-center">
            <label
              htmlFor="picture-upload-2"
              className="cursor-pointer text-indigo-600 hover:text-indigo-800 font-medium"
            >
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3 3.558M28 8a4 4 0 00-4-4H12a4 4 0 00-4 4m20 0v8m0 0l-3 3.558M28 8h8a4 4 0 014 4v8m-4 0a4 4 0 01-4 4H12"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="mt-2 block text-sm">Upload Picture</span>
              <input
                id="picture-upload-2"
                type="file"
                accept="image/*"
                onChange={handlePictureUpload}
                className="sr-only"
              />
            </label>
            {invoiceData.to.picture ? (
              <div className="mt-4">
                <img
                  src={invoiceData.to.picture}
                  alt="Uploaded Client Picture"
                  className="h-24 w-24 object-cover border border-gray-300 rounded-md shadow-md bg-white p-1"
                />
                <p className="mt-2 text-sm text-gray-500">Picture uploaded!</p>
              </div>
            ) : (
              <p className="mt-1 text-xs text-gray-500">
                JPG, PNG, GIF (max 5MB)
              </p>
            )}
          </div>
        </div>

        {/* INVOICE DETAILS */}
        <div className="mb-4 flex gap-4">
          <input
            className="p-2 border rounded w-1/3"
            type="text"
            value={invoiceData.invoiceNumber}
            onChange={(e) => handleChange("invoiceNumber", e.target.value)}
            placeholder="Invoice Number"
          />
          <input
            className="p-2 border rounded w-1/3"
            type="date"
            value={invoiceData.date}
            onChange={(e) => handleChange("date", e.target.value)}
          />
          <input
            className="p-2 border rounded w-1/3"
            type="text"
            value={invoiceData.terms}
            onChange={(e) => handleChange("terms", e.target.value)}
            placeholder="Terms"
          />
        </div>

        <div className="mb-4 flex gap-4 items-center">
          <select
            className="p-2 border rounded"
            value={invoiceData.currency}
            onChange={(e) =>
              setInvoiceData((prev) => ({
                ...prev,
                currency: e.target.value,
                currencySymbol: currencySymbols[e.target.value] || "",
              }))
            }
          >
            {Object.entries(currencySymbols).map(([code, symbol]) => (
              <option key={code} value={code}>
                {code} ({symbol})
              </option>
            ))}
          </select>
          <label className="ml-4">Accent Color: </label>
          <input
            className="cursor-pointer"
            type="color"
            value={invoiceData.accentColor}
            onChange={(e) => handleChange("accentColor", e.target.value)}
          />
        </div>

        {/* INVOICE PREVIEW */}
        <div ref={invoiceRef} className="border p-4 bg-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2
                className="text-xl font-bold"
                style={{ color: invoiceData.accentColor }}
              >
                Invoice #{invoiceData.invoiceNumber}
              </h2>
              <div className="text-sm">
                <div>
                  <strong>Date:</strong> {invoiceData.date}
                </div>
                <div>
                  <strong>Terms:</strong> {invoiceData.terms}
                </div>
              </div>
            </div>
            {invoiceData.from.logo && (
              <img
                src={invoiceData.from.logo}
                alt="Logo"
                className="h-16 w-16 object-contain border"
              />
            )}
          </div>
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <div className="max-w-[400px] break-words">
              <div className="font-semibold">From:</div>
              <div> Name: {invoiceData.from.name}</div>
              <div>Email: {invoiceData.from.email}</div>
              <div>Address: {invoiceData.from.address}</div>
              <div>Phone: {invoiceData.from.phone}</div>
              <div>Business Number: {invoiceData.from.businessNumber}</div>
              {showFromDetails && (
                <>
                  <div>Website: {invoiceData.from.website}</div>
                  <div>Owner: {invoiceData.from.owner}</div>
                </>
              )}
            </div>
            <div className="max-w-[400px] break-words">
              <div className="font-semibold">Bill To:</div>
              <div>Client Name: {invoiceData.to.clientName}</div>
              <div>Email: {invoiceData.to.email}</div>
              <div>Address: {invoiceData.to.address}</div>
              <div>Phone:{invoiceData.to.phone}</div>
              {showToDetails && <div>Fax: {invoiceData.to.fax}</div>}
              {invoiceData.to.picture && (
                <img
                  src={invoiceData.to.picture}
                  alt="Client"
                  className="h-12 w-12 object-contain border mt-2"
                />
              )}
            </div>
          </div>
          <table className="w-full mt-4 border border-gray-300">
            <thead
              style={{
                backgroundColor: invoiceData.accentColor,
                color: "white",
              }}
            >
              <tr>
                <th className="p-2">Description</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Price</th>
                <th className="p-2">Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(index, "description", e.target.value)
                      }
                      className="w-full p-2 border"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(index, "quantity", e.target.value)
                      }
                      className="w-full p-2 border"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        handleItemChange(index, "price", e.target.value)
                      }
                      className="w-full p-2 border"
                    />
                  </td>
                  <td className="text-right p-2">
                    {invoiceData.currencySymbol}
                    {(item.quantity * item.price).toFixed(2)}
                  </td>
                  <td>
                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-500 px-2 cursor-pointer"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={addItem}
            className="mt-2 px-4 py-1 bg-gray-200 rounded cursor-pointer"
          >
            + Add Item
          </button>
          <div className="text-right mt-4 space-y-1">
            <div>
              Subtotal: {invoiceData.currencySymbol}
              {subtotal.toFixed(2)}
            </div>
            <div>
              Tax (%):{" "}
              <input
                type="number"
                value={invoiceData.tax}
                onChange={(e) =>
                  handleChange("tax", parseFloat(e.target.value))
                }
                className="w-16 p-1 border"
              />{" "}
              = {invoiceData.currencySymbol}
              {taxAmount.toFixed(2)}
            </div>
            <div>
              Discount (%):{" "}
              <input
                type="number"
                value={invoiceData.discount}
                onChange={(e) =>
                  handleChange("discount", parseFloat(e.target.value))
                }
                className="w-16 p-1 border"
              />{" "}
              = {invoiceData.currencySymbol}
              {discountAmount.toFixed(2)}
            </div>
            <div className="font-bold text-lg mt-2">
              Total: {invoiceData.currencySymbol}
              {total.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-4">
          <button
            onClick={handleDownload}
            className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Export to PDF
          </button>
          <button
            onClick={printInvoice}
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Print Preview
          </button>
          <button
            onClick={ResetData}
            className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Reset Data
          </button>
        </div>
      </div>
      {/* blog post  */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Free Online Invoice Generator – Create & Download Invoices Instantly
        </h1>

        <p className="text-lg text-gray-700 mb-4">
          Need a fast, easy, and professional way to create invoices?
          Toolpresso’s <strong>Invoice Generator</strong> lets you generate
          custom invoices online in minutes. Whether you're a freelancer, small
          business owner, or consultant, our{" "}
          <strong>free invoice generator tool</strong> helps you create,
          download, and send invoices without any hassle.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          What is an Invoice Generator?
        </h2>
        <p className="text-gray-700 mb-4">
          An <strong>invoice generator</strong> is an online tool that helps you
          create professional-looking invoices with all necessary billing
          details, including services, prices, taxes, and contact information.
          Toolpresso offers a sleek, printable, and downloadable format for easy
          invoicing in PDF.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Why Use Toolpresso's Invoice Generator?
        </h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>Instant invoice creation with a simple interface</li>
          <li>
            Customize your invoice: logo, client info, item list, and more
          </li>
          <li>Download invoices as PDF or print directly</li>
          <li>No registration or payment required</li>
          <li>Completely browser-based and responsive</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Who Can Use the Invoice Generator Tool?
        </h2>
        <p className="text-gray-700 mb-4">
          Our <strong>free invoice generator</strong> is ideal for:
        </p>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>Freelancers billing clients for services</li>
          <li>Startups and small businesses</li>
          <li>Agencies and consultants</li>
          <li>Online sellers and digital product creators</li>
          <li>Anyone needing a quick invoice without using Excel or Word</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Key Features of Toolpresso Invoice Generator
        </h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>Invoice number auto-generation</li>
          <li>Date and due date input</li>
          <li>Customizable fields for business name, client name, services</li>
          <li>Automatic tax and total calculations</li>
          <li>Download and share invoice as PDF</li>
          <li>Works perfectly on desktop and mobile devices</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          How to Use Toolpresso’s Free Invoice Generator
        </h2>
        <ol className="list-decimal ml-6 text-gray-700 mb-4">
          <li>Open the Invoice Generator tool on Toolpresso.com</li>
          <li>Fill in your business details, invoice number, and dates</li>
          <li>Add line items for products or services</li>
          <li>Review totals and taxes</li>
          <li>Download your invoice or print it instantly</li>
        </ol>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Benefits of Using an Online Invoice Generator
        </h2>
        <ul className="list-disc ml-6 text-gray-700 mb-4">
          <li>Save time on invoice creation</li>
          <li>Ensure accuracy with automatic calculations</li>
          <li>Present your brand with a professional layout</li>
          <li>Avoid costly invoicing software</li>
          <li>Track payments and due dates effectively</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">
          Why Choose Toolpresso for Invoice Generation?
        </h2>
        <p className="text-gray-700 mb-4">
          At Toolpresso, we focus on creating powerful, lightweight, and
          user-friendly online tools. Our <strong>invoice generator</strong> is
          free, fast, mobile-friendly, and doesn’t require any login. You can
          generate multiple invoices anytime from anywhere.
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
          Conclusion
        </h2>
        <p className="text-gray-700 mb-4">
          Ready to send your next invoice in seconds? Try Toolpresso’s{" "}
          <strong>Invoice Generator</strong> – a simple, smart, and secure
          solution for all your billing needs. Stay professional, organized, and
          get paid on time without wasting hours on formatting. It’s free,
          online, and always accessible. Start invoicing smarter today!
        </p>

        <div className="bg-blue-50 p-4 rounded-lg text-center text-blue-700 font-medium mt-10">
          🚀 Try the{" "}
          <a className="underline" href="/tools/invoice-generator">
            Invoice Generator
          </a>{" "}
          now and boost your productivity today!
        </div>
      </div>
      <Footer />
    </>
  );
}

export default InvoiceGenerator;
