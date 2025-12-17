// // // 1. Get the wife index from query params
// const params = new URLSearchParams(window.location.search);
// return params.get('id');

// 2. Fetch all wives from your API
// async function fetchCharacterByID(id) {
//     try {
//         const response = await fetch(`https://localhost:3000/characters/char/${id}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }); 
//         if (!response.ok) {
//             throw new Error('Network response not good');
//         }
//         const character = await response.json();
//         displayCharacterData(character);
//     } catch (error) {
//         console.error('Error fetching character data:', error);
//         throw error;
//     }
// }

// function displayCharacterData(character) {

//     const name = document.querySelector(".character_name");
//     if (name) {
//         name.textContent = character.name;
//     }

//     const earlyLife = document.querySelector(".early_life");
//     if (earlyLife) {
//         earlyLife.textContent = character.early_life;
//     }

//     const marriage = document.querySelector(".marriage");
//     if (marriage) {
//         marriage.textContent = character.marriage;
//     }

//     const fun_fact = document.querySelector(".fun_fact");
//     if (fun_fact) {
//         fun_fact.textContent = character.fun_fact;
//     }

//     const death = document.querySelector(".death");
//     if (death) {
//         death.textContent = character.death;
//     }

//     const haunting = document.querySelector(".haunting");
//     if (haunting) {
//         haunting.textContent = character.haunting;
//     }
// }

console.log("factfile.js loaded");
const params = new URLSearchParams(window.location.search);
const wifeIndex = Number(params.get("wife"));

// Fetch all wives from your API
fetch("http://localhost:3001/characters/story/1")
  .then(res => res.json())
  .then(wives => {
    const wife = wives[wifeIndex];

    if (!wife) {
      document.getElementById("wife-info").innerHTML = "<p>Wife not found.</p>";
      return;
    }

    // Render the wife's information
    document.getElementById("EarlyLife").innerHTML = `
      
      
      <p>${wife.early_life}</p>
      
    `
     document.getElementById("FunFact").innerHTML = `
      
      
      <p>${wife.fun_fact}</p>
      
    `
     document.getElementById("Death").innerHTML = `
      
      
      <p>${wife.death}</p>
      
    ` 
    document.getElementById("Marriage").innerHTML = `
      
 
      <p>${wife.marriage}</p>
      
    ` 
    document.getElementById("Haunting").innerHTML = `
      
      
      <p>${wife.haunting_motives}</p>
      
    ` 
  })
  .catch(err => {
    console.error(err);
    document.getElementById("wife-info").innerHTML = "<p>Error loading wife data.</p>";
  });
 