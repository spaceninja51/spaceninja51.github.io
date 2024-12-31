function todayString(delimiter) {
    // Default delimiter to -
    if (!delimiter) {
        delimiter = "-";
    }
    // Get the date for retrieving daily json
    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let year = today.getFullYear();
    // Sets the date in appropriate format for NASA's api
    today = year + delimiter + month + delimiter + day;
    today = String(today);
    return today
}
function updataApod() {
    // Set desired target elements to variables for convenience
    const title = document.getElementById("apodTitle");
    const photo = document.getElementById("apod");
    const explanation = document.getElementById("apodExplanation");
    // Reads the day's json file, setting the appropriate element values
    fetch(`data/${todayString('-')}.json`)
        .then(res => res.json())
        .then(res => {
            const picData = res;
            title.textContent = picData.title
            photo.src = picData.url;
            explanation.textContent = picData.explanation
        });
    }
// Actually updates the page
updataApod();