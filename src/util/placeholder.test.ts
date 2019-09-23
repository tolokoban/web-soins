import Placeholder from './placeholder'

describe('web-soins/util/placeholders', () => {
    it('should parse usual case', () => {
        const result = Placeholder.parse(
            "Hello {{world}} of madness {{and pleasure}}!"
        )
        expect(result).toEqual({
            sections: ["Hello ", " of madness ", "!"],
            placeholders: ["world", "and pleasure"]
        })
    })

    it('should parse empty string', () => {
        expect(Placeholder.parse('')).toEqual({
            sections: [], placeholders: []
        })
    })
})
