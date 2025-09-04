// Middleware personnalisé pour gérer les images
const imageMiddleware = (config, { strapi }) => {
  return async (ctx, next) => {
    // Si c'est une requête d'image via Next.js Image Optimization
    if (ctx.path.includes('/_next/image') || ctx.path.includes('_next/image')) {
      const imageUrl = ctx.query.url || ctx.query.src;
      if (imageUrl) {
        try {
          // Rediriger vers l'image originale
          ctx.redirect(decodeURIComponent(imageUrl));
          return;
        } catch (error) {
          ctx.status = 400;
          ctx.body = { error: 'Invalid image URL' };
          return;
        }
      }
    }
    
    await next();
  };
};

export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:', 'https:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: ['http://localhost:3000', 'https://mvb-site.vercel.app', 'https://*.vercel.app']
    }
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'global::image-handler',
    config: {},
    resolve: imageMiddleware,
  },
];
