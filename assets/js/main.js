//cerco la città
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
            displayCityScores(data)
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
    var resultScores = document.getElementById('resultScores');
    resultScores.innerHTML = '';
    var resultError = document.getElementById('resultError');
    resultError.innerHTML = '';
}

//mostro messaggio di errore nell'imput
function displayErrorMessage(message) {
    let resultError = document.getElementById('resultError');
    resultError.innerHTML = `<p style="color: red;">${message}</p>`;
}

// mostra descrizione a schermo
function displayCityDescription(data) {
    // Recupera le informazioni desiderate dal risultato della chiamata API
    const summary = data.summary;
    // Visualizza le informazioni nell'area dedicata
    let resultDescription = document.getElementById('resultDescription');
    resultDescription.innerHTML = summary                               
}

// mostro gli score a schermo
function displayCityScores(data) {
    const scoresArray = Object.entries(data.categories).map(([key, value]) => ({
        category: key,
        name: value.name,
        score: value.score_out_of_10,
        color: value.color
    }));

    scoresArray.forEach(score => {
        let percentuale = (10*score.score).toFixed(2)

        // Creo un nuovo contenitore
        const article = document.createElement("div");
        article.classList.add("col","card", "col-12" ,"col-sm-6","col-lg-4","col-xl-3" )
        // Imposto il contenuto delle card
        article.innerHTML = `
        <div class="card-body m-1">
            <p>${score.name}:<span> ${percentuale} di 10</span></p> 
            <div class="bg-info-subtle" style="width: 100%;">
                <div class="bg-info" style="width: ${percentuale}%; height: 20px;">
                
                </div>
            </div>
        </div>
    `;

        // Aggiungi il nuovo elemento di paragrafo a resultScores
        resultScores.appendChild(article);

        console.log("ecco i risultati:", score.name);
    });
}


