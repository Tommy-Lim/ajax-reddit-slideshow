var images = [];
var posts = {};
var count = 0;
var jsonObject = {};

var getAjaxRedditImages = function(term){
  $.ajax({
    url: 'https://www.reddit.com/search.json?q='+term+'+url%3Apng',
    method: 'GET',
    success: function(response){
      responseImagesToObject(response);
      jsonObject = response;
    },
    error: function(response){
      printResponseToConsole(response);
    },
  });
};

var responseImagesToObject = function(input){
  posts = input.data.children;
  posts.forEach(function(post){
    var str = post.data.url;
    if(str.endsWith(".png")||str.endsWith(".jpg")){
      images.push(str);
    }
  });
};

var printResponseToConsole = function(input){
  console.log("AJAX error");
};

var changeBackground = function(link){
  $("#slide").css("background-image", "url('"+link+"')");
};

var intervalChange = function(){
  changeBackground(images[0]); //why isnt images an object yet? How do i start immediately?
  setInterval(function(){
    var linkFromArray = images[count];
    changeBackground(linkFromArray);
    if(count==images.length){
      count=0;
    } else{
      //nothing
    }
    // console.log(linkFromArray);
    count++;
  },2000);
};

var hideSearchAndDarken = function(){
  $("#search-form").fadeOut();
  $("h1").fadeOut();
  $("h5").fadeOut();
  $("body").css("background-image","linear-gradient(rgb(100, 100, 100),rgb(0, 0, 0))");
};

$("#search-form").submit(function(event){
  event.preventDefault();
  var searchTerm = event.target.search.value;
  getAjaxRedditImages(searchTerm);  //is it possible to run this in sequence so the images object exists?
  // changeBackground(images[0]);
  intervalChange();
  hideSearchAndDarken();
});