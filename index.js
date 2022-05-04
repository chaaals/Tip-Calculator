"use strict";
// get element by id
const billInput = document.getElementById("bill--input");
const numPeopleInput = document.getElementById("num--people");
const customTipInput = document.getElementById("tip--percent");

// query selectors
const errorMsg = document.querySelector(".num-people-label");
const tipBtn = document.querySelector(".tip-btn-container");

const tipAmountValue = document.querySelector(".tip-amount");
const totalPersonValue = document.querySelector(".total-person");

const allBtns = document.querySelectorAll(".tip--button");
const resetBtn = document.querySelector(".reset-button");

// init values
let bill = 0;
let percentage = 0;
let numOfPeople = 0;

let totalAmount = 0;
let tipAmount = 0;

// for reset
const initValues = () => {
  bill = 0;
  percentage = 0;
  numOfPeople = 0;

  totalAmount = 0;
  tipAmount = 0;
};

// event listeners
billInput.addEventListener("input", function () {
  bill = billInput.value;

  calculateTip(bill, percentage, numOfPeople);
  console.log(bill);
});

tipBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("custom--tip")) {
    allBtns.forEach((btn) => btn.classList.remove("active"));
  }
  if (e.target.classList.contains("tip--button")) {
    allBtns.forEach((btn) => btn.classList.remove("active"));

    percentage = e.target.textContent;
    console.log(percentage);
    e.target.classList.add("active");

    let tmp = percentage.replace("%", "");
    percentage = +tmp / 100;
  }
  calculateTip(bill, percentage, numOfPeople);
});

customTipInput.addEventListener("input", function () {
  allBtns.forEach((btn) => btn.classList.remove("active"));

  percentage = customTipInput.value;
  let tmp = percentage.replace("%", "");
  percentage = +tmp / 100;

  calculateTip(bill, percentage, numOfPeople);
});

numPeopleInput.addEventListener("input", function () {
  numOfPeople = numPeopleInput.value;
  calculateTip(bill, percentage, numOfPeople);
});

// functions
const currencyFormat = (amount) =>
  new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency: "USD",
  }).format(amount);

const calculateTip = function (bill = 0, percentage = 0, numOfPeople = 0) {
  if (+numOfPeople === 0) {
    // shows error message
    numPeopleInput.style.border = `2px solid rgba(255, 0, 0, .5)`;
    errorMsg.style.opacity = 1;
    return;
  }

  // revert
  numPeopleInput.style.border = `none`;
  errorMsg.style.opacity = 0;
  resetBtn.style.backgroundColor = `rgba(38, 192, 171, 1)`;

  console.log(bill, percentage, numOfPeople);
  tipAmount = (+bill * percentage) / +numOfPeople;
  totalAmount = (+bill + tipAmount) / +numOfPeople;

  tipAmountValue.textContent = `${currencyFormat(tipAmount)}`;
  totalPersonValue.textContent = `${currencyFormat(totalAmount)}`;
  console.log(tipAmount, totalAmount);
};

resetBtn.addEventListener("click", function () {
  if (!numOfPeople) return;

  initValues();

  billInput.value = "";
  numPeopleInput.value = "";
  customTipInput.value = "";

  tipAmountValue.textContent = `${currencyFormat(tipAmount)}`;
  totalPersonValue.textContent = `${currencyFormat(totalAmount)}`;
  resetBtn.style.backgroundColor = `rgba(38, 192, 171, 0.3)`;
});
