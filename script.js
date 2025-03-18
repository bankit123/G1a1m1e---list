// Load game data from data.json
async function loadData() {
  const response = await fetch("./data.json");
  return await response.json();
}

// Load and initialize data from data.json
loadData().then((data) => {
  const games = data.games;
  displayGames(games);
});

// Function to display games
function displayGames(games) {
  const gameList = document.getElementById("gameList");

  games.forEach((game, index) => {
    const gameCard = `
            <div class="col-md-2 mb-2">
                <div class="card game-card">
                    <img src="${
                      game.assets.cover
                    }" class="card-img-top game-img" alt="${game.name.en}">
                    <div class="card-body">
                        <h5 class="card-title">#${index + 1} - ${
      game.name.en
    }</h5>
                        <p class="card-text">${game.description.en}</p>
                        <div class="mb-2">
                            ${game.tags.en
                              .map(
                                (tag) =>
                                  `<span class="badge badge-info tag-badge">${tag}</span>`
                              )
                              .join("")}
                        </div>
                        <a href="${
                          game.url
                        }" class="btn btn-primary btn-sm" target="_blank">Play Now</a>
                        <a href="${
                          game.gamePreviews.en
                        }" class="btn btn-secondary btn-sm" target="_blank">Watch Preview</a>
                        <hr>
                        <!-- Copy Buttons -->
                        <button class="btn btn-success btn-sm" onclick="copyToClipboard('${
                          game.url
                        }', 'URL copied!')">Copy URL</button>
                        <button class="btn btn-warning btn-sm" onclick="copyToClipboard('${
                          game.name.en
                        }', 'Game name copied!')">Copy Name</button>
                    </div>
                </div>
            </div>`;
    gameList.innerHTML += gameCard;
  });
}

// Function to copy text to clipboard
window.copyToClipboard = function (text, message) {
  const tempInput = document.createElement("input");
  document.body.appendChild(tempInput);
  tempInput.value = text;
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  //alert(message);
};
