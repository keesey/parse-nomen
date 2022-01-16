import { NomenPartClass } from "./NomenPartClass"
import { SUPRAGENERIC_NAME_REGEX } from "./SUPRAGENERIC_NAME_REGEX"
import { WordClass } from "./WordClass"
import { WordClassName } from "./WordClassName"
const DATE_CLASSES = [WordClassName.YEAR, WordClassName.MONTH, WordClassName.DATE]
const POST_SUBGENUS_CLASSES = [WordClassName.SPECIES, WordClassName.SPECIES_GROUP]
const POST_GENUS_CLASSES = [...POST_SUBGENUS_CLASSES, WordClassName.SUBGENUS]
const PRIMARY_OPERATORS = [WordClassName.OPERATOR, WordClassName.CITATION_OPERATOR, WordClassName.INCERTAE]
const SPECIES_ANTIPATTERN =
    /^(da|de|du|la|van|von|(\[\()?(subsp(\.|ecies)?|ssp\.?|(sub)?fo(\.|rm(\.|a)?)?|(sub|con)?var(\.|iet(y|as))?)(\]\))?)$/
const SUPRAGENERIC_ABBR_REGEX = /^[A-ZÀ-ÖØ-ÞŒ]\.$/
export const WORD_CLASS_DICT: Readonly<Record<WordClassName, WordClass>> = {
    [WordClassName.AUTHOR]: {
        antipattern: /^(\[\()?(subsp(\.|ecies)?|ssp\.?|(sub)?fo(\.|rm(\.|a)?)?|(sub|con)?var(\.|iet(y|as))?)(\]\))?$/i,
        class: NomenPartClass.CITATION,
        next: [
            WordClassName.AUTHOR_OPERATOR,
            WordClassName.CITATION_OPERATOR,
            WordClassName.SUBSPECIFIC_RANK,
            WordClassName.INCERTAE,
            ...DATE_CLASSES,
            WordClassName.AUTHOR,
        ],
        pattern: /^[([{]?[A-ZÀ-ÖØ-ÞŒa-zß-öø-ÿœ"!*]/,
    },
    [WordClassName.AUTHOR_OPERATOR]: {
        class: NomenPartClass.CITATION,
        next: [WordClassName.AUTHOR],
        pattern: /^(&|and|et)$/i,
    },
    [WordClassName.CANDIDATE_PRAENOMEN]: {
        class: NomenPartClass.VERNACULAR,
        next: [WordClassName.CANDIDATE_SPECIES, WordClassName.AUTHOR],
        pattern: SUPRAGENERIC_NAME_REGEX,
    },
    [WordClassName.CANDIDATE_PRAENOMEN_ABBR]: {
        class: NomenPartClass.VERNACULAR,
        next: POST_GENUS_CLASSES,
        pattern: SUPRAGENERIC_ABBR_REGEX,
    },
    [WordClassName.CANDIDATE_SPECIES]: {
        antipattern: SPECIES_ANTIPATTERN,
        class: NomenPartClass.VERNACULAR,
        next: [...DATE_CLASSES, WordClassName.AUTHOR, WordClassName.VERNACULAR],
        pattern: /^[a-zß-öø-ÿœ]+-?[a-zß-öø-ÿœ]+$/,
    },
    [WordClassName.CANDIDATUS]: {
        class: NomenPartClass.COMMENT,
        next: [WordClassName.CANDIDATE_PRAENOMEN, WordClassName.CANDIDATE_PRAENOMEN_ABBR, WordClassName.VERNACULAR],
        pattern: /^"?ca(ndidatus|.)$/i,
    },
    [WordClassName.CITATION_OPERATOR]: {
        class: NomenPartClass.CITATION,
        next: [WordClassName.AUTHOR, ...DATE_CLASSES],
        pattern: /^(ex|in|vide|non)$/i,
    },
    [WordClassName.DATE]: {
        class: NomenPartClass.CITATION,
        next: [
            WordClassName.MONTH,
            WordClassName.YEAR,
            ...PRIMARY_OPERATORS,
            WordClassName.SUBSPECIFIC_RANK,
            WordClassName.AUTHOR,
        ],
        pattern: /^[([{]?\d\d?[)\]}]?\.?$/i,
    },
    [WordClassName.INCERTAE]: {
        class: NomenPartClass.COMMENT,
        next: [WordClassName.INCERTAE_FOLLOWER],
        pattern: /^incertae|indet\.?$/i,
    },
    [WordClassName.INCERTAE_FOLLOWER]: {
        class: NomenPartClass.COMMENT,
        next: [WordClassName.INCERTAE_FOLLOWER],
        pattern: /^.+$/,
    },
    [WordClassName.MONTH]: {
        class: NomenPartClass.CITATION,
        next: [
            WordClassName.DATE,
            WordClassName.YEAR,
            WordClassName.CITATION_OPERATOR,
            WordClassName.INCERTAE,
            WordClassName.SUBSPECIFIC_RANK,
            WordClassName.AUTHOR,
        ],
        pattern:
            /^\(?(Jan(\.|uary)?|Feb(\.|ruary)?|Mar(\.|ch)?|Apr(\.|il)?|May|Jun(\.|e)?|Jul(\.|y)?|Aug(\.|ust)?|Sep(\.|t(\.)?|ember)?|Oct(\.|ober)?|Nov(\.|ember?)|Dec(\.|ember)?)$/i,
    },
    [WordClassName.OPERATOR]: {
        class: NomenPartClass.OPERATOR,
        next: [WordClassName.PRAENOMEN, WordClassName.PRAENOMEN_ABBR],
        pattern: /^(\+|←)$/,
    },
    [WordClassName.PRAENOMEN]: {
        class: NomenPartClass.SCIENTIFIC,
        next: [
            ...PRIMARY_OPERATORS,
            WordClassName.SUPRAGENERIC_RANK,
            WordClassName.SUBGENERIC_RANK,
            WordClassName.SPECIFIC_OPERATOR,
            ...POST_GENUS_CLASSES,
            WordClassName.AUTHOR,
        ],
        pattern: SUPRAGENERIC_NAME_REGEX,
    },
    [WordClassName.PRAENOMEN_ABBR]: {
        class: NomenPartClass.SCIENTIFIC,
        next: POST_GENUS_CLASSES,
        pattern: SUPRAGENERIC_ABBR_REGEX,
    },
    [WordClassName.SPECIES]: {
        antipattern: SPECIES_ANTIPATTERN,
        class: NomenPartClass.SCIENTIFIC,
        next: [
            ...PRIMARY_OPERATORS,
            ...DATE_CLASSES,
            WordClassName.SUBSPECIES,
            WordClassName.SUBSPECIFIC_OPERATOR,
            WordClassName.SUBSPECIFIC_RANK,
            WordClassName.AUTHOR,
        ],
        pattern: /^(sp\.(\s+innom\.)?|[a-zß-öø-ÿœ]+-?[a-zß-öø-ÿœ]+)$/,
    },
    [WordClassName.SPECIES_GROUP]: {
        class: NomenPartClass.SCIENTIFIC,
        next: [
            ...PRIMARY_OPERATORS,
            ...DATE_CLASSES,
            WordClassName.SPECIES,
            WordClassName.SPECIFIC_OPERATOR,
            WordClassName.AUTHOR,
        ],
        pattern: /^\([a-zß-öø-ÿœ]+-?[a-zß-öø-ÿœ]+\)$/,
    },
    [WordClassName.SPECIFIC_OPERATOR]: {
        class: NomenPartClass.COMMENT,
        next: [WordClassName.SPECIES],
        pattern: /^(cf\.|aff\.)$/,
    },
    [WordClassName.SUBGENERIC_NAME]: {
        class: NomenPartClass.SCIENTIFIC,
        next: [
            ...DATE_CLASSES,
            WordClassName.CITATION_OPERATOR,
            WordClassName.INCERTAE,
            ...POST_SUBGENUS_CLASSES,
            WordClassName.SPECIFIC_OPERATOR,
            WordClassName.AUTHOR,
        ],
        pattern: SUPRAGENERIC_NAME_REGEX,
    },
    [WordClassName.SUBGENERIC_RANK]: {
        class: NomenPartClass.RANK,
        next: [WordClassName.SUBGENERIC_NAME],
        pattern: /^(\[\()?(subg(\.|en(\.|us)?)?|(sub)?sect(\.|ion?)?|(sub)?ser(\.|ies)?)(\]\))?$/i,
    },
    [WordClassName.SUBGENUS]: {
        class: NomenPartClass.SCIENTIFIC,
        next: [
            ...PRIMARY_OPERATORS,
            ...DATE_CLASSES,
            ...POST_SUBGENUS_CLASSES,
            WordClassName.SPECIFIC_OPERATOR,
            WordClassName.AUTHOR,
        ],
        pattern: /^\([A-ZÀ-ÖØ-ÞŒ][a-zß-öø-ÿœ]*(-[A-ZÀ-ÖØ-ÞŒa-zß-öø-ÿœ])?[a-zß-öø-ÿœ]+\)$/,
    },
    [WordClassName.SUBSPECIES]: {
        antipattern:
            /^(da|de|du|la|van|von|(\[\()?(subsp(\.|ecies)?|ssp\.?|(sub)?fo(\.|rm(\.|a)?)?|(sub|con)?var(\.|iet(y|as))?)(\]\))?)$/,
        class: NomenPartClass.SCIENTIFIC,
        next: [...PRIMARY_OPERATORS, WordClassName.SUBSPECIFIC_RANK, ...DATE_CLASSES, WordClassName.AUTHOR],
        pattern: /^(ssp\.(\s+innom\.)?|[a-zß-öø-ÿœ]+-?[a-zß-öø-ÿœ]+)$/,
    },
    [WordClassName.SUBSPECIFIC_OPERATOR]: {
        class: NomenPartClass.COMMENT,
        next: [WordClassName.SUBSPECIES],
        pattern: /^(cf\.|aff\.)$/,
    },
    [WordClassName.SUBSPECIFIC_RANK]: {
        class: NomenPartClass.RANK,
        next: [WordClassName.SUBSPECIES],
        pattern: /^(\[\()?(subsp(\.|ecies)?|ssp\.?|(sub)?fo(\.|rm(\.|a)?)?|(sub|con)?var(\.|iet(y|as))?)(\]\))?$/i,
    },
    [WordClassName.SUPRAGENERIC_RANK]: {
        class: NomenPartClass.RANK,
        next: [...DATE_CLASSES, WordClassName.INCERTAE, WordClassName.AUTHOR],
        pattern:
            /^(\[\()?((sub|sup(ra|er)|infra)?phyl(\.|um)|(sub|sup(ra|er)|infra)?div(\.|ision)|(sub|sup(ra|er)|infra)?cl(\.|ass(is)?)|(sub|sup(ra|er)|infra)?ord(\.|o|er)|(sub|sup(ra|er))?fam(\.|il(ia|y))|(sub)?tr(\.|ib(e|us))|gen(\.|us))(\]\))?$/i,
    },
    [WordClassName.VERNACULAR]: {
        class: NomenPartClass.VERNACULAR,
        next: [WordClassName.VERNACULAR],
        pattern: /^.+$/i,
    },
    [WordClassName.YEAR]: {
        class: NomenPartClass.CITATION,
        next: [
            WordClassName.MONTH,
            ...PRIMARY_OPERATORS,
            WordClassName.SUBSPECIFIC_RANK,
            WordClassName.SUBGENERIC_RANK,
            WordClassName.AUTHOR,
        ],
        pattern: /^[([{]?\d{4}[)\]}]?\.?$/i,
    },
}
