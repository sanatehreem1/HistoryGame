const returnButton = document.querySelector(".return-btn").addEventListener("click", () => {
    window.location.href = "../homepage/index.html"
})

const guessButton = document.querySelector(".guess-btn").addEventListener("click", () => {
    window.location.href = "../wifepicker/index.html"
})


const wifeButtons = document.querySelectorAll(".wife-btn");

wifeButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    // Redirect to factfile page with index as query param
    window.location.href = `factfile/index.html?wife=${index}`;
  });
});

async function loadStory() {
    storyData = await fetch(`http:/localhost:3000/stories/1`);
    const title = document.querySelector(".page-title");
    const introText = document.querySelector(".intro-text");
    const riddleText = document.querySelector(".riddle-box");
}

loadStory();