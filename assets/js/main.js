function searchCity() {
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
            displayCityInfo(data);
        })
        .catch(error => {
            console.error('Errore durante la chiamata delle API:', error);
            displayErrorMessage('Città non trovata. Inserisci un nome di città valido.');
        });
}

function displayCityInfo(data) {
    // Tua logica per visualizzare le informazioni della città
}

function displayErrorMessage(message) {
    // Visualizza il messaggio di errore nell'HTML
    var resultContainer = document.getElementById('resultError');
    resultContainer.innerHTML = `<p style="color: red;">${message}</p>`;
}



