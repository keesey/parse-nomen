import { NomenPartClass } from "./NomenPartClass";
import { WordClassName } from "./WordClassName";
export interface WordClass {
	readonly antipattern?: RegExp;
	readonly class: NomenPartClass;
	readonly next: ReadonlyArray<WordClassName>;
	readonly pattern: RegExp;
}
