/* globals describe */
import { filterAlphaHypenUnderscore, shellSanitize } from '../../lib/shellSanitize';

describe('filterAlphaHypenUnderscore tests', () => {
    test('simple string passes', () => {
        const input = 'mshanemc';
        expect(filterAlphaHypenUnderscore(input)).toBe(input);
    });

    test('string with underscore passes', () => {
        const input = 'mshan_emc';
        expect(filterAlphaHypenUnderscore(input)).toBe(input);
    });

    test('string with hyphen passes', () => {
        const input = 'mshanemc-gsumner';
        expect(filterAlphaHypenUnderscore(input)).toBe(input);
    });

    test('string with @ fails', () => {
        const input = 'mshanemc@gsumner';
        expect(() => {
            filterAlphaHypenUnderscore(input);
        }).toThrow();
    });
});

<<<<<<< HEAD
describe('sanitize tests', () => {
=======
describe('sanitize tests good', () => {
>>>>>>> 5621934a52829ee61d59cfda1e9908e00218f2ac
    test('simple string passes', () => {
        const input = 'this is a fine command';
        expect(shellSanitize(input)).toBe(true);
    });

<<<<<<< HEAD
    test('string with underscore passes', () => {
        const input = 'let me pipe | to here';
        expect(shellSanitize(input)).toBe(false);
=======
    test('passes empty', () => {
        expect(shellSanitize('')).toBe(true);
    });
});

describe('sanitize tests bad', () => {
    test('string with underscore passes', () => {
        const input = 'let me pipe | to here';
        expect(() => {
            shellSanitize(input);
        }).toThrow();
>>>>>>> 5621934a52829ee61d59cfda1e9908e00218f2ac
    });

    test('string with hyphen passes', () => {
        const input = 'I am > you';
<<<<<<< HEAD
        expect(shellSanitize(input)).toBe(false);
=======
        expect(() => {
            shellSanitize(input);
        }).toThrow();
>>>>>>> 5621934a52829ee61d59cfda1e9908e00218f2ac
    });

    test('string with @ fails', () => {
        const input = 'mshanemc && gsumner';
<<<<<<< HEAD
        expect(shellSanitize(input)).toBe(false);
    });

    test('passes empty', () => {
        expect(shellSanitize('')).toBe(true);
=======
        expect(() => {
            shellSanitize(input);
        }).toThrow();
>>>>>>> 5621934a52829ee61d59cfda1e9908e00218f2ac
    });
});
