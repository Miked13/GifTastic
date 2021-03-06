$(document).ready(function () {
    var cartoons = ["Looney Tunes", "Tom and Jerry", "The Ren & Stimpy Show", "Ed, Edd, & Eddy", "Dexter's Laboratory", "Tex Avery", "Beavis and Butt-head", "Animaniacs"];
    //function to add a button by typing in the search bar
    function addButton() {
        $("#buttonContainer").empty();
        for (var i = 0; i < cartoons.length; i++) {
            var newButton = $("<button>");
            newButton.addClass("btn btn-info");
            newButton.attr("data-name", cartoons[i]);
            newButton.text(cartoons[i]);
            $("#buttonContainer").append(newButton);
        }
    }
    $("#addGif").on("click", function () {
        var cartoon = $("#search-term").val();
        cartoons.push(cartoon);
        addButton();
    });
    //function to dispay gifs when user clicks on gif buttons
    function displayGif() {
        var cartoon = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q="+cartoon+"&limit=10&api_key=HYE43IlOgwOMW76N5xykZtSWpK2YzIer&rating=g";

        $.ajax({
            url: queryURL,
            method: "GET"

        }).done(function (response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                var gifElement = $("<img>");
                gifElement.addClass("gif img-fluid float-left img-thumbnail");
                gifElement.attr("src", results[i].images.fixed_height_still.url);
                gifElement.attr("title", "Rating: " + results[i].rating);
                gifElement.attr("data-still", results[i].images.fixed_height_still.url);
                gifElement.attr("data-state", "still");
                gifElement.attr("data-animate", results[i].images.fixed_height.url);
                gifDiv.append(gifElement);
                $("#result").prepend(gifDiv);
            }
        });
    }
    //function to animate or stop gifs when user clicks on them
    $(document).on("click", ".gif", function () {
        var state = $(this).attr("data-state");
        if (state == "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }
    });
    $(document).on("click", ".btn-info",displayGif);
    $("#result").empty();
    addButton();
    
});