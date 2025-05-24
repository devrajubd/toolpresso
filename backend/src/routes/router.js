// const express = require("express");
// const { youtubeTagExtractor } = require("../controllers/youtubeTagExtrac");
// const Summnerize = require("../controllers/SummerizerContro");

import youtubeTagExtractor from "../controllers/youtubeTagExtrac.js";
import Summnerize from "../controllers/SummerizerContro.js";
import express from "express";
import { url_shortener } from "../controllers/shortURL.js";

const router = express.Router();
router.post("/text-summarizer", Summnerize);
router.post("/youtube-tags-extractor", youtubeTagExtractor);
router.post("/shorten", url_shortener);

export default router;
