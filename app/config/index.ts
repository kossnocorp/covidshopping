import appConfig from '../../bun.config'
import { AppEnv } from 'firebun/env'

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
  appName: string
  firebase: FirebaseWebConfig
}

const appName = appConfig.name

const configs: {
  [appEnv in AppEnv]: RuntimeConfig
} = {
  development: {
    appName,
    firebase: stagingFirebase
  },

  production: {
    appName,
    firebase: {
      apiKey: 'AIzaSyCcBRiwV8pCh7Cv5p4Z770GtpGF2sX7y4k',
      authDomain: 'diaryemail.com',
      projectId: appConfig.projects.production
    }
  },

  staging: {
    appName,
    firebase: stagingFirebase
  }
}
const config = configs[appEnv]

// const globalConfig: GlobalConfig = {}

export default config
// export { AppEnv, appEnv, NodeEnv, nodeEnv, globalConfig }
