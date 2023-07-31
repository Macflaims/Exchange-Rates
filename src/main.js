import {setCurrencyOptions, setCalculatorCall} from "./modules/calculator.js"
import {setCurrencyTable, setTableCall} from "./modules/table.js"
import {allowSwitchToCalculator, allowSwitchToTable} from "./modules/switch.js";


function initialit(){
    setLimitDate();
    setCurrencyOptions();
    setCurrencyTable();
    setCalculatorCall();
    setTableCall();
    allowSwitchToCalculator();
    allowSwitchToTable();
}

function setLimitDate(){
    const today = (new Date()).toISOString().split("T")[0];
    document.querySelector("#date").setAttribute("max", today);
}

export function getDate(){
    let date = document.querySelector("#date").value;
    return date || undefined;
}


initialit();