const nextBtn = document.getElementById('nextbtn');
const firstDiv = document.querySelector('.first');
const secondDiv = document.querySelector('.second');

nextBtn.addEventListener('click', () => {
    firstDiv.style.display = 'none';
    secondDiv.style.display = 'block';
})