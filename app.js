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
  card.dataset.fav = '0';
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

// Función de eliminar tareas
lista.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action="del"]');
  if (!btn) return;
  const card = btn.closest('.card');
  if (card) card.remove();
});

//Función de tarea completada
lista.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action="done"]');
  if (!btn) return;
  const card = btn.closest('.card');
  if (!card) return;

  const done = card.classList.toggle('is-done');
  if (done) {
    btn.classList.add('is-active-done');
    btn.textContent = '✔';
  } else {
    btn.classList.remove('is-active-done');
    btn.textContent = '✓';
  }
});

// Marcar tarea como favorita
lista.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action="fav"]');
  if (!btn) return;
  const card = btn.closest('.card');
  if (!card) return;

  const favorita = card.classList.toggle('is-fav');
  btn.textContent = favorita   ? '★' : '☆';
});

// función de filtrar tareas por etiqueta
const chips = $$('.chip');
chips.forEach(chip => {
  chip.addEventListener('click', (e) => {
    const filter = chip.dataset.filter;
    chips.forEach(c => c.classList.toggle('is-active', c === chip));

    const cards = $$('.card', lista);
    cards.forEach(card => {
      if (filter === 'all') {
        card.classList.remove('is-hidden');
        return;
      }

      if (filter === 'fav') {
        card.classList.toggle('is-hidden', card.dataset.fav !== '1');
        return;
      }

      card.classList.toggle('is-hidden', card.dataset.tag !== filter);
    });
  });
});

// filtro de búsqueda por texto
const InputBuscar = $('#inputBuscar');
InputBuscar.addEventListener('input', (e) => {
  const valor = e.target.value.toLowerCase();
  const cards = $$('.card', lista);
  const activeChip = document.querySelector('.chip.is-active');
  const activeFilter = activeChip ? activeChip.dataset.filter : 'all';

  cards.forEach(card => {
    const titulo = card.querySelector('.card__title').textContent.toLowerCase();
    let matchFilter = true;
    if (activeFilter === 'fav') {
      matchFilter = card.dataset.fav === '1';
    } else if (activeFilter !== 'all') {
      matchFilter = card.dataset.tag === activeFilter;
    }

    const matchSearch = titulo.includes(valor);

    card.classList.toggle('is-hidden', !(matchFilter && matchSearch));
  });
});
