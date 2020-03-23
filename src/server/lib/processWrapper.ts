const processWrapper = {
<<<<<<< HEAD
    PORT: process.env.PORT || 8443,
=======
    PORT: process.env.PORT ?? 8443,
>>>>>>> 5621934a52829ee61d59cfda1e9908e00218f2ac

    // devhub authentication and plugin config
    LOCAL_ONLY_KEY_PATH: process.env.LOCAL_ONLY_KEY_PATH,
    JWTKEY: process.env.JWTKEY,
    CONSUMERKEY: process.env.CONSUMERKEY,
    HUB_USERNAME: process.env.HUB_USERNAME,
    SFDX_PRERELEASE: process.env.SFDX_PRERELEASE,

    // bring your own hub credentials
    BYOO_SECRET: process.env.BYOO_SECRET,
    BYOO_CONSUMERKEY: process.env.BYOO_CONSUMERKEY,
    BYOO_CALLBACK_URI: process.env.BYOO_CALLBACK_URI,

    // template repo security features
    GITHUB_USERNAME_WHITELIST: process.env.GITHUB_USERNAME_WHITELIST,
    GITHUB_REPO_WHITELIST: process.env.GITHUB_REPO_WHITELIST,

    // org pool stuff
<<<<<<< HEAD
    maxPoolBuilders: parseInt(process.env.maxPoolBuilders) || 50,
=======
    maxPoolBuilders: process.env.maxPoolBuilders ? parseInt(process.env.maxPoolBuilders) : 50,
>>>>>>> 5621934a52829ee61d59cfda1e9908e00218f2ac
    POOLCONFIG_URL: process.env.POOLCONFIG_URL,

    // heroku integration stuff
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    REDIS_URL: process.env.REDIS_URL,

    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
<<<<<<< HEAD
    DYNO_TIME_LIMIT: parseInt(process.env.DYNO_TIME_LIMIT) || 30,

=======
    DYNO_TIME_LIMIT: process.env.DYNO_TIME_LIMIT ? parseInt(process.env.DYNO_TIME_LIMIT) : 30,

    // single-repo deployer
    SINGLE_REPO: process.env.SINGLE_REPO,
>>>>>>> 5621934a52829ee61d59cfda1e9908e00218f2ac
    // google analytics
    UA_ID: process.env.UA_ID,

    sfdcLeadCaptureServlet: process.env.sfdcLeadCaptureServlet
};

export { processWrapper };
