import { Style } from "./Style";
import { WordClassName } from "./WordClassName";
export interface WordClass {
	readonly antipattern?: RegExp;
	readonly next: ReadonlyArray<WordClassName>;
	readonly pattern: RegExp;
	readonly style: Style;
}
