export class Reader {
    private _row = 0;
    private _col = 0;
    private _currentRow = '';
    private pos = 0;

    constructor(private data: string) {
    }

    get eof(): boolean {
        return this.pos >= this.data.length;
    }

    get currentChar(): string {
        return this.data.charAt(this.pos);
    }

    get currentRow(): string {
        return this._currentRow;
    }

    get row(): number {
        return this._row;
    }

    get col(): number {
        return this._col;
    }

    readOne(): string {
        if (this.eof) {
            throw new Error(`L${this._row + 1}C${this._col + 1} Unexpected EOF`);
        }

        let result = this.currentChar;
        this.pos++;

        if (result === "\n") {
            this._row++;
            this._col = 0;
            this._currentRow = '';
        } else {
            this._col++;
            this._currentRow += result;
        }

        return result;
    }

    readUntilChar(ch: string): string {
        let result = '';
        while (!this.eof && this.currentChar !== ch) {
            result += this.readOne();
        }
        return result;
    }

    readUntilCharInclusive(ch: string): string {
        let result = this.readUntilChar(ch);
        if (!this.eof) {
            result += this.demandChar(ch);
        }
        return result;
    }

    readLine(): string {
        return this.readUntilCharInclusive("\n");
    }

    readUntilWhitespace(): string {
        let result = '';
        while (!this.eof && this.currentChar > ' ') {
            result += this.readOne();
        }
        return result;
    }

    skipWhitespace() {
        while (this.peekWhitespace()) {
            this.readOne();
        }
    }

    peek(s: string): boolean {
        return this.pos + s.length <= this.data.length && this.data.substr(this.pos, s.length) === s;
    }

    peekWhitespace(): boolean {
        return !this.eof && this.currentChar <= ' ';
    }

    demandNotEof(msg: string = "Unexpected EOF") {
        if (this.eof) {
            throw new Error(`L${this._row + 1}C${this._col + 1} ${msg}`);
        }
    }

    demandChar(ch: string): string {
        this.demandNotEof(`Expected ${ch} but was eof`);
        if (this.currentChar !== ch) {
            throw new Error(`L${this._row + 1}C${this._col + 1} Expected ${ch} but was ${this.currentChar}`);
        }
        return this.readOne();
    }

    demandOneOf(...ch: string[]): string {
        this.demandNotEof(`Expected one of ${ch.join(", ")} but was eof`);
        if (ch.indexOf(this.currentChar) < 0) {
            throw new Error(`L${this._row + 1}C${this._col + 1} Expected one of ${ch.join(", ")} but was ${this.currentChar}`);
        }

        return this.readOne();
    }

    demandString(s: string): string {
        this.demandNotEof(`Expected ${s} but was eof`);
        if (!this.peek(s)) {
            throw new Error(`L${this._row + 1}C${this._col + 1} Expected ${s} but was ${this.currentChar}`);
        }
        for (let i = 0; i < s.length; i++) {
            this.readOne();
        }
        return s;
    }

    readUntilString(needle: string): string {
        let result = '';
        while (!this.eof && !this.peek(needle)) {
            result += this.readOne();
        }
        return result;
    }

    readUntilStringInclusive(needle: string): string {
        return this.readUntilString(needle) + this.demandString(needle);
    }
}
