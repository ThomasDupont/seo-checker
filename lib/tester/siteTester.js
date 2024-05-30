"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteChecker = void 0;
const chalk_1 = __importDefault(require("chalk"));
const global_js_1 = __importDefault(require("../global.js"));
const pageTester_js_1 = require("./pageTester.js");
const sitemapTester_js_1 = require("./sitemapTester.js");
const getRequest_js_1 = require("../utils/getRequest.js");
const siteChecker = async () => {
    if (!global_js_1.default.rootHostName) {
        throw new Error('Root host name is not defined');
    }
    const goodLinks = (await (0, pageTester_js_1.pageTester)(global_js_1.default.rootHostName)).goodLinks;
    global_js_1.default.setPageTested(global_js_1.default.rootHostName);
    await checkRecursively(goodLinks);
    const robots = await sitemapTester_js_1.SitemapTester.parseRobots(global_js_1.default.rootHostName);
    for (const sitemap of robots) {
        await sitemapTester_js_1.SitemapTester.testSitemap(sitemap);
        await Promise.all(sitemapTester_js_1.SitemapTester.getUrlsInSitemap().map(getRequest_js_1.getRequestStatus)).then(results => results.forEach(result => {
            if (result.status !== 200) {
                global_js_1.default.setAnomaly(`URL ${result.url} in sitemap is broken, status code: ${result.status}`);
            }
        }));
    }
};
exports.siteChecker = siteChecker;
const checkRecursively = async (links) => {
    for (const link of links) {
        const url = new URL(link);
        if (`${url.protocol}//${url.host}` !== global_js_1.default.rootHostName) {
            continue;
        }
        if (!global_js_1.default.isPageTested(link)) {
            console.log(chalk_1.default.blueBright(`Start checking ${link} page`));
            const { goodLinks } = await (0, pageTester_js_1.pageTester)(link);
            global_js_1.default.setPageTested(link);
            await checkRecursively(goodLinks);
        }
        else {
            return;
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZVRlc3Rlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0ZXIvc2l0ZVRlc3Rlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBeUI7QUFDekIsNkRBQWlDO0FBQ2pDLG1EQUE0QztBQUM1Qyx5REFBa0Q7QUFDbEQsMERBQXlEO0FBRWxELE1BQU0sV0FBVyxHQUFHLEtBQUssSUFBSSxFQUFFO0lBQ2xDLElBQUksQ0FBQyxtQkFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQTtJQUNwRCxDQUFDO0lBQ0QsTUFBTSxTQUFTLEdBQUcsQ0FBQyxNQUFNLElBQUEsMEJBQVUsRUFBQyxtQkFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFBO0lBRW5FLG1CQUFNLENBQUMsYUFBYSxDQUFDLG1CQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDekMsTUFBTSxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUVqQyxNQUFNLE1BQU0sR0FBRyxNQUFNLGdDQUFhLENBQUMsV0FBVyxDQUFDLG1CQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDbkUsS0FBSyxNQUFNLE9BQU8sSUFBSSxNQUFNLEVBQUUsQ0FBQztRQUMzQixNQUFNLGdDQUFhLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3hDLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBYSxDQUFDLGdCQUFnQixFQUFFLENBQUMsR0FBRyxDQUFDLGdDQUFnQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FDckYsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNyQixJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ3hCLG1CQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sTUFBTSxDQUFDLEdBQUcsdUNBQXVDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBO1lBQzlGLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FDTCxDQUFBO0lBQ0wsQ0FBQztBQUNMLENBQUMsQ0FBQTtBQXBCWSxRQUFBLFdBQVcsZUFvQnZCO0FBRUQsTUFBTSxnQkFBZ0IsR0FBRyxLQUFLLEVBQUUsS0FBZSxFQUFFLEVBQUU7SUFDL0MsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUN2QixNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN6QixJQUFJLEdBQUcsR0FBRyxDQUFDLFFBQVEsS0FBSyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssbUJBQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN6RCxTQUFRO1FBQ1osQ0FBQztRQUNELElBQUksQ0FBQyxtQkFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBSyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFBO1lBQzVELE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxNQUFNLElBQUEsMEJBQVUsRUFBQyxJQUFJLENBQUMsQ0FBQTtZQUM1QyxtQkFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUMxQixNQUFNLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3JDLENBQUM7YUFBTSxDQUFDO1lBQ0osT0FBTTtRQUNWLENBQUM7SUFDTCxDQUFDO0FBQ0wsQ0FBQyxDQUFBIn0=