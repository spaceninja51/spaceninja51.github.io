// From MDN
async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);                    

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string                  
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

function stopClock() {
    clearInterval(delay);
    isClockRunning = false;
}

function resumeClock() {
    if (!isClockRunning) {
        delay = setInterval(buildClock, 1000);
        isClockRunning = true;
    }
}

// Hashes the date string and returns it
// WORKING, GIVES HASH AS STRING
async function timeHash() {
    let time = new Date().toLocaleString();
    return await sha256(time);
}
// Divides the hash passed in to it into pieces
// that are hexcode colors and outputs them as an array
function makeColorArray(hash) {
    let colors = new Array();
    for (let i = 0; i < hash.length/6; i++) {
        var cStart = (i)*6;
        var cEnd = (i+1)*6;
        colors.push( hash.slice(cStart,cEnd));
    }
    return colors;
}

// Takes the time and date as a hash
// and returns an array with length of
// 11, 10 sections of 6 and 1 of 4
// WORKING, GIVES ARRAY OF COLORS
async function setColors() {
    let colors = new Array();
    let fullHash = await timeHash();
    for (let i = 0; i < fullHash.length/6; i++) {
        var cStart = (i)*6;
        var cEnd = (i+1)*6;
        var hexCode = fullHash.slice(cStart,cEnd);
        colors.push(hexCode);
    }
    return colors;
}

// Time/date has been split into
// the array of colors

const container = document.getElementById("clock");
let delay = setInterval(buildClock, 1000);
let isClockRunning = true;

async function buildClock() {

    let colors = await setColors();
    let thisSet = document.createElement("tr");
    let swatch = document.createElement("td");
    let swatchText = document.createTextNode(colors[10]);
    
    swatch.appendChild(swatchText);
    swatch.style.color = "white";

    thisSet.insertCell(swatch);

    for (i = 0; i < colors.length - 1; i++) {
        swatch = document.createElement("td");
        let hexValue = "#" + colors[i];
        swatchText = document.createTextNode(hexValue);
        swatch.style.backgroundColor = hexValue;
        swatch.style.color = hexValue;

        swatch.appendChild(swatchText);
        thisSet.appendChild(swatch);
        container.appendChild(thisSet);
    }
    swatch = document.createElement("td");
    swatchText = document.createTextNode(colors[10]);
    swatch.appendChild(swatchText);
    thisSet.appendChild(swatch);
}

