import { ValidEmail, calculateSum} from "./function.js";

const steps = document.querySelectorAll(".step");
const cards = document.querySelectorAll(".card");
const footer = document.querySelector(".footer");
const lastStep = document.getElementById("Recap").content.cloneNode(true);
const check = document.getElementById("checkbox");
const next = document.querySelector(".next");
const previous = document.querySelector(".previous");
let finish = false;
let sumTab = [];
console.log(sumTab);
let planObject = {};
let listOptionsAdd_ons = [];

let currentStep = 1;
updateStep();

function updateStep() {
  if (currentStep <= 1) {
    currentStep = 1;
    previous.style.display = "none";
  } else if (currentStep >= steps.length) {
    currentStep = steps.length;
  } else {
    previous.style.display = "block";
    next.style.display = "block";
  }

  steps.forEach((step, i) => {
    step.classList.remove("current");
    if (currentStep === i + 1) {
      step.classList.add("current");
    }
  });

  cards.forEach((card, i) => {
    card.classList.remove("active");
    if (currentStep === i + 1) {
      card.classList.add("active");
      if (currentStep === 4) {
        next.classList.add("confirm");
        next.innerText = "Confirm";
        dynamicallyAdd();
      }
    }
  });
}

previous.addEventListener("click", () => {
  currentStep--;
  updateStep();
});

const handleClick = () => {
  let isValid = false;

  if (currentStep === 1) {
    isValid = ValidChoise1();
  }

  if (currentStep === 2) {
    isValid = ValidChoise2();
  }

  if (currentStep === 3) {
    isValid = ValidChoise3();
  }

  if (isValid) {
    currentStep++;
    updateStep();
  }
};
next.addEventListener("click", handleClick);

// cards[3].addEventListener("click", (e) => {
//   if(e.target.matches(".change")){
//     currentStep = 2;
//   }
// })

/**
 * 
 * @param {HTMLElement} options 
 * @param {object} storageArray 
 * @param {boolean} singleElement 
 * @returns {boolean}
 */
function ValidChoise(options, storageArray, singleElement = true) {
  let isValid = false;
  options.forEach((option) => {
    if (option.classList.contains("active")) {
      isValid = true;

      let title = option.querySelector(".titleOption").innerText;
      let price;
      mode === true
        ? (price = option.querySelector(".yearly"))
        : (price = option.querySelector(".monthly"));
      let object = {
        title: title,
        price: price.innerText,
      };
      
      
      let char = price.innerText;

      singleElement ? (Object.assign(storageArray, object)) : storageArray.push(object);
      console.log(storageArray)
    }
  });
  if (isValid === false) {
    alert(
      "Veuillez faire aumoins un choix avant de passer à l'étape suivante."
    );
    return false;
  } else {
    return true;
  }
}
function ValidChoise1() {
  const form = document.querySelector("form");
  const inputs = form.querySelectorAll("input");
  const EmailInput = document.getElementById("mail");
  let verification = false;

  inputs.forEach((input) => {
    if (input.value === "") {
      verification = true;
      let voisin = input.previousElementSibling;
      voisin.style.display = "block";
      input.style.borderColor = "hsl(354, 84%, 57%)";
    }
  });

  const email = ValidEmail(EmailInput);
  if (email === true && verification === false) {
    verification = false;
  } else if (email === false && verification === false) {
    console.log("hello");
    const neighbor = EmailInput.previousElementSibling;
    neighbor.innerText = "This email address is not correct";
    neighbor.style.display = "block";
    EmailInput.style.borderColor = "hsl(354, 84%, 57%)";
    verification = true;
  }

  if (verification === false) {
    return true;
  } else {
    return false;
  }
}

function ValidChoise2() {
  const options = cards[1].querySelectorAll(".option");
  let singleElement = true;
  return ValidChoise(options, planObject, singleElement);
}

function ValidChoise3() {
  const options = cards[2].querySelectorAll(".option");
  listOptionsAdd_ons = [];
  let singleElement = false;
  return ValidChoise(options, listOptionsAdd_ons, singleElement);
}

let mode = false;
check.addEventListener("change", () => {
  const yearly = document.querySelectorAll(".yearly");
  const monthly = document.querySelectorAll(".monthly");
  if (check.checked) {
    monthly.forEach((e) => {
      e.style.display = "none";
    });
    yearly.forEach((e) => {
      e.style.display = "block";
    });
    sumTab = [];
    mode = true;
  } else {
    yearly.forEach((e) => {
      e.style.display = "none";
    });
    monthly.forEach((e) => {
      e.style.display = "block";
    });
    sumTab = [];
    mode = false;
  }
  console.log(mode);
});

function selectedOption1() {
  const options = cards[1].querySelectorAll(".option");
  options.forEach((option) => {
    option.addEventListener("click", (e) => {
      let optionActive = false;
      options.forEach((plan) => {
        plan.classList.remove("active");
      });

      e.currentTarget.classList.add("active");
      optionActive = true;
    });
  });
}

let optionEventListenersEnabled = true;
function selectedOption2() {
  const options = cards[2].querySelectorAll(".option");

  options.forEach((option) => {
    if (optionEventListenersEnabled) {
      option.addEventListener("click", optionClickHandler);
    } else {
      option.removeEventListener("click", optionClickHandler);
    }
  });
}

function optionClickHandler(e) {
  e.currentTarget.classList.toggle("active");

  const optionCheck = e.currentTarget.querySelector("input");
  optionCheck.checked = e.currentTarget.classList.contains("active");
}

let planOptionTitle = lastStep.querySelector(".planOptionTitle");
let planOptionPrice = lastStep.querySelector(".planOptionPrice");
let addOptionTitle = lastStep.querySelectorAll(".addOptionTitle");
let addOptionPrice = lastStep.querySelectorAll(".addOptionPrice");
let totalPrice = lastStep.querySelector(".totalPrice");
let totalPer = lastStep.querySelector(".totalPer");
function dynamicallyAdd() {
  planOptionTitle.innerHTML = "";
  planOptionPrice.innerHTML = "";
  totalPrice.textContent = "";
  totalPer.textContent = "";
  addOptionTitle.forEach((element) => {
    element.innerHTML = "";
  });
  addOptionPrice.forEach((element) => {
    element.innerHTML = "";
  });

  planOptionTitle.innerText = planObject.title;
  planOptionPrice.innerText = planObject.price;
  sumTab.push(calculateSum(planObject.price));
  console.log(sumTab)

  if (listOptionsAdd_ons.length > 1) {
    for (let i = 0; i < listOptionsAdd_ons.length; i++) {
      if (
        addOptionTitle[i].innerText === listOptionsAdd_ons[i].title &&
        addOptionPrice[i].innerText === listOptionsAdd_ons[i].price
      ) {
        return;
      } else {
        addOptionTitle[i].textContent = listOptionsAdd_ons[i].title;
        addOptionPrice[i].textContent = listOptionsAdd_ons[i].price;
      }
    }
  } else {
    addOptionTitle[0].textContent = listOptionsAdd_ons[0].title;
    addOptionPrice[0].textContent = listOptionsAdd_ons[0].price;
  }

  const sum = sumTab.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  let currencyPer = mode === false ? "mo" : "yr";

  totalPrice.textContent = `$${sum}/${currencyPer}`;
  totalPer.textContent = `Total(per ${currencyPer})`;

  cards[3].append(lastStep);
}

selectedOption1();
selectedOption2();
