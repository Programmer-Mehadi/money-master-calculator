function checkValidation(inputId) {
    const element = document.getElementById(inputId);
    if (element.value === '' || parseFloat(element.value) < 0 || Number(element.value).toString() === 'NaN') {
        element.style.border = '1.5px solid red';
        return false;
    }
    else {
        element.style.border = '1.5px solid gray';
        return true;
    }
}
function inputFieldValidation() {
    const totalIncomeField = checkValidation('total-income');
    const foodCostField = checkValidation('food-cost');
    const rentCostField = checkValidation('rent-cost');
    const clothesCostField = checkValidation('clothes-cost');
    if (totalIncomeField === false || foodCostField === false || rentCostField === false || clothesCostField === false) {
        return false;
    }
    else {
        return true;
    }
}
function getValueById(inputId) {
    const element = document.getElementById(inputId);
    const inputValue = parseFloat(element.value);
    return inputValue;
}
function getFieldValueById(fieldId) {
    const element = document.getElementById(fieldId);
    const fieldValue = parseFloat(element.innerText);
    return fieldValue;
}
function makeFieldEmpty() {
    document.getElementById('total-expense').innerText = ''
    document.getElementById('balance').innerText = ''
    document.getElementById('saving-amount').innerText = ''
    document.getElementById('remaining-balance').innerText = ''
    document.getElementById('save-precent').value=''
}
function calculateBalance() {
    const totalIncome = getValueById('total-income');
    const foodCost = getValueById('food-cost');
    const rentCost = getValueById('rent-cost');
    const clothesCost = getValueById('clothes-cost');
    const totalCost = foodCost + rentCost + clothesCost;
    if (totalCost > totalIncome) {
        document.getElementById('error-field').style.display = 'block';
        makeFieldEmpty();
    }
    else {
        document.getElementById('error-field').style.display = 'none';
        const totalExpenseField = document.getElementById('total-expense');
        totalExpenseField.innerText = totalCost;
        const balanceField = document.getElementById('balance');
        balanceField.innerText = totalIncome - totalCost;
    }

}
document.getElementById('error-field').style.display = 'none';
document.getElementById('calculate-btn').addEventListener('click', function () {
    const validationStatus = inputFieldValidation();
    if (validationStatus === true) {
        calculateBalance();
    }
    else {
        makeFieldEmpty();
    }

});
document.getElementById('save-btn').addEventListener('click', function () {
    const savePercent = getValueById('save-percent');

    if (savePercent === '' || Number(savePercent).toString() === 'NaN' || savePercent < 0 || savePercent > 100) {
        document.getElementById('save-percent').style.border = '1.5px solid red';
        document.getElementById('saving-amount').innerText = ''
        document.getElementById('remaining-balance').innerText = ''
    }
    else {
        document.getElementById('save-percent').style.border = '1.5px solid gray';
        
        const balanceField = document.getElementById('balance');
        const balanceValueString = balanceField.innerText;
        const balanceValue = parseFloat(balanceValueString);
        if (balanceValue.toString() !== 'NaN') {
            const savingAmount = balanceValue * (savePercent / 100);
            const remainingBalance = balanceValue - savingAmount;

            document.getElementById('saving-amount').innerText = savingAmount.toFixed(2);
            document.getElementById('remaining-balance').innerText = remainingBalance.toFixed(2);
        }
        
        
    }
});