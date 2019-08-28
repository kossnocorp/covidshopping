import inquirer from 'inquirer'
import { resolve } from 'path'
import config from '../../bun.config'
import { readFile, writeFile } from 'mz/fs'

const isPresent = (id: string) => id.trim() !== ''

const questions = [
  {
    type: 'input',
    name: 'productionProjectId',
    message: 'Enter production project id',
    validate: isPresent
  },

  {
    type: 'input',
    name: 'stagingProjectId',
    message: 'Enter staging project id',
    validate: isPresent
  },

  {
    type: 'number',
    name: 'port',
    message: 'Enter development server port',
    default: 4000
  }
]

const rootPath = process.cwd()

inquirer.prompt(questions).then(answers =>
  replaceInFile(resolve(rootPath, 'bun.config.ts'), {
    [config.projects.production]: answers.productionProjectId as string,
    [config.projects.staging]: answers.stagingProjectId as string,
    '4000': (answers.port as number).toString()
  })
)

async function replaceInFile(
  filePath: string,
  strings: { [oldString: string]: string }
) {
  const oldContent = await readFile(filePath, 'utf8')
  const content = Object.keys(strings).reduce(
    (contentString, oldString) =>
      contentString.replace(new RegExp(oldString, 'g'), strings[oldString]),
    oldContent
  )
  return writeFile(filePath, content)
}
