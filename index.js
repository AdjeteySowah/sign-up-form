// || theme switching
let rootDoc = document.querySelector("html");

let darkmode = localStorage.getItem("darkmode");
let themeSwitchBtn = document.querySelector(".form__theme-switch");

if (darkmode === "active") {     // preserves the last color theme used by the user before closing the page
   enableDarkmode();
}

function enableDarkmode () {
   rootDoc.classList.remove("lightmode");
   rootDoc.classList.add("darkmode");
   localStorage.setItem("darkmode", "active");
}

function disableDarkmode () {
   rootDoc.classList.remove("darkmode");
   rootDoc.classList.add("lightmode");
   localStorage.setItem("darkmode", null);
}

themeSwitchBtn.addEventListener("click", () => {
   darkmode = localStorage.getItem("darkmode");
   if (darkmode !== "active") {
      enableDarkmode();
   } else {
      disableDarkmode();
   }
});


   // || email validation
let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let emailInput = document.querySelector("#email");

function validateEmail() {
   // Check if the input matches the email pattern
   let isValid = emailPattern.test(emailInput.value);

   if (isValid) {
      emailInput.style.cssText = `outline-color: rgb(0, 255, 0);`;
   } else {
      emailInput.style.cssText = `outline-color: rgb(255, 0, 0);`;
   }
}

emailInput.addEventListener("input", validateEmail);


   // || show password rules
let passwordInput = document.querySelector("#password");
let passwordRule = document.querySelector(".password_rules");

passwordInput.addEventListener("focus", () => {
   if (ruleContainer.contains(passwordErrorMsg)) {
      ruleContainer.removeChild(passwordErrorMsg);
   }
   if (!ruleContainer.contains(passwordRule)) {
      ruleContainer.appendChild(passwordRule);
   }
   passwordRule.style.cssText = `visibility: visible;`;
});

passwordInput.addEventListener("blur", () => {
   passwordRule.style.cssText = `visibility: hidden;`;
});


let psswrdConfirmationInput = document.querySelector("#password_confirmation");
let psswrdConfirmationRule = document.querySelector(".password_confirmation_rule");

psswrdConfirmationInput.addEventListener("focus", () => {
   psswrdConfirmationRule.style.cssText = `visibility: visible;`;
});

psswrdConfirmationInput.addEventListener("blur", () => {
   psswrdConfirmationRule.style.cssText = `visibility: hidden;`;
});


   // || show password strength 
let globalIsWeak; 
let globalIsGood; 

function showPasswordStrength() {
   let weakPasswordPattern = /^(?=.*[A-Za-z\d\W_]).{1,}$/;
   let goodPasswordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
   let strongPasswordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/;

   let isWeak = weakPasswordPattern.test(passwordInput.value);
   let isGood = goodPasswordPattern.test(passwordInput.value);
   let isStrong = strongPasswordPattern.test(passwordInput.value);

   if (isStrong) {
      globalIsWeak = false;
      globalIsGood = false;
      passwordInput.style.cssText = `outline-color: rgb(0, 255, 0);`;
   } else if (isGood) {
      globalIsGood = true;
      passwordInput.style.cssText = `outline-color: rgb(255, 255, 0);`;
   } else if (isWeak) {
      globalIsWeak = true;
      passwordInput.style.cssText = `outline-color: rgb(255, 0, 0);`;
   } else {
      passwordInput.style.cssText = `outline-color: rgb(65, 105, 225);`;
   }
}

passwordInput.addEventListener("input", showPasswordStrength);


   // || validate passwords 
let formButton = document.querySelector(".form__button");

function validatePasswords() {
   if (passwordInput.value !== psswrdConfirmationInput.value) {
      psswrdConfirmationInput.style.cssText = `outline-color: rgb(255, 0, 0);`;
      psswrdConfirmationRule.style.cssText = `visibility: visible;
                                              color: rgb(255, 0, 0);`;
   }
}

formButton.addEventListener("click", validatePasswords);


psswrdConfirmationInput.addEventListener("input", () => {
   if (psswrdConfirmationInput.value === "") {
      psswrdConfirmationInput.style.cssText = `outline-color: rgb(65, 105, 225);`;
   } else if (passwordInput.value === psswrdConfirmationInput.value) {
      psswrdConfirmationInput.style.cssText = `outline-color: rgb(0, 255, 0);`;
   } else {
      psswrdConfirmationInput.style.cssText = `outline-color: rgb(255, 0, 0);`;
   }
});


   // || make password visible/invisible
let visibilityStatus = {};
let visibilityStatusIcons = document.querySelectorAll(".visibility-switch");

function makePasswordVisible(event) {
   let parentElement = event.target.closest(".password-invisible");
   parentElement.classList.remove("password-invisible");
   parentElement.classList.add("password-visible");

   let siblingInputElement = parentElement.querySelector("input");
   if (siblingInputElement.type === "password") {
      siblingInputElement.type = "text";
   }

   siblingInputElement.focus();
   visibilityStatus[siblingInputElement.id] = "visible";
}

function makePasswordInvisible(event) {
   let parentElement = event.target.closest(".password-visible");
   parentElement.classList.remove("password-visible");
   parentElement.classList.add("password-invisible");

   let siblingInputElement = parentElement.querySelector("input");
   if (siblingInputElement.type === "text") {
      siblingInputElement.type = "password";
   }

   siblingInputElement.focus();
   visibilityStatus[siblingInputElement.id] = "invisible";
}

visibilityStatusIcons.forEach((icon) => {
   icon.addEventListener("click", (event) => {
      let inputId = event.target.closest(".password-invisible, .password-visible").querySelector("input").id;
      
      if (visibilityStatus[inputId] !== "visible") {
         makePasswordVisible(event);
      } else {
         makePasswordInvisible(event);
      }
   });
});  


   // || prevent form submission
let form = document.querySelector(".page__form");

let ruleContainer = document.querySelector(".form__input-container--forPassword");
let passwordErrorMsg = document.createElement("p");

function preventFormSubmission(event) {
   passwordErrorMsg.textContent = "Invalid! Please follow the rules.";
   passwordErrorMsg.style.cssText = `font-size: 1.2rem;
                                     color: rgb(255, 0, 0);
                                     margin-top: -0.7rem;`;

   if (passwordInput.value !== psswrdConfirmationInput.value) {
      event.preventDefault();
   } else if (globalIsGood || globalIsWeak) {
      event.preventDefault();
      ruleContainer.removeChild(passwordRule);
      ruleContainer.appendChild(passwordErrorMsg);
   }
}

form.addEventListener("submit", preventFormSubmission);