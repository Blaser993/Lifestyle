


function searchCity() {
    var search = document.getElementById('search').value.trim().toLowerCase().replace(/\s+/g, '-');
    console.log(search)
    fetch(`https://api.teleport.org/api/urban_areas/slug:${search}/scores/`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            displayCityInfo(data)
        })
        .catch(error => {
            console.error('Errore durante la chiamata delle API:', error);
        })
}


function displayCityInfo(data) {
    // Recupera le informazioni desiderate dal risultato della chiamata API
    var summary = data.summary;

    // Visualizza le informazioni nell'area dedicata
    var resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML =  summary
                                
}


