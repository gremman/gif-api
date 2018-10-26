// JS after HTML function
$(document).ready(function () {
  
  // changed food theme to "places" to get better gifs
  var foods = ["forest", "ocean", "sea", "flower garden", "waterfall", "playground", "mountain", "kids park", "San Francisco", "Paris", "Yosemite", "winery"];

function renderButtons() {
  // Deleting the buttons before adding new buttons
        $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }
 }

// Add content to buttons by pulling from array"
  function addContent(arrayToUse, classToAdd, areaToAddTo) {

    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-name", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }
 }

//  Adding gifs when you click on the button
$(document).on("click", ".food-button", function () {
  $("#gifs").empty();
  $(".food-button").removeClass("active");
  $(this).addClass("active");

  var picnic = $(this).attr("data-name");

  // Constructing a queryURL using the places name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    picnic + "&api_key=dc6zaTOxFJmzC&limit=10";

  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After data comes back from the request (see movie gif activity)
    .then(function (response) {
      console.log(queryURL);
      console.log(response);
      var results = response.data;

      // Looping through each result item 
      // to add floats to this class use "class=\"TITLE"\
      for (var i = 0; i < results.length; i++) {
        var foodDiv = $("<div class=\"style-gif\">");

        var p = $("<p>").text("Rating: " + results[i].rating);

        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;

        // Pull data that will animate and pause gifs
        var foodImage = $("<img>");
        foodImage.attr("src", still);
        foodImage.attr("data-still", still);
        foodImage.attr("data-animate", animated);
        foodImage.attr("data-state", "still");
        foodImage.addClass("food-image");

        foodDiv.append(p);
        foodDiv.append(foodImage);

        $("#gifs").prepend(foodDiv);
      }
    });
});

// Enable click function to animate and pause gifs, need to create a class
$(document).on("click", ".food-image", function () {

  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }
  else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

  addContent(foods, "food-button", "#view-buttons");

  renderButtons();
});

