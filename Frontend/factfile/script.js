
console.log("factfile.js loaded");
const params = new URLSearchParams(window.location.search);
const wifeIndex = Number(params.get("wife"));

// Fetch all wives from your API
fetch("http://localhost:3001/characters/story/1")
  .then(res => res.json())
  .then(wives => {
    const wife = wives[wifeIndex];

    if (!wife) {
      document.getElementById("page-title").innerHTML = "<p>Wife not found.</p>";
      return;
    }
      // Render the wife's information

    document.getElementById('WifeImage').innerHTML = `<img src="${wife.image_url}" alt = "${wife.name}" class = "portrait">`

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
    document.getElementById('page-title').innerHTML = `${wife.name}`
  })
  .catch(err => {
    console.error(err);
    document.getElementById("wife-info").innerHTML = "<p>Error loading wife data.</p>";
  });
 
  const pickElement = document.querySelector(".return-btn").addEventListener("click", () => {
    window.location.href = "../intropage/index.html"
})
