"use strict";
exports.__esModule = true;
var NomenPartClass_1 = require("./NomenPartClass");
var SUPRAGENERIC_NAME_REGEX_1 = require("./SUPRAGENERIC_NAME_REGEX");
var WordClassName_1 = require("./WordClassName");
var DATE_CLASSES = [
    WordClassName_1.WordClassName.YEAR,
    WordClassName_1.WordClassName.MONTH,
    WordClassName_1.WordClassName.DATE,
];
var POST_SUBGENUS_CLASSES = [
    WordClassName_1.WordClassName.SPECIES,
    WordClassName_1.WordClassName.SPECIES_GROUP,
];
var POST_GENUS_CLASSES = POST_SUBGENUS_CLASSES.concat([
    WordClassName_1.WordClassName.SUBGENUS,
]);
var PRIMARY_OPERATORS = [
    WordClassName_1.WordClassName.OPERATOR,
    WordClassName_1.WordClassName.CITATION_OPERATOR,
    WordClassName_1.WordClassName.INCERTAE,
];
exports.WORD_CLASS_DICT = (_a = {},
    _a[WordClassName_1.WordClassName.AUTHOR] = {
        antipattern: /^(\[\()?(subsp(\.|ecies)?|ssp\.?|(sub)?fo(\.|rm(\.|a)?)?|(sub|con)?var(\.|iet(y|as))?)(\]\))?$/i,
        "class": NomenPartClass_1.NomenPartClass.CITATION,
        next: [
            WordClassName_1.WordClassName.AUTHOR_OPERATOR,
            WordClassName_1.WordClassName.CITATION_OPERATOR,
            WordClassName_1.WordClassName.SUBSPECIFIC_RANK,
            WordClassName_1.WordClassName.INCERTAE
        ].concat(DATE_CLASSES, [
            WordClassName_1.WordClassName.AUTHOR,
        ]),
        pattern: /^[\(\[{]?[A-ZÀ-ÖØ-ÞŒa-zß-öø-ÿœ\"\!\*]/
    },
    _a[WordClassName_1.WordClassName.AUTHOR_OPERATOR] = {
        "class": NomenPartClass_1.NomenPartClass.CITATION,
        next: [
            WordClassName_1.WordClassName.AUTHOR,
        ],
        pattern: /^(&|and|et)$/i
    },
    _a[WordClassName_1.WordClassName.CITATION_OPERATOR] = {
        "class": NomenPartClass_1.NomenPartClass.CITATION,
        next: [
            WordClassName_1.WordClassName.AUTHOR
        ].concat(DATE_CLASSES),
        pattern: /^(ex|in|vide|non)$/i
    },
    _a[WordClassName_1.WordClassName.DATE] = {
        "class": NomenPartClass_1.NomenPartClass.CITATION,
        next: [
            WordClassName_1.WordClassName.MONTH,
            WordClassName_1.WordClassName.YEAR
        ].concat(PRIMARY_OPERATORS, [
            WordClassName_1.WordClassName.SUBSPECIFIC_RANK,
            WordClassName_1.WordClassName.AUTHOR,
        ]),
        pattern: /^[\(\[{]?\d\d?[\)\]}]?\.?$/i
    },
    _a[WordClassName_1.WordClassName.INCERTAE] = {
        "class": NomenPartClass_1.NomenPartClass.COMMENT,
        next: [
            WordClassName_1.WordClassName.INCERTAE_FOLLOWER,
        ],
        pattern: /^incertae|indet\.?$/i
    },
    _a[WordClassName_1.WordClassName.INCERTAE_FOLLOWER] = {
        "class": NomenPartClass_1.NomenPartClass.COMMENT,
        next: [
            WordClassName_1.WordClassName.INCERTAE_FOLLOWER,
        ],
        pattern: /^.+$/
    },
    _a[WordClassName_1.WordClassName.MONTH] = {
        "class": NomenPartClass_1.NomenPartClass.CITATION,
        next: [
            WordClassName_1.WordClassName.DATE,
            WordClassName_1.WordClassName.YEAR,
            WordClassName_1.WordClassName.CITATION_OPERATOR,
            WordClassName_1.WordClassName.INCERTAE,
            WordClassName_1.WordClassName.SUBSPECIFIC_RANK,
            WordClassName_1.WordClassName.AUTHOR,
        ],
        pattern: /^\(?(Jan(\.|uary)?|Feb(\.|ruary)?|Mar(\.|ch)?|Apr(\.|il)?|May|Jun(\.|e)?|Jul(\.|y)?|Aug(\.|ust)?|Sep(\.|t(\.)?|ember)?|Oct(\.|ober)?|Nov(\.|ember?)|Dec(\.|ember)?)$/i
    },
    _a[WordClassName_1.WordClassName.OPERATOR] = {
        "class": NomenPartClass_1.NomenPartClass.OPERATOR,
        next: [
            WordClassName_1.WordClassName.PRAENOMEN,
            WordClassName_1.WordClassName.PRAENOMEN_ABBR,
        ],
        pattern: /^(\+|←)$/
    },
    _a[WordClassName_1.WordClassName.PRAENOMEN] = {
        "class": NomenPartClass_1.NomenPartClass.SCIENTIFIC,
        next: PRIMARY_OPERATORS.concat([
            WordClassName_1.WordClassName.SUPRAGENERIC_RANK,
            WordClassName_1.WordClassName.SUBGENERIC_RANK,
            WordClassName_1.WordClassName.SPECIFIC_OPERATOR
        ], POST_GENUS_CLASSES, [
            WordClassName_1.WordClassName.AUTHOR,
        ]),
        pattern: SUPRAGENERIC_NAME_REGEX_1.SUPRAGENERIC_NAME_REGEX
    },
    _a[WordClassName_1.WordClassName.PRAENOMEN_ABBR] = {
        "class": NomenPartClass_1.NomenPartClass.SCIENTIFIC,
        next: POST_GENUS_CLASSES,
        pattern: /^[A-ZÀ-ÖØ-ÞŒ]\.$/
    },
    _a[WordClassName_1.WordClassName.SPECIES] = {
        antipattern: /^(da|de|du|la|van|von|(\[\()?(subsp(\.|ecies)?|ssp\.?|(sub)?fo(\.|rm(\.|a)?)?|(sub|con)?var(\.|iet(y|as))?)(\]\))?)$/,
        "class": NomenPartClass_1.NomenPartClass.SCIENTIFIC,
        next: PRIMARY_OPERATORS.concat(DATE_CLASSES, [
            WordClassName_1.WordClassName.SUBSPECIES,
            WordClassName_1.WordClassName.SUBSPECIFIC_OPERATOR,
            WordClassName_1.WordClassName.SUBSPECIFIC_RANK,
            WordClassName_1.WordClassName.AUTHOR,
        ]),
        pattern: /^(sp\.(\s+innom\.)?|[a-zß-öø-ÿœ]+\-?[a-zß-öø-ÿœ]+)$/
    },
    _a[WordClassName_1.WordClassName.SPECIES_GROUP] = {
        "class": NomenPartClass_1.NomenPartClass.SCIENTIFIC,
        next: PRIMARY_OPERATORS.concat(DATE_CLASSES, [
            WordClassName_1.WordClassName.SPECIES,
            WordClassName_1.WordClassName.SPECIFIC_OPERATOR,
            WordClassName_1.WordClassName.AUTHOR,
        ]),
        pattern: /^\([a-zß-öø-ÿœ]+\-?[a-zß-öø-ÿœ]+\)$/
    },
    _a[WordClassName_1.WordClassName.SPECIFIC_OPERATOR] = {
        "class": NomenPartClass_1.NomenPartClass.COMMENT,
        next: [
            WordClassName_1.WordClassName.SPECIES,
        ],
        pattern: /^(cf\.|aff\.)$/
    },
    _a[WordClassName_1.WordClassName.SUBGENERIC_NAME] = {
        "class": NomenPartClass_1.NomenPartClass.SCIENTIFIC,
        next: DATE_CLASSES.concat([
            WordClassName_1.WordClassName.CITATION_OPERATOR,
            WordClassName_1.WordClassName.INCERTAE
        ], POST_SUBGENUS_CLASSES, [
            WordClassName_1.WordClassName.SPECIFIC_OPERATOR,
            WordClassName_1.WordClassName.AUTHOR,
        ]),
        pattern: SUPRAGENERIC_NAME_REGEX_1.SUPRAGENERIC_NAME_REGEX
    },
    _a[WordClassName_1.WordClassName.SUBGENERIC_RANK] = {
        "class": NomenPartClass_1.NomenPartClass.RANK,
        next: [
            WordClassName_1.WordClassName.SUBGENERIC_NAME,
        ],
        pattern: /^(\[\()?(subg(\.|en(\.|us)?)?|(sub)?sect(\.|ion?)?|(sub)?ser(\.|ies)?)(\]\))?$/i
    },
    _a[WordClassName_1.WordClassName.SUBGENUS] = {
        "class": NomenPartClass_1.NomenPartClass.SCIENTIFIC,
        next: PRIMARY_OPERATORS.concat(DATE_CLASSES, POST_SUBGENUS_CLASSES, [
            WordClassName_1.WordClassName.SPECIFIC_OPERATOR,
            WordClassName_1.WordClassName.AUTHOR,
        ]),
        pattern: /^\([A-ZÀ-ÖØ-ÞŒ][a-zß-öø-ÿœ]*(\-[A-ZÀ-ÖØ-ÞŒa-zß-öø-ÿœ])?[a-zß-öø-ÿœ]+\)$/
    },
    _a[WordClassName_1.WordClassName.SUBSPECIES] = {
        antipattern: /^(da|de|du|la|van|von|(\[\()?(subsp(\.|ecies)?|ssp\.?|(sub)?fo(\.|rm(\.|a)?)?|(sub|con)?var(\.|iet(y|as))?)(\]\))?)$/,
        "class": NomenPartClass_1.NomenPartClass.SCIENTIFIC,
        next: PRIMARY_OPERATORS.concat([
            WordClassName_1.WordClassName.SUBSPECIFIC_RANK
        ], DATE_CLASSES, [
            WordClassName_1.WordClassName.AUTHOR,
        ]),
        pattern: /^(ssp\.(\s+innom\.)?|[a-zß-öø-ÿœ]+\-?[a-zß-öø-ÿœ]+)$/
    },
    _a[WordClassName_1.WordClassName.SUBSPECIFIC_OPERATOR] = {
        "class": NomenPartClass_1.NomenPartClass.COMMENT,
        next: [
            WordClassName_1.WordClassName.SUBSPECIES,
        ],
        pattern: /^(cf\.|aff\.)$/
    },
    _a[WordClassName_1.WordClassName.SUBSPECIFIC_RANK] = {
        "class": NomenPartClass_1.NomenPartClass.RANK,
        next: [
            WordClassName_1.WordClassName.SUBSPECIES,
        ],
        pattern: /^(\[\()?(subsp(\.|ecies)?|ssp\.?|(sub)?fo(\.|rm(\.|a)?)?|(sub|con)?var(\.|iet(y|as))?)(\]\))?$/i
    },
    _a[WordClassName_1.WordClassName.SUPRAGENERIC_RANK] = {
        "class": NomenPartClass_1.NomenPartClass.RANK,
        next: DATE_CLASSES.concat([
            WordClassName_1.WordClassName.INCERTAE,
            WordClassName_1.WordClassName.AUTHOR,
        ]),
        pattern: /^(\[\()?((sub|sup(ra|er)|infra)?phyl(\.|um)|(sub|sup(ra|er)|infra)?div(\.|ision)|(sub|sup(ra|er)|infra)?cl(\.|ass(is)?)|(sub|sup(ra|er)|infra)?ord(\.|o|er)|(sub|sup(ra|er))?fam(\.|il(ia|y))|(sub)?tr(\.|ib(e|us))|gen(\.|us))(\]\))?$/i
    },
    _a[WordClassName_1.WordClassName.VERNACULAR] = {
        "class": NomenPartClass_1.NomenPartClass.VERNACULAR,
        next: [
            WordClassName_1.WordClassName.VERNACULAR,
        ],
        pattern: /^.+$/i
    },
    _a[WordClassName_1.WordClassName.YEAR] = {
        "class": NomenPartClass_1.NomenPartClass.CITATION,
        next: [
            WordClassName_1.WordClassName.MONTH
        ].concat(PRIMARY_OPERATORS, [
            WordClassName_1.WordClassName.SUBSPECIFIC_RANK,
            WordClassName_1.WordClassName.SUBGENERIC_RANK,
            WordClassName_1.WordClassName.AUTHOR,
        ]),
        pattern: /^[\(\[{]?\d{4}[\)\]}]?\.?$/i
    },
    _a);
var _a;
