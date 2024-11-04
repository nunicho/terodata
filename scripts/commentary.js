let seguidoresCarruselContenedor = document.getElementById(
  "seguidoresParrafoContenedor"
);

const consultarAPI = async () => {
  let spinner = `<div class="spinner">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
    </div>`;

  seguidoresCarruselContenedor.innerHTML = spinner;

  try {
    const respuestaReviews = await fetch("../data/reviews.json");
    const reviews = await respuestaReviews.json();

    let comentarioItems = await Promise.all(
      reviews.slice(0, 3).map(async (randomReview) => {
        const respuestaUsuario = await fetch("https://randomuser.me/api/");
        const dato = await respuestaUsuario.json();

        const estrellasLlenas = "⭐".repeat(randomReview.rating);
        const estrellasVacias = "★".repeat(5 - randomReview.rating);
        const estrellas = estrellasLlenas + estrellasVacias;

        return `
        <div class="col-lg-4 col-md-4 col-sm-12 mb-4">
          <div class="comentario p-3 border rounded">
            <div class="text-center"> 
              <p>
              <span>${dato.results[0].name.first}</span>
              <span>${dato.results[0].name.last}</span>
              </p>          
           <div>
              <img id="seguidorImagen" src="${dato.results[0].picture.medium}" alt="seguidor" class="border border-1 rounded border-light" />
          </div>
          <p><strong>Comentario:</strong> ${randomReview.comment}</p>
          <h5><strong>Compañía:</strong> ${randomReview.company}</h5>
          <h5><strong>Ciudad:</strong> ${randomReview.city}</h5>
          <h5><strong>Valoración:</strong> ${estrellas}</h5>
      </div>
    </div>
  </div>`;
      })
    );

    seguidoresCarruselContenedor.innerHTML = comentarioItems.join("");
  } catch (error) {
    Swal.fire({
      title: "¿ Está bien Internet?",
      text: "No se pudo cargar la API",
      icon: "question",
    });
  }
};

consultarAPI();
