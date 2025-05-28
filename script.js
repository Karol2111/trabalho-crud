document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("password").value;

  if (email === "admin@admin.com" && senha === "admin") {
    localStorage.setItem("logado", "true");
    window.location.href = "crud.html";
  } else {
    document.getElementById("errorMsg").innerText = "Email ou senha inválidos!";
  }
});
