"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sitemap = exports.sitemapUrlSet = exports.sitemapIndex = void 0;
const zod_1 = require("zod");
exports.sitemapIndex = zod_1.z.object({
    sitemapindex: zod_1.z.object({
        sitemap: zod_1.z.array(zod_1.z.object({
            loc: zod_1.z.string(),
            lastmod: zod_1.z.string().optional()
        }))
    })
});
exports.sitemapUrlSet = zod_1.z.object({
    urlset: zod_1.z.object({
        url: zod_1.z.array(zod_1.z.object({
            loc: zod_1.z.string(),
            lastmod: zod_1.z.string().optional()
        }))
    })
});
exports.sitemap = zod_1.z.union([exports.sitemapIndex, exports.sitemapUrlSet]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3JhbS50eXBlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9AdHlwZXMvcHJvZ3JhbS50eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2QkFBdUI7QUFNVixRQUFBLFlBQVksR0FBRyxPQUFDLENBQUMsTUFBTSxDQUFDO0lBQ2pDLFlBQVksRUFBRSxPQUFDLENBQUMsTUFBTSxDQUFDO1FBQ25CLE9BQU8sRUFBRSxPQUFDLENBQUMsS0FBSyxDQUFDLE9BQUMsQ0FBQyxNQUFNLENBQUM7WUFDdEIsR0FBRyxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUU7WUFDZixPQUFPLEVBQUUsT0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtTQUNqQyxDQUFDLENBQUM7S0FDTixDQUFDO0NBQ0wsQ0FBQyxDQUFBO0FBRVcsUUFBQSxhQUFhLEdBQUcsT0FBQyxDQUFDLE1BQU0sQ0FBQztJQUNsQyxNQUFNLEVBQUUsT0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNiLEdBQUcsRUFBRSxPQUFDLENBQUMsS0FBSyxDQUFDLE9BQUMsQ0FBQyxNQUFNLENBQUM7WUFDbEIsR0FBRyxFQUFFLE9BQUMsQ0FBQyxNQUFNLEVBQUU7WUFDZixPQUFPLEVBQUUsT0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtTQUNqQyxDQUFDLENBQUM7S0FDTixDQUFDO0NBQ0wsQ0FBQyxDQUFBO0FBRVcsUUFBQSxPQUFPLEdBQUcsT0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLG9CQUFZLEVBQUUscUJBQWEsQ0FBQyxDQUFDLENBQUEifQ==