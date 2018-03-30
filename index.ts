export interface NomenPart {
	class: string;
	text: string;
}
interface WordClass {
	antipattern?: RegExp;
	next: string[];
	pattern: RegExp;
	style: string;
}
const INITIAL_WORD_CLASSES = ['praenomen', 'praenomenAbbr', 'vernacular'];
const SUPRAGENERIC_NAME = /^[A-ZÀ-ÖØ-ÞŒ][a-zß-öø-ÿœ]*(\-[A-ZÀ-ÖØ-ÞŒa-zß-öø-ÿœ])?[a-zß-öø-ÿœ]+$/;
const WORD_CLASS_DICT: { [name: string]: WordClass } = {
	author: {
		antipattern: /^(\[\()?(subsp(\.|ecies)?|ssp\.?|(sub)?fo(\.|rm(\.|a)?)?|(sub|con)?var(\.|iet(y|as))?)(\]\))?$/i,
		next: ['authorOperator', 'citationOperator', 'subspecificRank', 'incertae', 'year', 'date', 'month', 'author'],
		pattern: /^[\(\[{]?[A-ZÀ-ÖØ-ÞŒa-zß-öø-ÿœ\'\!\*]/,
		style: 'citation'
	},
	authorOperator: {
		next: ['author'],
		pattern: /^(&|and|et)$/i,
		style: 'citation'
	},
	citationOperator: {
		next: ['author', 'year', 'month', 'day'],
		pattern: /^(ex|in|vide|non)$/i,
		style: 'citation'
	},
	date: {
		next: ['month', 'year', 'citationOperator', 'incertae', 'subspecificRank', 'author'],
		pattern: /^[\(\[{]?\d\d?[\)\]}]?\.?$/i,
		style: 'citation'
	},
	incertae: {
		next: ['incertaeFollower'],
		pattern: /^incertae|indet\.?$/i,
		style: 'comment'
	},
	incertaeFollower: {
		next: ['incertaeFollower'],
		pattern: /^.+$/,
		style: 'comment'
	},
	month: {
		next: ['date', 'year', 'citationOperator', 'incertae', 'subspecificRank', 'author'],
		pattern: /^\(?(Jan(\.|uary)?|Feb(\.|ruary)?|Mar(\.|ch)?|Apr(\.|il)?|May|Jun(\.|e)?|Jul(\.|y)?|Aug(\.|ust)?|Sep(\.|t(\.)?|ember)?|Oct(\.|ober)?|Nov(\.|ember?)|Dec(\.|ember)?)$/i,
		style: 'citation'
	},
	operator: {
		next: ['praenomen', 'praenomenAbbr'],
		pattern: /^(\+|←)$/,
		style: 'operator'
	},
	praenomen: {
		next: ['operator', 'citationOperator', 'incertae', 'supragenericRank', 'subgenericRank', 'specificOperator', 'species', 'subgenus', 'speciesGroup', 'author'],
		pattern: SUPRAGENERIC_NAME,
		style: 'scientific'
	},
	praenomenAbbr: {
		next: ['species', 'subgenus', 'speciesGroup'],
		pattern: /^[A-ZÀ-ÖØ-ÞŒ]\.$/,
		style: 'scientific'
	},
	species: {
		antipattern: /^(da|de|du|la|van|von|(\[\()?(subsp(\.|ecies)?|ssp\.?|(sub)?fo(\.|rm(\.|a)?)?|(sub|con)?var(\.|iet(y|as))?)(\]\))?)$/,
		next: ['operator', 'citationOperator', 'year', 'month', 'date', 'subspecies', 'subspecificOperator', 'subspecificRank', 'author'],
		pattern: /^(sp\.(\s+innom\.)?|[a-zß-öø-ÿœ]+\-?[a-zß-öø-ÿœ]+)$/,
		style: 'scientific'
	},
	speciesGroup: {
		next: ['operator', 'citationOperator', 'year', 'month', 'date', 'species', 'specificOperator', 'author'],
		pattern: /^\([a-zß-öø-ÿœ]+\-?[a-zß-öø-ÿœ]+\)$/,
		style: 'scientific'
	},
	specificOperator: {
		next: ['species'],
		pattern: /^(cf\.|aff\.)$/,
		style: 'comment'
	},
	subgenericName: {
		next: ['year', 'citationOperator', 'month', 'date', 'species', 'specificOperator', 'author'],
		pattern: SUPRAGENERIC_NAME,
		style: 'scientific'
	},
	subgenericRank: {
		next: ['subgenericName'],
		pattern: /^(\[\()?(subg(\.|en(\.|us)?)?|(sub)?sect(\.|ion?)?|(sub)?ser(\.|ies)?)(\]\))?$/i,
		style: 'rank'
	},
	subgenus: {
		next: ['operator', 'citationOperator', 'year', 'month', 'date', 'species', 'specificOperator', 'author'],
		pattern: /^\([A-ZÀ-ÖØ-ÞŒ][a-zß-öø-ÿœ]*(\-[A-ZÀ-ÖØ-ÞŒa-zß-öø-ÿœ])?[a-zß-öø-ÿœ]+\)$/,
		style: 'scientific'
	},
	subspecies: {
		antipattern: /^(da|de|du|la|van|von|(\[\()?(subsp(\.|ecies)?|ssp\.?|(sub)?fo(\.|rm(\.|a)?)?|(sub|con)?var(\.|iet(y|as))?)(\]\))?)$/,
		next: ['operator', 'citationOperator', 'subspecificRank', 'year', 'month', 'date', 'author'],
		pattern: /^(ssp\.(\s+innom\.)?|[a-zß-öø-ÿœ]+\-?[a-zß-öø-ÿœ]+)$/,
		style: 'scientific'
	},
	subspecificOperator: {
		next: ['subspecies'],
		pattern: /^(cf\.|aff\.)$/,
		style: 'comment'
	},
	subspecificRank: {
		next: ['subspecies'],
		pattern: /^(\[\()?(subsp(\.|ecies)?|ssp\.?|(sub)?fo(\.|rm(\.|a)?)?|(sub|con)?var(\.|iet(y|as))?)(\]\))?$/i,
		style: 'rank'
	},
	supragenericRank: {
		next: ['year', 'month', 'date', 'incertae', 'author'],
		pattern: /^(\[\()?((sub|sup(ra|er)|infra)?phyl(\.|um)|(sub|sup(ra|er)|infra)?div(\.|ision)|(sub|sup(ra|er)|infra)?cl(\.|ass(is)?)|(sub|sup(ra|er)|infra)?ord(\.|o|er)|(sub|sup(ra|er))?fam(\.|il(ia|y))|(sub)?tr(\.|ib(e|us))|gen(\.|us))(\]\))?$/i,
		style: 'rank'
	},
	vernacular: {
		next: ['vernacular'],
		pattern: /^.+$/i,
		style: 'vernacular'
	},
	year: {
		next: ['month', 'citationOperator', 'incertae', 'subspecificRank', 'author'],
		pattern: /^[\(\[{]?\d{4}[\)\]}]?\.?$/i,
		style: 'citation'
	}
};
export function parseNomen(s: string): NomenPart[] {
	function condense(parts: NomenPart[]): NomenPart[] {
		const condensed: NomenPart[] = [];
		const n = parts.length;
		let last: NomenPart | null = null;
		for (let i = 0; i < n; ++i) {
			const current = parts[i];
			if (last === null || last.class !== current.class) {
				condensed.push(last = current);
			} else {
				last.text += ` ${current.text}`;
			}
		}
		return condensed;
	}
	function process(words: string[], wordClassNames: string[]): NomenPart[] {
		let parts: NomenPart[] = [];
		if (words.length > 0) {
			const word = words.shift() as string;
			const part: Partial<NomenPart> = {
				text: word
			};
			let next: string[] = [];
			const n = wordClassNames.length;
			for (let i = 0; i < n; ++i) {
				const wordClass = WORD_CLASS_DICT[wordClassNames[i]];
				if (!wordClass) {
					throw new Error(`Cannot find word class "${wordClassNames[i]}".`);
				}
				if (wordClass.pattern.test(word) && (!wordClass.antipattern || !wordClass.antipattern.test(word))) {
					part.class = wordClass.style;
					next = wordClass.next;
					break;
				}
			}
			parts.push(part as NomenPart);
			parts = parts.concat(process(words, next));
		}
		return parts;
	}
	if (typeof s !== 'string') {
		throw new Error('Not a string.');
	}
	const words = s
		.trim()
		.split(/\s+/g)
		.filter(Boolean);
	return condense(process(words, INITIAL_WORD_CLASSES));
}
