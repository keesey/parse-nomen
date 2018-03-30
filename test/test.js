'use strict';
const expect = require('chai').expect;
const { parseNomen } = require('../dist/index.js');
function test(nomen, expectedParts) {
    it(`should parse "${nomen}" as expected`, () => {
        expect(parseNomen(nomen)).to.deep.equal(expectedParts);
    });
}
function testInvalid(arg) {
    it(`should fail for ${arg}`, () => {
        expect(() => parseNomen(arg)).to.throw('Not a string.')
    });
}
describe("parseNomen()", () => {
    describe('with invalid arguments', () => {
        testInvalid(undefined);
        testInvalid(null);
        testInvalid(1);
        testInvalid({});
    });
    describe('with valid arguments', () => {
        test('', []);
        test('Homo', [{
            class: 'scientific',
            text: 'Homo',
        }]);
        test('Homo (Homo)', [{
            class: 'scientific',
            text: 'Homo (Homo)',
        }]);
        test('Homo (sapiens)', [{
            class: 'scientific',
            text: 'Homo (sapiens)',
        }]);
        test('Homo sapiens', [{
            class: 'scientific',
            text: 'Homo sapiens',
        }]);
        test('Homo sapiens sapiens', [{
            class: 'scientific',
            text: 'Homo sapiens sapiens',
        }]);
        test('Homo sapiens Linnaeus 1758', [{
            class: 'scientific',
            text: 'Homo sapiens',
        }, {
            class: 'citation',
            text: 'Linnaeus 1758',
        }]);
        test('Balæna maximus borealis Knox (of Hamilton not Lesson) 1838', [{
            class: 'scientific',
            text: 'Balæna maximus borealis',
        }, {
            class: 'citation',
            text: 'Knox (of Hamilton not Lesson) 1838',
        }]);
        test('Homo sapiens + Praeanthropus afarensis', [{
            class: 'scientific',
            text: 'Homo sapiens',
        }, {
            class: 'operator',
            text: '+',
        }, {
            class: 'scientific',
            text: 'Praeanthropus afarensis',
        }]);
        test('Herpestes fuscus ssp. fuscus Waterhouse, 1838', [{
            class: 'scientific',
            text: 'Herpestes fuscus',
        }, {
            class: 'rank',
            text: 'ssp.',
        }, {
            class: 'scientific',
            text: 'fuscus',
        }, {
            class: 'citation',
            text: 'Waterhouse, 1838',
        }]);
        test('Homonœa fornicata NEWMAN Edward, 1842', [{
            class: 'scientific',
            text: 'Homonœa fornicata',
        }, {
            class: 'citation',
            text: 'NEWMAN Edward, 1842',
        }]);
        test('Yersinia pestis (Lehmann and Neumann 1896) van Loghem, 1944', [{
            class: 'scientific',
            text: 'Yersinia pestis',
        }, {
            class: 'citation',
            text: '(Lehmann and Neumann 1896) van Loghem, 1944',
        }]);
    });
});
