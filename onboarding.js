const nextBtn = document.getElementById('nextbtn');
const firstDiv = document.querySelector('.first');
const secondDiv = document.querySelector('.second');
const genreBtn = document.querySelectorAll('button');

genreBtn.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('clicked');
    });
});

nextBtn.addEventListener('click', () => {
    firstDiv.style.display = 'none';
    secondDiv.style.display = 'block';
})