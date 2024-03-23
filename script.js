// const baseURL = `https://api.frankfurter.app/latest?amount=10&from=GBP&to=USD`;
const baseURL = "https://api.frankfurter.app";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let mesg = document.querySelector(".mesg");

window.addEventListener("load", () => {
  updateExchangeRate();
});
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});
const updateExchangeRate = async () => {
  let amt = document.querySelector(".amount input");
  let amtVal = amt.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amt.value = "1";
  }
  const url = `${baseURL}/latest?amount=${amtVal}&from=${fromCurr.value}&to=${toCurr.value}`;
  let response = await fetch(url);
  let data = await response.json();
  const ratesKeys = Object.keys(data.rates);
  const firstRateKey = ratesKeys[0];
  const rate = data.rates[firstRateKey];
  mesg.innerText = `${amtVal} ${fromCurr.value} = ${rate} ${toCurr.value}`;
};
