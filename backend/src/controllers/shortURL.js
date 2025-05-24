// import { nanoid } from "nanoid";
// import urlModel from "../models/UrlShortModel.js";

import tinyurl from "tinyurl-api";

const url_shortener = async (req, res) => {
  const { url } = req.body;
  try {
    const shortUrl = await tinyurl(url);
    res.status(200).json({ shortUrl });
  } catch (error) {
    res.status(500).json({ error: "Failed to shorten URL" });
  }
};

// const urlRedirect = async (req, res) => {
//   const { shortCode } = req.params;

//   try {
//     const url = await urlModel.findOne({ shortCode });
//     if (url) {
//       return res.redirect(url.originalUrl);
//     } else {
//       return res.status(404).send("URL not found");
//     }
//   } catch (err) {
//     res.status(500).send("Server Error");
//   }
// };

export { url_shortener };

// short url using toolpresso.com api

//
//   const shortCode = nanoid(6);

//   try {
//     const existingUrl = await urlModel.findOne({ originalUrl: url });

//     if (existingUrl) {
//       res.status(200).json({
//         message: "This URL has already been shortened.",
//         shortUrl: `https://toolpresso.com/${existingUrl.shortCode}`,
//       });
//     } else {
//       const newUrl = new urlModel({
//         originalUrl: url,
//         shortCode: shortCode,
//       });
//       await newUrl.save();
//       res.json({ shortUrl: `https://toolpresso.com/${shortCode}` });
//     }
//   } catch (err) {
//     res.status(500).json({ error: "Failed to shorten URL" });
//   }
