"use strict";

// Get form element and all input fields
const form = document.getElementById("form");

// Add "keyup" event to all inputs to check validity while typing
form.querySelectorAll("input").forEach((input) => {
  input.addEventListener("keyup", function () {
    validateInput(this);
  });
});

// Add submit event listener to the form
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data as object
  const formData = Object.fromEntries([...new FormData(form)]);

  // Check if form is valid and log message accordingly
  if (isValidForm(formData)) console.log("IS VALID FORM");
});

// Function to set error message for an input element
const setError = function (element, message) {
  const inputGroup = document.getElementById(`${element}`).parentElement;
  const errorDisplay = inputGroup.querySelector(".form-input-error");

  errorDisplay.textContent = message;
  inputGroup.classList.add("error");
  inputGroup.classList.remove("success");
};

// Function to set success message for an input element
const setSuccess = function (element) {
  const inputGroup = document.getElementById(`${element}`).parentElement;
  const errorDisplay = inputGroup.querySelector(".form-input-error");

  errorDisplay.textContent = "";
  inputGroup.classList.add("success");
  inputGroup.classList.remove("error");
};

// Function to validate username input
const validateUsername = (usernameValue) => {
  if (usernameValue === "") {
    setError("username", "Username is required");
    return false;
  }

  setSuccess("username");
  return true;
};

// Function to validate email input
const validateEmail = (emailValue) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValidEmail = regex.test(String(emailValue).toLowerCase());

  if (emailValue === "") {
    setError("email", "Email is required");
    return false;
  }

  if (!isValidEmail) {
    setError("email", "Provide a valid email address");
    return false;
  }

  setSuccess("email");
  return true;
};

// Function to validate password input
const validatePassword = (passwordValue) => {
  const hasNumber = /\d/;
  const hasCapitalLetter = /[A-Z]/;
  const hasLowerCase = /[a-z]/;
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  if (passwordValue === "") {
    setError("password", "Password is required");
    return false;
  }

  if (passwordValue.length < 8) {
    setError("password", "Password must be at least 8 characters");
    return false;
  }

  if (!hasNumber.test(passwordValue)) {
    setError("password", "Password must contain at least one number");
    return false;
  }

  if (!hasCapitalLetter.test(passwordValue)) {
    setError("password", "Password must contain at least one capital letter");
    return false;
  }

  if (!hasLowerCase.test(passwordValue)) {
    setError("password", "Password must contain at least one lowercase letter");
    return false;
  }

  if (!hasSpecialChar.test(passwordValue)) {
    setError(
      "password",
      "Password must contain at least one special character"
    );
    return false;
  }

  setSuccess("password");
  return true;
};

// Function to validate password confirmation input
const validateConfirmPassword = (password2Value, passwordValue) => {
  if (password2Value === "") {
    setError("password2", "Please confirm your password");
    return false;
  }

  if (password2Value !== passwordValue) {
    setError("password2", "Passwords doesn't match");
    return false;
  }

  setSuccess("password2");
  return true;
};

// Function to check if form is valid
const isValidForm = (formData) => {
  const usernameValue = formData.username.trim();
  const emailValue = formData.email.trim();
  const passwordValue = formData.password.trim();
  const password2Value = formData.password2.trim();

  // Validate all input fields
  const isUsernameValid = validateUsername(usernameValue);
  const isEmailValid = validateEmail(emailValue);
  const isPasswordValid = validatePassword(passwordValue);
  const isPassword2Valid = validateConfirmPassword(
    password2Value,
    passwordValue
  );

  // Return true only if all input fields are valid
  return isUsernameValid && isEmailValid && isPasswordValid && isPassword2Valid;
};

const validateInput = function (input) {
  const formData = Object.fromEntries(new FormData(form));
  const inputName = input.getAttribute("name");
  const inputValue = formData[inputName].trim();

  switch (inputName) {
    case "username":
      validateUsername(inputValue);
      break;
    case "email":
      validateEmail(inputValue);
      break;
    case "password":
      validatePassword(inputValue);
      break;
    case "password2":
      const passwordValue = formData["password"].trim();
      validateConfirmPassword(inputValue, passwordValue);
      break;
    default:
      break;
  }
};
