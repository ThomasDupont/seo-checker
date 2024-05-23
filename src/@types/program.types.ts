import { z } from 'zod'
export type ReturnGetStatusRequest = {
    status: number
    url: string
}

export const sitemapIndex = z.object({
    sitemapindex: z.object({
        sitemap: z.array(z.object({
            loc: z.string(),
            lastmod: z.string().optional()
        }))
    })
})

export const sitemapUrlSet = z.object({
    urlset: z.object({
        url: z.array(z.object({
            loc: z.string(),
            lastmod: z.string().optional()
        }))
    })
})

export const sitemap = z.union([sitemapIndex, sitemapUrlSet])
export type Sitemap = z.infer<typeof sitemap>
export type SitemapIndex = z.infer<typeof sitemapIndex>
export type SitemapUrlSet = z.infer<typeof sitemapUrlSet>
