import type { OperatorFunction } from './compile';

export default subscript;
export * from "./parse.js";
export * from "./compile.js";
declare function subscript(s: string): ((ctx?: any) => any) | OperatorFunction;
