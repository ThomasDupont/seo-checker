# SEO checker

This tool anticipate the Google Search Console error.

Do not wait to receive an email from Google about "A new indexation problem found on your domain yourdomain.com" !

Run it on your website or the website of your customers to validate the technical SEO.

It shows all errors that Lighthouse do not screen.

Validation feature :
- missing canonicals
- wrong canonicals URLs
- broken links (404, 500 ...)
- Sitemap validity
- URLs validity in sitemaps

And in the future version :
- Canonicals in double
- HTML basic stucture issues (double H1, orphans H2, ...)


## Licence

MIT : use it for free when you want, as you want

## usage

1) install Node.js : https://nodejs.org/en/blog/release/v18.12.0
2) Open a terminal
3) run `npm i -g SEOchecker`
4) run `SEOchecker --all https://yourwebsite.com`

The tool list anomalies with clear explaination page per page.

Example : "robots.txt is missing on website https://yourwebsite.com"

### launch option

- --single : check only the page url provided
- --all : check recursively all page from the page url provided
- --withExternal : check external link with
- --help (Show this help)
- -excludeStatus `<statusCode>` exclude status response for ckecked link 
- `<url>` : The url to check

EXAMPLE : `SEOchecker --single -excludeStatus 401,400 https://exemple.com/blog/article-1`

## Use it on CI

Stop now the push to production process with SEO issues by including this tool inside your CI.

If it's finding problems, it will return an exit code 1. And the CI process could be interrupted.
