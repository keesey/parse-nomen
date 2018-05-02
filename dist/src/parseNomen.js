"use strict";
exports.__esModule = true;
var INITIAL_WORD_CLASSES_1 = require("./INITIAL_WORD_CLASSES");
var WORD_CLASS_DICT_1 = require("./WORD_CLASS_DICT");
function condense(parts) {
    var condensed = [];
    var last;
    for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
        var current = parts_1[_i];
        if (!last || last["class"] !== current["class"]) {
            condensed.push(last = current);
        }
        else {
            last.text += " " + current.text;
        }
    }
    return condensed;
}
function classMatches(word, wordClass) {
    return wordClass.pattern.test(word) &&
        (!wordClass.antipattern || !wordClass.antipattern.test(word));
}
function findMatchingWordClass(word, wordClassNames) {
    for (var _i = 0, wordClassNames_1 = wordClassNames; _i < wordClassNames_1.length; _i++) {
        var wordClassName = wordClassNames_1[_i];
        var wordClass = WORD_CLASS_DICT_1.WORD_CLASS_DICT[wordClassName];
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
        var word = words.shift();
        var part = {
            text: word
        };
        var wordClass = findMatchingWordClass(word, wordClassNames);
        if (wordClass) {
            part["class"] = wordClass["class"];
        }
        var next = wordClass ? wordClass.next : [];
        return [part].concat(process(words, next));
    }
    return [];
}
function parseNomen(s) {
    if (typeof s !== "string") {
        throw new Error("Not a string.");
    }
    var words = s
        .trim()
        .split(/\s+/g)
        .filter(Boolean);
    return condense(process(words, INITIAL_WORD_CLASSES_1.INITIAL_WORD_CLASSES));
}
exports.parseNomen = parseNomen;
