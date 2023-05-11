import { baseUrl, eventsQuantity } from "../variables.js";

// Importando essa variável do variables.js para utilizar o '${}' abaixo 

async function getEvents(userName) {
  const response = await fetch(
    `${baseUrl}/${userName}/events?per_page=${eventsQuantity}`
  );

  return await response.json();
}

export { getEvents };
