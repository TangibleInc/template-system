import { Reader } from "./Reader";
import { Writer } from "./Writer";
import { FormatOptions, VoidTagsTrailingSlashStyle, AttributeQuoteStyle } from "./FormatOptions";
import { Parser, Attribute, RawAttribute, TokenAttribute, NameValueAttribute, AttributeValue, ParserToken, OpenTagToken, CloseTagToken, TextToken, ScriptToken, ServerSideCommentToken, ClientSideCommentToken, EOFToken } from "./Parser";

export const defaultFormatOptions: FormatOptions = {
    indentSize: 4,
    nonIndentingTags: [
        "!doctype",
        "!DOCTYPE",
        "area",
        "base",
        "br",
        "col",
        "embed",
        "hr",
        "img",
        "input",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr",
        '_TMPL_INCLUDE',
        "TMPL_INCLUDE",
        "TMPL_INLINE",
        "TMPL_V",
        "TMPL_VAR",
        "TMPL_WS"
    ],
    extraNonIndentingTags: [],
    sameLineTags: [
        "textarea",
        "TMPL_WS",
    ],
    deIndentingTags: [
        "TMPL_ELSE",
        "TMPL_ELSIF"
    ],
    voidTags: [
        "area",
        "base",
        "br",
        "col",
        "embed",
        "hr",
        "img",
        "input",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr"
    ],
    multilineAttributeThreshold: 4,
    voidTagsTrailingSlashStyle: VoidTagsTrailingSlashStyle.Remove,
    attributeQuoteStyle: AttributeQuoteStyle.Add
};

enum State {
    Initial,
    OpenTag,
    CloseTag,
    Text
}

export class Formatter {
    private options: FormatOptions;
    private tagName = '';
    private lastText = '';
    private state: State = State.Initial;
    private nonIndentingTags: Set<String> = new Set();
    readonly parser: Parser;
    readonly writer: Writer;

    constructor(data: string, overrideOptions?: Partial<FormatOptions>) {
        this.options = {
            ...defaultFormatOptions,
            ...overrideOptions
        };
        this.parser = new Parser(new Reader(data));
        this.writer = new Writer(this.options.indentSize);

        for (let i = 0; i < this.options.nonIndentingTags.length; i++) {
            const element = this.options.nonIndentingTags[i];
            this.nonIndentingTags.add(element.toUpperCase());
        }

        for (let i = 0; i < this.options.extraNonIndentingTags.length; i++) {
            const element = this.options.extraNonIndentingTags[i];
            this.nonIndentingTags.add(element.toUpperCase());
        }
    }

    isNonIndentingTag(s: string): boolean {
        return this.nonIndentingTags.has(s.toUpperCase());
    }

    isSameLineTag(s: string): boolean {
        return this.options.sameLineTags.includes(s);
    }

    isDeIndentingTag(s: string): boolean {
        return this.options.deIndentingTags.includes(s);
    }

    isVoidTag(s: string): boolean {
        return this.options.voidTags.includes(s);
    }

    format() : string {
        let eof = false;
        while (!eof) {
            let token = this.parser.parse();
            if (!token) {
                continue;
            }

            if (token instanceof OpenTagToken) {
                this.onOpenTag(token.tagName, token.tagAttributes, token.hasTrailingSlash, token.trimsLeftWhitespace, token.trimsRightWhitespace);
            } else if (token instanceof CloseTagToken) {
                this.onCloseTag(token.tagName);
            } else if (token instanceof TextToken) {
                this.onText(token.body);
            } else if (token instanceof ScriptToken) {
                this.onScript(token.body);
            } else if (token instanceof ServerSideCommentToken) {
                this.onServerSideComment(token.body);
            } else if (token instanceof ClientSideCommentToken) {
                this.onClientSideComment(token.body);
            } else if (token instanceof EOFToken) {
                eof = true;
            } else {
                throw new Error(`Unsupported token type ${token}`);
            }
        }

        this.writer.endLineIfPending();
        return this.writer.output;
    }

