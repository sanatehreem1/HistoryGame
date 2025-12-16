// // 1. Get the wife index from query params
const params = new URLSearchParams(window.location.search);
return params.get('id');

// 2. Fetch all wives from your API
async function fetchCharacterByID(id) {
    try {
        const response = await fetch(`https://localhost:3000/characters/char/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }); 
        if (!response.ok) {
            throw new Error('Network response not good');
        }
        const character = await response.json();
        displayCharacterData(character);
    } catch (error) {
        console.error('Error fetching character data:', error);
        throw error;
    }
}

function displayCharacterData(character) {

    const name = document.querySelector(".character_name");
    if (name) {
        name.textContent = character.name;
    }

    const earlyLife = document.querySelector(".early_life");
    if (earlyLife) {
        earlyLife.textContent = character.early_life;
    }

    const marriage = document.querySelector(".marriage");
    if (marriage) {
        marriage.textContent = character.marriage;
    }

    const fun_fact = document.querySelector(".fun_fact");
    if (fun_fact) {
        fun_fact.textContent = character.fun_fact;
    }

    const death = document.querySelector(".death");
    if (death) {
        death.textContent = character.death;
    }

    const haunting = document.querySelector(".haunting");
    if (haunting) {
        haunting.textContent = character.haunting;
    }
}


//const wifeIndex = Number(params.get("wife")); 

// fetch("https://your-api-endpoint.com/wives")
//   .then(res => res.json())
//   .then(wives => {
//     const wife = wives[wifeIndex];

//     if (!wife) {
//       document.getElementById("wife-info").innerHTML = "<p>Wife not found.</p>";
//       return;
//     }


  // // 3. Render the wife's info
    // document.getElementById("wife-info").innerHTML = `
    //   <h1>${wife.name}</h1>
    //   <h3>Early Life</h3>
    //   <p>${wife.early_life}</p>
    //   <h3>Marriage</h3>
    //   <p>${wife.marriage}</p>
    //   <h3>Fun Fact</h3>
    //   <p>${wife.fun_fact}</p>
    //   <h3>Death</h3>
    //   <p>${wife.death}</p>
    //   <h3>Haunting Motives</h3>
    //   <p>${wife.haunting_motives}</p>
    // `;