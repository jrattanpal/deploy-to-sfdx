import {
    redis,
    deleteOrg,
    // deployRequestExchange,
    getDeployRequest,
    // cdsExchange,
    // cdsPublish,
    putDeployRequest,
    putPoolRequest,
    // getKeys,
    // getPooledOrg,
    // putPooledOrg,
    // getPoolRequest,
    getPoolDeployRequestQueueSize,
    getPoolDeployCountByRepo,
    putHerokuCDS,
    getHerokuCDSs,
    getAppNamesFromHerokuCDSs
} from '../../lib/redisNormal';

import { DeployRequest, PoolConfig } from '../../lib/types';
import { CDS } from '../../lib/CDS';

jest.setTimeout(7000);
const deployMsgTest: DeployRequest = {
    repo: 'testRepo',
    username: 'mshanemc',
    deployId: 'this-is-the-deploy-id',
    createdTimestamp: new Date()
};

const deployMsgSerialized: any = { ...deployMsgTest };
deployMsgSerialized.createdTimestamp = deployMsgSerialized.createdTimestamp.toJSON();

test('tests HerokuCDS functions', async () => {
    await redis.del('herokuCDSs');

    const CDS1 = new CDS({
        deployId: 'test1',
        mainUser: {
            username: 'test1@mailinator.com',
            loginUrl: 'x'
        },
        complete: true,
        herokuResults: [{ appName: 'testApp1a', openUrl: 'x', dashboardUrl: 'x' }]
    });

    const CDS2 = new CDS({
        ...CDS1,
        mainUser: {
            username: 'test2@mailinator.com',
            loginUrl: 'x'
        },
        herokuResults: [
            { appName: 'testApp2a', openUrl: 'x', dashboardUrl: 'x' },
            { appName: 'testApp2b', openUrl: 'x', dashboardUrl: 'x' }
        ],
        deployId: 'test2'
    });

    await putHerokuCDS(CDS1);
    await putHerokuCDS(CDS2);

    const outputCDSs = await getHerokuCDSs();
    expect(outputCDSs.length).toBe(2);

    outputCDSs.forEach(cds => {
        expect(cds.herokuResults).toBeTruthy();
    });

    const appNames = await getAppNamesFromHerokuCDSs('test2@mailinator.com');
    expect(appNames).toEqual(['testApp2a', 'testApp2b']);
    expect(appNames).toEqual(['testApp2a', 'testApp2b']);

    const remainingCDSs = await getHerokuCDSs();
    expect(remainingCDSs.length).toBe(1);

    await redis.del('herokuCDSs');
});

test('can put a message on the deploy queue', async () => {
    await putDeployRequest(deployMsgTest);
});

test('can get a message from the deploy queue', async () => {
    const msg = await getDeployRequest();
    expect(msg).toEqual(deployMsgSerialized);
});

test('blocks deletes with bad usernames', async () => {
    await expect(deleteOrg('hack@you.bad;wget')).rejects.toEqual(Error('invalid username hack@you.bad;wget'));
});

test('allows deletes with good usernames', async () => {
    await expect(deleteOrg('sweet@you.good')).resolves.toBeUndefined();
    const result = await deleteOrg('sweet@you.good');
    expect(result).toBeUndefined();
});

test('properly counts poolDeploys', async () => {
    const username = 'mshanemc';
    const mainRepo = 'redisTestRepo1';

    const pool: PoolConfig = {
        user: username,
        repo: mainRepo,
        quantity: 1,
        lifeHours: 12
    };

    const originalPoolSize = await getPoolDeployRequestQueueSize();
    const originalMainRepoSize = await getPoolDeployCountByRepo(pool);

    const req: DeployRequest = {
        username: username,
        repo: mainRepo,
        deployId: encodeURIComponent(`${username}-${mainRepo}-${new Date().valueOf()}`),
        whitelisted: true,
        pool: true,
        createdTimestamp: new Date()
    };

    const req2: DeployRequest = {
        username: username,
        repo: 'redisTestRepo2',
        deployId: encodeURIComponent(`${username}-else-${new Date().valueOf()}`),
        whitelisted: true,
        pool: true,
        createdTimestamp: new Date()
    };

    await putPoolRequest(req);
    await putPoolRequest(req);
    await putPoolRequest(req);
    await putPoolRequest(req);
    await putPoolRequest(req2);

    const updatedPoolSize = await getPoolDeployRequestQueueSize();

    expect(updatedPoolSize).toBe(originalPoolSize + 5);

    const trialSize = await getPoolDeployCountByRepo(pool);

    expect(trialSize).toBe(originalMainRepoSize + 4);
});
