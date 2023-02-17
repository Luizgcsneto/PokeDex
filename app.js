const getUrlPokemonId = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromisses = () => Array(150).fill().map((_,index) => 
fetch(getUrlPokemonId(index + 1)).then(response => response.json())
)

const fetchPokemon = () => {

    const pokemonPromisses = generatePokemonPromisses()

    Promise.all(pokemonPromisses)
        .then(pokemons => {
            return  pokemons.reduce((accumulator, pokemon) => {
                console.log(pokemon.types)
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)
                accumulator += `
                    <li class="card ${types[0]}">
                        <img class="card-image" alt="${pokemon.name}"  src="${pokemon.types.name}" />
                        <h2 class="card-title">${ pokemon.id }. ${ pokemon.name }</h2>
                        <p class="card-subtitle">${types.join(' | ')}</p>
                    </li>`
                return accumulator
            }, '')

        })
        .then(pokemons => {
            const ul = document.querySelector('[data-js="pokedex"]')
            ul.innerHTML = pokemons
        })
}

fetchPokemon()