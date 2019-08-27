import { AppConfig } from 'firebun/config/types'

const config: AppConfig = {
  port: 4000,

  // Sync with tsconfig.json?
  paths: {
    '#app': 'app'
  },

  projects: {
    production: 'firebun-25bba',
    staging: 'firebun-staging-7a35e'
  },

  rewrites: [
    { source: '/hello', function: 'helloWorld' },
    { source: '/**', function: 'renderer' }
  ]
}

export default config
