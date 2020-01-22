
import { deployCheck } from './../../helpers/deployCheck';
import { sfdxTimeout } from './../../helpers/testingUtils';

test('non-pool grab of the org mshanemc/cg4Integrate/no branch', async () => {
    await deployCheck({
        username: 'mshanemc',
        repo: 'cg4Integrate' });
}, sfdxTimeout);     
