
async function loadStory() {
    response = await fetch(`http://localhost:3001/stories/1`);
    const title = document.querySelector(".page-title");
    const introText = document.querySelector(".intro-text");
    const riddleText = document.querySelector(".riddle-box");
    storyData = await response.json();
    
    title.textContent = storyData.story_title;

    riddleLoader(storyData.riddle_text, riddleText);

    introText.innerHTML = `<p> ${storyData.story_outline} </p>`;
}

function riddleLoader(text, textBox){
  const riddleArray = text.split('\n');
  let carouselInner = '';
  let indicatorsInner = ''
  for (i=0; i< riddleArray.length; i++){
    let newString = '';
    let newIndic = '';
    if (i== 0){
      newString = `
    <div class="carousel-item active">
    <p>${riddleArray[i]}</p>
    </div>`
      newIndic = `<li data-target="#carouselExampleIndicators" data-bs-slide-to="${i}" class="active"></li>`
    } else {
      newString = `
    <div class="carousel-item">
    <p>${riddleArray[i]}</p>
    </div>
    `
    newIndic = `<li data-target="#carouselExampleIndicators" data-bs-slide-to="${i}" ></li>`
    }
    
    carouselInner = carouselInner.concat('', newString)
    indicatorsInner = indicatorsInner.concat('',newIndic);

  }
  document.querySelector(".carousel-inner").innerHTML = carouselInner;
  document.querySelector(".carousel-indicators").innerHTML = indicatorsInner;
}


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
    window.location.href = `../factfile/index.html?wife=${index}`;
  });
});

loadStory();

document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('user');
    const school = localStorage.getItem('school');
    
    const dropdownItems = document.querySelectorAll('.dropdown-item.text-center');
    
    if (username && dropdownItems[0]) {
        dropdownItems[0].textContent = username;
    }
    
    if (school && dropdownItems[1]) {
        dropdownItems[1].textContent = school;
    }
});