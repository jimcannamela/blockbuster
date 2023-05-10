/*   Psuedo code for what's new details


need to set a promise to our static releases.js
need to fetch the poster data
use promise.all to get all information in one place

set all movie information on page - sorted by source_name

displayed in carousel

*/

function populateCarousel(movie){
    console.log(movie);
    const carouselItem = document.querySelector('#streamer1');
    const posterDiv = document.createElement('img');
    posterDiv.src = movie.poster;

    carouselItem.append(posterDiv);
   
};



console.log(releases);

Promise.all(releases.releases.map(m => getPoster(m.imdb_id)))

.then(posters => {
    // console.log(posters);
    for(let p = 0; p < posters.length; p++){
        releases.releases[p].poster = posters[p];
        populateCarousel(releases.releases[p]);
        
    }

});
