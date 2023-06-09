// ********* RECUPERATION DES DONNEES API (IMAGES, TITLE, CATEGORY) ********* //

const imagesListes = document.querySelector(".imagesListes");
const divGallery = document.createElement("div");
divGallery.classList.add("gallery")
imagesListes.appendChild(divGallery);

fetch("http://localhost:5678/api/works")
 .then((response) => response.json())
 .then((works) => {
   works.forEach((item) => {
     const image = createImageWithLegend(
       item.imageUrl,
       item.title,
       item.category.name
     );
    //  console.log(works)
    // console.log(item.category)

     divGallery.appendChild(image)
   });
    works.forEach((item ) => (item))
  
 //La fonction  createImageWithLegend() sert à créer un élément figure contenant une image
   // et une légende avec une classe CSS optionnelle en fonction de la valeur de legend.

   function createImageWithLegend(src, alt, legend) {
       const figure = document.createElement("figure");
       figure.classList.add("gallery-item");
       const image = document.createElement("img");
       image.src = src;
       image.alt = alt;
       figure.append(image,alt);
       
       if (legend === "Objets") 
          figure.classList.add("objects");
       else if (legend === "Appartements")
          figure.classList.add("apartments");
       else if (legend === "Hotels & restaurants")
          figure.classList.add("hotels");
       return figure;
   }

     // ********** AJOUTS ET FONCTIONS DES FILTRES IMAGES **********//
 
     const filterButtons = document.querySelectorAll(".filters button");
     filterButtons.forEach((button) => {
       button.addEventListener("click", () => {
         filterButtons.forEach((Button) =>
           Button.classList.toggle("active", Button === button)
         );
         const className = button.classList[0];
         const images = divGallery.querySelectorAll(".gallery-item");

         //Parcourt chaque image de la galerie.

         images.forEach((image) => {
           image.style.display =
             className === "all" || image.classList.contains(className)
               ? "block"
               : "none";
         });
       });
     });
     filterButtons[0].classList.add("fontButtonActive");
   });
   const filterButtons = document.querySelectorAll(".filters button");
filterButtons.forEach((button) => {
 button.addEventListener("click", () => {
   filterButtons.forEach((Button) => Button.classList.remove("fontButtonActive"));
   button.classList.add("fontButtonActive");
 });
});

//**************   EDITOR MODE **************//

const loginLink = document.querySelectorAll("header nav ul li")[2];

function displayScreen() {
  const editorMode = document.querySelector(".editorMode");
  const editorModePs = document.querySelectorAll(".editorModeP");
  const filters = document.querySelector(".filters");
  const token = localStorage.getItem("authToken");
  if (token) {
    editorMode.style.display = "flex";
    editorModePs.forEach((editorModeP) => {
      editorModeP.style.visibility = "visible";
    });
    filters.style.display = "none";
    loginLink.textContent = "logout";
    loginLink.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("authToken");
      window.location.reload();
    });
  } else {
    editorMode.style.display = "none";
    loginLink.textContent = "login";
    loginLink.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "login.html";
    });
  }
}
displayScreen();
/************ MODALE1 (aficher et suprimer  image)***************/

const galleryModal = document.getElementById("modal1");
const galleryModalContent = galleryModal.querySelector("#gallery-modal");
const closeModal = document.querySelectorAll(".close-modal");
const boutonModal = document.querySelector(".buttonModal");
const modalWrapper = document.querySelector(".modal-wrapper");
 const modalAddPhoto = document.querySelector(".modal-addPhoto");
