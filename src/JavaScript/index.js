// Import FETCH
import {getUser} from '/src/JavaScript/services/user.js'
import {getRepositories} from '/src/JavaScript/services/repositories.js'
import { getEvents } from '/src/JavaScript/services/events.js'

// Import de objeto

import {user} from '/src/JavaScript/objects/user.js'
import {screen} from '/src/JavaScript/objects/screen.js'

const button = document.getElementById("btn-search");
const input = document.getElementById("input-search");

button.addEventListener("click", () => {
  const userName = document.getElementById("input-search").value;

  if (validateEmptyInput(userName)) return; // Se o retorno na função criada no final do código for verdadeira, o 'return' vai impedir que o código continue rodando.
      getUserData(userName);
});

input.addEventListener("keyup", (event) => {
  const userName = event.target.value; 
  const key = event.which || event.keyCode;
  const isEnterKeyPressed = key === 13; // O código da tecla no JS 'Enter' é 13

  if (isEnterKeyPressed) {
    // Caso o 'isEnterKeyPressed' for igual a true (key === 13), a função getUserData é lançada assim quando clicada no botão buscar 
    if (validateEmptyInput(userName)) return;
        getUserData(userName);
  }
});

function validateEmptyInput(userName) {
  if (userName.length === 0) {
    // Verifica no campo 'Digite aqui o nome do usuário do GitHub' se o nome do usuário realmente foi escrito. 
    alert("Preencha o campo com o nome do usuário");
    return true; // O 'return' serve para que travar o código, e consequentemente, mostrar mais informações.
  }
}

async function getUserData(userName) { // 'getUserData' antes tinha o nome de 'getUserProfile', pois a refatoração era uma função para pegar os dados do usuário e mais outra função para pegar os repositórios.
     
    const userResponse = await getUser(userName); // Invés de ser (.then), na refatoração utilizamos o async e await para deixar o código mais limpo e as respostas foram guardadas em uma variável.
    
    if (userResponse.message === "Not Found") { // Verifica se o usuário foi encontrado, caso não for, vai retornar um objeto com chave message e valor "Not Found" e vai lançar a função 'renderNotFound' que está no screen.js.
      screen.renderNotFound();
      return;
    }
  
    const repositoriesResponse = await getRepositories(userName);

    const eventsResponse = await getEvents(userName)
  
    user.setInfo(userResponse);

    user.setRepositories(repositoriesResponse); // O comentária a cima vai ajudar a retornar os repositórios dos usuários. 
    user.setEvents(eventsResponse)

    screen.renderUser(user); // Função que vai forçar a aparecer todas as informações dos usuários na tela.
  }