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

const startBtn = document.querySelector('.data-start');
const datePicker = document.querySelector('#datetime-picker');

startBtn.disabled = true;

flatpickr(datePicker, options);

// flatpickr('#datetime-picker', {
//     enableTime: true,
//     dateFormat: "Y-m-d H:i",
// })

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
    },
  };

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
    userSelectedDates = selectedDates[0].getTime();
    if ( userSelectedDates <= Date.now() ) {
      startBtn.disabled = true;
      iziToast.show();
    } else {
      startBtn.disabled = false;
      startBtn.addEventListener('click')
    }
  } 