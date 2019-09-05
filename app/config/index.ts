import appConfig from '../../bun.config'
import { appEnv } from 'firebun/env'

export interface FirebaseWebConfig {
  apiKey: string
  authDomain: string
  projectId: string
}

const stagingFirebase: FirebaseWebConfig = {
  apiKey: 'AIzaSyBTJ1rdienjeuQXsr9hAN-xG86RI2THsrw',
  authDomain: 'staging.diaryemail.com',
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
      apiKey: 'AIzaSyCcBRiwV8pCh7Cv5p4Z770GtpGF2sX7y4k',
      authDomain: 'diaryemail.com',
      projectId: appConfig.projects.production
    }
  }
}
if (!configs[appEnv])
  throw new Error(`(•̀o•́)ง ${appEnv} is missing the runtime configs!`)
const config = configs[appEnv] as RuntimeConfig

export default config
export { appConfig }
