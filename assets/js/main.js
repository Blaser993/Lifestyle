


function allCities(){
    fetch(`https://api.teleport.org/api/cities/{?search}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    .catch(error =>{
        console.error('Errore durante la chiamata delle API:', error);
    })
}


allCities();


// function searchCity() {
//     // Ottieni il valore dalla casella di testo
//     var cityName = document.getElementById('cityInput').value;

//     // Effettua una chiamata alle API di Teleport
//     fetch(`https://api.teleport.org/api/urban_areas/?search=${cityName}`)
//         .then(response => response.json())
//         .then(data => {
//             // Visualizza le informazioni ottenute
//             displayCityInfo(data);
//             console.log(data)
//         })
//         .catch(error => {
//             console.error('Errore durante la chiamata alle API:', error);
//         });
// }

// function displayCityInfo(data) {
//     // Recupera le informazioni desiderate dal risultato della chiamata API
//     var cityName = data.geonames[0].name;
//     var country = data.geonames[0].countryName;

//     // Visualizza le informazioni nell'area dedicata
//     var resultContainer = document.getElementById('resultContainer');
//     resultContainer.innerHTML = `<p>Nome della città: ${cityName}</p>
//                                 <p>Paese: ${country}</p>`;
// }
