const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(user) {
    this.userProfile.innerHTML = `<div class="info">
                                        <img src="${
                                          user.avatarUrl
                                        }" alt="Foto do perfil do usuário"/>
                                    <div class="data">
                                        <h1>${
                                          user.name ??
                                          "Não possui nome cadastrado 😪"
                                        }</h1>
                                        <p>${
                                          user.bio ??
                                          "Não possui bio cadastrado 😥"
                                        }</p>

                                        <br>

                                    <p><span class="follow">Seguidores: </span> ${
                                      user.followers ??
                                      "Este usuário não possui seguidores. 😭"
                                    }</p>

                                    <p><span class="follow">Seguindo: </span>${
                                      user.following ??
                                      "Este usuário não está seguindo ninguém. 😭"
                                    }</p>

                                    </div>
                                </div>`;

    if (user.repositories.length > 0) {
      let repositoriesItens = "";
      user.repositories.forEach(
        (repo) =>
          (repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">
            ${repo.name}</a>
                        <ul>
                            <li class="repo-info">🍴 Forks: ${repo.forks}</li>
                        
                        
                            <li class="repo-info">⭐ Stars: ${
                              repo.stargazers_count
                            } </li>
                        
                        
                            <li class="repo-info">👀 Watchers: ${
                              repo.watchers
                            }</li>
                        
                        
                            <li class="repo-info">👨‍💻 Language: ${
                              repo.language ?? "Não definida"
                            }</li>
                        </ul>
            
                        </li>`)
      );
      this.userProfile.innerHTML += ` <div class="repositories section">
                                              <h2>Repositórios</h2>
                                              <ul>${repositoriesItens}</ul>
                                            </div>`;
    }

    let eventsItens = ""; // Array a ser populado com eventos

    let filteredEvents = user.events.filter((event) => {
      return event.type === "CreateEvent" || event.type === "PushEvent";
    });

    filteredEvents.forEach((event) => {
      if (event.payload.commits) {
        eventsItens += `<li class="event">${event.repo.name} <span class="bold-event">${event.payload.commits[0].message}<span></li>`;
        console.log(event);
      }
    });

    if (user.events.length > 0) {
      this.userProfile.innerHTML += `<div>
                                        <h2>Eventos</h2>
                                        <br>
                                        <ul>${eventsItens}</ul>
                                      </div>`;
    }
  },
  renderNotFound() {
    this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
  },
};

export { screen };
