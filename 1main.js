$(document).ready(function () {

  // ===================
  // BEGIN CONFIGURATION
  // ===================
  var joView = {
    target: "joViewSlides", // target div to store content
    leftClick: "joViewLeft",
    rightClick: "joViewRight",
    pathToJoView: "../viewContent",
    defaultTimer: 500, // delay of animation unless noted with joTimer attribute
  };

  var viewContent = [
    "slider_intro",
    1,
    2,
    "slider_example",
  ];

  // ===================
  // END CONFIGURATION
  // ===================

  // Loops the images
  var repeater = function (i) {
    if (i >= total) {
      index = 0;
      return index;
    } else if (i < 0) {
      index = total - 1;
      return index;
    } else {
      return index;
    }
  };

  var $window = $(window);

  var // # items in array
    total = viewContent.length;

  var // content holder
    contentHolder = document.getElementById(joView.target), //target scrolling div
    $contentHolder = $(contentHolder);

  var // left & right clickers
    left = document.getElementById(joView.leftClick),
    $left = $(left),
    right = document.getElementById(joView.rightClick),
    $right = $(right);

  var path = joView.pathToJoView;

  var cont = "null";
  var type = "null";

  var index = 0;

  // This finds the type of object
  var viewType = function (view) {
    var objType = typeof viewContent[view];
    console.log("objType is a " + objType);
    return objType;
  };

  // Injects views into $contentHolder - numbered with ID and outputs array of allDivs
  var viewCreator = function (arr, totalViews) {
    var div = "";
    var allDivs = {};

    for (i = 0; i < totalViews; i++) {
      div = "<div class='joCont' id='jv" + i + "'></div>";
      $contentHolder.append(div);
      viewPair(arr[i], allDivs, i);
    }

    // test the object
    for (var items in allDivs) {
      console.log(items, allDivs[items]);
    }

    return allDivs;
  };

  var viewPair = function (arr, obj, num) {
    obj["jv" + num] = arr;
    return obj;
  };


  // Injects the content into the already injected views. takes viewCreator as param
  var viewInjector = function (totalViews) {
    var div = "";
    var divId = "";
    var prefix = "jv";
    var image = "";
    var obj = viewCreator(viewContent, totalViews);
    for (i = 0; i < totalViews; i++) {
      divId = prefix + i;
      div = document.getElementById(divId);
      if (viewType(i) === "string") {
        cont = String(path + "/views.html #" + obj[divId]);
        type = "string";
        console.log("string load: " + cont);
        var payload = $(div).load(cont);
        $(div).html(payload);
      } else {
        cont = String(path + "/" + obj[divId] + ".png");
        type = "image";
        console.log("picture link: " + cont);
        image = "<img src='" + cont + "' />";
        $(div).html(image);
      }
    }
  };

  viewInjector(total);

  var checkSliderLength = function () {
    return $contentHolder.width();
  };
  var checkSliderHeight = function () {
    return $contentHolder.height();
  };


  var len = checkSliderLength();

  var
    contentHolderChildren = contentHolder.childNodes,
    $contentHolderChildren = $(contentHolderChildren);


  // TODO THIS IS FUCKED UP
  var posChecker = function () {
    var firstDiv = $('#jv0');
    var pos = firstDiv.position().left;
    return pos;
  };


  var slideLeft = function (i) {
    var pos = posChecker();
    if (pos === 0) {
      $contentHolder.scrollLeft(len * total);
      console.log('lmfao');
    } else if (pos === (total * len) - len) {
      $contentHolder.scrollLeft((total - 1) * len);
      console.log('lolol');
    } else if (pos === (total * len) - (2 * len)) {
      $contentHolder.scrollLeft((total - 1) * len);
      console.log('lolol');
    }
    pos = posChecker();
  };

  var slideRight = function () {
    len = checkSliderLength();

    $contentHolder.scrollLeft(-len);
  };

  $left.click(function () {
    index--;
    repeater(index);
    slideLeft(index);
  });


  $right.click(function () {
    index++;
    repeater(index);
    slideRight();
  });
});
