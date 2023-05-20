const formBusca = document.getElementById("formBusca");
const list = document.getElementById("movieList");
const mostraMaisBtn = document.getElementById("mostraMaisBtn");
const chave = 'ee49f034';
const formTraducao = document.getElementById("formTraducao");
let paginaAtual = 1;

    formTraducao.addEventListener("submit", (evento) => {
      evento.preventDefault();
      const searchInput = formTraducao.elements.buscar2.value;
      const searchQuery = encodeURIComponent(searchInput + " imdb");
      const googleSearchLink = `https://www.google.com/search?q=${searchQuery}`;
      window.open(googleSearchLink, "_blank");
    });

    formBusca.onsubmit = (evento) => {
      evento.preventDefault();
      paginaAtual = 1;
      searchMovies();
    };

    function searchMovies() {
      const busca = formBusca.elements.buscar.value;

      if (busca === "") {
        alert("É necessário digitar algo");
        return;
      }

      fetch(`https://www.omdbapi.com/?s=${busca}&apikey=${chave}&page=${paginaAtual}`)
        .then(resultado => resultado.json())
        .then(json => {
          mostrarFilmes(json);

          if (json.Search && json.Search.length > 0) {
            mostraMaisBtn.style.display = "block";
          } else {
            mostraMaisBtn.style.display = "none";
          }
        });
    }

    function mostrarFilmes(json) {
      if (paginaAtual === 1) {
        list.innerHTML = "";
      }

      if (json.Response === "False") {
        const message = document.createElement("h4");
        message.textContent = "Nenhum filme encontrado";
        message.classList.add("naoAchou");
        list.appendChild(message);
      } else {
        json.Search.forEach(element => {
          let filmes = document.createElement("div");
          filmes.classList.add("filmes");

          let googleSearchLink = `https://www.google.com/search?q=${encodeURIComponent(element.Title)}`;

          filmes.innerHTML = `<a href="${googleSearchLink}" target="_blank"><img src="${element.Poster}"/></a><h3>${element.Title}</h3>`;
          list.appendChild(filmes);
        });
      }
    }

    mostraMaisBtn.addEventListener("click", () => {
      paginaAtual++;
      searchMovies();
    });