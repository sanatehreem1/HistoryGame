// async function chooseWife(characterId) {
//   try {
//     const response = await fetch("http://localhost:3000/characters/char/id", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ characterId })
//     });

//     const data = await response.json();

//     if (data.correct) {
//       showCorrectScreen();
//     } else {
//       showWrongScreen();
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// function showCorrectScreen() {
//   document.getElementById("result-correct").style.display = "block";
//   document.getElementById("result-wrong").style.display = "none";
// }

// function showWrongScreen() {
//   document.getElementById("result-wrong").style.display = "block";
//   document.getElementById("result-correct").style.display = "none";
// }


// document.addEventListener("DOMContentLoaded", () => {
//   const correctWife = "Anne Boleyn";
//   const pickerButtons = document.querySelectorAll(".pickera");
//   pickerButtons.forEach((button) => {
//     button.addEventListener("click", () => {
//       const imgBox = button.closest(".img-box");
//       const wifeName = imgBox.querySelector(".img-label").textContent.trim();
//       const isCorrect = wifeName === correctWife;
//       showResult(isCorrect, wifeName);
//     });
//   });
//   function showResult(isCorrect, wifeName) {
//     const existing = document.getElementById("result-popup");
//     if (existing) existing.remove();
//     const popup = document.createElement("div");
//     popup.id = "result-popup";
//     popup.style.position = "fixed";
//     popup.style.top = "50%";
//     popup.style.left = "50%";
//     popup.style.transform = "translate(-50%, -50%)";
//     popup.style.padding = "24px";
//     popup.style.borderRadius = "12px";
//     popup.style.maxWidth = "320px";
//     popup.style.textAlign = "center";
//     popup.style.zIndex = "1000";
//     popup.style.color = "#fff";
//     popup.style.background =
//       isCorrect ? "#2D6A4F" : "#C1121F";
//     popup.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)";
//     popup.innerHTML = `
//       <h2>${isCorrect ? "Correct!" : "Wrong!"}</h2>
//       <p>
//         ${
//           isCorrect
//             ? `${wifeName} is the ghost haunting the manor :ghost:`
//             : `${wifeName} is not the ghost.`
//         }
//       </p>
//       <p style="font-size: 0.9em; opacity: 0.9;">
//         ${wifeFacts[wifeName] || ""}
//       </p>
//       <button id="close-popup" style="
//         margin-top: 12px;
//         padding: 8px 14px;
//         border: none;
//         border-radius: 8px;
//         cursor: pointer;
//         font-weight: bold;
//       ">
//         Close
//       </button>
//     `;
//     document.body.appendChild(popup);
//     document
//       .getElementById("close-popup")
//       .addEventListener("click", () => {
//         popup.remove();
//       });
//   }
// });

// Map wife names to their character IDs (adjust these IDs based on your database)
const wifeNameToId = {
  "Anne Of Cleves": 1,
  "Catherine of Aragon": 2,
  "Catherine Howard": 3,
  "Anne Boleyn": 4,
  "Catherine Parr": 5,
  "Jane Seymour": 6
};

// Add event listeners to all picker buttons
document.addEventListener("DOMContentLoaded", () => {
  const pickerButtons = document.querySelectorAll(".pickera");
  
  pickerButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const imgBox = button.closest(".img-box");
      const wifeName = imgBox.querySelector(".img-label").textContent.trim();
      const characterId = wifeNameToId[wifeName];
      
      if (characterId) {
        await checkWife(characterId, wifeName);
      } else {
        console.error("Character ID not found for:", wifeName);
      }
    });
  });
});

// Fetch from database and check if correct
async function checkWife(characterId, wifeName) {
  try {
    const response = await fetch(`http://localhost:3456/characters/char/${characterId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch character data');
    }

    const character = await response.json();
    
    // Check if this character is the correct one (haunting = true)
    if (character.haunting) {
      showCorrectScreen(wifeName);
    } else {
      showWrongScreen(wifeName);
    }
  } catch (error) {
    console.error("Error fetching character:", error);
    alert("Error connecting to server. Please try again.");
  }
}

// Show correct answer popup
function showCorrectScreen(wifeName) {
  const existing = document.getElementById("result-popup");
  if (existing) existing.remove();

  const popup = document.createElement("div");
  popup.id = "result-popup";
  popup.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 32px;
    border-radius: 12px;
    max-width: 400px;
    text-align: center;
    z-index: 1000;
    color: #fff;
    background: #2D6A4F;
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  `;

  popup.innerHTML = `
    <h2 style="margin-bottom: 16px; font-size: 2em;">🎉 Correct!</h2>
    <p style="font-size: 1.2em; margin-bottom: 12px;">
      ${wifeName} is the ghost haunting the manor!
    </p>
    <button id="next-btn" style="
      margin-top: 20px;
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
      background: #fff;
      color: #2D6A4F;
      font-size: 1em;
    ">
      Continue to Fact File
    </button>
  `;

  document.body.appendChild(popup);

  document.getElementById("next-btn").addEventListener("click", () => {
    // Get the character ID and redirect to fact file
    const characterId = wifeNameToId[wifeName];
    window.location.href = `../factfile/index.html?id=${characterId}`;
  });
}

// Show wrong answer popup
function showWrongScreen(wifeName) {
  const existing = document.getElementById("result-popup");
  if (existing) existing.remove();

  const popup = document.createElement("div");
  popup.id = "result-popup";
  popup.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 32px;
    border-radius: 12px;
    max-width: 400px;
    text-align: center;
    z-index: 1000;
    color: #fff;
    background: #C1121F;
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  `;

  popup.innerHTML = `
    <h2 style="margin-bottom: 16px; font-size: 2em;">❌ Wrong!</h2>
    <p style="font-size: 1.2em; margin-bottom: 12px;">
      ${wifeName} is not the ghost.
    </p>
    <p style="font-size: 0.9em; opacity: 0.9; margin-bottom: 20px;">
      Look carefully at the clues and try again.
    </p>
    <button id="close-popup" style="
      margin-top: 12px;
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
      background: #fff;
      color: #C1121F;
      font-size: 1em;
    ">
      Try Again
    </button>
  `;

  document.body.appendChild(popup);

  document.getElementById("close-popup").addEventListener("click", () => {
    popup.remove();
  });
}