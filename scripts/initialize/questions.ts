import inquirer from 'inquirer'
import { readFile, readFileSync, writeFile } from 'mz/fs'
import { resolve } from 'path'
import config from '../../bun.config'

const rootPath = process.cwd()

const isPresent = (id: string) => id.trim() !== ''

type Answers = {
  name: string
  port: number
  productionProjectId: string
  productionWebAPIKey: string
  staging: boolean
  stagingProjectId: string
  stagingWebAPIKey: string
}

const appNameQuestion = {
  type: 'input',
  name: 'appName',
  message: 'Enter the app name (i.e. "Awesome List")',
  validate: isPresent
}

const portQuestion = {
  type: 'number',
  name: 'port',
  message: 'Enter development server port',
  default: 4000
}

const stagingQuestion = {
  type: 'confirm',
  name: 'staging',
  message:
    'Do you want to setup staging now? If not, the production enviroment will be used in development (Firestore, Functions config, etc.).',
  default: false
}

function firebaseQuestions(env: 'production' | 'staging') {
  const when = env === 'production' || ((answers: Answers) => answers.staging)
  return [
    {
      type: 'input',
      name: `${env}ProjectId`,
      message: `Enter ${env} Firebase project id`,
      validate: isPresent,
      when
    },

    {
      type: 'input',
      name: `${env}WebAPIKey`,
      message: `Enter ${env} Firebase web API key`,
      validate: isPresent,
      when
    },

    {
      type: 'confirm',
      name: `${env}KeyConfirm`,
      message: `Please download service account key as secrets/keys/${env}.json in the project directory and press enter.`,
      validate: (confirm: boolean, answers: Answers) => {
        if (!confirm) return false
        try {
          const content = JSON.parse(
            readFileSync(resolve(rootPath, `secrets/keys/${env}.json`), 'utf8')
          )
          return (
            content.project_id ===
            answers[
              env === 'production' ? 'productionProjectId' : 'stagingProjectId'
            ]
          )
        } catch (err) {
          return false
        }
      },
      when
    }
  ]
}

async function main() {
  const answers = await inquirer.prompt<Answers>(
    ([appNameQuestion, portQuestion] as any[]) // TODO: How to get rid of any[]?
      .concat(firebaseQuestions('production'))
      .concat(stagingQuestion)
      .concat(firebaseQuestions('staging'))
  )

  await replaceInFiles({
    [resolve(rootPath, 'bun.config.ts')]: {
      [config.name]: answers.name,
      [config.projects.production]: answers.productionProjectId as string,
      [config.projects.staging]: answers.stagingProjectId as string,
      '4000': answers.port.toString()
    }
  })
}

main()

type Replace = { [oldString: string]: string }

async function replaceInFiles(replaces: { [fileName: string]: Replace }) {
  return Promise.all(
    Object.keys(replaces).map(filePath =>
      replaceInFile(filePath, replaces[filePath])
    )
  )
}

async function replaceInFile(
  filePath: string,
  replace: { [oldString: string]: string }
) {
  const oldContent = await readFile(filePath, 'utf8')
  const content = Object.keys(replace).reduce(
    (contentString, oldString) =>
      contentString.replace(new RegExp(oldString, 'g'), replace[oldString]),
    oldContent
  )
  return writeFile(filePath, content)
}
