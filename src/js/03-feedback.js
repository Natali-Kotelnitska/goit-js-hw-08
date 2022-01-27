import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onTextareaInput, 500));

populateFormInputs();

function onFormSubmit(e) {
  e.preventDefault();

  formEl.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput(e) {
  formData[e.target.name] = e.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateFormInputs() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  const parsedMessage = JSON.parse(savedMessage);

  if (savedMessage) {
    formEl.email.value = parsedMessage.email;
    formEl.message.value = parsedMessage.message;
  }

  console.log(parsedMessage);
}
