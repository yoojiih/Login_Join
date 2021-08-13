function login() {
    const form = document.login_form;
    const chkEmail = checkValidEmail(form);
    const chkPw = checkValidPassword(form);

    if (chkEmail) {
        document.getElementById('alert_email').innerText = "";
    } else {
        document.getElementById('alert_email').style.color = '#FF0000';
    }

    if (chkPw) {
        document.getElementById('alert_password').innerText = "";
    } else {
        document.getElementById('alert_password').style.color = '#FF0000';
    }

    if (chkEmail && chkPw) {
        console.log('complete. form.submit();');
        //form.submit();
    }
}

function checkValidEmail(form) {
    if (form.email.value == "") {
        document.getElementById('alert_email').innerText = "Please enter email.";
        //form.email.focus();
        return false;
    }
    return true;
}

function checkValidPassword(form) {
    if (form.password.value == "") {
        document.getElementById('alert_password').innerText = "Please enter password.";
        //form.password.focus();
        return false;
    }
    return true;
}
