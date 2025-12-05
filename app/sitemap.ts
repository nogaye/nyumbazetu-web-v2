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
    '/solutions/landlords',
    '/solutions/managers',
    '/solutions/committees',
    '/solutions/developers',
    '/solutions/banks',
    '/solutions/diaspora',
    '/features/accounting',
    '/features/collections',
    '/features/tenant-experience',
    '/features/maintenance',
    '/features/tasks',
    '/features/etims',
    '/features/tps',
    '/features/communications',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
}


