
import { sfdxTimeout } from './../../helpers/testingUtils';
import { requestAddToPool, requestBuildPool } from './../../helpers/poolHelpers';
import { pooledOrgFinder } from './../../../lib/pooledOrgFinder'; 
import { DeployRequest } from './../../../lib/types';
import { cdsDelete } from './../../../lib/redisNormal';

const tr = {
    username: 'mshanemc',
<<<<<<< HEAD
    repo: 'df17IntegrationWorkshops'
=======
    repo: 'df17IntegrationWorkshops',
    whitelisted: true
>>>>>>> 5621934a52829ee61d59cfda1e9908e00218f2ac
};

describe('pool for mshanemc/df17IntegrationWorkshops', () => {
        test('makes a pool org for mshanemc/df17IntegrationWorkshops', async () => {
            const added = await requestAddToPool(tr);
            expect(added).toBe(true);
            const built = await requestBuildPool(tr, true);
            expect(built).toBe(true);
        }, sfdxTimeout);  
    
        test('retrieves an org from the pool for mshanemc/df17IntegrationWorkshops', async () => {
            const req: DeployRequest = {
<<<<<<< HEAD
                repo: tr.repo,
                username: tr.username,
                deployId: 'mshanemc-df17IntegrationWorkshops-pool-1576772349673',
                createdTimestamp: new Date(),
                whitelisted: true
=======
                deployId: 'mshanemc-df17IntegrationWorkshops-pool-1579902269369',
                createdTimestamp: new Date(),
                repos: [{
                    whitelisted: true,
                    username: tr.username,
                    repo: tr.repo,
                }]
>>>>>>> 5621934a52829ee61d59cfda1e9908e00218f2ac
            }
            const foundInPool = await pooledOrgFinder(req, true);
            expect(foundInPool).toBeTruthy();
            
            // delete the org
            await cdsDelete(foundInPool.deployId);
        }, sfdxTimeout);       
        
});
