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
function todayApod() {
    // Gets today's entry
    fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
    .then(res => res.json())
    .then(res => {
        const picData = res;
        return picData;
    });
    document.getElementById("apodTitle") = picData.title;
    document.getElementById("apodPhoto").src = picData.hdurl;
    document.getElementById("apodExplanation") = picData.explanation;
}