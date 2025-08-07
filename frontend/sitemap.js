import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';


const sitemap = new SitemapStream({ hostname: 'https://toolpresso.com' });

sitemap.write({ url: '/', changefreq: 'yearly', priority: 0.8 });
sitemap.write({ url: '/tools/qr-code-generator', changefreq: 'yearly', priority: 0.8 });
sitemap.write({ url: '/tools/case-converter', changefreq: 'yearly', priority: 0.8 });
sitemap.write({ url: '/tools/password-generator', changefreq: 'yearly', priority: 0.8 });
sitemap.write({ url: '/tools/color-picker', changefreq: 'yearly', priority: 0.8 });
sitemap.write({ url: '/tools/text-summarizer', changefreq: 'yearly', priority: 0.8 });
sitemap.write({ url: '/tools/youtube-thumbnail-downloader', changefreq: 'yearly', priority: 0.8 });
sitemap.write({ url: '/tools/youtube-tags-extractor', changefreq: 'yearly', priority: 0.8 });
sitemap.write({ url: '/tools/url-shortener', changefreq: 'yearly', priority: 0.8 });
sitemap.write({ url: '/tools/age-calculator', changefreq: 'yearly', priority: 0.8 });
sitemap.write({ url: '/tools/emi-calculator', changefreq: 'yearly', priority: 0.8 });
sitemap.write({ url: '/tools/countdown-timer', changefreq: 'yearly', priority: 0.8 });
sitemap.write({ url: '/tools/emoji-picker', changefreq: 'yearly', priority: 0.8 });
sitemap.write({ url: '/tools/invoice-generator', changefreq: 'yearly', priority: 0.8 });
sitemap.write({ url: '/tools/image-resizer', changefreq: 'yearly', priority: 0.8 });
sitemap.write({ url: '/tools/image-compressor', changefreq: 'yearly', priority: 0.8 });
sitemap.write({ url: '/tools/word-counter', changefreq: 'yearly', priority: 0.8 });
// Add more pages as needed
sitemap.end();

streamToPromise(sitemap).then(data =>
    createWriteStream('./public/sitemap.xml').end(data)
);
