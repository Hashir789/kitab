import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api', '/about', '/features', '/contact'],
    },
    sitemap: 'https://kitaab.me/sitemap.xml',
  };
}
