import appConfig from '../../bun.config'
import { appEnv } from 'firebun/env'

export interface FirebaseWebConfig {
  apiKey: string
  authDomain: string
  projectId: string
}

const stagingFirebase: FirebaseWebConfig = {
  apiKey: 'AIzaSyAcNX2sCAlEbZ7sPWuYvt5I2NXjNP_4hMw',
  authDomain: 'staging.firebun.dev',
  projectId: appConfig.projects.staging
}

export type RuntimeConfig = {
  firebase: FirebaseWebConfig
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
      apiKey: 'AIzaSyA7kMGa_QFHrP7Cpt_KPtgKq97eyZ0wzcg',
      authDomain: 'firebun.dev',
      projectId: appConfig.projects.production
    }
  }
}
if (!configs[appEnv])
  throw new Error(`(•̀o•́)ง ${appEnv} is missing the runtime configs!`)
const config = configs[appEnv] as RuntimeConfig

export default config
export { appConfig, configs }
