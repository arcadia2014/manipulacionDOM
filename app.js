const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

//Agregar nuevas tareas
const input = $('#inputTitulo');
const selectTags = $('#selectTag');
const btnAgregar = $('#btnAgregar');
const lista = $('#listaTareas');

const crearCard = (datos) => {
    const card = document.createElement('li');
    card.classList.add('card');
    card.dataset.tag = datos.tag;
    card.innerHTML = `
        <div class="card__head">
          <span class="badge">${datos.tag}</span>
          <div class="actions">
            <button class="icon" type="button" data-action="fav" aria-label="Marcar favorito">☆</button>
            <button class="icon" type="button" data-action="done" aria-label="Marcar completada">✓</button>
            <button class="icon danger" type="button" data-action="del" aria-label="Eliminar">🗑</button>
          </div>
        </div>
        <p class="card__title">${datos.titulo}</p>`;
    return card;
};

btnAgregar.addEventListener('click', (e) => {
  e.preventDefault();
    const valor = input.value.trim();
  const card = crearCard({
    titulo: valor,
    tag: selectTags ? selectTags.value : ''
  });
    lista.append(card);
    input.value = "";
    input.focus();
});

