import { FormatOptions } from "./FormatOptions";
import { Formatter } from "./Formatter";

export * from "./Formatter";
export * from "./FormatOptions";

export function format(data: string, overrideOptions?: Partial<FormatOptions>) {
    const formatter = new Formatter(data, overrideOptions);
    return formatter.format();
}
