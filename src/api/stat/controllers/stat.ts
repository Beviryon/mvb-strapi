/**
 * stat controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::stat.stat', ({ strapi }) => ({
  async create(ctx) {
    const response = await super.create(ctx);
    if (response.data) {
      // Auto-publish after creation
      await strapi.entityService.update('api::stat.stat', response.data.id, {
        data: { publishedAt: new Date() }
      });
    }
    return response;
  },

  async update(ctx) {
    const response = await super.update(ctx);
    if (response.data) {
      // Auto-publish after update
      await strapi.entityService.update('api::stat.stat', response.data.id, {
        data: { publishedAt: new Date() }
      });
    }
    return response;
  }
}));
