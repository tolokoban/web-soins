import FS from 'fs'
import Path from 'path'
import YAML from 'yaml'

function abs(...parts) {
    return Path.resolve(process.cwd(), ...parts)
}

function loadYaml(path) {
    const content = FS.readFileSync(path).toString()
    const data = YAML.parse(content)

    return data
}

function capitalize(text) {
    return `${text.charAt(0).toUpperCase()}${text.substr(1)}`
}

function pascalCase(text) {
    const [first, ...rest] = text.split('-')

    return `${first.toLowerCase()}${rest.map(capitalize).join('')}`
}

function processTranslations() {
    const translationPath = abs('src', 'translate', 'translations')
    if (!FS.existsSync(translationPath)) return

    const files = FS.readdirSync(translationPath).filter(
        f => f.endsWith('.yaml')
    )
    const keys = []
    for (const file of files) {
        const data = loadYaml(abs(translationPath, file))
        for (const key of Object.keys(data)) {
            if (!keys.includes(key)) keys.push(key)
        }
    }
    keys.sort()

    for (const file of files) {
        const [lang] = file.split('.')
        const input = loadYaml(abs(translationPath, file))
        const output = {}
        for (const key of keys) {
            const value = input[key]
            if (typeof value === 'undefined' || value === null) {
                console.error(`Missing translation for <${key
                    }> in "translate/translations/${file}"!`)
                output[key] = null
            } else {
                output[key] = value
            }
        }
        FS.writeFileSync(
            abs(translationPath, file),
            YAML.stringify(output)
        )
        FS.writeFileSync(
            abs('src', 'translate', 'translations', `lang-${lang}.ts`),
            `const T = require('./${lang}.yaml')\nexport default T`
        )
    }


    FS.writeFileSync(
        abs('src', 'translate', 'translate.ts'),
        `// This file has been generated automatically.
import TranslateBase from './translate-base'


class AppTranslations extends TranslateBase {
    constructor() {
        super()
        this._registerTranslationsLoader(async lang => {
            switch (lang) {
${files.map(
            file => {
                const [lang] = file.split('.')
                const indent = '                '
                return `${indent}case '${lang}':
${indent}    const ${lang}Mod = await import('./translations/lang-${lang}')
${indent}    return ${lang}Mod.default`
            }
        ).join('\n')
        }                        
                default:
                    return {}
            }
        })
    }
        
${keys.map(
            key => `    get ${pascalCase(key)}() { return this._("${key}") }`
        ).join('\n')
        }
}

export default new AppTranslations()
`
    )
}

processTranslations()

