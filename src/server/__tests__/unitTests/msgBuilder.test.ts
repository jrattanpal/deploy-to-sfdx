import { deployMsgBuilder } from '../../lib/deployMsgBuilder';

describe('urlTestsMaster', () => {
    test('handles master repos', () => {
        const req = {
            query: {
                template: 'https://github.com/mshanemc/cg4Integrate'
            }
        };

<<<<<<< HEAD
        expect(deployMsgBuilder(req).repo).toBe('cg4Integrate');
        expect(deployMsgBuilder(req).username).toBe('mshanemc');
        expect(deployMsgBuilder(req).branch).toBeUndefined();

        const message = deployMsgBuilder(req);
        expect(message.deployId).toBeTruthy();
        // username-repo-timestamp
        expect(message.deployId.split('-').length).toBe(3);
        expect(message.deployId.split('-')[0]).toBe(message.username);
        expect(message.deployId.split('-')[1]).toBe(message.repo);
=======
        const message = deployMsgBuilder(req);
        expect(message.repos[0].repo).toBe('cg4integrate');
        expect(message.repos[0].username).toBe('mshanemc');
        expect(message.repos[0].branch).toBeUndefined();

        // multi
        expect(message.repos).toHaveLength(1);
        expect(message.repos[0].repo).toBe('cg4integrate');
        expect(message.repos[0].username).toBe('mshanemc');
        expect(message.repos[0].branch).toBeUndefined();

        expect(message.deployId).toBeTruthy();
        // username-repo-timestamp
        expect(message.deployId.split('-').length).toBe(3);
        expect(message.deployId.split('-')[0]).toBe(message.repos[0].username);
        expect(message.deployId.split('-')[1]).toBe(message.repos[0].repo);
>>>>>>> 5621934a52829ee61d59cfda1e9908e00218f2ac
    });
});

describe('urlTestsBranch', () => {
    test('handles branch repos', () => {
        const req = {
            query: {
                template: 'https://github.com/mshanemc/cg4Integrate/tree/passwordSet'
            }
        };

<<<<<<< HEAD
        expect(deployMsgBuilder(req).username).toBe('mshanemc');
        expect(deployMsgBuilder(req).repo).toBe('cg4Integrate');
        expect(deployMsgBuilder(req).branch).toBe('passwordSet');
        expect(deployMsgBuilder(req).firstname).toBeUndefined();
        expect(deployMsgBuilder(req).lastname).toBeUndefined();
        expect(deployMsgBuilder(req).email).toBeUndefined();

        const message = deployMsgBuilder(req);
        expect(message.deployId).toBeTruthy();
        // username-repo-timestamp
        expect(message.deployId.split('-').length).toBe(3);
        expect(message.deployId.split('-')[0]).toBe(message.username);
        expect(message.deployId.split('-')[1]).toBe(message.repo);
=======
        const message = deployMsgBuilder(req);
        expect(message.firstname).toBeUndefined();
        expect(message.lastname).toBeUndefined();
        expect(message.email).toBeUndefined();

        // multi
        expect(message.repos).toHaveLength(1);

        expect(message.repos[0].username).toBe('mshanemc');
        expect(message.repos[0].repo).toBe('cg4integrate');
        expect(message.repos[0].branch).toBe('passwordset');

        expect(message.deployId).toBeTruthy();
        // username-repo-timestamp
        expect(message.deployId.split('-').length).toBe(3);
        expect(message.deployId.split('-')[0]).toBe(message.repos[0].username);
        expect(message.deployId.split('-')[1]).toBe(message.repos[0].repo);
>>>>>>> 5621934a52829ee61d59cfda1e9908e00218f2ac
    });

    test('prevents bad urls', () => {
        const req = {
            query: {
                template: 'https://github.com/mshanemc/df17IntegrationWorkshops/tree/master; wget http://'
            }
        };

        expect(() => deployMsgBuilder(req)).toThrow();
    });
});

