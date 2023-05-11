/*   Psuedo code for what's new details


need to set a promise to our static releases.js
need to fetch the poster data
use promise.all to get all information in one place

set all movie information on page - sorted by source_name

displayed in carousel

*/
let slideIndex = 0;
const carousel = document.querySelector('#carousel');

function populateCarousel(movie, index){
    const carouselDiv = document.createElement('div');
    const posterImg = document.createElement('img');

    if(movie.poster === 'N/A'){
        posterImg.src = 'https://placehold.co/100x200?font=raleway&text=Missing+Poster';
    } else {
        posterImg.src = movie.poster;
    }
    
    carouselDiv.setAttribute('carouselIndex', index);
    carouselDiv.classList.add('whatsNewMedia');
    carouselDiv.innerHTML = movie.title + '<br>';

    carouselDiv.addEventListener("click", function(event){
        localStorage.setItem('movie', JSON.stringify(movie));
        window.location.href = "movie.html";
    });

    posterImg.setAttribute('alt', movie.title);
    carouselDiv.append(posterImg);
    carousel.append(carouselDiv);
};

Promise.all(releases.releases.map(m => getPoster(m.imdb_id)))

.then(posters => {
    for(let p = 0; p < posters.length; p++){
        releases.releases[p].poster = posters[p];
        populateCarousel(releases.releases[p],p);
    }
    showSlides(slideIndex);
});

const forwardBtn = document.querySelector('.forward');
const backBtn = document.querySelector('.back');

forwardBtn.addEventListener("click", function(event) {
    showSlides(slideIndex);
})

backBtn.addEventListener("click", function(event) {
    plusSlides(-6)
})

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n){
    let slides = document.getElementsByClassName("whatsNewMedia");

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; 
    }

    if (n >= slides.length) {n = 0}    
    if (n < 0) {n = slides.length -3}
    
    for(let j = 0; j < 3; j++){
        slides[n].style.display = "block";  
        n++
    }
    slideIndex = n;
}


