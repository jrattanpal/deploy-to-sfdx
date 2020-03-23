import { utilities } from '../../lib/utilities';
<<<<<<< HEAD
=======
import { getArg } from '../../lib/namedUtilities';
>>>>>>> 5621934a52829ee61d59cfda1e9908e00218f2ac

describe('Utilities: getArg', () => {
    test('gets path from an org open command', () => {
        const cmd = 'sfdx force:org:open -u something@wahtever.hack -r -p /lightning/something';
<<<<<<< HEAD
        expect(utilities.getArg(cmd, '-p')).toBe('/lightning/something');
=======
        expect(getArg(cmd, '-p')).toBe('/lightning/something');
>>>>>>> 5621934a52829ee61d59cfda1e9908e00218f2ac
    });

    test('handles getArg with -d', () => {
        const cmd = 'sfdx shane:heroku:repo:deploy -d 500';
<<<<<<< HEAD
        expect(utilities.getArg(cmd, '-d')).toBe('500');
=======
        expect(getArg(cmd, '-d')).toBe('500');
>>>>>>> 5621934a52829ee61d59cfda1e9908e00218f2ac
    });

    test('handles getArg with --days', () => {
        const cmd = 'sfdx shane:heroku:repo:deploy --days 500 --json';
<<<<<<< HEAD
        expect(utilities.getArg(cmd, '--days')).toBe('500');
=======
        expect(getArg(cmd, '--days')).toBe('500');
>>>>>>> 5621934a52829ee61d59cfda1e9908e00218f2ac
    });

    test('handles getArg with -d after single param', () => {
        const cmd = 'sfdx shane:heroku:repo:deploy --json --days 500';
<<<<<<< HEAD
        expect(utilities.getArg(cmd, '--days')).toBe('500');
=======
        expect(getArg(cmd, '--days')).toBe('500');
>>>>>>> 5621934a52829ee61d59cfda1e9908e00218f2ac
    });

    test('handles getArg with ` after single param', () => {
        const cmd = 'sfdx shane:heroku:repo:deploy -f --name `basename "${PWD}"` --json --days 500';
<<<<<<< HEAD
        expect(utilities.getArg(cmd, '--name')).toBe('`basename "${PWD}"`');
=======
        expect(getArg(cmd, '--name')).toBe('`basename "${PWD}"`');
>>>>>>> 5621934a52829ee61d59cfda1e9908e00218f2ac
    });

    test('handles getArg with ` after single param with more string after that', () => {
        const cmd = 'sfdx shane:heroku:repo:deploy -f --name `basename "${PWD}"`-stg --json --days 500';
<<<<<<< HEAD
        expect(utilities.getArg(cmd, '--name')).toBe('`basename "${PWD}"`-stg');
=======
        expect(getArg(cmd, '--name')).toBe('`basename "${PWD}"`-stg');
>>>>>>> 5621934a52829ee61d59cfda1e9908e00218f2ac
    });

    test('parses url with double //', () => {
        const input = {
            status: 0,
            result: {
                url:
                    'https://momentum-energy-6867-dev-ed.cs16.my.salesforce.com//secur/frontdoor.jsp?sid=00Df0000003cblj!ARcAQClJTaxfz4XB9AJPE7HqAjbE3Lv4jE_Upzg..AEE25gDiV.Ko7kW25VoKu0TFKyTSZsPSmnWNatW8CeWWCuDH73DIqXJ',
                orgId: '00Df0000003cbljEAA',
                username: 'int532@work.shop'
            }
        };
        const jsonResult = utilities.urlFix(input);
        expect(jsonResult.result.url).toBe(
            'https://momentum-energy-6867-dev-ed.cs16.my.salesforce.com/secur/frontdoor.jsp?sid=00Df0000003cblj!ARcAQClJTaxfz4XB9AJPE7HqAjbE3Lv4jE_Upzg..AEE25gDiV.Ko7kW25VoKu0TFKyTSZsPSmnWNatW8CeWWCuDH73DIqXJ'
        );
    });

    test('parses url without double //', () => {
        const input = {
            status: 0,
            result: {
                url:
                    'https://momentum-energy-6867-dev-ed.cs16.my.salesforce.com/secur/frontdoor.jsp?sid=00Df0000003cblj!ARcAQClJTaxfz4XB9AJPE7HqAjbE3Lv4jE_Upzg..AEE25gDiV.Ko7kW25VoKu0TFKyTSZsPSmnWNatW8CeWWCuDH73DIqXJ',
                orgId: '00Df0000003cbljEAA',
                username: 'int532@work.shop'
            }
        };
        const jsonResult = utilities.urlFix(input);
        expect(jsonResult.result.url).toBe(
            'https://momentum-energy-6867-dev-ed.cs16.my.salesforce.com/secur/frontdoor.jsp?sid=00Df0000003cblj!ARcAQClJTaxfz4XB9AJPE7HqAjbE3Lv4jE_Upzg..AEE25gDiV.Ko7kW25VoKu0TFKyTSZsPSmnWNatW8CeWWCuDH73DIqXJ'
        );
    });
});
