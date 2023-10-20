function getUrbanAreaScores(search) {
    // Costruisci l'URL della chiamata API
    const apiUrl = `https://api.teleport.org/api/urban_areas/slug:${search}/scores/`;

    // Effettua la chiamata API utilizzando il metodo fetch
    fetch(apiUrl)
        .then(response => {
            // Controlla se la risposta è OK (status code 200)
            if (!response.ok) {
                throw new Error(`Errore nella chiamata API - ${response.status}`);
            }

            // Parsa la risposta JSON
            return response.json();
        })
        .then(data => {
            // Elabora i dati come desiderato
            const scoresArray = Object.entries(data.categories).map(([key, value]) => ({
                category: key,
                score: value.score_out_of_10,
            }));

            // Ora puoi utilizzare l'array di oggetti come desiderato
            console.log(scoresArray);
            // Oppure, puoi passare l'array a un'altra funzione per la visualizzazione a schermo
            displayScoresOnScreen(scoresArray);
        })
        .catch(error => {
            console.error(`Si è verificato un errore: ${error.message}`);
        });
}

// Funzione di esempio per visualizzare i punteggi a schermo
function displayScoresOnScreen(scoresArray) {
    scoresArray.forEach(item => {
        console.log(`Categoria: ${item.category}, Punteggio: ${item.score}`);
        // Puoi utilizzare questi dati per aggiornare dinamicamente la tua interfaccia utente
        // o fare qualsiasi altra cosa con essi
    });
}

// Esempio di utilizzo della funzione
const searchQuery = 'nome-citta'; // Sostituisci con il tuo valore effettivo
getUrbanAreaScores(searchQuery);
