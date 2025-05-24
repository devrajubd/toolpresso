import "./App.css";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import TextSummarizer from "./tools/TextSummarizer";
import Tools from "./pages/Tools";
import QRCodeGenerator from "./tools/QRCodeGenerator";
import YouTubeThumbnailDownloader from "./tools/YouTubeThumbnail";
import PasswordGenerator from "./tools/PasswordGenerator";
import URLShortener from "./tools/URLShortener";
import AgeCalculator from "./tools/AgeCalculator";
import EMICalculator from "./tools/EMICalculate";
import CountdownTimer from "./tools/CountdownTimer";
import YoutubeTagsExtractor from "./tools/YoutubeTagsExtractor";
import ColorPicker from "./tools/ColorPicker";
import CaseConverter from "./tools/CaseConverter";
import EmojiPicker from "./tools/emojiPIcker";
import About from "./pages/about";
import Contact from "./pages/contact";
import PrivacyPolicy from "./pages/Conditions";
import ImageResizer from "./tools/ImageResizer";
import ImageCompressor from "./tools/ImageCompressor";
import WordCounter from "./tools/WordCounter";
import InvoiceGenerator from "./tools/InvoiceGenerator";

function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/tools" element={<Tools />} />
      <Route path="/tools/text-summarizer" element={<TextSummarizer />} />
      <Route path="/tools/qr-code-generator" element={<QRCodeGenerator />} />
      <Route
        path="/tools/youtube-thumbnail-downloader"
        element={<YouTubeThumbnailDownloader />}
      />
      <Route path="/tools/password-generator" element={<PasswordGenerator />} />
      <Route path="/tools/url-shortener" element={<URLShortener />} />
      <Route path="/tools/age-calculator" element={<AgeCalculator />} />
      <Route path="/tools/emi-calculator" element={<EMICalculator />} />
      <Route path="/tools/countdown-timer" element={<CountdownTimer />} />
      <Route path="/tools/invoice-generator" element={<InvoiceGenerator />} />
      <Route
        path="/tools/youtube-tags-extractor"
        element={<YoutubeTagsExtractor />}
      />{" "}
      <Route path="/tools/color-picker" element={<ColorPicker />} />
      <Route path="/tools/case-converter" element={<CaseConverter />} />
      <Route path="/tools/emoji-picker" element={<EmojiPicker />} />
      <Route path="/tools/image-resizer" element={<ImageResizer />} />
      <Route path="/tools/image-compressor" element={<ImageCompressor />} />
      <Route path="/tools/word-counter" element={<WordCounter />} />
    </Routes>
  );
}

export default App;
