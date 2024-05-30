"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SitemapTester = void 0;
const fast_xml_parser_1 = require("fast-xml-parser");
const effect_1 = require("effect");
const getHtml_1 = require("../parser/getHtml");
const program_types_1 = require("../@types/program.types");
const global_1 = __importDefault(require("../global"));
class SitemapTester {
    static urlsInSitemap = [];
    static extractSitemaps(robotsTxt) {
        const sitemapLines = robotsTxt.split('\n').filter(line => line.trim().startsWith('Sitemap:'));
        return sitemapLines.map(line => line.split(' ')[1].trim());
    }
    static async parseRobots(url) {
        return (0, effect_1.pipe)(effect_1.Effect.tryPromise(() => (0, getHtml_1.getHtml)(url + '/robots.txt')), effect_1.Effect.map(this.extractSitemaps), effect_1.Effect.catchAll(_ => {
            global_1.default.setAnomaly(`robots.txt is missing on website ${url}`);
            return effect_1.Effect.succeed([]);
        }), effect_1.Effect.runPromise);
    }
    static async parseSitemap(url) {
        return (0, effect_1.pipe)(effect_1.Effect.tryPromise(() => (0, getHtml_1.getHtml)(url).catch(() => {
            throw new Error('not_found');
        })), effect_1.Effect.map(xml => {
            const parser = new fast_xml_parser_1.XMLParser();
            const parsedXml = parser.parse(xml);
            return program_types_1.sitemap.parse(parsedXml);
        }), effect_1.Effect.catchAll(e => {
            if (e instanceof Error && ['not_found', 'html_empty'].includes(e.message)) {
                global_1.default.setAnomaly(`sitemap.xml is missing on page or not a valid XML ${url}`);
            }
            else {
                global_1.default.setAnomaly(`sitemap.xml is not valid on page ${url} : error ${JSON.stringify(e)}`);
            }
            return effect_1.Effect.succeed(null);
        }), effect_1.Effect.runPromise);
    }
    static async testSitemap(url) {
        const sitemap = await this.parseSitemap(url);
        if (!sitemap)
            return;
        if (this.isIndexSitemap(sitemap)) {
            for (const set of sitemap.sitemapindex.sitemap) {
                await this.testSitemap(set.loc);
            }
            return;
        }
        sitemap.urlset.url.forEach(url => {
            this.urlsInSitemap.push(url.loc);
        });
    }
    static getUrlsInSitemap() {
        return this.urlsInSitemap;
    }
    static isIndexSitemap(sitemap) {
        return 'sitemapindex' in sitemap;
    }
}
exports.SitemapTester = SitemapTester;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZW1hcFRlc3Rlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0ZXIvc2l0ZW1hcFRlc3Rlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxxREFBMkM7QUFDM0MsbUNBQTBDO0FBQzFDLCtDQUEyQztBQUMzQywyREFBeUU7QUFDekUsdURBQStCO0FBRS9CLE1BQWEsYUFBYTtJQUNkLE1BQU0sQ0FBQyxhQUFhLEdBQWEsRUFBRSxDQUFBO0lBRW5DLE1BQU0sQ0FBQyxlQUFlLENBQUMsU0FBaUI7UUFDNUMsTUFBTSxZQUFZLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDOUYsT0FBTyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFTSxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFXO1FBQ3ZDLE9BQU8sSUFBQSxhQUFJLEVBQ1AsZUFBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFBLGlCQUFPLEVBQUMsR0FBRyxHQUFHLGFBQWEsQ0FBQyxDQUFDLEVBQ2hELGVBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUMzQixlQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ1gsZ0JBQU0sQ0FBQyxVQUFVLENBQUMsb0NBQW9DLEdBQUcsRUFBRSxDQUFDLENBQUE7WUFDNUQsT0FBTyxlQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3hCLENBQUMsQ0FBQyxFQUNG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