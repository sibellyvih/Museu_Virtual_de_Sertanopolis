const lista = document.getElementById("listaModelos");
const filtro = document.getElementById("filtroCategoria");

// 🔥 URL da sua API
const API_URL = "http://localhost:3000/modelos";

// 🔽 buscar modelos da API
async function carregarModelos(categoria = "") {
  let url = API_URL;

  if (categoria) {
    url += `?categoria=${categoria}`;
  }

  try {
    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error("Erro na API");
    }

    const modelos = await resposta.json();

    renderizar(modelos);

  } catch (erro) {
    console.error("Erro:", erro);

    lista.innerHTML = `
      <p class="text-red-500 text-center">
        Erro ao carregar modelos 😢
      </p>
    `;
  }
}

// 🔽 renderiza na tela
function renderizar(modelos) {
  lista.innerHTML = "";

  if (modelos.length === 0) {
    lista.innerHTML = `
      <p class="text-center col-span-full">
        Nenhum modelo encontrado 😕
      </p>
    `;
    return;
  }

  modelos.forEach(modelo => {
    lista.innerHTML += `
      <section class="bg-white p-4 rounded shadow text-center">
        <h2 class="text-xl mb-2">${modelo.nome}</h2>

        <model-viewer 
          src="${modelo.arquivo}" 
          alt="${modelo.nome}"
          auto-rotate 
          camera-controls
          class="w-full h-64">
        </model-viewer>

        <p class="mt-2">${modelo.descricao}</p>
      </section>
    `;
  });
}

// 🔽 filtro funcionando
filtro.addEventListener("change", (e) => {
  carregarModelos(e.target.value);
});

// 🔥 carrega ao abrir
carregarModelos();