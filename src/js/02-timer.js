import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');
const inputEl = document.querySelector('#datetime-picker');
const btnEl = document.querySelector('button[data-start]');
let timeOver;
let intervalId;
btnEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    clearInterval(intervalId);
      if (selectedDates[0] - options.defaultDate <= 0) {
        Notiflix.Notify.failure('Please choose a date in the future');
      } else {
        btnEl.disabled = false;
        timeOver = (selectedDates[0] - options.defaultDate);
        onPrint(convertMs(timeOver));
      }
      
  },
};

function onPrint({ days, hours, minutes, seconds }) {
  if (days < 10) {
          daysEl.textContent = addText(days)/* .padStart(2, '0') */;
        } else {
          daysEl.textContent = days;
        }
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
btnEl.addEventListener('click', () => {
    btnEl.disabled = true;
    intervalId = setInterval(() => {
      if (timeOver < 1000) {
        clearInterval(intervalId);
            return;
        }
      timeOver -= 1000;
      onPrint(convertMs(timeOver));
    }, 1000)
})

flatpickr(inputEl, options);

function addText(val) {
  return String(val).padStart(2, '0');
}
