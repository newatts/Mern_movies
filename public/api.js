///for GET form data from index.html in public folder

var getButton=document.getElementById("user_form_get");
getButton.addEventListener("submit", getRequest);

function getRequest(event) {
    event.preventDefault();
    var movieId = event.target.elements.movieId.value;
    fetch(`/movies/${movieId}` )
       .then(function(response) {
         return response.json();
        })
       .then(function(data) {
            if(!movieId) {
                
                for(var i in data) {
                    document.getElementById("results").innerHTML += data[i].movieTitle + '<br/>';
                }  
                console.log(JSON.stringify(data));
            }
            else {
                document.getElementById("results").innerHTML += data.movieTitle + '<br/>';
                console.log(JSON.stringify(data));
            }
        })
};


//end of GET form handler. index.html in public folder


//post form handler. index.html in public folder
var postButton=document.getElementById("user_form_post");
postButton.addEventListener("submit", newPost);

function newPost(post) {
    post.preventDefault();
    var movieTitle = post.target.movieTitle.value;
   /*  var movieYear = event.target.movieYear.value;
    var movieGenre = event.target.movieGenre.value; */
    var movieDirector = post.target.movieDirector.value;
   /*  var movieWriter = event.target.movieWriter.value;
    var movieActor = event.target.movieActor.value;
    var movieCountry = event.target.movieCountry.value;
    var movieDirectorCountry = event.target.movieDirectorCountry.value;
     */

    post={
        movieTitle:movieTitle,
               /*  movieYear:movieYear,
                movieGenre:movieGenre, */
                movieDirector:movieDirector,
               /*  movieWriter:movieWriter,
                movieActor:movieActor,
                movieCountry:movieCountry,
                movieDirectorCountry:movieDirectorCountry
 */
    }
    //defines if post or put... etc. 
    const options = {
        method: 'POST',
        body: JSON.stringify(post),
        headers:  new Headers({ 'Content-Type': 'application/json' }) 
    }
    return fetch('/movies', options)
           .then(res =>res.json())
            .then(res =>console.log(res))
            .then(error => console.log('error: ', error));

  //  console.log(movieTitle, movieDirector);
}

//delete button
var deleteButton=document.getElementById("user_form_delete");
deleteButton.addEventListener("submit", deletePost);

function deletePost(event) {
    event.preventDefault();
    var movieId = event.target.elements.movieId.value;
    console.log('movie', movieId);
    const options = {
        method: 'DELETE',
        headers:  new Headers({ 
            'Content-Type': 'application/json' 
        }), 
        body: JSON.stringify({ movieId: movieId })
    }
    const URL = `/movies/${movieId}`;

    fetch(URL, options)
           .then(res =>res.json())
           .then(data =>console.log('movie to delete', data))
}   