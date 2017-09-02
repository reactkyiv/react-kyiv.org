const environment = {
  development: {
    isProduction: false,
  },
  production: {
    isProduction: true,
  },
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  httpsPort: process.env.HTTPS_PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'React Redux SSR Example',
    description: 'All the modern best practices in one example.',
    head: {
      titleTemplate: 'React Redux SSR Example: %s',
      meta: [
        { name: 'description', content: 'All the modern best practices in one example.' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'React Redux SSR Example' },
        { property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'React Redux SSR Example' },
        { property: 'og:description', content: 'All the modern best practices in one example.' },
        { property: 'og:card', content: 'summary' },
        { property: 'og:site', content: '@andrii.tiertyshnyi' },
        { property: 'og:creator', content: '@andrii.tiertyshnyi' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' },
      ],
    },
  },
}, environment);
