import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nyumbazetu.com'
  
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
    '/partner',
    '/events',
    '/newsletters',
    '/privacy',
    '/terms',
    '/error',
    '/home-legacy',
    '/solutions',
    '/solutions/landlords',
    '/solutions/managers',
    '/solutions/committees',
    '/solutions/developers',
    '/solutions/banks',
    '/solutions/diaspora',
    '/features',
    '/features/accounting',
    '/features/collections',
    '/features/tenant-experience',
    '/features/maintenance',
    '/features/tasks',
    '/features/etims',
    '/features/tps',
    '/features/communications',
    '/features/crm',
    '/features/white-labeling',
    '/features/calendar-scheduling',
    '/features/webhooks',
    '/partnerships',
    '/partnerships/ncba',
    '/partnerships/boma-yangu',
    '/partnerships/hfc',
    '/partnerships/aiesec',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
}


