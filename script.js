
const searchButton = document.querySelector("#search-btn");
const searchInput = document.querySelector(".searchInput");
const randomButton = document.querySelector("#random-btn");

const nameElemnt = document.querySelector(".pokemonName");
const imgElement = document.querySelector(".pokemonImg");
const typeElement = document.querySelector(".pokemonType");

searchButton.addEventListener("click",() => {
    const searchTerm = searchInput.value.toLowerCase();
    if(searchTerm){         //checking if its not empty
        fetchPokemon(searchTerm);
    }
});

searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const searchTerm = searchInput.value.toLowerCase();
        if(searchTerm) {
            fetchPokemon(searchTerm);
        }
    }
});

randomButton.addEventListener('click',() => {
    const randInt = Math.floor(Math.random()*1025)+1;
    fetchPokemon(randInt);
})



async function fetchPokemon(pokemonName) {
    try{
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;  
        const dataInJson = await fetch(apiUrl);
        if(!dataInJson.ok){
            alert("Could not find that Pokémon.");
            return;
        }
        
        const data = await dataInJson.json();
        const name = data.name;
        const pokeImage = data.sprites.other.home.front_default;
        const typeNames = data.types.map(type => type.type.name).join(", ");

        nameElemnt.textContent = name;
        imgElement.src = pokeImage;
        typeElement.textContent = "Types: " + typeNames;
    }
    catch (error) {
        console.error("An error occurred:", error);
        alert("An error occurred while fetching data.");
    }
}

window.addEventListener('DOMContentLoaded', () => {
  fetchPokemon("pikachu"); 
});
