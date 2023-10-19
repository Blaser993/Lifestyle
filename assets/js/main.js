

function searchCity() {
    clear();

    var search = document.getElementById('search').value.trim().toLowerCase().replace(/\s+/g, '-');
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

            displayCityInfo(data)
        })
        .catch(error => {
            console.error('Errore durante la chiamata delle API:', error);
            displayErrorMessage('Città non trovata, prova in inglese. </br> Oppure inserisci un nome di città valido.');
        })
}

// Permetto di avviare la ricerca anche premendo invio
var input = document.getElementById("search");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("myBtn").click();
  }
});

function clear() {
    var resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = '';
    var resultContainer = document.getElementById('resultError');
    resultContainer.innerHTML = '';
}

function displayErrorMessage(message) {
    // Visualizza il messaggio di errore nell'HTML
    var resultContainer = document.getElementById('resultError');
    resultContainer.innerHTML = `<p style="color: red;">${message}</p>`;
}

function displayCityInfo(data) {
    // Recupera le informazioni desiderate dal risultato della chiamata API
    var summary = data.summary;

    // Visualizza le informazioni nell'area dedicata
    var resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML =  summary                               
}