describe('userinfo', () => {
    test('handles email, firstname, lastname', () => {
        const req = {
            query: {
                template: 'https://github.com/mshanemc/cg4Integrate/tree/passwordSet',
                firstname: 'shane',
                lastname: 'mclaughlin',
                email: 'shane.mclaughlin@salesforce.com'
            }
        };

<<<<<<< HEAD
        expect(deployMsgBuilder(req).username).toBe('mshanemc');
        expect(deployMsgBuilder(req).repo).toBe('cg4Integrate');
        expect(deployMsgBuilder(req).branch).toBe('passwordSet');
        expect(deployMsgBuilder(req).firstname).toBe('shane');
        expect(deployMsgBuilder(req).lastname).toBe('mclaughlin');
        expect(deployMsgBuilder(req).email).toBe('shane.mclaughlin@salesforce.com');

        const message = deployMsgBuilder(req);
        expect(message.deployId).toBeTruthy();
        // username-repo-timestamp
        expect(message.deployId.split('-').length).toBe(3);
        expect(message.deployId.split('-')[0]).toBe(message.username);
        expect(message.deployId.split('-')[1]).toBe(message.repo);
=======
        const message = deployMsgBuilder(req);

        expect(message.repos[0].username).toBe('mshanemc');
        expect(message.repos[0].repo).toBe('cg4integrate');
        expect(message.repos[0].branch).toBe('passwordset');
        expect(message.firstname).toBe('shane');
        expect(message.lastname).toBe('mclaughlin');
        expect(message.email).toBe('shane.mclaughlin@salesforce.com');

        expect(message.deployId).toBeTruthy();
        // username-repo-timestamp
        expect(message.deployId.split('-').length).toBe(3);
        expect(message.deployId.split('-')[0]).toBe(message.repos[0].username);
        expect(message.deployId.split('-')[1]).toBe(message.repos[0].repo);
    });
});

describe('multi-template', () => {
    test('handles array of template', () => {
        const req = {
            query: {
                template: ['https://github.com/mshanemc/cg4Integrate', 'https://github.com/mshanemc/df17IntegrationWorkshops']
            }
        };

        const message = deployMsgBuilder(req);

        // multi
        expect(message.repos).toHaveLength(2);
        expect(message.repos[0].repo).toBe('cg4integrate');
        expect(message.repos[0].username).toBe('mshanemc');
        expect(message.repos[0].branch).toBeUndefined();

        expect(message.repos[1].repo).toBe('df17integrationworkshops');
        expect(message.repos[1].username).toBe('mshanemc');
        expect(message.repos[1].branch).toBeUndefined();

        expect(message.deployId).toBeTruthy();
        // username-repo-timestamp
        expect(message.deployId.split('-').length).toBe(3);
        expect(message.deployId.split('-')[0]).toBe(message.repos[0].username);
        expect(message.deployId.split('-')[1]).toBe(message.repos[0].repo);
    });

    test('handles branch in array of template', () => {
        const req = {
            query: {
                template: ['https://github.com/mshanemc/cg4Integrate/tree/passwordSet', 'https://github.com/mshanemc/df17IntegrationWorkshops']
            }
        };

        const message = deployMsgBuilder(req);

        // multi
        expect(message.repos).toHaveLength(2);
        expect(message.repos[0].repo).toBe('cg4integrate');
        expect(message.repos[0].username).toBe('mshanemc');
        expect(message.repos[0].branch).toBe('passwordset');

        expect(message.repos[1].repo).toBe('df17integrationworkshops');
        expect(message.repos[1].username).toBe('mshanemc');
        expect(message.repos[1].branch).toBeUndefined();

        expect(message.deployId).toBeTruthy();
        // username-repo-timestamp
        expect(message.deployId.split('-').length).toBe(3);
        expect(message.deployId.split('-')[0]).toBe(message.repos[0].username);
        expect(message.deployId.split('-')[1]).toBe(message.repos[0].repo);
>>>>>>> 5621934a52829ee61d59cfda1e9908e00218f2ac
    });
});
