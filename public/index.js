function login() {
    const username = document.querySelector("#username");
    localStorage.setItem("username", username.value);
    window.location.href = "play.html";
  }