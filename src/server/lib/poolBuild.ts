import logger from 'heroku-logger';

import { auth } from './hubAuth';
import { getPoolRequest, putPooledOrg } from './redisNormal';
import { build } from './commonBuild';
import { DeployRequest } from './types';

export async function poolBuild(): Promise<boolean> {
    let msgJSON: undefined | DeployRequest;

<<<<<<< HEAD:src/server/lib/poolBuild.ts
    try {
        msgJSON = await getPoolRequest(true);
    } catch (e) {
=======
export async function poolBuild(): Promise<boolean> {
    const msgJSON = await getPoolRequest(true).catch(e => {
>>>>>>> 5621934a52829ee61d59cfda1e9908e00218f2ac:src/server/lib/poolBuild.ts
        if (e.message === 'pool request queue is empty') {
            logger.warn(`failed to build pool: ${e.message}`);
        } else {
            logger.error(`failed to build pool: ${e.message}`);
        }
    });

    if (!msgJSON) {
        return false;
    }

    await auth();
    logger.debug('building a pool org!', msgJSON);

    const buildResult = await build(msgJSON);

    await putPooledOrg(msgJSON, {
        ...buildResult,
        poolBuildStartTime: buildResult.buildStartTime,
        poolBuildFinishTime: new Date()
    });
    return true;
}
