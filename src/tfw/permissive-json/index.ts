import Tokenizer from "./tokenizer"

export default { parse, isValid }

function isValid(text: string) {
    try {
        parse(text)
        return true
    }
    catch(ex) {
        return false
    }
}

function parse(text: string) {
    try {
        const tokens = Tokenizer.tokenize(text);
        const parser = new Parser(tokens);
        const result = parser.parse();
        return result;
    }
    catch (ex) {
        if (typeof ex.type === 'number') {
            throw ex;
        } else {
            throw ex;
        }
    }
};


interface IToken {
    index: number,
    type: number,
    value: any
}


class Parser {
    private index = 0

    constructor(private tokens: IToken[]) {}

    peek() {
        return this.tokens[this.index];
    }

    next() {
        return this.tokens[this.index++];
    }

    back() {
        this.index = Math.max(0, this.index - 1);
    }

    parse(): any {
        var tkn = this.next();

        switch (tkn.type) {
            case Tokenizer.OBJ_OPEN:
                return this.parseObject();
            case Tokenizer.ARR_OPEN:
                return this.parseArray();
            case Tokenizer.STRING:
            case Tokenizer.NUMBER:
            case Tokenizer.SPECIAL:
                return tkn.value;
        }
        this.back();
        throw this.fail(tkn);
    }

    parseArray() {
        var start = this.index;
        var arr = [];
        var tkn;
        while (undefined !== (tkn = this.peek())) {
            if (tkn.type === Tokenizer.ARR_CLOSE) {
                this.next();
                return arr;
            }
            arr.push(this.parse());
        }
        throw this.fail(`Opening braket at position ${start} has no corresponding closing one!`, start);
    }

    parseObject() {
        let start = this.index;
        const obj: any = {};
        let tkn;
        let indexForMissingKey = 0;
        while (undefined !== (tkn = this.peek())) {
            if (tkn.type === Tokenizer.OBJ_CLOSE) {
                this.next();
                return obj;
            }
            const key = this.parse();
            tkn = this.peek();
            if (tkn.type === Tokenizer.OBJ_CLOSE) {
                obj[indexForMissingKey++] = key;
                this.next();
                return obj;
            }
            else if (tkn.type === Tokenizer.COLON) {
                this.next();
                const val = this.parse();
                obj[key] = val;
            }
            else {
                // Missing key.
                obj[indexForMissingKey++] = key;
            }
        }
        throw this.fail("Opening brace at position " + start + " has no corresponding closing one!", start);
    }

    fail(tkn: IToken | string, index: number = -1) {
        if (index < 0) index = this.index
        if (typeof tkn === 'string') {
            return { message: tkn, index: index };
        }
        return {
            index: tkn.index,
            message: "Unexpected token " + Tokenizer.getTypeName(tkn.type) + " at position " + tkn.index + "!"
        };
    }
}
