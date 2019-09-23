export default { parse }


interface IParsingResult {
    sections: string[],
    placeholders: string[]
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
