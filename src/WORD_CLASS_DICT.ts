import { SUPRAGENERIC_NAME_REGEX } from "./SUPRAGENERIC_NAME_REGEX"
import { Style } from "./Style";
import { WordClass } from "./WordClass";
import { WordClassName } from "./WordClassName";
export const WORD_CLASS_DICT: Readonly<Record<WordClassName, WordClass>> = {
	[WordClassName.AUTHOR]: {
		antipattern: /^(\[\()?(subsp(\.|ecies)?|ssp\.?|(sub)?fo(\.|rm(\.|a)?)?|(sub|con)?var(\.|iet(y|as))?)(\]\))?$/i,
		next: [
			WordClassName.AUTHOR_OPERATOR,
			WordClassName.CITATION_OPERATOR,
			WordClassName.SUBSPECIFIC_RANK,
			WordClassName.INCERTAE,
			WordClassName.YEAR,
			WordClassName.DATE,
			WordClassName.MONTH,
			WordClassName.AUTHOR,
		],
		pattern: /^[\(\[{]?[A-ZÀ-ÖØ-ÞŒa-zß-öø-ÿœ\"\!\*]/,
		style: Style.CITATION,
	},
	[WordClassName.AUTHOR_OPERATOR]: {
		next: [
			WordClassName.AUTHOR,
		],
		pattern: /^(&|and|et)$/i,
		style: Style.CITATION,
	},
	[WordClassName.CITATION_OPERATOR]: {
		next: [
			WordClassName.AUTHOR,
			WordClassName.YEAR,
			WordClassName.MONTH,
			WordClassName.DATE,
		],
		pattern: /^(ex|in|vide|non)$/i,
		style: Style.CITATION,
	},
	[WordClassName.DATE]: {
		next: [
			WordClassName.MONTH,
			WordClassName.YEAR,
			WordClassName.CITATION_OPERATOR,
			WordClassName.INCERTAE,
			WordClassName.SUBSPECIFIC_RANK,
			WordClassName.AUTHOR,
		],
		pattern: /^[\(\[{]?\d\d?[\)\]}]?\.?$/i,
		style: Style.CITATION,
	},
	[WordClassName.INCERTAE]: {
		next: [
			WordClassName.INCERTAE_FOLLOWER,
		],
		pattern: /^incertae|indet\.?$/i,
		style: Style.COMMENT,
	},
	[WordClassName.INCERTAE_FOLLOWER]: {
		next: [
			WordClassName.INCERTAE_FOLLOWER,
		],
		pattern: /^.+$/,
		style: Style.COMMENT,
	},
	[WordClassName.MONTH]: {
		next: [
			WordClassName.DATE,
			WordClassName.YEAR,
			WordClassName.CITATION_OPERATOR,
			WordClassName.INCERTAE,
			WordClassName.SUBSPECIFIC_RANK,
			WordClassName.AUTHOR,
		],
		pattern: /^\(?(Jan(\.|uary)?|Feb(\.|ruary)?|Mar(\.|ch)?|Apr(\.|il)?|May|Jun(\.|e)?|Jul(\.|y)?|Aug(\.|ust)?|Sep(\.|t(\.)?|ember)?|Oct(\.|ober)?|Nov(\.|ember?)|Dec(\.|ember)?)$/i,
		style: Style.CITATION,
	},
	[WordClassName.OPERATOR]: {
		next: [
			WordClassName.PRAENOMEN,
			WordClassName.PRAENOMEN_ABBR,
		],
		pattern: /^(\+|←)$/,
		style: Style.OPERATOR,
	},
	[WordClassName.PRAENOMEN]: {
		next: [
			WordClassName.OPERATOR,
			WordClassName.CITATION_OPERATOR,
			WordClassName.INCERTAE,
			WordClassName.SUPRAGENERIC_RANK,
			WordClassName.SUBGENERIC_RANK,
			WordClassName.SPECIFIC_OPERATOR,
			WordClassName.SPECIES,
			WordClassName.SUBGENUS,
			WordClassName.SPECIES_GROUP,
			WordClassName.AUTHOR,
		],
		pattern: SUPRAGENERIC_NAME_REGEX,
		style: Style.SCIENTIFIC,
	},
	[WordClassName.PRAENOMEN_ABBR]: {
		next: [
			WordClassName.SPECIES,
			WordClassName.SUBGENUS,
			WordClassName.SPECIES_GROUP,
		],
		pattern: /^[A-ZÀ-ÖØ-ÞŒ]\.$/,
		style: Style.SCIENTIFIC,
	},
	[WordClassName.SPECIES]: {
		antipattern: /^(da|de|du|la|van|von|(\[\()?(subsp(\.|ecies)?|ssp\.?|(sub)?fo(\.|rm(\.|a)?)?|(sub|con)?var(\.|iet(y|as))?)(\]\))?)$/,
		next: [
			WordClassName.OPERATOR,
			WordClassName.CITATION_OPERATOR,
			WordClassName.YEAR,
			WordClassName.MONTH,
			WordClassName.DATE,
			WordClassName.SUBSPECIES,
			WordClassName.SUBSPECIFIC_OPERATOR,
			WordClassName.SUBSPECIFIC_RANK,
			WordClassName.AUTHOR,
		],
		pattern: /^(sp\.(\s+innom\.)?|[a-zß-öø-ÿœ]+\-?[a-zß-öø-ÿœ]+)$/,
		style: Style.SCIENTIFIC,
	},
	[WordClassName.SPECIES_GROUP]: {
		next: [
			WordClassName.OPERATOR,
			WordClassName.CITATION_OPERATOR,
			WordClassName.YEAR,
			WordClassName.MONTH,
			WordClassName.DATE,
			WordClassName.SPECIES,
			WordClassName.SPECIFIC_OPERATOR,
			WordClassName.AUTHOR,
		],
		pattern: /^\([a-zß-öø-ÿœ]+\-?[a-zß-öø-ÿœ]+\)$/,
		style: Style.SCIENTIFIC,
	},
	[WordClassName.SPECIFIC_OPERATOR]: {
		next: [
			WordClassName.SPECIES,
		],
		pattern: /^(cf\.|aff\.)$/,
		style: Style.COMMENT,
	},
	[WordClassName.SUBGENERIC_NAME]: {
		next: [
			WordClassName.YEAR,
			WordClassName.CITATION_OPERATOR,
			WordClassName.MONTH,
			WordClassName.DATE,
			WordClassName.SPECIES,
			WordClassName.SPECIFIC_OPERATOR,
			WordClassName.AUTHOR,
		],
		pattern: SUPRAGENERIC_NAME_REGEX,
		style: Style.SCIENTIFIC,
	},
	[WordClassName.SUBGENERIC_RANK]: {
		next: [
			WordClassName.SUBGENERIC_NAME,
		],
		pattern: /^(\[\()?(subg(\.|en(\.|us)?)?|(sub)?sect(\.|ion?)?|(sub)?ser(\.|ies)?)(\]\))?$/i,
		style: Style.RANK,
	},
	[WordClassName.SUBGENUS]: {
		next: [
			WordClassName.OPERATOR,
			WordClassName.CITATION_OPERATOR,
			WordClassName.YEAR,
			WordClassName.MONTH,
			WordClassName.DATE,
			WordClassName.SPECIES,
			WordClassName.SPECIFIC_OPERATOR,
			WordClassName.AUTHOR,
		],
		pattern: /^\([A-ZÀ-ÖØ-ÞŒ][a-zß-öø-ÿœ]*(\-[A-ZÀ-ÖØ-ÞŒa-zß-öø-ÿœ])?[a-zß-öø-ÿœ]+\)$/,
		style: Style.SCIENTIFIC,
	},
	[WordClassName.SUBSPECIES]: {
		antipattern: /^(da|de|du|la|van|von|(\[\()?(subsp(\.|ecies)?|ssp\.?|(sub)?fo(\.|rm(\.|a)?)?|(sub|con)?var(\.|iet(y|as))?)(\]\))?)$/,
		next: [
			WordClassName.OPERATOR,
			WordClassName.CITATION_OPERATOR,
			WordClassName.SUBSPECIFIC_RANK,
			WordClassName.YEAR,
			WordClassName.MONTH,
			WordClassName.DATE,
			WordClassName.AUTHOR,
		],
		pattern: /^(ssp\.(\s+innom\.)?|[a-zß-öø-ÿœ]+\-?[a-zß-öø-ÿœ]+)$/,
		style: Style.SCIENTIFIC,
	},
	[WordClassName.SUBSPECIFIC_OPERATOR]: {
		next: [
			WordClassName.SUBSPECIES,
		],
		pattern: /^(cf\.|aff\.)$/,
		style: Style.COMMENT,
	},
	[WordClassName.SUBSPECIFIC_RANK]: {
		next: [
			WordClassName.SUBSPECIES,
		],
		pattern: /^(\[\()?(subsp(\.|ecies)?|ssp\.?|(sub)?fo(\.|rm(\.|a)?)?|(sub|con)?var(\.|iet(y|as))?)(\]\))?$/i,
		style: Style.RANK,
	},
	[WordClassName.SUPRAGENERIC_RANK]: {
		next: [
			WordClassName.YEAR,
			WordClassName.MONTH,
			WordClassName.DATE,
			WordClassName.INCERTAE,
			WordClassName.AUTHOR,
		],
		pattern: /^(\[\()?((sub|sup(ra|er)|infra)?phyl(\.|um)|(sub|sup(ra|er)|infra)?div(\.|ision)|(sub|sup(ra|er)|infra)?cl(\.|ass(is)?)|(sub|sup(ra|er)|infra)?ord(\.|o|er)|(sub|sup(ra|er))?fam(\.|il(ia|y))|(sub)?tr(\.|ib(e|us))|gen(\.|us))(\]\))?$/i,
		style: Style.RANK,
	},
	[WordClassName.VERNACULAR]: {
		next: [
			WordClassName.VERNACULAR,
		],
		pattern: /^.+$/i,
		style: Style.VERNACULAR,
	},
	[WordClassName.YEAR]: {
		next: [
			WordClassName.MONTH,
			WordClassName.CITATION_OPERATOR,
			WordClassName.INCERTAE,
			WordClassName.SUBSPECIFIC_RANK,
			WordClassName.AUTHOR,
		],
		pattern: /^[\(\[{]?\d{4}[\)\]}]?\.?$/i,
		style: Style.CITATION,
	}
};
