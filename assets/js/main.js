
function searchCity() {
    clear();
    let search = document.getElementById('search').value.trim().toLowerCase().replace(/\s+/g, '-');
    console.log(search)
    fetch(`https://api.teleport.org/api/urban_areas/slug:${search}/scores/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Città non trovata');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            displayCityDescription(data)
        })
        .catch(error => {
            console.error('Errore durante la chiamata delle API:', error);
            displayErrorMessage('Città non trovata, prova in inglese. </br> Oppure inserisci un nome di città valido.');
        })
}

// Permetto di avviare la ricerca anche premendo invio!
const input = document.getElementById("search");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("myBtn").click();
  }
});

// Pulisco lo schermo da eventuali messaggi di errori o ricerche passate
function clear() {
    var resultDescription = document.getElementById('resultDescription');
    resultDescription.innerHTML = '';
    var resultError = document.getElementById('resultError');
    resultError.innerHTML = '';
}

//mostro messaggio di errore nell'imput
function displayErrorMessage(message) {
    let resultError = document.getElementById('resultError');
    resultError.innerHTML = `<p style="color: red;">${message}</p>`;
}

// cerca la città in base al value nell'impit
function displayCityDescription(data) {
    // Recupera le informazioni desiderate dal risultato della chiamata API
    const summary = data.summary;
    // Visualizza le informazioni nell'area dedicata
    let resultDescription = document.getElementById('resultDescription');
    resultDescription.innerHTML = summary                               
}


