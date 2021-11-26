var ISSUER = process.env.ISSUER || 'https://dev-08701260.okta.com/oauth2/default';
var CLIENT_ID = process.env.CLIENT_ID || '0oa2vtw74t7oCAP1w5d7';
var CLIENT_SECRET = process.env.CLIENT_SECRET || 'nNJLIYfs7dCcixRDRqynyWsEDNJqDkHBFqFM4dS7';
var OKTA_TESTING_DISABLEHTTPSCHECK = process.env.OKTA_TESTING_DISABLEHTTPSCHECK ? true : false;
var SPA_CLIENT_ID = process.env.SPA_CLIENT_ID || '0oa2vud0gec4oQW0b5d7';

module.exports = {
    proxyRouter: {
        'app1.localhost:3000': 'https://www.google.com',  // host only
        'harsh.localhost:3000': 'https://harshsinghvi.com',  // host only
        'mrityunjay.localhost:3000': 'https://mrityunjayproject.netlify.app/',  // host only
    },

    defaultRouterPath: 'http://www.example.org',
    webServer: {
        port: 8080,
        oidc: {
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            issuer: ISSUER,
            appBaseUrl: 'http://localhost:3000',
            scope: 'openid profile email',
            testing: {
                disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK
            }
        },
    },
    resourceServer: {
        port: 8000,
        oidc: {
          clientId: SPA_CLIENT_ID,
          issuer: ISSUER,
          testing: {
            disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK
          }
        },
        assertClaims: {
          aud: 'api://default',
          cid: SPA_CLIENT_ID
        }
      }
}
