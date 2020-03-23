/* eslint-disable no-process-exit */
<<<<<<< HEAD
import logger from 'heroku-logger';

import { utilities } from '../lib/utilities';
import { getPoolDeployRequestQueueSize } from '../lib/redisNormal';
import { prepareAll } from '../lib/poolPrep';
import { execProm } from '../lib/execProm';
import { processWrapper } from '../lib/processWrapper';

(async () => {
    if (utilities.checkHerokuAPI()) {
        const currentNeed = Math.min(processWrapper.maxPoolBuilders, await getPoolDeployRequestQueueSize());

        if (currentNeed === processWrapper.maxPoolBuilders) {
            logger.warn('the poolDeploys queue seems really large');
        }

        let builders = 0;
        const builderCommand = utilities.getPoolDeployerCommand();
        while (builders < currentNeed) {
            // eslint-disable-next-line no-await-in-loop
            await execProm(builderCommand);
            builders++;
        }
        logger.debug(`stared ${currentNeed} builders for poolQueue`);
        await prepareAll();
=======
import { utilities } from '../lib/utilities';
import { getPoolDeployRequestQueueSize } from '../lib/redisNormal';
import { startPoolDeployers } from '../lib/poolPrep';
import { prepareAll } from '../lib/poolPrep';

(async () => {
    if (utilities.checkHerokuAPI()) {
        await Promise.all([
            // kick off builders to deal with existing queue, if any
            startPoolDeployers(await getPoolDeployRequestQueueSize()),
            // put all the messages on the queue
            prepareAll()
        ]);
        // kick off more builders to deal with anything you just added to the queue
        await startPoolDeployers(await getPoolDeployRequestQueueSize());
>>>>>>> 5621934a52829ee61d59cfda1e9908e00218f2ac
    }
    process.exit(0);
})();
