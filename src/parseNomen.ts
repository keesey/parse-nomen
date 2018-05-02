import { NomenPart } from "./NomenPart";
import { INITIAL_WORD_CLASSES } from "./INITIAL_WORD_CLASSES";
import { WORD_CLASS_DICT } from "./WORD_CLASS_DICT";
import { WordClass } from "./WordClass";
import { WordClassName } from "./WordClassName";
function condense(parts: NomenPart[]): NomenPart[] {
	const condensed: NomenPart[] = [];
	let last: NomenPart | undefined;
	for (const current of parts) {
		if (!last || last.class !== current.class) {
			condensed.push(last = current);
		} else {
			last.text += ` ${current.text}`;
		}
	}
	return condensed;
}
function classMatches(word: string, wordClass: WordClass): boolean {
	return wordClass.pattern.test(word) &&
		(!wordClass.antipattern || !wordClass.antipattern.test(word));
}
function findMatchingWordClass(word: string, wordClassNames: ReadonlyArray<WordClassName>): WordClass | null {
    for (const wordClassName of wordClassNames) {
        const wordClass = WORD_CLASS_DICT[wordClassName];
        /*
        if (!wordClass) {
            throw new Error(`Cannot find word class "${wordClassName}".`);
        }
        */
        if (classMatches(word, wordClass)) {
            return wordClass;
        }
    }
    return null;
}
function process(words: string[], wordClassNames: ReadonlyArray<WordClassName>): NomenPart[] {
	if (words.length) {
		const word = words.shift() as string;
		const part: Partial<NomenPart> = {
			text: word,
        };
        const wordClass = findMatchingWordClass(word, wordClassNames);
        if (wordClass) {
            part.class = wordClass.class;
        }
        const next: ReadonlyArray<WordClassName> = wordClass ? wordClass.next : [];
		return [part as NomenPart, ...process(words, next)];
	}
	return [];
}
export function parseNomen(s: string): NomenPart[] {
	if (typeof s !== "string") {
		throw new Error("Not a string.");
	}
	const words = s
		.trim()
		.split(/\s+/g)
		.filter(Boolean);
	return condense(process(words, INITIAL_WORD_CLASSES));
}
