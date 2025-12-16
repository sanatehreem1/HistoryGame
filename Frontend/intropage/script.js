async function loadStory() {
    response = await fetch(`http:/localhost:3000/stories/1`);
    const title = document.querySelector(".page-title");
    const introText = document.querySelector(".intro-text");
    const riddleText = document.querySelector(".riddle-box");
    storyData = await response.json();
    
    title.textContent = storyData.story_title;

    riddleText.innerHTML = `<p> ${storyData.riddle_text} </p> <button class="next-btn">▶</button>`;

    introText.innerHTML = `<p> ${storyData.story_outline} </p>`;
}

loadStory();