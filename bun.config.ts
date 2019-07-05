import { AppConfig } from 'firebun/config/types'

const config: AppConfig = {
  port: 12000,

  // Sync with tsconfig.json?
  paths: {
    '#app': 'app'
  },

  firebase: {
    projects: {
      production: 'firebun-25bba',
      staging: 'firebun-staging-7a35e'
    }
  },

  routes: {
    '/hello': 'helloWorld'
  }
}

export default config
