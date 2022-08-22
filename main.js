import data from './data.json' assert {type: 'json'};

let chartBarsContainer = document.querySelector('.chart__bars-container');
let maxBarHeight = 150;

let values = [];

data.forEach(element => {
    values.push(element.amount)
    chartBarsContainer.innerHTML += `
    <div class="chart__bar">
        <div class="chart__bar--label">$${element.amount}</div>
        <div class="chart__bar--day">${element.day}</div>
    </div>`;
});

let maxValue = Math.max(...values)

let bars = document.querySelectorAll('.chart__bar');
bars = [...bars]

bars.forEach(bar =>{
    /*
    52.36 -> 200px
    nuevoValor ->  x

    x = nuevoValor * 200px / 52.36
    alturaActual = nuevoValor * maxBarHeight / maxValue
    */
    let actualExpense = bar.childNodes[1].innerText
    let actualExpenseNumber = parseFloat(actualExpense.slice(1));
    
    //pintar la barra mas grande de Cyan
    if(maxValue == actualExpenseNumber){
        bar.style.backgroundColor = 'hsl(186, 34%, 60%)';
    }

    let alturaActual = actualExpenseNumber * maxBarHeight / maxValue

    bar.style.height = `${alturaActual}px`

    bar.addEventListener('mouseover', event=>{
        if(event.target.className != 'chart__bar--day'){
            let labelElement = event.target.childNodes[1];
            labelElement.style.display = 'block'
        }
    });
    bar.addEventListener('mouseout', event=>{
        if(event.target.className != 'chart__bar--day'){
            let labelElement = event.target.childNodes[1];
            labelElement.style.display = 'none'
        }
    });
});