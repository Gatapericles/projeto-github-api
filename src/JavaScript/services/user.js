import {baseUrl} from "../variables.js"

// Importando essa variável do variables.js para utilizar o '${}' abaixo 
//                                    ⬇
async function getUser(userName) {
    const response = await fetch(`${baseUrl}/${userName}`);
    return await response.json();
  }

  export { getUser }