    onOpenTag(openTag: string, tagAttributes: Attribute[], hasTrailingSlash: boolean, trimsLeftWhitespace: boolean, trimsRightWhitespace: boolean): void {
        const previousTagName = this.tagName;
        this.tagName = openTag;
        this.lastText = ''; // reset

        if (this.isDeIndentingTag(this.tagName)) {
            this.writer.decreaseIndentation();
        }

        if (this.writer.pendingEndOfLine && (this.state !== State.OpenTag || !this.isSameLineTag(previousTagName))) {
            // finish the line from the previous open tag
            this.writer.endLine();
            this.writer.startLine();
        }

        this.writer.print('<');
        if (trimsLeftWhitespace) {
            this.writer.print('~');
        }
        this.writer.print(openTag);

        if (tagAttributes && tagAttributes.length > 0) {
            if (tagAttributes.length >= this.options.multilineAttributeThreshold && openTag !== "!DOCTYPE") {
                this.writer.endLine();
                this.writer.increaseIndentation();
                tagAttributes.forEach(a => this.writer.printLine(`${this.formatAttribute(openTag, a)}`));
                this.writer.decreaseIndentation();
                this.writer.startLine();
            } else {
                tagAttributes.forEach(a => this.writer.print(` ${this.formatAttribute(openTag, a)}`));
            }
        }

        // should we add a trailing slash e.g. <br/>
        const addTrailingSlash =
            (
                // it has a trailing slash, but it is not a void element. Keep the slash e.g. <div/>
                hasTrailingSlash && !this.isVoidTag(this.tagName)
            )
            ||
            (
                // it is a void element
                this.isVoidTag(this.tagName) &&
                (
                    // it has a trailing slash and the option says do not remove it
                    (hasTrailingSlash && this.options.voidTagsTrailingSlashStyle !== VoidTagsTrailingSlashStyle.Remove)
                    ||
                    // it does not have a trailing slash and the option says to add it
                    (!hasTrailingSlash && this.options.voidTagsTrailingSlashStyle === VoidTagsTrailingSlashStyle.Add)
                )
            );
        if (addTrailingSlash) {
            this.writer.print('/');
        }

        if (trimsRightWhitespace) {
            this.writer.print('~');
        }
        this.writer.print('>');
        this.writer.pendingEndOfLine = true;
        if (!hasTrailingSlash && !this.isNonIndentingTag(this.tagName)) {
            this.writer.increaseIndentation();
        }

        this.state = addTrailingSlash ? State.CloseTag : State.OpenTag;
    }

    formatAttribute(tagName: string, a: Attribute): string {
        if (a instanceof RawAttribute) {
            return a.body;
        } else if (a instanceof TokenAttribute) {
            return this.formatToken(a.token);
        } else if (a instanceof NameValueAttribute) {
            return this.formatNameValueAttribute(tagName, a);
        } else {
            throw new Error(`Unsupported attribute ${a}`);
        }
    }

    formatToken(a: ParserToken): string {
        if (a instanceof OpenTagToken) {
            let result = '<' + a.tagName;
            if (a.tagAttributes) {
                result += a.tagAttributes.map(x => ` ${this.formatAttribute(a.tagName, x)}`).join('');
            }
            if (a.hasTrailingSlash) {
                result += '/';
            }
            result += '>';
            return result;
        } else if (a instanceof CloseTagToken) {
            return `</${a.tagName}>`;
        } else {
            throw new Error(`Unsupported token ${a}`);
        }
    }

    formatNameValueAttribute(tagName: string, a: NameValueAttribute): string {
        if (a.value) {
            return a.name + '=' + this.formatAttributeValue(tagName, a.value);
        } else {
            return a.name;
        }
    }

    formatAttributeValue(tagName: string, attributeValue: AttributeValue): string {
        let formattedValue = '';
        if (typeof attributeValue.values === 'string') {
            formattedValue = attributeValue.values;
        } else {
            formattedValue = attributeValue.values.map(a => this.formatAttribute(tagName, a)).join('');
        }

        let quote = attributeValue.quote;
        if (this.options.attributeQuoteStyle === AttributeQuoteStyle.Add && !tagName.startsWith("TMPL_")) {
            if (formattedValue.indexOf('"') < 0) {
                // does not contain ", safe to quote with "
                quote = '"';
            } else if (formattedValue.indexOf("'") < 0) {
                quote = "'";
            }
        }
        return quote + formattedValue + quote;
    }

    onCloseTag(closeTag: string): void {
        if (!this.isNonIndentingTag(closeTag)) {
            this.writer.decreaseIndentation();
        }

        // close previous open tag, unless it is the same closing tag (e.g. <div></div>)
        const matchesLastOpenTag = this.tagName === closeTag;
        const matchesOpenTag = matchesLastOpenTag && this.state === State.OpenTag;
        const oneLinerScript = matchesLastOpenTag && this.state === State.Text && this.lastText.indexOf("\n") < 0;
        const shouldEndLine = this.writer.pendingEndOfLine && !this.isSameLineTag(closeTag) && !matchesOpenTag && !oneLinerScript;
        if (shouldEndLine) {
            this.writer.endLine();
            this.writer.startLine();
        }

        this.writer.print(`</${closeTag}>`);
        this.writer.pendingEndOfLine = true;
        this.state = State.CloseTag;
    }

    onServerSideComment(commentLine: string): void {
        this.writer.print(commentLine);
    }

    onClientSideComment(comment: string): void {
        this.writer.endLineIfPending();
        this.writer.startLine();
        this.writer.print(comment);
        this.writer.pendingEndOfLine = true;
    }

    onText(text: string): void {
        this.lastText = text;
        if (this.lastText.indexOf("\n") >= 0) {
            this.writer.endLineIfPending();
            this.writer.startLine();
            this.writer.print(this.lastText.trim());
        } else {
            this.writer.print(this.lastText.trimRight());
        }

        this.writer.pendingEndOfLine = true;
        this.state = State.Text;
    }

    onScript(buffer: string): void {
        this.lastText = buffer;
        this.writer.print(buffer.trimRight());
        this.writer.pendingEndOfLine = true;
        this.state = State.Text;
    }
}
