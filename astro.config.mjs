import { defineConfig } from 'astro/config';
import storyblok from '@storyblok/astro';
import { loadEnv } from 'vite';

const env = loadEnv(import.meta.env?.MODE || 'production', process.cwd(), '');

export default defineConfig({
  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      apiOptions: { region: 'eu' },
      components: {
        page: 'storyblok/Page',
        hero: 'storyblok/Hero',
        slider: 'storyblok/Slider',
        slide: 'storyblok/Slide',
        stats: 'storyblok/Stats',
        stat: 'storyblok/Stat',
        campaign: 'storyblok/Campaign',
        eco_grid: 'storyblok/EcoGrid',
        eco_card: 'storyblok/EcoCard',
        cta_band: 'storyblok/CtaBand',
      },
    }),
  ],
});
