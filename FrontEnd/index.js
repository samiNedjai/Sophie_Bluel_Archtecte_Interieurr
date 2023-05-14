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
     console.log(works)
    console.log(item.category)

     divGallery.appendChild(image)
   });
    works.forEach((item => console.log(item)))
  
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