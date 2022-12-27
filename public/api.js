var getButton=document.getElementById("user_form");
getButton.addEventListener("submit", getRequest);

function getRequest(event) {
    event.preventDefault();
    fetch('/movies')
       .then(function(response) {
         return response.json();
        })
       .then(function(data) {
         for(var i in data) {
            document.getElementById("results").innerHTML += data[i].movieTitle + '<br/>';
         }
        
        
        console.log(stringify.JSON(data));
        
        })
};

       