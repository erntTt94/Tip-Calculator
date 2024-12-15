const tipButtons = document.querySelectorAll('.tip-buttons button');
const customButton = document.querySelector('#custom-button');
let tipPercentage = 0;


function setCustomTip() {
    tipPercentage = 0;
    document.querySelector('#custom').addEventListener('input', function (e) {
        tipPercentage = parseFloat(e.target.value) || 0;
        checkLength(e.target);
        calculateTip();
    })
};

function setTip(percentage) {
    tipPercentage = percentage;
    calculateTip();
};

function checkLength(el) {
    if (el.value.length > el.maxLength) {
        el.value = el.value.slice(0, el.maxLength);
    }
};

function calculateTip() {
    const bill = parseFloat(document.querySelector('#bill').value);
    const people = parseInt(document.querySelector('#people').value);
    document.querySelector('.reset').style.backgroundColor = 'hsl(172, 67%, 45%)';

    if (isNaN(bill) || isNaN(people) || bill <= 0 || people <= 0 || tipPercentage < 0) {
        if (people === 0) {
            document.querySelector('#people').style.border = '2px solid rgb(199, 93, 93)';
            document.querySelector('.error').style.display = 'inline';
        }
        return;
    }

    document.querySelector('#people').style.border = 'inherit';
    document.querySelector('.error').style.display = 'none';

    const totalTip = (tipPercentage / 100) * bill;
    const totalBill = bill + totalTip;
    const tipPerPerson = totalTip / people;
    const totalPerPerson = totalBill / people;

    document.querySelector('.tip').innerText = `$${tipPerPerson.toFixed(2)}`;
    document.querySelector('.total').innerText = `$${totalPerPerson.toFixed(2)}`;
};

function reset() {
    document.querySelector('#bill').value = 0;
    document.querySelector('#people').value = 1;
    document.querySelector('.tip').innerText = '$0.00';
    document.querySelector('.total').innerText = '$0.00';
    tipPercentage = 0;
    document.querySelector('#custom').value = '';
    document.querySelector('.reset').style.backgroundColor = 'hsla(172, 58%, 50%, 0.269)';
    document.querySelector('.people-box span').style.display = 'none';
    document.querySelector('#people').style.border = 'none';
};

customButton.addEventListener('click', function (e) {
    setCustomTip();
});

tipButtons.forEach(button => {
    button.addEventListener('click', function () {
        setTip(button.value)
        tipButtons.forEach(b => {
            b.classList.remove('changeColor')
        })
        button.classList.add('changeColor');
    })
})

document.querySelector('#bill').addEventListener('input', (e) => {
    checkLength(e.target);
    calculateTip();

});
document.querySelector('#people').addEventListener('input', (e) => {
    checkLength(e.target);
    calculateTip();
});

document.querySelector('.reset').addEventListener('click', reset);










