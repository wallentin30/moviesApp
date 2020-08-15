// CSS FUNCTIONALITY
const signUpButton = document.getElementById("signUp");

const signInButton = document.getElementById("signIn");

signUpButton.addEventListener("click", () => {
  const container = document.getElementById("container");

  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  const container = document.getElementById("container");

  container.classList.remove("right-panel-active");
});
// ========================

//INPUT VALIDATION
const authRegister = document.getElementById("authRegister");

const $showPassword = document.querySelector(".show_password");

// console.log($showPassword);
authRegister.addEventListener("click", register);

function inputValidation(e) {
  e.preventDefault();

  const fullName = document.getElementById("fullName");

  const email = document.getElementById("Email");

  const password = document.getElementById("pass");

  const errorMessage_userName = document.querySelector(
    ".error_userName_signUp"
  );
  const errorMessage_email = document.querySelector(".error_email-signUp");

  const error_inputPassword = document.querySelector(".error_inputPassword");

  const _validUserName = "[A-Za-z]{8}";

  const _validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const _validPassword = /^[A-Za-z]\w{7,14}$/;

  const createAccount = document.querySelector(".createAccount");

  createAccount.classList.add("reduceFontSize");

  if (!fullName.value.match(_validUserName)) {
    fullName.classList.add("invalidUserName");

    errorMessage_userName.style.display = "block";
  } else if (fullName.value.match(_validUserName)) {
    fullName.classList.add("validUserName");

    errorMessage_userName.style.display = "none";
  }
  if (!email.value.match(_validEmail)) {
    email.classList.add("invalidEmail");

    errorMessage_email.style.display = "block";
  } else if (email.value.match(_validEmail)) {
    email.classList.add("validEmail");

    errorMessage_email.style.display = "none";
  }
  showValuePasswordAndClearElement();

  if (!password.value.match(_validPassword)) {
    password.classList.add("invalidPassword");

    error_inputPassword.style.display = "block";
  } else if (password.value.match(_validPassword)) {
    password.classList.add("validPassword");

    error_inputPassword.style.display = "none";
  }

  if (
    fullName.value.match(_validUserName) &&
    email.value.match(_validEmail) &&
    password.value.match(_validPassword)
  ) {
    return true;
  } else {
    return false;
  }
}

function showValuePasswordAndClearElement() {
  const _validUserName = "[A-Za-z]{8}";

  const _validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const fullName = document.getElementById("fullName").value;

  const email = document.getElementById("Email").value;

  if (fullName.match(_validUserName) && email.match(_validEmail)) {
    setTimeout(() => {
      $showPassword.style.display = "block";
    }, 500);
  }
}

$showPassword.addEventListener("click", showPassword);

function showPassword() {
  const password = document.getElementById("pass");

  // console.log(password);
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type === "password";
  }
}

const clear = document.querySelector(".clear_inputs");

clear.addEventListener("click", clearInputsValidation);

function clearInputsValidation() {
  const form = document.getElementById("my_form");

  form.reset();

  const fullName = document.getElementById("fullName");

  const email = document.getElementById("Email");

  const password = document.getElementById("pass");

  fullName.style.fontWeight = "500";
  fullName.style.opacity = "1";

  email.style.fontWeight = "500";
  email.style.opacity = "1";

  password.style.fontWeight = "500";
  password.style.opacity = "1";
}

function register(e) {
  const isValid = inputValidation(e);
  if (isValid) {
    const fullName = document.getElementById("fullName");

    const email = document.getElementById("Email");

    const password = document.getElementById("pass");

    const message = document.querySelector(".messageToUser");

    const createAccount = document.querySelector(".createAccount");

    const showPassword = document.querySelector(".show_password");

    const signIn_Form = document.querySelector(".signIn_form");

    const key = document.querySelector(".fa-key");

    const mailIcon = document.querySelector(".fa-envelope");

    const userIcon = document.querySelector(".fa-user");

    setTimeout(() => {
      fullName.style.display = "none";
      email.style.display = "none";
      password.style.display = "none";
      createAccount.style.display = "none";
      showPassword.style.display = "none";
      signIn_Form.style.display = "none";
      authRegister.style.display = "none";
      key.style.display = "none";
      mailIcon.style.display = "none";
      userIcon.style.display = "none";
    }, 500);

    setTimeout(() => {
      fetchApi
        .registerUser(fullName.value, email.value, password.value)
        .then((result) => {
          window.localStorage.setItem("accessToken", `${result.accessToken}`);
          if (result.accessToken) {
            message.classList.add("showMessage");
          }
        });
    }, 1700);
  }
}
