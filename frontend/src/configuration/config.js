export const BASENAME = process.env.BASENAME;

const config = Object.freeze({
  LOCALES: {
    LANGUAGES: {
      DEFAULT: 'en',
      EN: 'en',
      ES: 'es',
    },
  },
  BACKEND: 'http://localhost:8080',
  ENDPOINTS: {
    HOMECARDS: '/api/v1/homecards',
  },
});

export default config;
