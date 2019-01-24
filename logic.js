// SETUP VARIABLES
// =====================================================================

var apiKey = "uAbFOL7EVXrGJP80oh4IVOYvwztgBbxI";

// Search Parameters
var queryTerm   = "";
var numResults  = 0;
var startYear   = 0;
var endYear     = 0;

//URL Base
var corsAnywhereUrl = "https://cors-anywhere.herokuapp.com/";
var queryURLBase = corsAnywhereUrl + "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey;
console.log(queryURLBase);

// Variable to Track number of articles
var articleCounter = 0;

// FUNCTIONS
// =====================================================================

function runQuery(numArticles, queryURL) {

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(NYTdata) {
            
            console.log(NYTdata.response.docs[1].headline.main);
            // If you have condition set to NYTdata.response.docs.length then the loop will iterate over the entire set of data returned, however, if you use the condition as i < numArticles then the loop will iterate over the numArticle selected by user. 
            for (var i = 0; i < numArticles; i++) {
                console.log("Headline: " + NYTdata.response.docs[i].headline.main);
                console.log("Section: " + NYTdata.response.docs[i].section_name);
                console.log("Pub_Date: " + NYTdata.response.docs[i].pub_date);
                console.log("Web_URL: " + NYTdata.response.docs[i].web_url);
                console.log("Byline: " + NYTdata.response.docs[i].byline.original);
                
                // Start Dumping to HTML Here
                var wellSection = $("<div>");
                wellSection.addClass("well");
                wellSection.attr("id", "articleWell-" + i);
                $("#well-section").append(wellSection);

                // Attach the content to the appropriate well
                $("#articleWell-" + i).append("<h3>" + NYTdata.response.docs[i].headline.main + "<h3>");
            };

            // Logging to Console
            console.log("queryURL: " + queryURL);
            // Check if numArticles is working in runQuery function
            console.log("numArticles: " + numArticles);
            console.log(NYTdata); 
    })

}


// MAIN PROCESSES
// =====================================================================
// 1. Retrieve user inputs and convert to variables
// 2. Use those variable to run an ajax call to the New York Times.
// 3. Break down the NYT Object into usable fields
// 4. Dynamically generate html content
// 5. Dealing with "edge cases" --- bugs or situations that are note obvious/intuitive

$("#search-button").on("click", function() {

    // Retrive user input from search-term
    var $queryTerm = $("#search-term").val().trim();
    console.log("queryTerm: " + $queryTerm);

    // Create URL to pass through ajax request function.
    var newURL = queryURLBase + "&q=" + $queryTerm;
    console.log("newURL: " + newURL);

    // Retrieve user input from Number of Records
    numResults = $("#number-of-records").val();


    // Retrive user input from Start Year and End Year
    startYear = $("#start-year").val().trim();
    console.log("Start Year:" + startYear);
    endYear = $("#end-year").val().trim();
    console.log("End Year:" + endYear);

        // Create if condition because the startYear and endYear user inputs are optional. We will only update the newURL with the dates if the user inputs date ranges. Need to use parseInt to ensure it's read a number value.
        if (parseInt(startYear)) {
            newURL = newURL + "&begin_date=" + startYear + "0101";
        };

        if (parseInt(endYear)) {
            newURL = newURL + "&end_date=" + endYear + "0101";
        };
    

    runQuery(numResults, newURL);

    return false;
});


