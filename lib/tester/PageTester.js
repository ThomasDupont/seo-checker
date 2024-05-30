"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageTester = void 0;
const effect_1 = require("effect");
const global_1 = __importDefault(require("../global"));
const getHtml_1 = require("../parser/getHtml");
const parsePage_1 = require("../parser/parsePage");
const getRequest_1 = require("../utils/getRequest");
const treatResults = ({ links, url, type }) => (results) => results.map((result, i) => {
    global_1.default.setTestedUrl(links[i]);
    if (result.status === 'rejected') {
        global_1.default.setAnomaly(`${type} ${links[i]} is broken on page ${url}`);
        return null;
    }
    if (![200, 999].includes(result.value.status)) {
        global_1.default.setAnomaly(`${type} ${links[i]} is broken on page ${url}, status code: ${result.value.status}`);
        return null;
    }
    return result.value.url;
}).filter(url => url !== null).map(url => url);
const pageTester = async (url) => {
    global_1.default.setTestedUrl(url);
    const html = await effect_1.Effect.tryPromise(() => (0, getHtml_1.getHtml)(url)).pipe(effect_1.Effect.catchAll(_ => {
        global_1.default.setAnomaly(`HTML is empty on page ${url}`);
        return effect_1.Effect.succeed(null);
    }), effect_1.Effect.runPromise);
    if (!html) {
        return {
            url,
            goodLinks: [],
            goodSrc: []
        };
    }
    const parser = new parsePage_1.ParseHtml(html, url);
    const links = parser.getLinksHref();
    const canonical = parser.getCanonical();
    const images = parser.getImagesSrc();
    const filteredLinks = links.filter(global_1.default.isNotTested.bind(global_1.default));
    const goodLinks = await Promise
        .allSettled(filteredLinks.map(getRequest_1.getRequestStatus))
        .then(treatResults({ links: filteredLinks, url, type: 'Links' }));
    if (canonical) {
        // @feature - check if the canonical is duplicated
        await (0, getRequest_1.getRequestStatus)(canonical).then((result) => {
            if (result.status !== 200) {
                global_1.default.setAnomaly(`Canonical ${canonical} is broken on page ${url}, status code: ${result.status}`);
            }
        }).catch(() => {
            global_1.default.setAnomaly(`Canonical ${canonical} is broken on page ${url}`);
        });
    }
    else {
        global_1.default.setAnomaly(`Canonical is missing on page ${url}`);
    }
    const filteredSrc = images.filter(global_1.default.isNotTested.bind(global_1.default));
    const goodSrc = await Promise
        .allSettled(filteredSrc.map(getRequest_1.getRequestStatus))
        .then(treatResults({ links: filteredSrc, url, type: 'Images' }));
    return {
        url,
        goodLinks,
        goodSrc
    };
};
exports.pageTester = pageTester;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZVRlc3Rlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0ZXIvcGFnZVRlc3Rlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxtQ0FBb0M7QUFFcEMsdURBQThCO0FBQzlCLCtDQUEyQztBQUMzQyxtREFBK0M7QUFDL0Msb0RBQXNEO0FBT3RELE1BQU0sWUFBWSxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBbUIsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUF1RCxFQUFZLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQzVKLGdCQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBRTdCLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxVQUFVLEVBQUUsQ0FBQztRQUMvQixnQkFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixHQUFHLEVBQUUsQ0FBQyxDQUFBO1FBQ2pFLE9BQU8sSUFBSSxDQUFBO0lBQ2YsQ0FBQztJQUVELElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQzVDLGdCQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsc0JBQXNCLEdBQUcsa0JBQWtCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtRQUN0RyxPQUFPLElBQUksQ0FBQTtJQUNmLENBQUM7SUFFRCxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFBO0FBQzNCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxD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