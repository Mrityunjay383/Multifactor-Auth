
const OktaJwtVerifier = require('@okta/jwt-verifier');
const config = require('./config')

const oktaJwtVerifier = new OktaJwtVerifier({
    // clientId: config.resourceServer.oidc.clientId,
    issuer: config.resourceServer.oidc.issuer,
    // assertClaims: config.resourceServer.assertClaims,
    // testing: config.resourceServer.oidc.testing
});

module.exports.verifyToken = (authToken) => {
    const audience = config.resourceServer.assertClaims.aud;
    // const audience = ['api://special', 'api://default'];
    return new Promise((resolve, reject) => {
        oktaJwtVerifier.verifyAccessToken(authToken, audience)
            .then((jwt) => {
                resolve(jwt)
            })
            .catch((err) => {
                // reject(err)
                //   res.status(401).send(err.message);
                console.log(err)
                reject(err)
            });
    })
}
