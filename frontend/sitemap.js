import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';


const sitemap = new SitemapStream({ hostname: 'https://toolpresso.com' });

sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
// Add more pages as needed
sitemap.end();

streamToPromise(sitemap).then(data =>
    createWriteStream('./public/sitemap.xml').end(data)
);
