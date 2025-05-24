// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// function CurrencyConverter() {
//   const [amount, setAmount] = useState(1);
//   const [fromCurrency, setFromCurrency] = useState("USD");
//   const [toCurrency, setToCurrency] = useState("EUR");
//   const [currencies, setCurrencies] = useState([]);
//   const [converted, setConverted] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetch("https://api.exchangerate.host/symbols")
//       .then((res) => res.json())
//       .then((data) => {
//         setCurrencies(Object.keys(data.symbols));
//       });
//   }, []);

//   const handleConvert = () => {
//     setLoading(true);
//     fetch(
//       `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         setConverted(data.result.toFixed(2));
//         setLoading(false);
//       });
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-lg mx-auto px-4 py-10 text-center">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">
//           Currency Converter
//         </h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//           <input
//             type="number"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             placeholder="Enter amount"
//             className="p-3 border rounded-lg w-full"
//           />
//           <select
//             value={fromCurrency}
//             onChange={(e) => setFromCurrency(e.target.value)}
//             className="p-3 border rounded-lg w-full"
//           >
//             {currencies.map((cur) => (
//               <option key={cur} value={cur}>
//                 {cur}
//               </option>
//             ))}
//           </select>
//           <select
//             value={toCurrency}
//             onChange={(e) => setToCurrency(e.target.value)}
//             className="p-3 border rounded-lg w-full"
//           >
//             {currencies.map((cur) => (
//               <option key={cur} value={cur}>
//                 {cur}
//               </option>
//             ))}
//           </select>
//           <button
//             onClick={handleConvert}
//             className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
//           >
//             Convert
//           </button>
//         </div>

//         {loading && <p className="text-gray-500">Converting...</p>}
//         {converted && (
//           <p className="text-xl font-semibold mt-4 text-green-600">
//             {amount} {fromCurrency} = {converted} {toCurrency}
//           </p>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default CurrencyConverter;
