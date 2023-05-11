/*   Psuedo code for movie details



fetch
then
format html elements

*/
//on load use passed movie id/title to call api to get details
let movieData = localStorage.getItem('movie');
// localStorage.clear();
console.log(movieData);
const movieID = JSON.parse(movieData).id;
const movieTitle = JSON.parse(movieData).name;
const imdb_id = JSON.parse(movieData).imdb_id;
const poster = JSON.parse(movieData).poster;
const type = JSON.parse(movieData).type;

console.log(movieID);

function populateFootNotes(movie) {
    const fnTable = document.createElement('table');

    const fnRow1 = document.createElement('tr');
    const fnRow2 = document.createElement('tr');

    const fnCell1 = document.createElement('td');
    const fnCell2 = document.createElement('td');
    const fnCell3 = document.createElement('td');
    const fnCell4 = document.createElement('td');
    const fnCell5 = document.createElement('td');

    const fnLink = document.createElement('a');
    const fnImg = document.createElement('img');

    fnCell1.innerText='Rating:';
    fnRow1.append(fnCell1);

    fnCell2.innerText=movie.us_rating;
    fnRow1.append(fnCell2);

    fnCell3.setAttribute('rowspan',2);
    fnLink.href=`https://www.imdb.com/title/${movie.imdb_id}`
    fnImg.src='images/IMDBtb.png';
    fnLink.append(fnImg);
    fnCell3.append(fnLink);
    fnRow1.append(fnCell3);
    
    fnTable.append(fnRow1);

    fnCell4.innerText='Runtime:';    
    fnRow2.append(fnCell4);

    fnCell5.innerText=movie.runtime_minutes;
    fnRow2.append(fnCell5);

    fnTable.append(fnRow2);

    return fnTable;
}

function populateMoviePage(movie){
    console.log(movie);
    const movieTitle = document.querySelector('#title');
    const moviePlot = document.querySelector('#details');
    const moviePoster = document.querySelector('#poster > img');
    const movieRating = document.querySelector('#rating');
    const movieFootNotes = document.querySelector('#footnotes');

    movieTitle.innerText = movie.title;
    moviePlot.innerText = movie.plot_overview;
    moviePoster.src = poster;
    if (movie.critic_score) {
        criticScore = movie.critic_score;
    } else {
        criticScore = 'N/A'
    };
    movieRating.innerHTML = '&nbsp;&nbsp;🍅&nbsp;&nbsp;Critic Rating:&nbsp;&nbsp;&nbsp;&nbsp;'+ criticScore + '<br>'+
                            '&nbsp;&nbsp;✨&nbsp;&nbsp;User Rating:&nbsp;&nbsp;&nbsp;&nbsp;' + movie.user_rating;
    // movieFootNotes.innerHTML = 'Rating: '+ movie.us_rating + '<br>'+
    //                             'Runtime: ' + movie.runtime_minutes + ' min';
    // movieFootNotes.innerHTML =                            
    // `<table>
    //     <tr>
    //         <td>Rating:</td>
    //         <td>${movie.us_rating}</td>
    //         <td rowspan='2'><a href='https://www.imdb.com/title/${movie.imdb_id}'><img src='images/IMDBtb.png'/></a></td>
    //     </tr>
    //     <tr>
    //         <td>Runtime:</td>
    //         <td>${movie.runtime_minutes}</td>
    //     </tr>
    // </table>`;

    footNotesTable=populateFootNotes(movie);
    movieFootNotes.append(footNotesTable);

}


const titleDetailsURL = `https://api.watchmode.com/v1/title/${movieID}/details/?apiKey=bkzyP0dAymwzKoyjlBNVHHCld7cFfWXlwegOwfHr`;

const titleDetails = fetch(titleDetailsURL).catch(err => console.log(err))

 titleDetails
    .then(titleDetails => {
        return titleDetails.json()
        }
    )
    .then(movieDetail => {
        // console.log(movieDetail)
        populateMoviePage(movieDetail);
        
    }); 
    
   