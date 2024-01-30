export class Writer {
    private indent = '';
    private _output = '';

    /**
     * If true, the previous iteration wrote some output and did not emit a new line.
     * The current iteration can determine if it should emit the new line or not.
     */
    public pendingEndOfLine = false;

    constructor(private indentSize = 4) {}

    get output(): string {
        return this._output;
    }

    increaseIndentation() {
        for (let i = 1; i <= this.indentSize; i++) {
            this.indent += ' ';
        }
    }

    decreaseIndentation() {
        this.indent = this.indent.substr(0, this.indent.length - this.indentSize);
    }

    startLine() {
        this._output += this.indent;
    }

    endLine() {
        this._output += "\n";
        this.pendingEndOfLine = false;
    }

    endLineIfPending() {
        if (this.pendingEndOfLine) {
            this.endLine();
        }
    }

    printLine(s: string) {
        this.startLine();
        this._output += s;
        this.endLine();
    }

    print(s: string) {
        this._output += s;
    }
}
