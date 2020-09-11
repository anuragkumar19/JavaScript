async function render() {
    let bM = await navigator.getBattery();
    let html =
    `
    <h1>Battery Status</h1>
    ${bM.charging ? '<i class="fa fa-battery-charging fa-10x"></i>': retIco(bM.level) }
    <h1 class="h2 my">${bM.level*100}%</h1>
    <h2 class="h3 my">${bM.charging ? 'Charging...': 'Not charging'}</h2>
    `;

    document.querySelector('.container').innerHTML = html;
}


function retIco(pct) {
    pct = pct * 100;
    if (pct < 15) {
        return  '<i class="fas fa-battery-empty fa-10x"></i>';
    } else if (pct < 40) {
        return '<i class="fas fa-battery-quarter fa-10x"></i>';
    } else if (pct < 65) {
        return '<i class="fas fa-battery-half fa-10x"></i>';
    } else if (pct < 85) {
        return '<i class="fas fa-battery-three-quarters fa-10x"></i>';
    } else {
        return '<i class="fas fa-battery-full fa-10x"></i>';
    }
}

navigator.getBattery().then(bM => {
    bM.onchargingchange = render;
    bM.onlevelchange = render;
});

render()
