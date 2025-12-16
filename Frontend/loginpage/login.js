document.querySelector('.loginform').addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: form.get("userName"),
            password: form.get("password"),
            school: form.get("school")
        })
    }

    console.log('ready to search for user');
    const response = await fetch(`http://localhost:3000/users/login`, options);
    const data = await response.json();

    if (response.status == 200) {
        localStorage.setItem("token", data.token);
        window.location.assign("../homepage/index.html");
      } else {
        alert(data.error);
      }
})