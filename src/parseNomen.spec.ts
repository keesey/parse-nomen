import { expect } from 'chai';
import { NomenPart } from './NomenPart';
import { NomenPartClass } from './NomenPartClass';
import { parseNomen } from './parseNomen';
function test(nomen: string, expectedParts: NomenPart[]) {
    it(`should parse "${nomen}" as expected`, () => {
        expect(parseNomen(nomen)).to.deep.equal(expectedParts);
    });
}
function testInvalid(arg?: any) {
    it(`should fail for ${arg}`, () => {
        expect(() => parseNomen(arg)).to.throw('Not a string.');
    });
}
describe('parseNomen()', () => {
    describe('with invalid arguments', () => {
        testInvalid();
        testInvalid(null);
        testInvalid(1);
        testInvalid({});
    });
    describe('with valid arguments', () => {
        test('', []);
        test('Homo', [{
            class: NomenPartClass.SCIENTIFIC,
            text: 'Homo',
        }]);
        test('Homo (Homo)', [{
            class: NomenPartClass.SCIENTIFIC,
            text: 'Homo (Homo)',
        }]);
        test('Homo subgenus Homo', [{
            class: NomenPartClass.SCIENTIFIC,
            text: 'Homo',
        }, {
            class: NomenPartClass.RANK,
            text: 'subgenus',
        }, {
            class: NomenPartClass.SCIENTIFIC,
            text: 'Homo',
        }]);
        test('Homo subg. Homo', [{
            class: NomenPartClass.SCIENTIFIC,
            text: 'Homo',
        }, {
            class: NomenPartClass.RANK,
            text: 'subg.',
        }, {
            class: NomenPartClass.SCIENTIFIC,
            text: 'Homo',
        }]);
        test('Homo (sapiens)', [{
            class: NomenPartClass.SCIENTIFIC,
            text: 'Homo (sapiens)',
        }]);
        test('Homo sapiens', [{
            class: NomenPartClass.SCIENTIFIC,
            text: 'Homo sapiens',
        }]);
        test('Homo sapiens sapiens', [{
            class: NomenPartClass.SCIENTIFIC,
            text: 'Homo sapiens sapiens',
        }]);
        test('Homo sapiens Linnaeus 1758', [{
            class: NomenPartClass.SCIENTIFIC,
            text: 'Homo sapiens',
        }, {
            class: NomenPartClass.CITATION,
            text: 'Linnaeus 1758',
        }]);
        test('Homo sapiens Linnaeus, 1758', [{
            class: NomenPartClass.SCIENTIFIC,
            text: 'Homo sapiens',
        }, {
            class: NomenPartClass.CITATION,
            text: 'Linnaeus, 1758',
        }]);
        test('Hominidae indet.', [{
            class: NomenPartClass.SCIENTIFIC,
            text: 'Hominidae',
        }, {
            class: NomenPartClass.COMMENT,
            text: 'indet.',
        }]);
        test('Homo sapiens indet.', [{
            class: NomenPartClass.SCIENTIFIC,
            text: 'Homo sapiens',
        }, {
            class: NomenPartClass.COMMENT,
            text: 'indet.',
        }]);
        test('Hominidae incertae sedis', [{
            class: NomenPartClass.SCIENTIFIC,
            text: 'Hominidae',
        }, {
            class: NomenPartClass.COMMENT,
            text: 'incertae sedis',
        }]);
        test('Hominidae incertae mutabilis', [{
            class: NomenPartClass.SCIENTIFIC,
            text: 'Hominidae',
        }, {
            class: NomenPartClass.COMMENT,
            text: 'incertae mutabilis',
        }]);
        test('Balæna maximus borealis Knox (of Hamilton not Lesson) 1838', [{
            class: NomenPartClass.SCIENTIFIC,
            text: 'Balæna maximus borealis',
        }, {
            class: NomenPartClass.CITATION,
            text: 'Knox (of Hamilton not Lesson) 1838',
        }]);
        test('Homo sapiens + Praeanthropus afarensis', [{
            class: NomenPartClass.SCIENTIFIC,
            text: 'Homo sapiens',
        }, {
            class: NomenPartClass.OPERATOR,
            text: '+',
        }, {
            class: NomenPartClass.SCIENTIFIC,
            text: 'Praeanthropus afarensis',
        }]);
        test('Herpestes fuscus ssp. fuscus Waterhouse, 1838', [{
            class: NomenPartClass.SCIENTIFIC,
            text: 'Herpestes fuscus',
        }, {
            class: NomenPartClass.RANK,
            text: 'ssp.',
        }, {
            class: NomenPartClass.SCIENTIFIC,
            text: 'fuscus',
        }, {
            class: NomenPartClass.CITATION,
            text: 'Waterhouse, 1838',
        }]);
        test('Homonœa fornicata NEWMAN Edward, 1842', [{
            class: NomenPartClass.SCIENTIFIC,
            text: 'Homonœa fornicata',
        }, {
            class: NomenPartClass.CITATION,
            text: 'NEWMAN Edward, 1842',
        }]);
        test('Yersinia pestis (Lehmann and Neumann 1896) van Loghem, 1944', [{
            class: NomenPartClass.SCIENTIFIC,
            text: 'Yersinia pestis',
        }, {
            class: NomenPartClass.CITATION,
            text: '(Lehmann and Neumann 1896) van Loghem, 1944',
        }]);
        test('Patagotitan mayorum Carballido, Pol, Otero, Cerda, Salgado, Garrido, Ramezani, Cúneo & Krause 2017', [{
            class: NomenPartClass.SCIENTIFIC,
            text: 'Patagotitan mayorum',
        }, {
            class: NomenPartClass.CITATION,
            text: 'Carballido, Pol, Otero, Cerda, Salgado, Garrido, Ramezani, Cúneo & Krause 2017',
        }]);
        test('Patagotitan mayorum Carballido & al. 2017', [{
            class: NomenPartClass.SCIENTIFIC,
            text: 'Patagotitan mayorum',
        }, {
            class: NomenPartClass.CITATION,
            text: 'Carballido & al. 2017',
        }]);
        test('Patagotitan mayorum Carballido & al., 2017', [{
            class: NomenPartClass.SCIENTIFIC,
            text: 'Patagotitan mayorum',
        }, {
            class: NomenPartClass.CITATION,
            text: 'Carballido & al., 2017',
        }]);
        test('Patagotitan mayorum Carballido et al., 2017', [{
            class: NomenPartClass.SCIENTIFIC,
            text: 'Patagotitan mayorum',
        }, {
            class: NomenPartClass.CITATION,
            text: 'Carballido et al., 2017',
        }]);
        test('Patagotitan mayorum Carballido & al. 2017 Aug 9', [{
            class: NomenPartClass.SCIENTIFIC,
            text: 'Patagotitan mayorum',
        }, {
            class: NomenPartClass.CITATION,
            text: 'Carballido & al. 2017 Aug 9',
        }]);
        test('Patagotitan mayorum Carballido & al. 9 August 2017', [{
            class: NomenPartClass.SCIENTIFIC,
            text: 'Patagotitan mayorum',
        }, {
            class: NomenPartClass.CITATION,
            text: 'Carballido & al. 9 August 2017',
        }]);
        test('Patagotitan mayorum Carballido & al. August 2017', [{
            class: NomenPartClass.SCIENTIFIC,
            text: 'Patagotitan mayorum',
        }, {
            class: NomenPartClass.CITATION,
            text: 'Carballido & al. August 2017',
        }]);
        test('Candidatus Phytoplasma', [{
            class: NomenPartClass.COMMENT,
            text: 'Candidatus',
        }, {
            class: NomenPartClass.VERNACULAR,
            text: 'Phytoplasma',
        }]);
        test('Candidatus Phytoplasma allocasuarinae', [{
            class: NomenPartClass.COMMENT,
            text: 'Candidatus',
        }, {
            class: NomenPartClass.VERNACULAR,
            text: 'Phytoplasma allocasuarinae',
        }]);
        test('"Candidatus   Phytoplasma allocasuarinae"   ', [{
            class: NomenPartClass.VERNACULAR,
            text: '"Candidatus Phytoplasma allocasuarinae"',
        }]);
        test('Ca. Phytoplasma allocasuarinae', [{
            class: NomenPartClass.COMMENT,
            text: 'Ca.',
        }, {
            class: NomenPartClass.VERNACULAR,
            text: 'Phytoplasma allocasuarinae',
        }]);
        test('Candidatus Phytoplasma allocasuarinae 2004', [{
            class: NomenPartClass.COMMENT,
            text: 'Candidatus',
        }, {
            class: NomenPartClass.VERNACULAR,
            text: 'Phytoplasma allocasuarinae',
        }, {
            class: NomenPartClass.CITATION,
            text: '2004',
        }]);
        test('Ca. Phytoplasma allocasuarinae Marcone & al. 2004', [{
            class: NomenPartClass.COMMENT,
            text: 'Ca.',
        }, {
            class: NomenPartClass.VERNACULAR,
            text: 'Phytoplasma allocasuarinae',
        }, {
            class: NomenPartClass.CITATION,
            text: 'Marcone & al. 2004',
        }]);
    });
});
