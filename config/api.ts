export default {
  rest: {
    defaultLimit: 25,
    maxLimit: 100,
    withCount: true,
  },
  responses: {
    privateAttributes: ['_v', '__v', 'id', 'created_by', 'updated_by'],
  },
  cors: {
    enabled: true,
    headers: '*',
    origin: ['http://localhost:3000', 'https://mvb-site.vercel.app', 'https://*.vercel.app']
  }
};
