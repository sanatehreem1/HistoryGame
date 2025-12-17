
document.querySelector('.logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.assign('./../loginpage/index.html')
})
