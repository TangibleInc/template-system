/**
 * Controls the trailing slash of void elements like `<br>`.
 * See https://html.spec.whatwg.org/multipage/syntax.html#void-elements
 */
export enum VoidTagsTrailingSlashStyle {
    /**
     * Does not modify input.
     */
    Preserve = 'preserve',

    /**
     * Always adds the slash, e.g. `<br/>`.
     */
    Add = 'add',

    /**
     * Always removes the slash, e.g. `<br>`.
     */
    Remove = 'remove'
}

/**
 * Controls the quotes of attribute values.
 */
export enum AttributeQuoteStyle {
    /**
     * Does not modify input.
     */
    Preserve = 'preserve',

    /**
     * Always adds double quote attributes if possible.
     */
    Add = 'add',
}

export interface FormatOptions {
    /**
     * The amount of spaces to indent with.
     */
    indentSize: number;

    /**
     * A collection of tags that do not increase the indentation level (e.g. <br>)
     */
    nonIndentingTags: string[];

    /**
     * An additional collection of tags that do not increase the indentation level.
     * This can be used in addition to `nonIndentingTags` in order to preserve the defaults.
     */
    extraNonIndentingTags: string[];

    /**
     * A collection of tags that are not followed by a new line
     */
    sameLineTags: string[];

    /**
     * A collection of tags that decrease the indentation level (e.g. TMPL_ELSE)
     */
    deIndentingTags: string[];

    /**
     * A collection of tags that only have a start tag.
     * See https://html.spec.whatwg.org/multipage/syntax.html#void-elements
     */
    voidTags: string[];

    /**
     * The number of attributes, inclusive, after which attributes will be printed on separate lines.
     */
    multilineAttributeThreshold: number;

    /**
     * Controls the trailing slash of void elements like `<br>`.
     * See https://html.spec.whatwg.org/multipage/syntax.html#void-elements
     */
    voidTagsTrailingSlashStyle: VoidTagsTrailingSlashStyle;

    /**
     * Controls the quotes of attribute values.
     */
    attributeQuoteStyle: AttributeQuoteStyle;
}
