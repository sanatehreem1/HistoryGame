document.addEventListener("DOMContentLoaded", () => {
  const pickerButtons = document.querySelectorAll(".pickera");
  pickerButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const imgBox = button.closest(".img-box");
      const wifeName = imgBox.querySelector(".img-label").textContent.trim();
      
      await checkWifeByName(wifeName);
    });
  });
});

async function checkWifeByName(wifeName) {
  try {
    const response = await fetch(`http://localhost:3000/characters`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch character data');
    }

    const characters = await response.json();
    const character = characters.find(c => c.name === wifeName);
    
    if (!character) {
      console.error("Character not found:", wifeName);
      return;
    }
    
    if (character.correct_answer) {
      showCorrectScreen(wifeName, character.character_id);
    } else {
      showWrongScreen(wifeName);
    }
  } catch (error) {
    console.error("Error fetching character:", error);
    alert("Error connecting to server. Please try again.");
  }
}

function showCorrectScreen(wifeName, characterId) {
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
    window.location.href = `../factfile/index.html?id=${characterId}`;
  });
}

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