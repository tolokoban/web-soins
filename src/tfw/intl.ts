interface ITranslations {
    [language: string]: { [key: string]: string }
}

let gCurrentLanguage: string =
    localStorage.getItem("CurrentLanguage") || navigator.language;

export default class Intl {
    constructor(private translations: ITranslations) { }

    get lang() { return gCurrentLanguage; }

    set lang(value: string) {
        gCurrentLanguage = value;
        localStorage.setItem("CurrentLanguage", value);
    }

    translate(item: string, ...params: string[]) {
        if (this.translations[gCurrentLanguage]) {
            const translation = this.translations[gCurrentLanguage][item];
            if (translation) return addParams(translation, params);
        }

        console.error(`Missing translation for item "${item}"!`, params);
        return "";
    }
}

enum Mode { Text, Escape, Placeholder }

/**
 * In a translation, you can find placeholders for potential params.
 * They are marked with a dollar and a digit from 0 to 9.
 * For instance: "Welcome mister $1!".
 *
 * Order doesn't matter and you can have several occurences of the same
 * placeholder.
 * For instance: "Hello $2! Welcome into $1. $1 is the best...".
 *
 * @param   translation [description]
 * @param   ...params   [description]
 * @returns             [description]
 */
function addParams(translation: string, ...params: string[]): string {
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
                paramValue = params[paramIndex] || "";
                output += paramValue;
                break;
            default:
                mode = Mode.Text;
        }
    }

    return output + translation.substr(mark);
}
