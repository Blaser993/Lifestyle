//cerco la foto città e la cambio
function searchFoto() {
    clear();
    let element = document.getElementById('background'); 
    let search = document.getElementById('search').value.trim().toLowerCase().replace(/\s+/g, '-');
    console.log(search)
    fetch(`https://api.teleport.org/api/urban_areas/slug:${search}/images/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Città non trovata');
                
            }
            return response.json();
        })
        .then(data => {
            console.log("ecco la tua foto:",data.photos[0].image.mobile);           
            let background = data.photos[0].image.web;
            element.style.backgroundImage = `url("${background}")`;
        })
        .catch(error => {
            console.error('Errore durante la chiamata delle API:', error);
            let element = document.getElementById('background'); 
            let background = "";
            element.style.backgroundImage = `url("${background}")`;
        })
}

//cerco le info
function searchInfo() {
    clear();
    let search = document.getElementById('search').value.trim().toLowerCase().replace(/\s+/g, '-');
    console.log(search);
    fetch(`https://api.teleport.org/api/urban_areas/slug:${search}/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Città non trovata');
            }
            return response.json();
        })
        .then(data => {
            console.log("info:", data);
            displayCityInfo(data); 
        })
        .catch(error => {
            console.error('Errore durante la chiamata delle API:', error);
            displayErrorMessage('Città non trovata, prova in inglese oppure inserisci un nome di città valido.');
        })
}

// mostra info a schermo
// mostra descrizione a schermo
function displayCityInfo(data) {
    // Recupera le informazioni desiderate dal risultato della chiamata API
    let name = data.name;
    let fullname = data.full_name;
    // Visualizza le informazioni nell'area dedicata
    const resultInfo = document.getElementById('resultInfo');
    const nameField = document.createElement("h1")
    nameField.innerHTML = `<strong>${name}</strong>`
    nameField.classList.add("text-white","display-1")
    resultInfo.appendChild(nameField)
    const fullnameField = document.createElement("h1")
    fullnameField.innerHTML = `${fullname}`
    fullnameField.classList.add("text-white")
    resultInfo.appendChild(fullnameField)

}



//cerco le stats con description
function searchStats() {
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
            console.log("statistiche:",data);
            displayCityDescription(data)
            displayCityScores(data)
        })
        .catch(error => {
            console.error('Errore durante la chiamata delle API:', error);
            displayErrorMessage('Città non trovata, prova in inglese oppure inserisci un nome di città valido.');
        })
}

// mostra descrizione a schermo
function displayCityDescription(data) {
    // Recupera le informazioni desiderate dal risultato della chiamata API
    const summary = data.summary;
    const total = (data.teleport_city_score).toFixed(2);
    // Visualizza le informazioni nell'area dedicata
    const resultDescription = document.getElementById('resultDescription');
    const summaryField = document.createElement("p")
    summaryField.classList.add("overflow-y-auto", "bg-light", "rounded", "p-3")
    summaryField.innerHTML = summary
    resultDescription.appendChild(summaryField) 
    const totalScore = document.createElement("h4")
    totalScore.innerHTML = `<strong>LifeStyle Score</strong>: ${total}`
    summaryField.appendChild(totalScore) 
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
        let punteggio = (percentuale/10).toFixed(1)
        // Creo un nuovo contenitore
        const article = document.createElement("div");
        article.classList.add( "col","col-12", "my-3" )
        // Imposto il contenuto delle card
        article.innerHTML = `
        <div class=" bg-light rounded p-2 bg-opacity-50 m-1">
            <h5><strong>${score.name}</strong>:<span> ${punteggio} di 10</span></h5> 
            <div class="bg-dark-subtle" style="width: 100%;">
                <div class="bg-dark" style="width: ${percentuale}%; height: 20px;">            
                </div>
            </div>
        </div>
    `;

        // Aggiungi il nuovo elemento di paragrafo a resultScores
        resultScores.appendChild(article);

        console.log("ecco i risultati:", score.name);
    });
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
    let resultDescription = document.getElementById('resultDescription');
    resultDescription.innerHTML = '';
    let resultScores = document.getElementById('resultScores');
    resultScores.innerHTML = '';
    let resultInfo = document.getElementById('resultInfo');
    resultInfo.innerHTML = '';
    let resultError = document.getElementById('resultError');
    resultError.innerHTML = '';
}

//mostro messaggio di errore nell'imput
function displayErrorMessage(message) {
    let resultError = document.getElementById('resultError');
    resultError.innerHTML = `<p style="color: red;">${message}</p>`;
}






