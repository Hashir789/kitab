import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api', '/features', '/about', '/contact'],
    },
    sitemap: 'https://kitaab.me/sitemap.xml',
  };
}
