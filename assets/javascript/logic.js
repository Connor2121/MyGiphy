$(document).ready(function() {

    // preexisting variables; these will be our buttons that load at the start
    // A new submission will be stored here
    var interests = ['surfing', 'fishing', 'swimming', 'cats','dogs', 'golf', 'dancing', 'soccer','football','baseball','disc golf','basketball']

    // create buttons for all interests in the array

    function createButtons() {
        $('#giphyButtons').empty();

        for(i = 0; i < interests.length; i++) {
            var giphyButton = $('<button>');
            giphyButton.addClass('myInterests');
            giphyButton.addClass('btn btn-primary');
            giphyButton.attr('data-name', interests[i]);
            giphyButton.text(interests[i]);
            $('#giphyButtons').append(giphyButton);
        }
    }       


        // add new interest to array on click of submit button
        // create new button for that interest and append to page

        $('#newGiphySubmit').on('click', function(event) {
            event.preventDefault();
            var newButton = $('#newGiphy').val().trim();
            if(newButton === "") {
                return false;
            }
            interests.push(newButton);
            createButtons();
        });
        createButtons();

    
    function retrieveGif () {
        
        var giphyTopic = $(this).attr('data-name');
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + giphyTopic + '&api_key=egCE8hOkHeNVvBn6y6IB8I7aFuejtR0U&limit=10';
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .then(function(response) {

            console.log(response);
            var search = response.data;

            for(i = 0; i < search.length; i++) {
            var gifLocation = $('<div>');
            gifLocation.addClass('giph');
            var rating = $('<p>').text('Rating: ' + search[i].rating);
            gifLocation.append(rating);

            var image = $('<img>');


            $('#myGiphy').prepend(gifLocation);
            

            //createButtons();
            }
        });
    
    } 

    $(document).on("click", ".myInterests", retrieveGif);


    





     










})