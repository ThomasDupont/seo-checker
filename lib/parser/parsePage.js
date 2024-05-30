"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseHtml = exports.avoidExternal = void 0;
const node_html_parser_1 = require("node-html-parser");
const effect_1 = require("effect");
const global_1 = __importDefault(require("../global"));
const avoidExternal = (href) => {
    if (global_1.default.checkExternal)
        return true;
    return (0, effect_1.pipe)(effect_1.Effect.try(() => {
        const url = new URL(href);
        return `${url.protocol}//${url.host}` === global_1.default.rootHostName;
    }), effect_1.Effect.catchAll(_ => effect_1.Effect.succeed(true)), effect_1.Effect.runSync);
};
exports.avoidExternal = avoidExternal;
const treatResults = (href, link) => {
    if (link.startsWith('http')) {
        return link;
    }
    else if (link.startsWith('//')) {
        return `${global_1.default.protocol}${link}`;
    }
    else if (link.startsWith('/')) {
        return `${global_1.default.rootHostName}${link}`;
    }
    else {
        return `${href}${href.endsWith('/') ? '' : '/'}${link}`;
    }
};
class ParseHtml {
    href;
    document;
    constructor(html, href) {
        this.href = href;
        this.document = (0, node_html_parser_1.parse)(html);
    }
    getCanonical() {
        return this.document.querySelector('link[rel="canonical"]')?.getAttribute('href');
    }
    getLinksHref() {
        const a = this.document.querySelectorAll('a');
        return a.map(a => a.getAttribute('href'))
            .filter((href, i) => {
            if (!href) {
                global_1.default.setAnomaly(`href is empty in link ${JSON.stringify(a[i]?.rawAttributes)} on page ${this.href}`);
                return false;
            }
            if (href.startsWith('#'))
                return false;
            if (href.startsWith('tel:'))
                return false;
            if (href.startsWith('mailto:'))
                return false;
            return !!href;
        })
            .filter((href, i, arr) => arr.indexOf(href) === i)
            .filter(href => (0, exports.avoidExternal)(href))
            .map(href => treatResults(this.href, href));
    }
    getImagesSrc() {
        const imgs = this.document.querySelectorAll('img');
        return imgs.map(img => img.getAttribute('src'))
            .filter((src, i) => {
            if (!src) {
                global_1.default.setAnomaly(`src is empty in images ${JSON.stringify(imgs[i]?.rawAttributes)} on page ${this.href}`);
            }
            return !!src;
        })
            .filter((href, i, arr) => arr.indexOf(href) === i)
            .map(src => treatResults(this.href, src));
    }
}
exports.ParseHtml = ParseHtml;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VQYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3BhcnNlci9wYXJzZVBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsdURBQXlDO0FBQ3pDLG1DQUEwQztBQUMxQyx1REFBK0I7QUFFeEIsTUFBTSxhQUFhLEdBQUcsQ0FBQyxJQUFZLEVBQUUsRUFBRTtJQUMxQyxJQUFJLGdCQUFNLENBQUMsYUFBYTtRQUFFLE9BQU8sSUFBSSxDQUFBO0lBQ3JDLE9BQU8sSUFBQSxhQUFJLEVBQ1AsZUFBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUU7UUFDUCxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN6QixPQUFPLEdBQUcsR0FBRyxDQUFDLFFBQVEsS0FBSyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssZ0JBQU0sQ0FBQyxZQUFZLENBQUE7SUFDakUsQ0FBQyxDQUFDLEVBQ0YsZUFBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGVBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDaEMsZUFBQyxDQUFDLE9BQU8sQ0FDWixDQUFBO0FBQ0wsQ0FBQyxDQUFBO0FBVlksUUFBQSxhQUFhLGlCQVV6QjtBQUNELE1BQU0sWUFBWSxHQUFHLENBQUMsSUFBWSxFQUFFLElBQVksRUFBRSxFQUFFO0lBQ2hELElBQUksSUFBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQzNCLE9BQU8sSUFBSyxDQUFBO0lBQ2hCLENBQUM7U0FBTSxJQUFJLElBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNoQyxPQUFPLEdBQUcsZ0JBQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxFQUFFLENBQUE7SUFDdEMsQ0FBQztTQUFNLElBQUksSUFBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1FB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