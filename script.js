let userName = document.getElementById("username");
let password = document.getElementById("password");
let btn = document.querySelector(".btn");

btn.addEventListener("click", function(event) {
    event.preventDefault();

    if (userName.value === "admin" && password.value === "admin123") {
        alert("Login successful!");
        window.location.href = "./issues.html";
    } else {
        alert("Invalid username or password!");
    }
});