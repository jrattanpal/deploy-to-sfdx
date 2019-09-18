import * as logger from 'heroku-logger';
import * as util from 'util';
import { auth } from '../lib/hubAuth';
import * as checkQueue from '../lib/deployQueueCheck';

const setTimeoutPromise = util.promisify(setTimeout);

(async () => {
  logger.debug(
    'DeployConsumer: I am a always-on deploy (non-pool) consumer and I am up!'
  );

  await auth();
  logger.debug('Setting Git Environment Variables');
  logger.debug(process.env.GITHUB_AUTH_USER);
  logger.debug(process.env.GITHUB_AUTH_TOKEN);
  let processedSomething = true;

  while (true) {
		processedSomething = await checkQueue();

		// back off a second before checking the queue again if it was empty
    if (!processedSomething) {
      await setTimeoutPromise(1000);
    }
  }
})();
