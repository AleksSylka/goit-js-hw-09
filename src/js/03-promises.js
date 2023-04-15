import Notiflix from 'notiflix';

const inputDelayEl = document.querySelector('input[name="delay"]');
const inputStepEl = document.querySelector('input[name="step"]');
const inputAmountEl = document.querySelector('input[name="amount"]');
const formEl = document.querySelector('form');
let delay;
let step;
let amount;

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  delay = inputDelayEl.valueAsNumber;
  step = inputStepEl.valueAsNumber;
  amount = inputAmountEl.valueAsNumber;
  let position = 0

  while (amount > 0) {
    position += 1;
    amount -= 1;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    })
      .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`)
    });
    delay+=step
  }
})

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay }); 
      }
    },delay)
  })
}
