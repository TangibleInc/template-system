import { Reader } from "./Reader";

/**
 * Tags that take a single argument that should not be parsed.
 */
const tagsWithRawArgument = [
    '_TMPL_INCLUDE',
    'TMPL_INCLUDE',
    'TMPL_INLINE',
    'TMPL_STATIC_URL',
    'TMPL_URI'
];

/**
 * Thats that have a body that should not be parsed.
 */
const tagsWithRawBody = [
    'script',
    'style',
];

export abstract class ParserToken {}

export class EOFToken extends ParserToken {
    constructor() {
        super();
    }
}

export abstract class Attribute {}

/**
 * An attribute that is parsed as-is and should not be reformatted.
 * e.g. <TMPL_INCLUDE some/url>
 */
export class RawAttribute extends Attribute {
    constructor(public body: string) {
        super();
    }
}

/**
 * An attribute that is actually a TMPL expression e.g.
 * <p <TMPL_IF some_condition>blue</TMPL_IF>>
 */
export class TokenAttribute extends Attribute {
    constructor(public token: ParserToken) {
        super();
    }
}

/**
 * The value of a NameValueAttribute.
 * This can be a simple string e.g. name="value" or a collection of attributes,
 * e.g. name="alpha <TMPL_V beta> gamma"
 */
export class AttributeValue {
    constructor(public quote: string, public values: Attribute[] | string) {}
}

/**
 * A name-value attribute (e.g. <div class="modal">)
 * The value is optional (e.g. <input required>)
 */
export class NameValueAttribute extends Attribute {
    constructor(public name: string, public value?: AttributeValue) {
        super();
    }
}

export class OpenTagToken extends ParserToken {
    constructor(
        public tagName: string,
        public tagAttributes: Attribute[],
        public hasTrailingSlash: boolean,
        public trimsLeftWhitespace: boolean,
        public trimsRightWhitespace: boolean,
    ) {
        super();
    }
}

export class CloseTagToken extends ParserToken {
    constructor (public tagName: string) {
        super();
    }
}

export class ClientSideCommentToken extends ParserToken {
    constructor(public body: string) {
        super();
    }
}

export class ServerSideCommentToken extends ParserToken {
    constructor(public body: string) {
        super();
    }
}

export class TextToken extends ParserToken {
    constructor(public body: string) {
        super();
    }
}

export class ScriptToken extends ParserToken {
    constructor(public body: string) {
        super();
    }
}

/**
 * Parses TMPL files.
 */
export class Parser {
    /**
     * After opening a `<script>` tag, this is set to true.
     * The goal is to preserve the contents of the script tag as is.
     */
    private inTagWithRawBody = false;
    private lastTag = '';

    constructor(readonly reader: Reader) { }

    parse(): ParserToken | undefined {
        if (this.reader.eof) {
            return new EOFToken();
        }

        if (this.inTagWithRawBody) {
            return this.parseUntilEndOfTag();
        }

        if (this.reader.peek("##")) {
            return this.parseServerSideComments();
        }

        if (this.reader.peek("<")) {
            return this.parseTag();
        }

        return this.parseText();
    }

    isTagNameChar(ch: string): boolean {
        return (ch >= 'a' && ch <= 'z')
            || (ch >= 'A' && ch <= 'Z')
            || (ch >= '0' && ch <= '9')
            || ch === '_'
            || ch === '-'
            || ch === ':'
            || ch === '.'
            || ch === '!'
            || ch === '['
            || ch === ']';
    }

    readTagName(): string {
        let result = '';
        while (!this.reader.eof && this.isTagNameChar(this.reader.currentChar)) {
            result += this.reader.readOne();
        }
        return result;
    }

    readAttributes(): Attribute[] {
        let result: Attribute[] = [];
        while (!this.reader.eof && this.reader.currentChar !== '>' && this.reader.currentChar !== '/' && this.reader.currentChar !== '~') {
            if (this.reader.peek('<TMPL_IF')) {
                // read everything as-is until </TMPL_IF>
                // e.g. <p <TMPL_IF foo>bar</TMPL_IF> class="blue">hello</p>
                result.push(new RawAttribute(this.reader.readUntilStringInclusive('</TMPL_IF>')));
            } else if (this.reader.peek('<TMPL')) {
                result.push(new TokenAttribute(this.parseTag()));
            } else if (this.reader.peek('[%')) {
                result.push(new RawAttribute(this.readPerlExpression()));
            } else if (this.reader.peek('"')) {
                result.push(new RawAttribute(this.readLiteralAttribute()));
            } else if (this.reader.peek('$')) {
                result.push(new RawAttribute(this.readDollarSignExpression()));
            } else if (this.reader.peekWhitespace()) {
                this.reader.skipWhitespace();
            } else {
                if (!this.isTagNameChar(this.reader.currentChar)) {
                    throw new Error(`L${this.reader.row + 1}C${this.reader.col + 1} Unexpected attribute name ${this.reader.currentChar} in ${this.reader.currentRow}`);
                }
                const attrName = this.readTagName();
                this.reader.skipWhitespace();
                const attrValue = this.readOptionalAttributeValue();
                result.push(new NameValueAttribute(attrName, attrValue));
            }
        }
        return result;
    }

