const form = document.querySelector("#form");
const error = document.querySelector("#error-message");

form.addEventListener("submit", (e) => {
  // Empêcher le formulaire d'être soumis de manière traditionnelle
  e.preventDefault();
  const email = form.email.value;
  const password = form.password.value;
  //Envoi la requête POST à l'API 
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    //Convertit l'e-mail et le mot de passe en objet JSON et les inclut dans le corps de la requête.
    body: JSON.stringify({ email: email, password: password }),
  })
    //Convertit la réponse HTTP en objet JSON pour être manipulée plus facilement.
    .then((response) => response.json())
    .then((data) => {
      //Vérifie si la réponse de l'API contient un jeton d'accès.
      if (data.token) {
        //Authentification réussie, enregistrement du jeton d'accès dans le stockage local.
        localStorage.setItem("authToken", data.token);
        //Redirection de utilisateur vers la page d'accueil.
        window.location.href = "index.html";
      } else  {
        error.textContent = "Erreur dans l’identifiant ou le mot de passe";
      }
    });
});