$(document).ready(function() {

  $('.btn-rand').tooltip("show");

  // Get Random Quote
  // initialize first quote
  getRandomQuote(Math.floor(Math.random() * 100));
  //console.log(getRandomPics("mountain"));

  $(".btn-rand").on("click", function(){
    getRandomQuote(Math.floor(Math.random() * 100));
  });

});

function getRandomQuote(randomId){
  var quote, author, cat;
  var html = "";
  var $wrapper = $("#quote-wrap .inner");
  var randomId = (typeof randomId === 'undefined') ? 0 : randomId;

    $.getJSON("https://crossorigin.me/https://talaikis.com/api/quotes/", function(data) {
    /*
    var items = [];
    $.each(json, function(key, val){
      items.push("Key: " + key + " Value: " + val + "<br />");
    });
    html += items.join("");
    */

    // Main Quote
    if(randomId){
      quote = data[randomId]["quote"];
      author = data[randomId]["author"];
    } else{
      quote = data[0]["quote"];
      author = data[0]["author"];
    }

    html += "<h2>" + quote + "</h2>";
    html += "<p>" + author + "</p>"
    html += "<div class='soc-items'><a class='twitter-share-button' href='https://twitter.com/intent/tweet?text="+ quote +"'><i class='fa fa-twitter' aria-hidden='true'></i></a>";
    html += '<div class="fb-share-button" data-href="https://github.com/ynnossence/randomquote" data-layout="button" data-size="large" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fgithub.com%2Fynnossence%2Frandomquote&amp;src=sdkpreparse"><i class="fa fa-facebook" aria-hidden="true"></i></a></div></div>';
    $wrapper.html(html);

    // Additional Quote
    for(var x = 1; x <= 3; x++){
      var $box = $(".box-" + x);
      var temp = Math.floor(Math.random() * 100);
      var randomPic = Math.floor(Math.random() * 10);
      var pics = getRandomPics(data[temp]["cat"]);
      var picAuthor, picUrl;
      if(pics["results"][randomPic].user){
        picAuthor = pics["results"][randomPic].user.first_name + " " + pics["results"][randomPic].user.last_name;
        picUrl = pics["results"][randomPic].user.links.html;
      } else{
        picAuthor = "No Author";
        picUrl = "#";
      }

      var boxcontent = "<div class='inner-box'><h4>" + data[temp]["quote"] + "</h4>";
      boxcontent += "<p> - " + data[temp]["author"] + "</p></div><p class='credit'>&lt;Photo by <a href='"+ picUrl +"'>" + picAuthor + "</a> / <a href='https://unsplash.com/'>Unsplash</a>&gt;</p>";

      $box.html(boxcontent);
      $box.css({"background-image":"url("+ pics["results"][randomPic]["urls"].small +")"});
    }

 });

}


function getRandomPics(cat){
 var items = [];
  $.ajax({
    url: "https://api.unsplash.com/search/photos/?page=1&per_page=12&query="+ cat +"&client_id=1835a52657f823202c7782ef2321584f657bb07e97c28d536e9aa6fa810fcb83",
    async: false,
    dataType: 'json',
    success: function(data){
      items = data;
    }
  });

  return items;
}
