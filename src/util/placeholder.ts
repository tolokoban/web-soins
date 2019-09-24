export default { parse, parseXML }

export interface IParsingResult {
    sections: string[],
    placeholders: string[]
}

export interface IXMLParsingResult {
    sections: string[],
    placeholders: {
        prefix: string,
        value: string,
        postfix: string
    }[]
}

/**
 * Placeholders are surrounded by double curly brackets.
 * Content "Hello {{world}} of madness {{and pleasure}}!"
 * will be converted into {
 *   sections: [ "Hello ", " of madness ", "!" ],
 *   placeholders: [ "world", "and pleasure" ]
 * }
 */
function parse(content: string) {
    // Current position in the text.
    let index = 0
    // Position just after the last char of the text.
    const end = content.length
    const sections: string[] = []
    const placeholders: string[] = []

    while( index < end ) {
        const startOfPlaceholder = content.indexOf('{{', index)
        if (startOfPlaceholder === -1) {
            sections.push(content.substr(index))
            return { sections, placeholders }
        }
        sections.push(content.substr(index, startOfPlaceholder - index))
        index = startOfPlaceholder + 2
        const endOfPlaceholder = content.indexOf('}}', index)
        if (endOfPlaceholder === -1) {
            placeholders.push(content.substr(index))
            return { sections, placeholders }
        }
        placeholders.push(content.substr(index, endOfPlaceholder - index))
        index = endOfPlaceholder + 2
    }

    return { sections, placeholders }
}


function parseXML(xmlContent: string): IXMLParsingResult {
    const textParsing = parse(xmlContent)
    const result: IXMLParsingResult = {
        placeholders: textParsing.placeholders
            .map((item: string) => ({
                prefix: '',
                value: item,
                postfix: ''
            })),
        sections: textParsing.sections
    }

    const placeholders = result.placeholders
    const sections = result.sections

    for (let index = 0 ; index < result.sections.length - 1 ; index++) {
        const placeholder = placeholders[index]

        const sectionBefore = sections[index]
        const posBefore = sectionBefore.lastIndexOf('<')
        if (posBefore !== -1) {
            placeholder.prefix = sectionBefore.substr(posBefore)
            sections[index] = sectionBefore.substr(0, posBefore)
        }

        const sectionAfter = sections[index + 1]
        const posAfter = sectionAfter.indexOf('>')
        if (posAfter !== -1) {
            placeholder.postfix = sectionAfter.substr(0, posAfter + 1)
            sections[index + 1] = sectionAfter.substr(posAfter + 1)
        }
    }

    return result
}
