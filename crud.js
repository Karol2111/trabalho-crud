if (localStorage.getItem("logado") !== "true") {
  window.location.href = "index.html";
}

const form = document.getElementById("livroForm");
const lista = document.getElementById("listaLivros");

let livros = JSON.parse(localStorage.getItem("livros")) || [];

function salvarLocalStorage() {
  localStorage.setItem("livros", JSON.stringify(livros));
}

function renderizarLista() {
  lista.innerHTML = "";
  livros.forEach((livro, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <strong>${livro.nome}</strong> - ${livro.codigo}
        <button onclick="editarLivro(${index})">Editar</button>
        <button onclick="excluirLivro(${index})">Excluir</button>
      `;
    lista.appendChild(li);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nomeLivro").value;
  const codigo = document.getElementById("codigoLivro").value;

  if (form.dataset.editando) {
    const index = parseInt(form.dataset.editando);
    livros[index] = { nome, codigo };
    delete form.dataset.editando;
    form.querySelector("button").textContent = "Salvar";
  } else {
    livros.push({ nome, codigo });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  salvarLocalStorage();
  renderizarLista();
  form.reset();
});

function editarLivro(index) {
  const livro = livros[index];
  document.getElementById("editNome").value = livro.nome;
  document.getElementById("editCodigo").value = livro.codigo;

  const dialog = document.getElementById("editDialog");
  dialog.dataset.index = index;
  dialog.showModal();
}

function fecharDialog() {
  document.getElementById("editDialog").close();
}
document.getElementById("editForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const index = document.getElementById("editDialog").dataset.index;
  const nome = document.getElementById("editNome").value;
  const codigo = document.getElementById("editCodigo").value;

  livros[index] = { nome, codigo };
  salvarLocalStorage();
  renderizarLista();
  fecharDialog();
});

function excluirLivro(index) {
  if (confirm("Deseja realmente excluir este livro?")) {
    livros.splice(index, 1);
    salvarLocalStorage();
    renderizarLista();
  }
}

renderizarLista();
function logout() {
  localStorage.removeItem("logado");
  window.location.href = "index.html";
}
