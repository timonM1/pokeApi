
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const getRandomChance = (percentage) => {
    return Math.random() < (percentage / 100);
}

const fetchData = async (id) => {
    try {
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await resp.json()

        console.log(data)

        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            shinyImg: data.sprites.front_shiny,
            name: data.name,
            id: data.id,
            types: data.types,
            abilities: data.abilities
            
        }

        showCard(pokemon)
        
    } catch (error) {
        console.log(error)
        
    }
}


const showCard = (pokemon) => {
    
    const container = document.querySelector('.container'); 
    const template = document.getElementById('template-card').content;

    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();

    const imgElement = clone.querySelector('.card-body-img');
    const cardElement = clone.querySelector('.card');
    
    cardElement.style.display = 'none';

    imgElement.onload = () => {
        cardElement.style.display = 'block';
    }

    const showShiny = getRandomChance(20);
    imgElement.setAttribute('src', showShiny ? pokemon.shinyImg : pokemon.img);
    clone.querySelector('.card-body-title').innerHTML = ` ${pokemon.name} <span>#${pokemon.id}</span>`
    
    const typesContainer = clone.querySelector('.card-footer-description-types');
    typesContainer.innerHTML = ''; 

    const typeColors = {
        normal: '#80808080',   
        fighting: '#FFA50080', 
        flying: '#87CEEB80',   
        poison: '#80008080',   
        ground: '#A0522D80',   
        rock: '#80808080',     
        bug: '#00800080',      
        ghost: '#00008B80',    
        steel: '#C0C0C080',    
        fire: '#FF000080',     
        water: '#0000FF80',    
        grass: '#00800080',    
        electric: '#e3e324', 
        psychic: '#FFC0CB80', 
        ice: '#E0FFFF80',      
        dragon: '#80008080',   
        dark: '#00000080',     
        fairy: '#FFB6C180'    
    };
    

    pokemon.types.forEach(type => {
        const li = document.createElement('li');
        let nameType = type.type.name;

        li.textContent = nameType;

        li.style.backgroundColor = typeColors[nameType] || 'gray';

        typesContainer.appendChild(li); 
    });

    const abilitiesContainer = clone.querySelector('.card-footer-description-abilities');
    abilitiesContainer.innerHTML = '';

    pokemon.abilities.forEach(ability => {
        const li = document.createElement('li');
        li.textContent = ability.ability.name
        abilitiesContainer.appendChild(li)
    });
    console.log(clone.querySelectorAll('.card-footer-description p'));


    clone.querySelectorAll('.card-footer-description p')[0].textContent = showShiny ? "Yes" : "No"
    
    fragment.appendChild(clone);
    container.appendChild(fragment);
}

const generatePokemon = () => {
    const random = getRandomInt(1, 200); 
    fetchData(random);
}

document.addEventListener('DOMContentLoaded', () => {
    generatePokemon();
    const generateBtn = document.getElementById('generate-btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            location.reload();
        });
    } else {
        console.error('Generate button not found');
    }
});

