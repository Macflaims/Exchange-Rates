import {getDate} from "../main.js";
import {showLoading} from "./table.js"

function getParameters(){
    let base = document.querySelector("#convert-from").value;
    let to = document.querySelector("#convert-to").value;
    let amount = document.querySelector("#amount").value;
    let date = getDate()
    if(base.length === 3 && to.length === 3 && amount>0){
    return[base, to, amount, date]
    }
}

function calculateExchange(base, to , amount, date){
    const url = "https://api.exchangerate.host/convert?";
    fetch(`${url}from=${base}&to=${to}&amount=${amount}&date=${date}`)
    .then(response => response.json())
    .then(responseJSON=>{
        document.querySelector("#result").textContent= `${amount} ${base} = ${responseJSON.result} ${to}`})
}


export function setCurrencyOptions(){
    fetch(`https://api.exchangerate.host/latest`)
    .then(response => response.json())
    .then(responseJSON=>{Object.keys(responseJSON.rates).forEach((currency)=>{
        const $newFromOption = document.createElement("option");
        $newFromOption.textContent = currency;
        const $newToOption = document.createElement("option");
        $newToOption.textContent = currency;
        document.querySelector("#convert-from").appendChild($newFromOption);
        document.querySelector("#convert-to").appendChild($newToOption);        
    })})
}

export function setCalculatorCall(){
    const convertButton = document.querySelector("#convert-button")
    convertButton.addEventListener("click", ()=>{
    showLoading(document.querySelector("#result"));
    let apiParameters = getParameters();
    calculateExchange(apiParameters[0], apiParameters[1], apiParameters[2], apiParameters[3])
})
}