document.querySelector("#portfolio .editorModeP").addEventListener("click", (e) => {
    e.preventDefault();
    galleryModalContent.innerHTML = "";
    fetch("http://localhost:5678/api/works/")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((image) => {
          const imgContainer = document.createElement("div");
          imgContainer.classList.add("img-container");
          // définir l'attribut 'data-id'
          imgContainer.setAttribute("data-id", image.id);
          imgContainer.innerHTML = `
            <img src="${image.imageUrl}" alt="">
            <div class="trash-icon-container">
              <i class="fa-solid fa-trash-can"></i>
            </div>
            <p>éditer</p>`;
          galleryModalContent.appendChild(imgContainer);

          /************  SUPRESSION DES IMAGES DU DOM DEPUIS L'API***************/

          // Récupère l'icône de corbeille pour chaque image
          const trashIcon = imgContainer.querySelector(".fa-trash-can");
          // Ajoute un écouteur d'événement 'click' sur l'icône de corbeille
          trashIcon.addEventListener("click", () => {
            // Récupère l'ID de l'image stocké dans l'attribut 'data-id'
            const imageId = imgContainer.getAttribute("data-id");
            // Envoie une requête DELETE à l'API pour supprimer l'image
            fetch(`http://localhost:5678/api/works/${imageId}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            })
              .then((response) => {
                console.log(response);
                if (response.ok) {
                  // Supprime l'élément imgContainer du DOM s'il est supprimé avec succès de l'API
                  imgContainer.remove();
                } else {
                  throw new Error("Erreur lors de la suppression de l'image");
                }
              })
              .catch((error) => {
                console.error(error);
              });
          });
        });
        galleryModal.style.display = "flex";
      })
      .catch((error) => console.error(error));
  });

function closeModalHandler() {
  galleryModal.style.display = "none";
  modalWrapper.style.display = "block";
  modalAddPhoto.style.display = "none";
}


galleryModal.addEventListener("click", (e) => {
  if (e.target === galleryModal) {
    closeModalHandler();
  }
});

closeModal.forEach((element) => {
  element.addEventListener("click", closeModalHandler);
});

boutonModal.addEventListener("click", (e) => {
  e.preventDefault();
  modalWrapper.style.display = "none";
  modalAddPhoto.style.display = "block";
});
//************  AJOUTER UNE IMAGE COMME TRAVAUX *****************/
const buttonAddphoto = document.querySelector(".buttonAddPhoto");
const uploadForm = document.getElementById("uploadForm");
const back = document.querySelector(".fa-arrow-left")

buttonAddphoto.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "file";
  input.name = "image";
  input.accept = "image/*"
  input.style.display = "none"
  uploadForm.appendChild(input)

  input.addEventListener("change", () => {
    const file = input.files[0];
    console.log(file);

    const modal = document.querySelector(".modal-addPhoto");
    const titltInput = modal.querySelector("#title");
    const categorySelect = modal.querySelector("#category");
    const buttonValidate = modal.querySelector(".buttonValidate");

     // Ajouter un écouteur d'événements input aux champs de formulaire
     [titltInput, categorySelect].forEach((field) => {
      field.addEventListener("input", () => {
        // Vérifier si tous les champs sont remplis
        const AllFieldsFilled =
        titltInput.value.trim() !== "" && categorySelect.value !== "default";
        // Mettre à jour le style du bouton en conséquence
        buttonValidate.style.backgroundColor = AllFieldsFilled
          ? "#1D6154"
          : "";
      });
    });
    buttonValidate.addEventListener("click", (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("image", file);
      formData.append("title", titltInput.value);
      formData.append("category", categorySelect.value);

      fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // Fermer la modale après l'ajout réussi de la nouvelle image
          closeModalHandler();
        })
        .catch((error) => console.error(error));
    });
// remplacer div ajouter un photo par l'image sélctionné 
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    const divAddPhoto = modal.querySelector(".divAddPhoto");
    divAddPhoto.appendChild(img);
    divAddPhoto.querySelector("button").style.display = "none";
    divAddPhoto.querySelector("p").style.display = "none";
  });
  input.click();
});
// pour la flesh de retour
function backModal() {
  galleryModal.style.display = "block";
  modalWrapper.style.display = "block";
  modalAddPhoto.style.display = "none";
}
 back.addEventListener("click" , backModal)

