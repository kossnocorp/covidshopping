import { AppConfig } from 'firebun/config/types'

const config: AppConfig = {
  name: 'The Coronavirus shopping list generator',

  port: 8000,

  // Sync with tsconfig.json?
  paths: {
    '#app': 'app',
    '#GECK': 'GECK'
  },

  projects: {
    production: 'covidgroceries',
    staging: 'covidgroceries-staging'
  },

  rewrites: [
    { source: '/hello', function: 'hello' },
    { source: '/**', function: 'renderer' }
  ]
}

export default config
