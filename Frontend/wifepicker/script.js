async function chooseWife(characterId) {
  try {
    const response = await fetch("http://localhost:3000/characters/char/id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ characterId })
    });

    const data = await response.json();

    if (data.correct) {
      showCorrectScreen();
    } else {
      showWrongScreen();
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function showCorrectScreen() {
  document.getElementById("result-correct").style.display = "block";
  document.getElementById("result-wrong").style.display = "none";
}

function showWrongScreen() {
  document.getElementById("result-wrong").style.display = "block";
  document.getElementById("result-correct").style.display = "none";
}
