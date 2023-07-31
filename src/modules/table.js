import {getDate} from "../main.js";

export function setCurrencyTable(base, date="latest"){
    fetch(`https://api.exchangerate.host/${date}?base=${base}`)
    .then(response => response.json())
    .then(responseJSON=>{
        document.querySelector("#currency-table").textContent=""
        Object.entries(responseJSON.rates).forEach(currency=>{
        const $newCurrency = document.createElement("th");
        $newCurrency.textContent = currency[0];
        
        const $newConversion = document.createElement("td");
        $newConversion.textContent = currency[1];

        const $newRow = document.createElement("tr");
        $newRow.appendChild($newCurrency);
        $newRow.appendChild($newConversion)

        document.querySelector("#currency-table").appendChild($newRow);
    })
})
}

function removePreviousTable(){
    document.querySelectorAll("#currency-table tr").forEach((element)=>{
        element.remove()})
}

export function setTableCall(){
    const $baseSelector = document.querySelector("#convert-from");
    $baseSelector.addEventListener("change", ()=>{updateTable($baseSelector.value)})

    const $dateSelector = document.querySelector("#date");
    $dateSelector.addEventListener("change", ()=>{updateTable($baseSelector.value)})
}

function updateTable(base){
    removePreviousTable();
    showLoading(document.querySelector("#currency-table"));
    setCurrencyTable(base, getDate())
}

export function showLoading(element){
    element.textContent="Loading..."
}