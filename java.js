const form = document.querySelector(".form");
const input = document.querySelector("input");
const searchButton = document.querySelector(".button_search");
const soundButton = document.querySelector(".button_sound");
const pokemonTag = document.querySelector(".pokemon");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  console.log(input.id);

  const url = `https://pokeapi.co/api/v2/pokemon/${input.value.toLowerCase()}`;
  try {
    const result = await (await fetch(url)).json();
    let nameContainer = document.querySelector(".pokemon_name");
    nameContainer.style.display = "unset";
    console.log(result);

    let statusContainer = document.querySelector(".status");
    statusContainer.innerHTML = "";
    if (input.value) {
      pokemonTag.style.backgroundColor = "goldenrod";
      for (const element of result.stats) {
        // pokemonTag.style.display = "unset"
        nameContainer.innerHTML = `${result.name.toUpperCase()}`;
        const img = document.querySelector(".pokemon_img");
        img.style.display = "unset";
        img.src = result.sprites.front_default;

        const statstext = document.querySelector(".pokemon_statstext");
        statstext.innerHTML = "STATS";
        statusContainer.innerHTML += `${element.stat.name}: <span>${element.base_stat}</span>`;
        const audioUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${result.id}.ogg`;
        const response = await fetch(audioUrl);
        if (response.ok) {
          soundButton.style.display = "unset";
          soundButton.onclick = () => {
            console.log("Audio ist vorhanden");
            let audio = new Audio(audioUrl);
            audio.play();
          };
        } else {
          console.log("Audio ist nicht vorhanden");
          soundButton.style.display = "none";
        }
      }
    } else {
      console.log("NEIN");
    }
  } catch (error) {
    console.error(error);
  }
});
