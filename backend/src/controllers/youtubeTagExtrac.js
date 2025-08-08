// const cheerio = require("cheerio");
import axios from "axios";
import * as cheerio from "cheerio";

const youtubeTagExtractor = async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      },
    });
    const $ = cheerio.load(response.data);

    const tagsMeta = $('meta[name="keywords"]').attr("content");
    const tags = tagsMeta ? tagsMeta.split(",").map((t) => t.trim()) : [];

    res.json({ tags });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch video tags" });
  }
};

export default youtubeTagExtractor;
