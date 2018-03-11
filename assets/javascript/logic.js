$(document).ready(function() {

    // preexisting variables; these will be our buttons that load at the start
    // A new submission will be stored here
    var interests = ['surfing', 'fishing', 'swimming', 'cats','dogs', 'golf', 'dancing', 'soccer','football','baseball','disc golf','basketball']

    // create buttons for all interests in the array

    function createButtons() {
      

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
            // prevents blank buttons
            if (newButton === "") {
                return false;
            }
            interests.push(newButton);
            createButtons();
        });
        createButtons();

    // grabs gif from Giphy API
    function retrieveGif () {
        
        var giphyTopic = $(this).attr('data-name');
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + giphyTopic + '&api_key=egCE8hOkHeNVvBn6y6IB8I7aFuejtR0U&limit=10';
        

        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .then(function(response) {

            
            var search = response.data;
            // goes through returned object
            // creates div to hold rating and image
            for(i = 0; i < search.length; i++) {
            var gifLocation = $('<div>');
            gifLocation.addClass('giph');
            var rating = $('<p>').text('Rating: ' + search[i].rating);
            gifLocation.append(rating);
            // sets src for initial still image
            // sets data state of image to correct location in the search object
            var image = $('<img>');
            image.addClass('image');
            image.attr('src', search[i].images.fixed_height_still.url);
            image.attr('data-still', search[i].images.fixed_height_still.url);
            image.attr('data-animate', search[i].images.fixed_height.url);
            image.attr('data-state', 'still');

            gifLocation.append(image);

            // adds the div to top of page

            $('#myGiphy').prepend(gifLocation);
            

           
            }
        });
    
    } 

    // upon clicking specific button, gif is retrieved from Giphy API
    $(document).on('click', '.myInterests', retrieveGif);

    // logic to switch between data states
    $(document).on('click', '.image', function() {
        var state = $(this).attr('data-state');
       if (state === 'still') {
           $(this).attr('src', $(this).attr('animate'));
           $(this).attr('data-state', 'animate');
       }
       else {
           $(this).attr('src', $(this).attr('still'));
           $(this).attr('data-state', 'still');
       }
    });
});