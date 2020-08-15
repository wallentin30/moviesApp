document.getElementById("signInBtn").addEventListener("click", function(event) {

    event.preventDefault();

    const email = document.getElementById("emailLogIn");
    const pass = document.getElementById("passLogIn");
    const errorMsg = document.querySelector('.error');
    const container = document.getElementById("wrapperHide");

    if (email.value !== "" && pass.value !== "") {
        const redirecting = document.getElementById('redirect');
        redirecting.style.marginTop = "300px";
        redirecting.innerHTML = "Redirecting...  Please wait..."
        container.style.display = 'none';
        fetchApi.loginMethod(email.value, pass.value)
            .then((response) => {


                if (response.authenticated) {
                    localStorage.setItem("username", `${email.value}`);
                    localStorage.setItem("authenticated", `${response.authenticated}`);
                    localStorage.setItem("accessToken", `${response.accessToken}`);


                    setTimeout(function() {
                        window.location.href = "../pages/home.html";

                    }, 800);

                } else {
                    container.style.display = "block";
                    redirecting.style.display = "none";
                    errorMsg.appendChild(document.createTextNode(response.message));
                    errorMsg.style.display = "initial"
                }
            });



    } else {
        const errorTxt = document.createTextNode(" Please fill all fields below.");
        errorMsg.appendChild(errorTxt);
        errorMsg.style.display = "initial";
        setTimeout(() => {
            errorMsg.style.display = "none";
        }, 2000)

    }

});