import { MetadataRoute } from 'next'
import { getAllFeatureSlugs } from '@/lib/features'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nyumbazetu.com'

  /** Feature detail page routes from central registry. */
  const featureRoutes = getAllFeatureSlugs().map((slug) => `/features/${slug}`)

  const routes = [
    '',
    '/product',
    '/pricing',
    '/resources',
    '/about',
    '/contact',
    '/compare',
    '/blogs',
    '/faqs',
    '/careers',
    '/press',
    '/events',
    '/newsletters',
    '/privacy',
    '/terms',
    '/error',
    '/listings',
    '/solutions',
    '/solutions/landlords',
    '/solutions/managers',
    '/solutions/committees',
    '/solutions/developers',
    '/solutions/banks',
    '/solutions/diaspora',
    '/features',
    ...featureRoutes,
    '/partnerships',
    '/partnerships/ncba',
    '/partnerships/boma-yangu',
    '/partnerships/hfc',
    '/partnerships/aiesec',
    '/clients',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
}


