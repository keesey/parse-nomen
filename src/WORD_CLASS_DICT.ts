import { SUPRAGENERIC_NAME_REGEX } from "./SUPRAGENERIC_NAME_REGEX"
import { WordClass } from "./WordClass"
import { WordClassName } from "./WordClassName"
const DATE_CLASSES: readonly WordClassName[] = ["year", "month", "date"]
const POST_SUBGENUS_CLASSES: readonly WordClassName[] = ["species", "speciesGroup"]
const POST_GENUS_CLASSES: readonly WordClassName[] = [...POST_SUBGENUS_CLASSES, "subgenus"]
const PRIMARY_OPERATORS: readonly WordClassName[] = ["operator", "citationOperator", "incertae"]
const SPECIES_ANTIPATTERN =
    /^(da|de|du|la|van|von|(\[\()?(subsp(\.|ecies)?|ssp\.?|(sub)?fo(\.|rm(\.|a)?)?|(sub|con)?var(\.|iet(y|as))?)(\]\))?)$/
const SUPRAGENERIC_ABBR_REGEX = /^[A-ZÀ-ÖØ-ÞŒ]\.$/
export const WORD_CLASS_DICT: Readonly<Record<WordClassName, WordClass>> = {
    author: {
        antipattern: /^(\[\()?(subsp(\.|ecies)?|ssp\.?|(sub)?fo(\.|rm(\.|a)?)?|(sub|con)?var(\.|iet(y|as))?)(\]\))?$/i,
        class: "citation",
        next: ["authorOperator", "citationOperator", "subspecificRank", "incertae", ...DATE_CLASSES, "author"],
        pattern: /^[([{]?[A-ZÀ-ÖØ-ÞŒa-zß-öø-ÿœ"!*]/,
    },
    authorOperator: {
        class: "citation",
        next: ["author"],
        pattern: /^(&|and|et)$/i,
    },
    candidatePraenomen: {
        class: "vernacular",
        next: ["candidateSpecies", "author"],
        pattern: SUPRAGENERIC_NAME_REGEX,
    },
    candidatePraenomenAbbr: {
        class: "vernacular",
        next: POST_GENUS_CLASSES,
        pattern: SUPRAGENERIC_ABBR_REGEX,
    },
    candidateSpecies: {
        antipattern: SPECIES_ANTIPATTERN,
        class: "vernacular",
        next: [...DATE_CLASSES, "author", "vernacular"],
        pattern: /^[a-zß-öø-ÿœ]+-?[a-zß-öø-ÿœ]+$/,
    },
    candidatus: {
        class: "comment",
        next: ["candidatePraenomen", "candidatePraenomenAbbr", "vernacular"],
        pattern: /^"?ca(ndidatus|.)$/i,
    },
    citationOperator: {
        class: "citation",
        next: ["author", ...DATE_CLASSES],
        pattern: /^(ex|in|vide|non)$/i,
    },
    date: {
        class: "citation",
        next: ["month", "year", ...PRIMARY_OPERATORS, "subspecificRank", "author"],
        pattern: /^[([{]?\d\d?[)\]}]?\.?$/i,
    },
    incertae: {
        class: "comment",
        next: ["incertaeFollower"],
        pattern: /^incertae|indet\.?$/i,
    },
    incertaeFollower: {
        class: "comment",
        next: ["incertaeFollower"],
        pattern: /^.+$/,
    },
    month: {
        class: "citation",
        next: ["date", "year", "citationOperator", "incertae", "subspecificRank", "author"],
        pattern:
            /^\(?(Jan(\.|uary)?|Feb(\.|ruary)?|Mar(\.|ch)?|Apr(\.|il)?|May|Jun(\.|e)?|Jul(\.|y)?|Aug(\.|ust)?|Sep(\.|t(\.)?|ember)?|Oct(\.|ober)?|Nov(\.|ember?)|Dec(\.|ember)?)$/i,
    },
    operator: {
        class: "operator",
        next: ["praenomen", "praenomenAbbr"],
        pattern: /^(\+|←)$/,
    },
    praenomen: {
        class: "scientific",
        next: [
            ...PRIMARY_OPERATORS,
            "supragenericRank",
            "subgenericRank",
            "specificOperator",
            ...POST_GENUS_CLASSES,
            "author",
        ],
        pattern: SUPRAGENERIC_NAME_REGEX,
    },
    praenomenAbbr: {
        class: "scientific",
        next: POST_GENUS_CLASSES,
        pattern: SUPRAGENERIC_ABBR_REGEX,
    },
    species: {
        antipattern: SPECIES_ANTIPATTERN,
        class: "scientific",
        next: [...PRIMARY_OPERATORS, ...DATE_CLASSES, "subspecies", "subspecificOperator", "subspecificRank", "author"],
        pattern: /^(sp\.(\s+innom\.)?|[a-zß-öø-ÿœ]+-?[a-zß-öø-ÿœ]+)$/,
    },
    speciesGroup: {
        class: "scientific",
        next: [...PRIMARY_OPERATORS, ...DATE_CLASSES, "species", "specificOperator", "author"],
        pattern: /^\([a-zß-öø-ÿœ]+-?[a-zß-öø-ÿœ]+\)$/,
    },
    specificOperator: {
        class: "comment",
        next: ["species"],
        pattern: /^(cf\.|aff\.)$/,
    },
    subgenericName: {
        class: "scientific",
        next: [...DATE_CLASSES, "citationOperator", "incertae", ...POST_SUBGENUS_CLASSES, "specificOperator", "author"],
        pattern: SUPRAGENERIC_NAME_REGEX,
    },
    subgenericRank: {
        class: "rank",
        next: ["subgenericName"],
        pattern: /^(\[\()?(subg(\.|en(\.|us)?)?|(sub)?sect(\.|ion?)?|(sub)?ser(\.|ies)?)(\]\))?$/i,
    },
    subgenus: {
        class: "scientific",
        next: [...PRIMARY_OPERATORS, ...DATE_CLASSES, ...POST_SUBGENUS_CLASSES, "specificOperator", "author"],
        pattern: /^\([A-ZÀ-ÖØ-ÞŒ][a-zß-öø-ÿœ]*(-[A-ZÀ-ÖØ-ÞŒa-zß-öø-ÿœ])?[a-zß-öø-ÿœ]+\)$/,
    },
    subspecies: {
        antipattern:
            /^(da|de|du|la|van|von|(\[\()?(subsp(\.|ecies)?|ssp\.?|(sub)?fo(\.|rm(\.|a)?)?|(sub|con)?var(\.|iet(y|as))?)(\]\))?)$/,
        class: "scientific",
        next: [...PRIMARY_OPERATORS, "subspecificRank", ...DATE_CLASSES, "author"],
        pattern: /^(ssp\.(\s+innom\.)?|[a-zß-öø-ÿœ]+-?[a-zß-öø-ÿœ]+)$/,
    },
    subspecificOperator: {
        class: "comment",
        next: ["subspecies"],
        pattern: /^(cf\.|aff\.)$/,
    },
    subspecificRank: {
        class: "rank",
        next: ["subspecies"],
        pattern: /^(\[\()?(subsp(\.|ecies)?|ssp\.?|(sub)?fo(\.|rm(\.|a)?)?|(sub|con)?var(\.|iet(y|as))?)(\]\))?$/i,
    },
    supragenericRank: {
        class: "rank",
        next: [...DATE_CLASSES, "incertae", "author"],
        pattern:
            /^(\[\()?((sub|sup(ra|er)|infra)?phyl(\.|um)|(sub|sup(ra|er)|infra)?div(\.|ision)|(sub|sup(ra|er)|infra)?cl(\.|ass(is)?)|(sub|sup(ra|er)|infra)?ord(\.|o|er)|(sub|sup(ra|er))?fam(\.|il(ia|y))|(sub)?tr(\.|ib(e|us))|gen(\.|us))(\]\))?$/i,
    },
    vernacular: {
        class: "vernacular",
        next: ["vernacular"],
        pattern: /^.+$/i,
    },
    year: {
        class: "citation",
        next: ["month", ...PRIMARY_OPERATORS, "subspecificRank", "subgenericRank", "author"],
        pattern: /^[([{]?\d{4}[)\]}]?\.?$/i,
    },
}
