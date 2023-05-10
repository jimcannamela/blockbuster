// This is our javascript there are otheres like it, but this is ours!!!
/*


1. Get the data from the input search bar - done

2. need a event listener for click - done

3. fetch data json - done

4. .then to return data from json -done

5. add items to result list
    include links to details page
    need second event listener on click of moview title or poster pass id of movie or series to movie page


*/
// 1. Get the data from the input search bar

const searchBarSubmit = document.querySelector("#search-bar-submit");
const resultsList = document.body.querySelector('#search-results-list');

function populateItem(title) {
    const listItem = document.createElement('li');
    // const titleLink = document.createElement('a');
    const itemTitle = document.createElement('h2');
    const itemType = document.createElement('p');
    const itemYear = document.createElement('p');
    const itemPoster = document.createElement('img');
    
    // Name
    
    // titleLink.setAttribute('href', 'movie.html')
    itemTitle.innerText=title.name;
    itemTitle.classList.add('movieLink');
    itemTitle.setAttribute('id', title.id);
    itemTitle.addEventListener("click", function(event){
        localStorage.setItem('movie', JSON.stringify(title));
        window.location.href = "movie.html";
    });
    // titleLink.append(itemTitle);
    listItem.append(itemTitle);

    // Type
    switch (title.type) {
        case 'movie':
            { itemType.innerText = 'Movie' };
            break;
        case 'series':
            { itemType.innerText = 'Series' };
            break;
        case 'short_film':
            { itemType.innerText = 'Short Film' };
                break;    
        case 'tv_miniseries':
            { itemType.innerText = 'TV Mini-Series' };
            break;        
        case 'tv_movie':
            { itemType.innerText = 'TV Movie' };
            break;
        case 'tv_series':
            { itemType.innerText = 'TV Series' };
            break;
        default :
            { itemType.innerText = title.type };
    };
    listItem.append(itemType);

    // Year
    itemYear.innerText=title.year;
    listItem.append(itemYear);
    //poster
    itemPoster.setAttribute('src',  title.poster); 
    listItem.append(itemPoster);
    
    resultsList.append(listItem);
}

searchBarSubmit.addEventListener("click", function(event)  {
    event.preventDefault();

    const searchBar = document.querySelector("#query").value;
    console.log(searchBar);

    const URL = `https://api.watchmode.com/v1/search/?apiKey=bkzyP0dAymwzKoyjlBNVHHCld7cFfWXlwegOwfHr&search_field=name&search_value=${searchBar}`;

    const response = fetch(URL).catch(err => console.log(err));
    let searchResults;

    response
        .then(response => {
            if(response.status !== 200){
                throw Error('Media not found')
            }
            while(resultsList.firstChild){
                resultsList.removeChild(resultsList.firstChild);
            }
            return response.json();
        })
        .then(movieData => { 
            console.log(movieData);
            searchResults = movieData.title_results;
            console.log(searchResults);
            // Alternate understanding of promise.all
            // const posterPromises = [];
            // for(let movie of searchResults){
            //     posterPromises.push(getPoster(movie.imdb_id))
            // }
            // return Promise.all(posterPromises)
            return Promise.all (searchResults.map(r => getPoster(r.imdb_id)))
        })
        .then(posters => {
            for(let p = 0; p < posters.length; p++){
                searchResults[p].poster = posters[p];
                populateItem(searchResults[p]);
            }
            
        })
        
        .catch(function(error) {
            // errorSpan.innerText = error;
            // errorDiv.classList.toggle("hidden",false)
            console.log(error)
        });
   
});

