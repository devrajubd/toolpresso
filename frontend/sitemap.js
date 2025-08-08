import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';


const sitemap = new SitemapStream({ hostname: 'https://toolpresso.com' });

sitemap.write({ url: '/', changefreq: 'daily', priority: 0.8 });
sitemap.write({ url: '/tools/qr-code-generator', changefreq: 'daily', priority: 0.8 });
sitemap.write({ url: '/tools/case-converter', changefreq: 'daily', priority: 0.8 });
sitemap.write({ url: '/tools/password-generator', changefreq: 'daily', priority: 0.8 });
sitemap.write({ url: '/tools/color-picker', changefreq: 'daily', priority: 0.8 });
sitemap.write({ url: '/tools/text-summarizer', changefreq: 'daily', priority: 0.8 });
sitemap.write({ url: '/tools/youtube-thumbnail-downloader', changefreq: 'daily', priority: 0.8 });
sitemap.write({ url: '/tools/youtube-tags-extractor', changefreq: 'daily', priority: 0.8 });
sitemap.write({ url: '/tools/url-shortener', changefreq: 'daily', priority: 0.8 });
sitemap.write({ url: '/tools/age-calculator', changefreq: 'daily', priority: 0.8 });
sitemap.write({ url: '/tools/emi-calculator', changefreq: 'daily', priority: 0.8 });
sitemap.write({ url: '/tools/countdown-timer', changefreq: 'daily', priority: 0.8 });
sitemap.write({ url: '/tools/emoji-picker', changefreq: 'daily', priority: 0.8 });
sitemap.write({ url: '/tools/invoice-generator', changefreq: 'daily', priority: 0.8 });
sitemap.write({ url: '/tools/image-resizer', changefreq: 'daily', priority: 0.8 });
sitemap.write({ url: '/tools/image-compressor', changefreq: 'daily', priority: 0.8 });
sitemap.write({ url: '/tools/word-counter', changefreq: 'daily', priority: 0.8 });
// Add more pages as needed
sitemap.end();

streamToPromise(sitemap).then(data =>
    createWriteStream('./public/sitemap.xml').end(data)
);
