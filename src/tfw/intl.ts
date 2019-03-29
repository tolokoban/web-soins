interface ITranslations {
    [language: string]: { [key: string]: string }
}

let gCurrentLanguage: string =
    localStorage.getItem("CurrentLanguage") || navigator.language;

export default class Intl {
    constructor(private translations: ITranslations) { }

    static make(translations: ITranslations) {
        const instance = new Intl(translations);
        return instance.translate.bind(instance);
    }

    static get lang() { return gCurrentLanguage; }

    static set lang(value: string) {
        gCurrentLanguage = value;
        localStorage.setItem("CurrentLanguage", value);
    }

    translate(item: string, ...params: string[]) {
        try {
            if (this.translations[gCurrentLanguage]) {
                const translation = this.translations[gCurrentLanguage][item];
                if (translation) return addParams(translation, params);
            }

            // If we don't find a translation in the current language,
            // we look in the other languages.
            const languages = Object.keys(this.translations);
            for (const lang of languages) {
                const vocabulary = this.translations[lang];
                const translation = vocabulary[item];
                if (typeof translation !== 'string') continue;
                return addParams(translation, params);
            }

            console.error(`Missing translation for item "${item}"!`, params);
            return "";
        }
        catch (ex) {
            throw Error(`Error while looking for a translation of "${item}":\n${ex}`);
        }
    }
}

// Used for the states automate in order to parse a translation
// with placeholders.
enum Mode { Text, Escape, Placeholder }

/**
 * In a translation, you can find placeholders for potential params.
 * They are marked with a dollar and a digit from 1 to 9.
 * For instance: "Welcome mister $1!".
 *
 * Order doesn't matter and you can have several occurences of the same
 * placeholder.
 * For instance: "Hello $2! Welcome into $1. $1 is the best...".
 *
 * @param   {string} translation - A string which can own placeholders.
 * @param   {string[]} params - Array of replacements for placeholders.
 * @returns The transformed string.
 */
function addParams(translation: string, params: string[]): string {
    let output = '';
    let mark = 0;
    let mode: Mode = Mode.Text;
    let paramIndex = -1;
    let paramValue = '';

    for (let index = 0; index < translation.length; index++) {
        const c = translation.charAt(index);
        switch (mode) {
            case Mode.Text:
                if (c === '\\') {
                    mode = Mode.Escape;
                    output += translation.substr(mark, index - mark);
                    mark = index + 1;
                }
                else if (c === '$') {
                    mode = Mode.Placeholder;
                    output += translation.substr(mark, index - mark);
                    mark = index + 2;
                }
                break;
            case Mode.Escape:
                mode = Mode.Text;
                break;
            case Mode.Placeholder:
                mode = Mode.Text;
                paramIndex = parseInt(c, 10);
                if (isNaN(paramIndex))
                    throw Error(`Parsing error at position ${index} for translation "${translation}"!
Escape "$" if you don't want to use a placeholder.`);
                paramValue = params[paramIndex - 1] || "";
                output += paramValue;
                break;
            default:
                mode = Mode.Text;
        }
    }

    return output + translation.substr(mark);
}
