function randomShuffle(array) {
    for (i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}

$(document).ready(function () {
    $("#play").on("click", function () {
        $("#image").empty();
        var searchResult = $("#searchField").val().trim();
        var queryURL = "https://www.googleapis.com/customsearch/v1?q=" + searchResult + "&cx=017582625438444294087%3Aly6xfvmxhni&filter=1&imgSize=medium&imgType=photo&num=8&searchType=image&start=1&key=AIzaSyAHj9i08kkTs-82kUdXILGLyRmX3Fwfzro"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var photoUrls = [];

            for (i = 0; i < response.items.length; i++) {
                var result = response.items[i].link;
                photoUrls.push(result);
                photoUrls.push(result);
            }
            randomShuffle(photoUrls);
            randomShuffle(photoUrls);
            randomShuffle(photoUrls);

            var rowLimit = 4;
            var currentRowSize = 0;
            var currentRow;

            var count = 0;
            var click1 = true;
            var click1Flipper;
            var click1Result;

            for (i = 0; i < photoUrls.length; i++) {
                var result = photoUrls[i];

                if (currentRowSize % rowLimit == 0) {
                    currentRow = $("<div class='row'>").appendTo("#image");
                }

                var column = $("<div class='col-xs'>").appendTo(currentRow);
                var card = $("<div class='card' style='width: 10rem; height: 10rem;'>").appendTo(column);
                var flipperDiv = $("<div class='flipper'>").appendTo(card)
                $("<img src='images/logo.png' class='card-img-top game-card front' style='width: 10rem;height: 10rem;'>").appendTo(flipperDiv);
                $("<img src='" + result + "' class='card-img-top game-card back' style='width: 10rem;height: 10rem;'>").appendTo(flipperDiv);

                currentRowSize++;
            }


            $(".game-card").on("click", function () {
                // Disable clicks while handling stuff to prevent double clicks.
                $(".game-card").addClass("no-clicks");

                // Get the closest flipper (the one from this card)
                var flipper = $(this).closest(".flipper");
                // Toggle it (actually flip to the other side)
                flipper.toggleClass("is-flipped");
                // Get the image url from the card
                var imageUrl = flipper.children(".back").attr("src");

                console.log(imageUrl);

                if (click1 == true) {
                    click1Result = imageUrl;
                    click1Flipper = flipper;
                    click1 = false;
                    $(".game-card").removeClass("no-clicks");
                } else {
                    if (click1Result == imageUrl) {
                        console.log("its a match");
                        click1Flipper.children("img").off("click");
                        flipper.children("img").off("click");
                        $(".game-card").removeClass("no-clicks");
                        count++;

                        if (count == 8) {
                            // This shows  win crap
                            console.log("You Win!!!")

                            // Display the fireworks
                            $("#fireworks-overlay").css("display", "block");

                            // Set a timeout (how long to show the fireworks)
                            setTimeout(function () {
                                // Hide the fireworks
                                $("#fireworks-overlay").css("display", "none");

                                // Here you can display whatever you want for reset game.
                            }, 5000);
                        }
                    
                    } else {
                        console.log("you suck");
                        setTimeout(function () {
                            click1Flipper.toggleClass("is-flipped");
                            flipper.toggleClass("is-flipped");
                            $(".game-card").removeClass("no-clicks");
                        }, 1500);
                    }
                    click1 = true;
                }



            });

        });


    });
});
