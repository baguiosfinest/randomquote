$(document).ready(function() {

  var randomId = Math.floor(Math.random() * 100);

  // Get Random Quote
  // initialize first quote
  getRandomQuote(randomId);

  $(".btn-rand").on("click", function(){
    getRandomQuote(Math.floor(Math.random() * 100));
  });

  // get items
  //var items = getAdditionalQuotes(3);
  console.log(getAdditionalQuotes(3));
  // deploy on html
  /*
  for(var x = 1; x <= 3; x++){
    var boxcontent = "<h3>" + items[x].quote + "</h3>";
    boxcontent += "<p> - " + items[x].author + "</p>";
    $(".box-" + x).html(boxcontent);
  }*/

});

function getRandomQuote(randomId){

  var quote, author, cat;
  var html = "";
  var $wrapper = $("#quote-wrap .inner");

    $.getJSON("https://crossorigin.me/https://talaikis.com/api/quotes/", function(json) {
    /*
    var items = [];
    $.each(json, function(key, val){
      items.push("Key: " + key + " Value: " + val + "<br />");
    });
    html += items.join("");
    */
    quote = json[randomId].quote;
    author = json[randomId].author;
    cat = json[randomId].cat;
    html += "<h3>" + quote + "</h3>";
    html += "<p>" + author + "</p>"
    $wrapper.html(html);

    //console.log(json[randomId]);
 });
}

function getAdditionalQuotes(itemNumber){
  var quotes = [];

  $.getJSON("https://crossorigin.me/https://talaikis.com/api/quotes/", function(json) {
    for(var i = 0; i< itemNumber; i++){
      quotes.push(json[i]);
    }
   });
  return quotes;
}
