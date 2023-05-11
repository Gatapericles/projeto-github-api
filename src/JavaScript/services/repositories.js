import {baseUrl, repositoriesQuantity} from "../variables.js"

// Importando essa variável do variables.js para utilizar o '${}' abaixo 

async function getRepositories(userName) {
    const response = await fetch(`${baseUrl}/${userName}/repos?per_page=${repositoriesQuantity}`);
    
    return await response.json();
  }

export{ getRepositories } 