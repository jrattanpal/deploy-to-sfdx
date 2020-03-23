import logger from 'heroku-logger';

import { getDeployRequest } from './redisNormal';
import { pooledOrgFinder } from './pooledOrgFinder';
import { build } from './commonBuild';
<<<<<<< HEAD
=======
import { isByoo, getPoolKey } from './namedUtilities';
>>>>>>> 5621934a52829ee61d59cfda1e9908e00218f2ac

import { DeployRequest } from './types';

const check = async (): Promise<boolean> => {
    // pull the oldest thing on the queue
    // will throw an error if the queue is empty.  handle somewhere
    let msgJSON: DeployRequest;

    try {
        msgJSON = await getDeployRequest(true);
    } catch (e) {
        // throws on empty queue
        return false;
    }

    try {
<<<<<<< HEAD
        msgJSON.visitor.event('Deploy Request', msgJSON.template).send();
=======
        msgJSON.visitor.event('Deploy Request', getPoolKey(msgJSON, '-')).send();
>>>>>>> 5621934a52829ee61d59cfda1e9908e00218f2ac
    } catch (e) {
        logger.warn('failed to send GA event');
    }

    // don't use org pools for byoo
<<<<<<< HEAD
    if (!msgJSON.byoo && (await pooledOrgFinder(msgJSON))) {
=======
    if (!isByoo(msgJSON) && (await pooledOrgFinder(msgJSON))) {
>>>>>>> 5621934a52829ee61d59cfda1e9908e00218f2ac
        logger.debug('deployQueueCheck: using a pooled org');
    } else {
        await build(msgJSON);
    }

    return true;
};

export = check;
