//Array que guarda os itens do ToDo
let todoItems = [];

//Função que cria um novo objeto e passa para a array.
function addTodo(text) {
  const todo = {
    text,
    id: Date.now()
  };

  todoItems.push(todo);
  renderTodo(todo);
};

//Elemento form
const form = document.querySelector('.adiciona');

//Adiciona um evento submit listener
form.addEventListener('submit', event => {
  //Previne que a página seja recarregada ao apertar o botão de submit
  event.preventDefault();

  //Pegando o texto input
  const input = document.querySelector('#atividade');

  //Pega o valor do input e retira espaços
  const text = input.value.trim(); //O trim retira os espaços do começo e final de uma string
  if (text !== '') {
    addTodo(text);
    input.value = '';
    input.focus();
  }
});

function renderTodo(todo) {
  //FAZENDO OS ITENS PERSISTIREM AO FECHAR O NAVEGADOR
  //Converte a array de itens para uma string JSON, e coloca isso dentro do storage do navegador
  localStorage.setItem('todoItemsRef', JSON.stringify(todoItems));

  const list = document.querySelector('.atividade-todo');
  const item = document.querySelector(`[data-key='${todo.id}']`);

  const node = document.createElement('div');

  node.setAttribute('class', `todo-item`);

  node.setAttribute('data-key', todo.id);


  node.innerHTML = `
  <p class="atv-text">${todo.text}</p>
  <div class="botoes">
  <button id="${todo.id}" class="done"></button>
  <button class="excluir js-delete-todo"></button>
  </div>`
  /*
  node.innerHTML = `
  <label for="${todo.id}" class="tick js-tick"></label>
  <span>${todo.text}</span>
  <button id="${todo.id}" class="done"></button>
  <button class="excluir"></button>`
  */

  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
}


//MARCANDO COMO COMPLETO
const list = document.querySelector('.atividade-todo');

list.addEventListener('click', event => {
  if (event.target.classList.contains('done')) {
    //Pega a key da div com o elemento a ser trabalho
    const itemKey = event.target.parentElement.parentElement.dataset.key;

    //Pega o elemento com um determinado itemKey
    const elemento = document.querySelectorAll(`[data-key='${itemKey}']`);

    //Faz um toggle com uma class para mudar o estilo
    elemento[0].classList.toggle('item-done');
  }
});


//EXCLUINDO ELEMENTOS
list.addEventListener('click', event => {
  if (event.target.classList.contains('excluir')) {
    //Pega a key da div com o elemento a ser trabalho
    const itemKey = event.target.parentElement.parentElement.dataset.key;

    //Pega o elemento com um determinado itemKey
    const elemento = document.querySelectorAll(`[data-key='${itemKey}']`);

    //Faz um toggle com uma class para mudar o estilo
    elemento[0].remove();
  }
});


/* function toggleDone(key) {
  const index = todoItems.findIndex(item => item.id === Number(key));
  return index;
} */

document.addEventListener('DOMContentLoaded', () => {
  const ref = localStorage.getItem('todoItemsRef');
  if (ref) {
    todoItems = JSON.parse(ref);
    todoItems.forEach(t => {
      renderTodo(t);
    });
  }
});