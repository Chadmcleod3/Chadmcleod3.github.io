// Store current pokemon data
let currentPokemon = null;

// Function to find and display pokemon
function findPokemon() {
    let input = document.getElementById("pokemonInput").value.toLowerCase().trim();
    
    if (input === "") {
        alert("Please enter a pokemon name or ID");
        return;
    }

    // Check if data is cached in localStorage
    let cachedData = localStorage.getItem("pokemon_" + input);
    
    if (cachedData) {
        // Use cached data
        let pokemonData = JSON.parse(cachedData);
        displayPokemon(pokemonData);
    } else {
        // Fetch from API
        let fetchURL = "https://pokeapi.co/api/v2/pokemon/" + input;
        
        fetch(fetchURL)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Pokemon not found");
                }
                return response.json();
            })
            .then(data => {
                // Cache the data in localStorage
                localStorage.setItem("pokemon_" + input, JSON.stringify(data));
                displayPokemon(data);
            })
            .catch(error => {
                alert("Pokemon not found! Please try a different name or ID (1-151)");
                console.error(error);
            });
    }
}

function displayPokemon(data){
    currentPokemon = data;

    document.getElementById("pokemonDisplay").style.display = "block";

    let imageURL = data.sprites.front_default;
    document.getElementById("pokemonImage").src = imageURL;
    document.getElementById("pokemonImage").alt = data.name;

    let soundURL = data.cries.latest || data.cries.legacy;
    document.getElementById("audioSource").src = soundURL;
    document.getElementById("audioSource").load();

    loadMoves(data.moves);
}

function loadMoves(moves){
let move1 = document.getElementById("move1");
let move2 = document.getElementById("move2");
let move3 = document.getElementById("move3");
let move4 = document.getElementById("move4");

move1.innerHTML = '<option value="">Select Move 1</option>';
move2.innerHTML = '<option value="">Select Move 2</option>';
move3.innerHTML = '<option value="">Select Move 3</option>';
move4.innerHTML = '<option value="">Select Move 4</option>';

for (let i = 0; i < moves.length; i++){
    let moveName = moves[i].move.name;

    let option1 = document.createElement("option");
    option1.value = moveName;
    option1.textContent = moveName;
    move1.appendChild(option1);

    let option2 = document.createElement("option");
    option2.value = moveName;
    option2.textContent = moveName;
    move2.appendChild(option2);

    let option3 = document.createElement("option");
    option3.value = moveName;
    option3.textContent = moveName;
    move3.appendChild(option3);

    let option4 = document.createElement("option");
    option4.value = moveName;
    option4.textContent = moveName;
    move4.appendChild(option4);
    }
}

function addToTeam(){
    if(!currentPokemon){
        alert("Please find a pokemon first!");
        return;
    }

  // Get selected moves
    let move1 = document.getElementById("move1").value;
    let move2 = document.getElementById("move2").value;
    let move3 = document.getElementById("move3").value;
    let move4 = document.getElementById("move4").value;

    let teamMember = {
        name: currentPokemon.name, image: currentPokemon.sprites.front_default,
        moves: [move1, move2, move3, move4]
    };

    displayTeamMember(teamMember);
}

function displayTeamMember(member){
    let teamList = document.getElementById("teamList");

    let memberDiv = document.createElement("div");
    memberDiv.classList.add("team-member");

    let img = document.createElement("img");
    img.src = member.image;
    img.alt = member.name;

    let infoDiv = document.createElement("div");
    infoDiv.classList.add("team-member-info");

    let name = document.createElement("h3");
    name.textContent = member.name;

    let movesList = document.createElement("ul");
    for (let i = 0; i < member.moves.lenth; i++){
        if (member.moves[i] !==""){
            let moveLi = document.createElement("li");
            moveLi.textContent = member.moves[i];
            movesList.appendChild(movesLi);
        }
    }

    infoDiv.appendChild(name);
    infoDiv.appendChild(movesList);

    memberDiv.appendChild(img);
    memberDiv.appendChild(infoDiv);

    teamList.appendChild(memberDiv);
}

// Allow Enter key to trigger search
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("pokemonInput").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            findPokemon();
        }
    });
});
