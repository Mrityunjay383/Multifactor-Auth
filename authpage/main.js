const CB_URL = getQueryVariable("CB_URL");

const mockLogin = () => {
    setCookie('auth', 'RANDOM STRING', 1)
    console.log(getCookie('auth'))
    window.location.replace(CB_URL);
}

const main = () => {
    // TODO CONFIG OKTA Client
    const signIn = new OktaSignIn({ baseUrl: CB_URL });

    window.onload = (() => {
        signIn.renderEl(
            {
                el: "#widget-container",
            },
            function success(res) {
                if (res.status === "SUCCESS") {
                    console.log(
                        "Do something with this sessionToken",
                        res.session.token
                    );

                    // TODO set Cookie for auth token
                    setCookie('auth', res.session.token, 1)
                    
                    // TODO Rerdirect if needed
                    // window.location.replace(CB_URL);

                } else {
                    // The user can be in another authentication state that requires further action.
                    // For more information about these states, see:
                    //   https://github.com/okta/okta-signin-widget#rendereloptions-success-error
                }
            }
        );
    })
}

main();
