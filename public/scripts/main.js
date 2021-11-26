const CB_URL = getQueryVariable("CB_URL");
const OKTA_DOMAIN = 'https://dev-08701260.okta.com'
const CLIENT_ID = '0oa2vtw74t7oCAP1w5d7';

// TODO CONFIG OKTA Client
const oktaSignIn = new OktaSignIn({ baseUrl: OKTA_DOMAIN });
  
// const oktaSignIn = new OktaSignIn({
//     baseUrl: OKTA_DOMAIN,
//     redirectUri: CB_URL,
//     clientId: CLIENT_ID,
//     authParams: {
//         issuer: `${OKTA_DOMAIN}/oauth2/default`
//     }
// });

const mockLogin = () => {
    setCookie('auth', 'RANDOM STRING', 1)
    console.log(getCookie('auth'))
    window.location.replace(CB_URL);
}

const oktaSigninRenderOptions = {
    el: "#widget-container",
}

const oktaAuthSuccessHandler = (res) => {
    if (res.status === "SUCCESS") {

        // oktaSignIn.authClient.token.getUserInfo(res.session.token).then(user = console.log(user))
        
        // TODO set Cookie for auth token
        setCookie('auth', res.session.token, 1)
        setCookie('authRes', JSON.stringify(res), 1)

        // TODO Rerdirect if needed
        // window.location.replace(CB_URL);

    } else {
        // The user can be in another authentication state that requires further action.
        // For more information about these states, see:
        //   https://github.com/okta/okta-signin-widget#rendereloptions-success-error
    }
}

// To manually display signin widget
const oktaLoginPopup = () => {
    oktaSignIn.renderEl(oktaSigninRenderOptions, oktaAuthSuccessHandler);
}

window.onload = (() => {
    oktaLoginPopup()


    // oktaSignIn.authClient.token.getUserInfo().then(function (user) {
    //     console.log(user)
    //     // document.getElementById("messageBox").innerHTML = "Hello, " + user.email + "! You are *still* logged in! :)";
    //     // document.getElementById("logout").style.display = 'block';
    // }, function (error) {
    //     console.log(error)
    //     oktaSignIn.showSignInToGetTokens(oktaSigninRenderOptions).then(function (tokens) {
    //         oktaSignIn.authClient.tokenManager.setTokens(tokens);
    //         oktaSignIn.remove();

    //         const idToken = tokens.idToken;
    //         console.log(idToken)
    //         setCookie('authRes', JSON.stringify(idToken))
    //         window.location.replace(CB_URL);


    //         //   document.getElementById("messageBox").innerHTML = "Hello, " + idToken.claims.email + "! You just logged in! :)";
    //         //   document.getElementById("logout").style.display = 'block';

    //     }).catch(function (err) {
    //         console.error(err);
    //     });
    // });

})

function logout() {
    oktaSignIn.authClient.signOut();
    location.reload();
}