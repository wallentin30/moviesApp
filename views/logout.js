//LOGOUT Section



document.querySelector("#logoutBtn").addEventListener("click", function(event) {
    const userConfirmation = confirm('Do you really want to log out ?');
    event.preventDefault();

    if (userConfirmation) {

        if (localStorage.getItem("authenticated")) {

            localStorage.removeItem("accessToken");
            localStorage.removeItem("authenticated");
            localStorage.removeItem("username");



            location.reload(true);


        }
    }
})

function succesLogin() {

    const userInfo = document.getElementById('userInfo');
    const welcomeUser = document.getElementById('welcomeUser');
    const takeUser = localStorage.getItem("username");
    const userCut = takeUser.substring(0, takeUser.indexOf("@"))

    welcomeUser.style.color = "whitesmoke";
    welcomeUser.innerHTML = `<i class="fa fa-user-circle"></i> <span id="user">${userCut}</span> `;

    userInfo.appendChild(welcomeUser);
}

if (localStorage.getItem("authenticated")) {

    succesLogin();

    document.querySelector('.login-list-item').style.display = 'none';
    document.querySelector("#logoutBtn").style.display = "initial";
} else {
    document.querySelector('.login-list-item').style.display = 'initial';
    document.getElementById('wrapper').style.display = "none";
}

// hamburger menu

document.querySelector('#clickMenu').addEventListener('click', function(e) {
    e.preventDefault();
    const elem =  document.querySelector('#drop');
    if (elem.style.display === "none") {
        elem.style.display = "block";
      } else {
        elem.style.display = "none";
      }
    
})