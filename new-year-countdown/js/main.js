// Getting Elements
const nxtYear = document.getElementById('nxtYear');
const cont = document.getElementById('cont');

update();

function update() {
    let time = Date.now();
    let date = new Date();

    let year = date.getFullYear() + 1;
    nxtYear.innerHTML = year;
    let newYear = new Date(`January 01 ${year} 00:00:00`);
    let nxtTime = newYear.getTime();

    let diff = nxtTime - time;

    let days = Math.floor(diff / 1000 / 60 / 60 / 24);
    let hours = Math.floor(diff / 1000 / 60 / 60) % 24;
    let mins = Math.floor(diff / 1000 / 60) % 60;
    let sec = Math.floor(diff / 1000) % 60;

    if (days < 10) {
        days = '0' + days.toString();
    }
    if (hours < 10) {
        hours = '0' + hours.toString();
    }
    if (mins < 10) {
        mins = '0' + mins.toString();
    }
    if (sec < 10) {
        sec = '0' + sec.toString();
    }



    let html = `
    <h1 class="d2">New Year countdown</h1>
    <div class="card" id="day">
    ${days} <br> Days
    </div>
    <div id="hour" class="card">
    ${hours} <br> Hour
    </div>
    <div id="min" class="card">
    ${mins} <br>Minutes
    </div>
    <div id="sec" class="card">
    ${sec} <br> Seconds
    </div>
    `;
    cont.innerHTML = html;
}

setInterval(update, 1000);