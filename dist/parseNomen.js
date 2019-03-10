"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const INITIAL_WORD_CLASSES_1 = require("./INITIAL_WORD_CLASSES");
const WORD_CLASS_DICT_1 = require("./WORD_CLASS_DICT");
function condense(parts) {
    const condensed = [];
    let last;
    for (const current of parts) {
        if (!last || last.class !== current.class) {
            condensed.push(last = current);
        }
        else {
            last.text += ` ${current.text}`;
        }
    }
    return condensed;
}
function classMatches(word, wordClass) {
    return wordClass.pattern.test(word) &&
        (!wordClass.antipattern || !wordClass.antipattern.test(word));
}
function findMatchingWordClass(word, wordClassNames) {
    for (const wordClassName of wordClassNames) {
        const wordClass = WORD_CLASS_DICT_1.WORD_CLASS_DICT[wordClassName];
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
function process(words, wordClassNames) {
    if (words.length) {
        const word = words.shift();
        const part = {
            text: word,
        };
        const wordClass = findMatchingWordClass(word, wordClassNames);
        if (wordClass) {
            part.class = wordClass.class;
        }
        const next = wordClass ? wordClass.next : [];
        return [part, ...process(words, next)];
    }
    return [];
}
function parseNomen(s) {
    if (typeof s !== "string") {
        throw new Error("Not a string.");
    }
    const words = s
        .trim()
        .split(/\s+/g)
        .filter(Boolean);
    return condense(process(words, INITIAL_WORD_CLASSES_1.INITIAL_WORD_CLASSES));
}
exports.parseNomen = parseNomen;
