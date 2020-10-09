const alert_popup = async (status, msg) => {
    /**
     * Display alertion popup
     *
     * if status is true redirect to home page
     */
    const alert_block = document.querySelector(".alert");

    if (!status) {
        alert_block.innerHTML = `
            <div class="alert alert-danger" role="alert">
              ${msg}
            </div>
        `;
        return;
    }
    window.location.href = HOME_LINK;
}

const validate = content => {
    /**
     * Validate register data
     * 
     * content: dict('username', 'email', 'password') - Dictionary of login data
     * 
     * return false if not valid symbol was found in username, email or password
     * return true if username and password is valid
     */
    const regex_username = /(;|:|\*|\\|\/|\.|,|\||&|^|%|#|@|!|\(|\)|-|\+|=)/g;
    const regex_password = /(;|:|\*|\\|\/|\.|,|\||&|^|%|#|!|\(|\)|-|\+|=)/g;
    const validate_username = content["username"].match(regex_username);
    const validate_password = content["password"].match(regex_password);

    if (validate_username.length > 1 || validate_password.length > 1) {
        alert_popup(
            status=0, msg="Not correct symbols have username or password"
        )
        return false;
    }
    return true;
}


const register = async (username, email, password) => {
    /**
     * Register to system
     * 
     * username: str - Username
     * emai: str - Email
     * password: str - Password
     */
    data = {"username": username, "email": email, "password": password};
    is_valid = validate(content=data);  // Validate data

    if (!is_valid) return;

    creds = JSON.stringify(data);

    await fetch('', {  // POST /account/register
        "method": "POST",
        "body": creds,
        "headers": {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            "X-CSRFToken": CSRF
        },
        "redirect": "follow"
    })
    .then(res => res)
    .then(data => {
        if (!data.redirected) {
            alert_popup(status=0, msg="Account has not created")
        } else {
            window.location.href = data.url;
        }
    })
    .catch(err => console.error(err));
}