// ********* RECUPERATION DES DONNEES API (récupéré les projets) ********* //

 const imagesListes = document.querySelector(".imagesListes");
 const divGallery = document.createElement("div");
 divGallery.classList.add("gallery");
 imagesListes.appendChild(divGallery);

 fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((works) => {
    works.forEach((item) => {
      const image = createImage(
        item.imageUrl,
        item.title,
        item.category.name
      );
    console.log(works)

      divGallery.appendChild(image)
    });
    works.forEach((item => console.log(item)))

  //La fonction  createImageWithCaption() sert à créer un élément figure contenant une image
    // et une légende 
    function createImage(src, alt) {
        const figure = document.createElement("figure");
        figure.classList.add("gallery-item");
        const image = document.createElement("img");
        image.src = src;
        image.alt = alt;
        figure.append(image,alt);

        return figure;
      }
})
        