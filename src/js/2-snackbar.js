import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
    transitionIn: 'flipInX',
    transitionOut: 'flipOutX',
    position: 'topRight',
    messageColor: 'white',
    progressBar: false,
    close: false,
})

const form = document.querySelector(".form")

form.addEventListener('submit', a => {
    a.preventDefault();
    const delay = form.elements.delay.value;
    const state = form.elements.state.value;
  
    createMessage(delay, state)
      .then(message => {
        iziToast.show({
          message,
          backgroundColor: '#4BB543',
        });
      })
      .catch(message => {
        iziToast.show({
          message,
          backgroundColor: '#FF9494',
        });
      });
  
    form.reset();
  });

function createMessage (delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(state === "fulfilled") {
                resolve(`✅ Fulfilled promise in ${delay}ms`);
            } else {
                reject(`❌ Rejected promise in ${delay}ms`);
            }
        },delay); 
    })
}
