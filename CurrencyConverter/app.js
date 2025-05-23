const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const swapIcon = document.querySelector(".fa-arrow-right-arrow-left");



window.addEventListener("load",() => {
    updateExchangeRate();
});

for (let select of dropdowns){
    for(currcode in countryList){
        let newOption = document.createElement("option");
        newOption.value = currcode;
        newOption.innerText = currcode;
        if (select.name === "from" && currcode === "USD"){
            newOption.selected = 'selected';
        }else if (select.name === "to" && currcode === "BDT"){
            newOption.selected = 'selected';
        }
        select.append(newOption);

    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

swapIcon.addEventListener("click", () => {
    // Swap the selected values
    const temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;

    // Update the flags
    updateFlag(fromCurr);
    updateFlag(toCurr);

    // Optionally, update the exchange rate immediately
    updateExchangeRate();
});


const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let imgTag = element.parentElement.querySelector("img");
    imgTag.src = newSrc;
};



btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchangeRate();
    
});

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if (amtVal === "" || amtVal <= 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const API_KEY = "22ea0b3987244e58ce4c1a9c"; // Your ExchangeRate-API key
    const from = fromCurr.value;
    const to = toCurr.value;
    const URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`;

    try {
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data.conversion_rates[to];
        if (!rate) {
            alert("Conversion failed. Please check your currency codes or API key.");
            return;
        }
        let finalAmount = (amtVal * rate).toFixed(2);
        msg.innerText = `${amtVal} ${from} = ${finalAmount} ${to}`;
    } catch (error) {
        console.log(error);
        alert("Conversion failed. Please check your network.");
    }
}


