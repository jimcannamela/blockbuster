

function getPoster(itemID){
    const posterURL = `http://www.omdbapi.com/?i=${itemID}&apikey=858456a1`;
    const posterRes = fetch(posterURL).catch(err => console.log(err))

  return posterRes
        .then(posterRes => {
            if(posterRes.status !== 200){
                return 'images/defaultPoster.png';
            } else {
                return posterRes.json()
            }
        })
        .then(poster => {
          if(poster.Poster){
            return poster.Poster;
          } else {
            return poster;
          }
        });
};



   


