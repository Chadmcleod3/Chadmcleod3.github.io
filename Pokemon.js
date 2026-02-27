// Store current pokemon data
let currentPokemon = null;

// Function to find and display pokemon
function findPokemon() {
    let input = document.getElementById("pokemonInput").value.toLowerCase().trim();
    
    if (input === "") {
        alert("Please enter a pokemon name or ID");
        return;
    }

    console.log("Searching for:", input);

    // Check if data is cached in localStorage
    let cachedData = localStorage.getItem("pokemon_" + input);
    
    if (cachedData) {
        // Use cached data
        console.log("Using cached data for:", input);
        let pokemonData = JSON.parse(cachedData);
        displayPokemon(pokemonData);
    } else {
        // Fetch from API
        console.log("Fetching from API:", input);
        let fetchURL = "https://pokeapi.co/api/v2/pokemon/" + input;
        
        fetch(fetchURL)
            .then(response => {
                console.log("Response received:", response);
                if (!response.ok) {
                    throw new Error("Pokemon not found");
                }
                return response.json();
            })
            .then(data => {
                console.log("Data received:", data);
                // Cache the data in localStorage
                localStorage.setItem("pokemon_" + input, JSON.stringify(data));
                displayPokemon(data);
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Pokemon not found! Please try a different name or ID (1-151)");
            });
    }
}

// Function to display pokemon data
function displayPokemon(data) {
    console.log("Displaying pokemon:", data);
    currentPokemon = data;
    
    // Show the display section
    document.getElementById("pokemonDisplay").style.display = "block";
    
    // Display image
    let imageURL = data.sprites.front_default;
    document.getElementById("pokemonImage").src = imageURL;
    document.getElementById("pokemonImage").alt = data.name;
    
    // Display sound - check if cries exist
    if (data.cries && (data.cries.latest || data.cries.legacy)) {
        let soundURL = data.cries.latest || data.cries.legacy;
        document.getElementById("audioSource").src = soundURL;
        document.getElementById("pokemonSound").load();
    } else {
        // Hide audio if no cry available
        console.log("No cries available for this pokemon");
        document.getElementById("pokemonSound").style.display = "none";
    }
    
    // Load moves into dropdowns
    loadMoves(data.moves);
}

// Function to load moves into dropdown menus
function loadMoves(moves) {
    // Clear existing options
    let move1 = document.getElementById("move1");
    let move2 = document.getElementById("move2");
    let move3 = document.getElementById("move3");
    let move4 = document.getElementById("move4");
    
    move1.innerHTML = '<option value="">Select Move 1</option>';
    move2.innerHTML = '<option value="">Select Move 2</option>';
    move3.innerHTML = '<option value="">Select Move 3</option>';
    move4.innerHTML = '<option value="">Select Move 4</option>';
    
    // Add all moves to each dropdown
    for (let i = 0; i < moves.length; i++) {
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

// Function to add pokemon to team
function addToTeam() {
    if (!currentPokemon) {
        alert("Please find a pokemon first!");
        return;
    }
    
    // Get selected moves
    let move1 = document.getElementById("move1").value;
    let move2 = document.getElementById("move2").value;
    let move3 = document.getElementById("move3").value;
    let move4 = document.getElementById("move4").value;
    
    // Create team member object
    let teamMember = {
        name: currentPokemon.name,
        image: currentPokemon.sprites.front_default,
        moves: [move1, move2, move3, move4]
    };
    
    // Display team member
    displayTeamMember(teamMember);
}

// Function to display a team member
function displayTeamMember(member) {
    let teamList = document.getElementById("teamList");
    
    // Create team member div
    let memberDiv = document.createElement("div");
    memberDiv.classList.add("team-member");
    
    // Create image
    let img = document.createElement("img");
    img.src = member.image;
    img.alt = member.name;
    
    // Create info section
    let infoDiv = document.createElement("div");
    infoDiv.classList.add("team-member-info");
    
    let name = document.createElement("h3");
    name.textContent = member.name;
    
    let movesList = document.createElement("ul");
    for (let i = 0; i < member.moves.length; i++) {
        if (member.moves[i] !== "") {
            let moveLi = document.createElement("li");
            moveLi.textContent = member.moves[i];
            movesList.appendChild(moveLi);
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
