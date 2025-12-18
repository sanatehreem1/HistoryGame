const pickElement = document.querySelector('.pickera').addEventListener("click", () => {
    window.location.href = "../intropage/index.html"
})

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