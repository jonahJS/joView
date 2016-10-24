$(document).ready(function () {

  // ===================
  // BEGIN CONFIGURATION
  // ===================
  var joView = {
    joView: "joView", // main container for entire app
    sliderScreen: "joViewScreen", // slider container for slides
    slides: "joViewSlides", // target divs to store content
    leftClick: "joViewLeft", // left button
    rightClick: "joViewRight", // right button
    pathToJoView: "../joView/viewContent", // path to viewContent folder
    defaultTimer: 1000, // delay of animation unless noted with joTimer attribute
    dynamicWidth: true // width of joView dynamic or not?
  };

  // List content here in object with "jv#" as key and name of item as the value
  var viewContent = {
    "jv1": "slider_intro",
    "jv2": 1,
    "jv3": "slider_example",
    "jv4": 2,
  };

  // ===================
  // END CONFIGURATION
  // ===================

  // Set variables here
  var $window = $(window);
  var // content holder
    contentHolder = document.getElementById(joView.slides), //target scrolling div
    $contentHolder = $(contentHolder);
  var
    slider = document.getElementById(joView.sliderScreen),
    $slider = $(slider);
  var // left & right clickers
    left = document.getElementById(joView.leftClick),
    $left = $(left),
    right = document.getElementById(joView.rightClick),
    $right = $(right);
  var path = joView.pathToJoView;
  var cont = "null";
  var type = "null";
  var payload = "null";
  var index = 0;
  var direction = "null";

  var looper = function (direction) {
    if (direction == "left") {
      if (index === 0) {
        index = totalElems(viewContent) - 1;
        console.log("minus 1: " + index);
      } else if (index <= 3) {
        index--;
        console.log("minus 1: " + index);
      }
    } else if (direction == "right") {
      if (index === 3) {
        index = 0;
        console.log("plus 1: " + index);
      } else if (index >= 0) {
        index++;
        console.log("plus 1: " + index);
      }
    }
    return index;
  };

  // Count how many key:value pairs in viewContent
  var totalElems = function (obj) {
    var total = 0;
    for (var k in obj) {
      if (obj.hasOwnProperty(k)) {
        // console.log(k + " -> " + obj[k]);
        total++;
      }
    }
    return total;
  };


  // This finds the type of object
  var viewType = function (key) {
    var objType = typeof viewContent[key];
    // console.log("objType " + key + " is a " + objType);
    return objType;
  };

  // Injects slides into $contentHolder - numbered with ID and outputs array of allDivs
  var slideInjector = function (obj, totalSlides) {
    var
      beginDiv = "<div class='joViewElement' id='",
      endDiv = "'></div>",
      div = "";
    var i = 0;
    for (var key in obj) {
      div = beginDiv + key + endDiv;
      $contentHolder.append(div);
      i++;
    }
  };

  // Injects the content into the already injected views. takes totalElems as param
  var viewInjector = function (totalViews, obj) {
    var injected = slideInjector(viewContent, totalViews);
    for (var key in obj) {
      divId = key;
      div = document.getElementById(divId);
      if (viewType(key) === "string") {
        cont = String(path + "/views.html #" + obj[divId]);
        type = "string";
        payload = $(div).load(cont);
        $(div).html(payload);
      } else {
        cont = String(path + "/" + obj[divId] + ".png");
        type = "image";
        payload = "<img src='" + cont + "' />";
        $(div).html(payload);
      }
    }
  };

  viewInjector(totalElems(viewContent), viewContent);


  // switching slides
  var reset = function (slider) {

  };

  var slideLeft = function (slide) {

  };

  var slideRight = function (slide) {

  };

  $left.click(function () {
    if (looper("left") === 3) {
      reset();
    }
    slideLeft();
  });

  $right.click(function () {
    looper("right");
    slideRight();
  });

  // Resizing the dynamic view
  var slideWidth = document.getElementById(joView.sliderScreen).offsetWidth;
  var sliderWidth = totalElems(viewContent) * slideWidth;

  var resizeSlides = function () {
    slideWidth = document.getElementById(joView.sliderScreen).offsetWidth;
    sliderWidth = totalElems(viewContent) * slideWidth;
    $(".joViewElement").css("width", slideWidth);
    $("#" + joView.slides).css("width", sliderWidth);
    // console.log("width: " + slideWidth);
  };

  if (joView.dynamicWidth === true) {
    resizeSlides();
    $window.on('resize', resizeSlides);
  } else if (joView.dynamicWidth === false) {
    resizeSlides();
    // console.log("width: " + slideWidth);
  }

});
