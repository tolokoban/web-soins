import Placeholder from './placeholder'

describe('web-soins/util/placeholders', () => {
    describe('parse()', () => {
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

    describe('parseXML()', () => {
        it('should parse usual case', () => {
            const result = Placeholder.parseXML(
                "And <div>{{36}}</div> of <em>madness {{and pleasure}}</em>!"
            )
            expect(result).toEqual({
                sections: ["And ", " of ", "!"],
                placeholders: [
                    { prefix: '<div>', value: '36', postfix: '</div>'},
                    { prefix: '<em>madness ', value: 'and pleasure', postfix: '</em>'},
                ]
            })
        })
    })
})
