
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  timeout: 3000,
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
  position: 'topRight',
  message: 'Please choose a date in the future',
  messageColor: 'white',
  backgroundColor: 'red',
  progressBar: false,
});

let intervalId, userSelectedDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      timer(selectedDates)
    },
  };
const startBtn = document.querySelector('button[data-start]');
const datePicker = document.querySelector('#datetime-picker');

const second = document.querySelector('span[data-seconds]'),
minute = document.querySelector('span[data-minutes]'),
hour = document.querySelector('span[data-hours]'),
day = document.querySelector('span[data-days]') ;

startBtn.disabled = true;

flatpickr(datePicker, options);

  function convertMs(ms) {
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

  function timer(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();
    if ( userSelectedDate <= Date.now() ) {
      startBtn.disabled = true;
      iziToast.show();
    } else {
      startBtn.disabled = false;
      startBtn.addEventListener('click',() => {
        startBtn.disabled = true;
        datePicker.disabled = true;
    intervalId = setInterval(() => {
        const countDown = userSelectedDate - Date.now()
        if (countDown <= 0) {
          clearInterval(intervalId);
          datePicker.disabled = false;
          startBtn.disabled = false;
          return;
        }
        let { days, hours, minutes, seconds } = convertMs(countDown)
        day.textContent = addZero(days)
        hour.textContent = addZero(hours)
        minute.textContent = addZero(minutes)
        second.textContent = addZero(seconds)
       }, 1000);
      })
    }
  }

  function addZero(unit) {
    return unit.toString().padStart(2, '0');
  }



  