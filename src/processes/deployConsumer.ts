import * as logger from 'heroku-logger';
import * as util from 'util';
import { auth } from '../lib/hubAuth';
import * as checkQueue from '../lib/deployQueueCheck';
import { exec } from '../lib/execProm';

const setTimeoutPromise = util.promisify(setTimeout);

(async () => {
  logger.debug(
    'DeployConsumer: I am a always-on deploy (non-pool) consumer and I am up!'
  );

  await auth();
	
  if (process.env.GITHUB_AUTH_TOKEN) {
  	logger.debug('Setting up Github Token Auth');
        await exec(`git config --global url."https://token:${process.env.GITHUB_AUTH_TOKEN}@github.com/".insteadOf "https://github.com/"`);
  }
	
  let processedSomething = true;

  while (true) {
		processedSomething = await checkQueue();

		// back off a second before checking the queue again if it was empty
    if (!processedSomething) {
      await setTimeoutPromise(1000);
    }
  }
})();
