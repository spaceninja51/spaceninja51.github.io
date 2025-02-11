var tString;
var tHash;

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
    
    tHash = hashHex;
}

// Gets the time+date as a string every second
function getTime() {
    setTimeout(getTime,1000);
    tString = new Date().toLocaleString();
    sha256(tString); // Updates tHash with the hash of tString
    console.log(tHash);
}

window.onload = getTime();
