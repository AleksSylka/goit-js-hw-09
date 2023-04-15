const btnStartEl = document.querySelector('button[data-start]');
const btnStopEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
let colorChange;

btnStopEl.disabled = true;

btnStartEl.addEventListener('click', (evt) => {
    evt.target.disabled = true;
    btnStopEl.disabled = false;
    colorChange = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);
});

btnStopEl.addEventListener('click', () => {
    btnStartEl.disabled = false;
    btnStopEl.disabled = true;
    clearInterval(colorChange);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};