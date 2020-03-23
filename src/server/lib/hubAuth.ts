import * as fs from 'fs';
import logger from 'heroku-logger';
<<<<<<< HEAD:src/server/lib/hubAuth.ts
// import * as stripcolor from 'strip-color';
=======
>>>>>>> 5621934a52829ee61d59cfda1e9908e00218f2ac:src/server/lib/hubAuth.ts

import { isLocal } from './amIlocal';
import { exec } from './execProm';
import { processWrapper } from './processWrapper';

<<<<<<< HEAD:src/server/lib/hubAuth.ts
// const hubAuthd = async () => {
//     // const hubResult = await exec('sfdx force:config:get defaultdevhubusername --json');
//     // if (JSON.parse(stripcolor(hubResult.stdout)).status === 0) {
//     //     return true;
//     // }

//     return false;
// };

=======
>>>>>>> 5621934a52829ee61d59cfda1e9908e00218f2ac:src/server/lib/hubAuth.ts
const getKeypath = async (): Promise<string> => {
    if (isLocal()) {
        // I'm fairly local
        // logger.debug('hubAuth...using local key');
        if (processWrapper.LOCAL_ONLY_KEY_PATH) {
            return processWrapper.LOCAL_ONLY_KEY_PATH;
        } else {
            logger.error(`isLocal, but no local keypath. ${processWrapper.LOCAL_ONLY_KEY_PATH}`);
        }
    } else {
        // we're doing it in the cloud
        // logger.debug('hubAuth...using key from heroku environment');
        if (!fs.existsSync('/app/tmp/server.key')) {
            fs.writeFileSync('/app/tmp/server.key', processWrapper.JWTKEY, 'utf8');
        }
        return '/app/tmp/server.key';
    }
    return undefined;
};

<<<<<<< HEAD:src/server/lib/hubAuth.ts
=======
const buildJWTAuthCommand = async (username = processWrapper.HUB_USERNAME): Promise<string> =>
    `sfdx force:auth:jwt:grant --clientid ${processWrapper.CONSUMERKEY} --username ${username} --jwtkeyfile ${await getKeypath()}`;

>>>>>>> 5621934a52829ee61d59cfda1e9908e00218f2ac:src/server/lib/hubAuth.ts
const auth = async (): Promise<string> => {
    // where will our cert live?
    const keypath = await getKeypath();

    try {
        if (!isLocal()) {
            // not local, so link the plugins.  local runs will hae it already linked.
            logger.debug('hubAuth: updating plugin');
            await exec('sfdx plugins:link node_modules/shane-sfdx-plugins');
            await exec('sfdx plugins:link node_modules/@salesforce/analytics'); // analytics sfx plugins
            await exec('sfdx plugins:link node_modules/@mshanemc/sfdx-migration-automatic');
        }

        if (processWrapper.SFDX_PRERELEASE) {
            // not local, so link the plugin.  local runs will hae it already linked.
            logger.debug('hubAuth: installing pre-release plugin for sfdx');
            await exec('sfdx plugins:install salesforcedx@pre-release');
        }

        if (processWrapper.HEROKU_API_KEY) {
            await exec('heroku update');
        }

<<<<<<< HEAD:src/server/lib/hubAuth.ts
        await exec(
            `sfdx force:auth:jwt:grant --clientid ${processWrapper.CONSUMERKEY} --username ${
                processWrapper.HUB_USERNAME
            } --jwtkeyfile ${await keypath} --setdefaultdevhubusername -a hub --json`
        );
=======
        await exec(`${await buildJWTAuthCommand()} --setdefaultdevhubusername -a hub --json`);
>>>>>>> 5621934a52829ee61d59cfda1e9908e00218f2ac:src/server/lib/hubAuth.ts
    } catch (err) {
        logger.error('hubAuth', err);
        // eslint-disable-next-line no-process-exit
        process.exit(1);
    }
    logger.debug('hubAuth: complete');
    return keypath;
};

export { auth, getKeypath, buildJWTAuthCommand };
