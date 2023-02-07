const signUpForm = document.querySelector('#signup-form');
const firstNameInput = document.querySelector('#first-name');
const lastNameInput = document.querySelector('#last-name');
const emailInput = document.querySelector('#email');
const dobInput = document.querySelector('#dob');
const passwordInput = document.querySelector('#signup-password');
const confirmPasswordInput = document.querySelector('#confirm-password');
const errorContainer = document.querySelector('#error-container');

const validateFirstName = () => {
  const firstName = firstNameInput.value;
  if (!firstName) {
    displayErrorMessage('First name is required');
  }
};

const validateLastName = () => {
  const lastName = lastNameInput.value;
  if (!lastName) {
    displayErrorMessage('Last name is required');
  }
};

const validateEmail = () => {
  errorContainer.innerHTML = '';
  const email = emailInput.value;
  if (!email) {
    displayErrorMessage('Email is required');
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    displayErrorMessage('Email is not valid');
  } else if (localStorage.getItem("email") === email) {
    displayErrorMessage("You have already registered with this email");
  } else {
    localStorage.setItem("email", email);
    showSuccessModal();
  }
};

const validateDob = () => {
  errorContainer.innerHTML = '';
  const dob = dobInput.value;
  if (!dob) {
    displayErrorMessage('Date of birth is required');
  } else {
    const age = calculateAge(new Date(dob));
    if (age < 18) {
      displayErrorMessage('You must be at least 18 years old');
    }
  }
};

const validatePassword = () => {
  errorContainer.innerHTML = '';
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (password.length < 8) {
    displayErrorMessage('Password must be at least 8 characters long');
  } else if (!/[A-Z]/.test(password)) {
    displayErrorMessage('Password must contain at least 1 uppercase letter');
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    displayErrorMessage('Password must contain at least 1 symbol');
  }

  if (password !== confirmPassword) {
    displayErrorMessage('Password and confirm password must match');
  }
};

const displayErrorMessage = (message) => {
  const errorMessage = document.createElement('p');
  errorMessage.innerHTML = message;
  errorMessage.style.color = 'red';
  errorContainer.appendChild(errorMessage);
};

const calculateAge = (birthday) => {
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};




firstNameInput.addEventListener('blur', validateFirstName);
lastNameInput.addEventListener('blur', validateLastName);
emailInput.addEventListener('blur', validateEmail);
dobInput.addEventListener('blur', validateDob);
passwordInput.addEventListener('blur', validatePassword);
confirmPasswordInput.addEventListener('blur', validatePassword);

signUpForm.addEventListener('submit', (event) => {
  event.preventDefault();

  errorContainer.innerHTML = ''; // clear previous errors

  validateFirstName();
  validateLastName();
  validateEmail();
  validateDob();
  validatePassword();

  const errorParagraphs = errorContainer.querySelectorAll('p');
  if (!errorParagraphs.length) {
    // submit the form as there are no errors
    alert("Form Submitted Successfully");
    signUpForm.submit();
  }
});