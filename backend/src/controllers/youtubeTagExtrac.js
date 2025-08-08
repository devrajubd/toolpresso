// const cheerio = require("cheerio");
import axios from "axios";
import * as cheerio from "cheerio";

const youtubeTagExtractor = async (req, res) => {
  const { url } = req.body;
  const normalizeYouTubeUrl = (url) => url.replace(/^https?:\/\/m\.youtube\.com/, "https://www.youtube.com");
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const response = await axios.get(normalizeYouTubeUrl(url), {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Referer": "https://www.youtube.com/"
      },
      timeout: 10000,
    });
    const $ = cheerio.load(response.data);
    console.log(response.data);

    const tagsMeta = $('meta[name="keywords"]').attr("content");
    const tags = tagsMeta ? tagsMeta.split(",").map((t) => t.trim()) : [];
    console.log(tags);

    res.json({ tags });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch video tags" });
  }
};

export default youtubeTagExtractor;
