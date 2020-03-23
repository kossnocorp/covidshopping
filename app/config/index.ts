import appConfig from '../../bun.config'
import { appEnv } from 'firebun/env'

export interface FirebaseWebConfig {
  apiKey: string
  authDomain: string
  projectId: string
}

const stagingFirebase: FirebaseWebConfig = {
  apiKey: 'AIzaSyDa5pC29aU11RR0xbHH0BUXnwV8CDPPfRo',
  authDomain: 'staging.covidgroceries.com',
  projectId: appConfig.projects.staging
}

export type RuntimeConfig = {
  firebase: FirebaseWebConfig
  gtag?: {
    ga: string
    app?: string
    ads?: string
  }
}

const configs: {
  development: RuntimeConfig
  staging: RuntimeConfig
  production: RuntimeConfig
  test?: RuntimeConfig
} = {
  development: {
    firebase: stagingFirebase
  },

  staging: {
    firebase: stagingFirebase
  },

  production: {
    firebase: {
      apiKey: 'AIzaSyBv1UnDo_P_lhWB0qHfuxOMN70xtsTnxYU',
      authDomain: 'covidgroceries.com',
      projectId: appConfig.projects.production
    },
    gtag: {
      ga: 'UA-161428898-1',
      app: 'G-7XMTECTB5H'
    }
  }
}
if (!configs[appEnv])
  throw new Error(`(•̀o•́)ง ${appEnv} is missing the runtime configs!`)
const config = configs[appEnv] as RuntimeConfig

export default config
export { appConfig, configs }