    readOptionalAttributeValue(): AttributeValue | undefined {
        if (!this.reader.peek('=')) {
            return undefined;
        }

        this.reader.demandChar('=');
        this.reader.skipWhitespace();

        if (this.reader.peek('[%')) {
            return new AttributeValue('', this.readPerlExpression());
        }

        let quote = '';
        if (['"', "'"].indexOf(this.reader.currentChar) >= 0) {
            quote = this.reader.demandOneOf('"', "'");
        }

        const attrValue = this.readAttributeValue(quote);

        if (quote) {
            this.reader.demandChar(quote);
        }

        return new AttributeValue(quote, attrValue);
    }

    readAttributeValue(openingQuote: string): Attribute[] | string {
        let result: Attribute[] = [];
        while (!this.reader.eof && this.hasMoreAttributeValue(openingQuote)) {
            if (this.reader.peek("<TMPL") || this.reader.peek("</TMPL")) {
                // e.g. foo="<TMPL_V whatever>"
                result.push(new TokenAttribute(this.parseTag()));
            } else {
                const previous = result.length > 0 ? result[result.length - 1] : undefined;
                if (previous && previous instanceof RawAttribute) {
                    previous.body += this.reader.readOne();
                } else {
                    result.push(new RawAttribute(this.reader.readOne()));
                }
            }
        }

        const single = result.length === 1 ? result[0] : undefined;
        if (single && single instanceof RawAttribute) {
            return single.body;
        }

        return result;
    }

    hasMoreAttributeValue(quote: string): boolean {
        if (quote) {
            return this.reader.currentChar !== quote;
        }

        return /[a-zA-Z0-9_\.~%\-+<]/.test(this.reader.currentChar);
    }

    readLiteralAttribute(): string {
        let result = this.reader.demandChar('"');
        result += this.reader.readUntilCharInclusive('"');
        return result;
    }

    readDollarSignExpression(): string {
        let result = this.reader.demandChar('$');
        while (!this.reader.eof && /[a-zA-Z0-9_]/.test(this.reader.currentChar)) {
            result += this.reader.readOne();
        }
        return result;
    }

    readCloseTag() : CloseTagToken {
        this.reader.demandChar('/');
        const closeTag = this.reader.readUntilChar('>');
        this.reader.demandChar('>');
        return new CloseTagToken(closeTag);
    }

    readPerlExpression(): string {
        let result = '';
        result += this.reader.demandString('[%');
        result += " " + this.reader.readUntilString('%]').trim() + " ";
        result += this.reader.demandString('%]');
        return result;
    }

    readRawInlineArgument(): string {
        if (this.reader.peek('[%')) {
            // <TMPL_STATIC_URL [% perl expression %] >
            return '';
        }

        let result = '';
        while (!this.reader.eof && this.reader.currentChar !== '>' && this.reader.currentChar !== ' ') {
            result += this.reader.readOne();
        }

        this.reader.skipWhitespace();

        return result.trim();
    }

    readOpenTag() : OpenTagToken {
        // opening tag i.e. <p> or <input class="field" required>
        // support <~ tags, trimming whitespace
        const trimsLeftWhitespace = this.reader.peek('~');
        if (trimsLeftWhitespace) {
            this.reader.readOne();
        }
        const tagName = this.readTagName();
        this.reader.skipWhitespace();
        let tagAttributes: Attribute[];
        let hasTrailingSlash = false;
        if (tagsWithRawArgument.includes(tagName)) {
            // just read everything until > or whitespace
            const inlineArgument = this.readRawInlineArgument();
            const inlineArguments: Attribute[] = inlineArgument ? [new RawAttribute(inlineArgument)] : [];
            if (this.reader.currentChar === '>') {
                // no more arguments
                tagAttributes = inlineArguments;
            } else {
                tagAttributes = inlineArguments.concat(this.readAttributes());
            }
        } else {
            // read attribute list
            tagAttributes = this.readAttributes();
            if (this.reader.currentChar === '/') {
                hasTrailingSlash = true;
                this.reader.readOne();
            }
        }

        const trimsRightWhitespace = this.reader.peek('~');
        if (trimsRightWhitespace) {
            this.reader.readOne();
        }
        this.reader.demandChar('>');
        this.inTagWithRawBody = tagsWithRawBody.includes(tagName) && !hasTrailingSlash;
        this.lastTag = tagName;
        return new OpenTagToken(tagName, tagAttributes, hasTrailingSlash, trimsLeftWhitespace, trimsRightWhitespace);
    }

    parseServerSideComments() : ServerSideCommentToken {
        return new ServerSideCommentToken(this.reader.readLine());
    }

    parseTag(): OpenTagToken | ClientSideCommentToken | CloseTagToken {
        this.reader.demandChar('<');
        this.reader.demandNotEof('Unexpected EOF after opening bracket');
        if (this.reader.currentChar === '/') {
            return this.readCloseTag();
        } else if (this.reader.peek("!--")) {
            // client-side comments
            return new ClientSideCommentToken(
                '<'
                + this.reader.demandString("!--")
                + this.reader.readUntilStringInclusive("-->")
            );
        } else {
            return this.readOpenTag();
        }
    }

    parseText(): TextToken | undefined {
        let lastText = this.reader.readUntilChar('<');
        if (lastText.trim()) {
            return new TextToken(lastText);
        }
    }

    parseUntilEndOfTag(): ScriptToken | undefined {
        let buffer = '';
        while (!this.reader.eof && !this.reader.peek(`</${this.lastTag}>`)) {
            buffer += this.reader.readOne();
        }

        this.inTagWithRawBody = false;

        if (buffer.trim()) {
            return new ScriptToken(buffer);
        }
    }
}
