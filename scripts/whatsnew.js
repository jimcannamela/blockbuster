/*   Psuedo code for what's new details


need to set a promise to our static releases.js
need to fetch the poster data
use promise.all to get all information in one place

set all movie information on page - sorted by source_name

displayed in carousel

*/
let slideIndex = 1;
const carousel = document.querySelector('#carousel');

function populateCarousel(movie, index){
    console.log(movie);
    const carouselDiv = document.createElement('div');
    const carouselItem = document.querySelector('#iteminfo');
    const posterDiv = document.createElement('img');

    if(movie.poster === 'N/A'){
        posterDiv.src = 'https://placehold.co/100x200?font=raleway&text=Missing+Poster';
    } else {
        posterDiv.src = movie.poster;
    }
    

    carouselDiv.setAttribute('carouselIndex', index);
    
    carouselDiv.classList.add('whatsNewMedia');
    
    carouselDiv.append(posterDiv);
    carouselDiv.append(carouselItem);
    carousel.append(carouselDiv);


   
};

console.log(releases);

Promise.all(releases.releases.map(m => getPoster(m.imdb_id)))

.then(posters => {
    // console.log(posters);
    for(let p = 0; p < posters.length; p++){
        releases.releases[p].poster = posters[p];
        populateCarousel(releases.releases[p],p);
        
    }
   
    showSlides(slideIndex);

});

const forwardBtn = document.querySelector('.forward');
const backBtn = document.querySelector('.back');


forwardBtn.addEventListener("click", function(event) {
    console.log('forwardBtn')
    plusSlides(1)
    
})

backBtn.addEventListener("click", function(event) {
    console.log('backBtn')
    plusSlides(-1)
})




function plusSlides(n) {
  showSlides(slideIndex += n);
}

// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

function showSlides(n){

    let slides = document.getElementsByClassName("whatsNewMedia");
    // let dots = document.getElementsByClassName("dot");

    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; 
    }
    // for (i = 0; i < dots.length; i++) {
    // dots[i].className = dots[i].className.replace(" active", "");
    // }
    for(let j = 0; j < 3; j++){
    slides[slideIndex-1].style.display = "block";  
        n++
        slideIndex++
        console.log('j' + j + ' n' +  n + 'slideIndex' + slideIndex);
    // dots[slideIndex-1].className += " active";
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
        
    }
}


