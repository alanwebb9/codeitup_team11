var map;
var overlay;
var xoff = 0;
var yoff = 0;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 53.454072, lng: -7.825874 },
    zoom: 7.1
  });
  setMarkers(map);

  map.addListener("center_changed", function() {
    // 3 seconds after the center of the map has changed, pan back to ireland as center
    window.setTimeout(function() {
      map.panTo({ lat: 53.454072, lng: -7.825874 });
    }, 500);
  });
  overlay = new google.maps.OverlayView();
  overlay.draw = function() {};
  overlay.setMap(map);
}

var beaches = [
  ["Galway 1", 53.539033, -10.122016, 4],
  ["Claire 1", 52.688403, -9.484809, 5],
  ["Mayo 1", 54.174042, -9.858344, 3],
  ["kerry 1", 52.441311, -9.649604, 2],
  ["kerry 2", 52.158682, -10.441789, 1]
];

function setMarkers(map) {
  // Adds markers to the map.

  // Marker sizes are expressed as a Size of X,Y where the origin of the image
  // (0,0) is located in the top left of the image.

  // Origins, anchor positions and coordinates of the marker increase in the X
  // direction to the right and in the Y direction down.
  var image = {
    url: "assets/pngfuel.com-1.png",
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(32, 68),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0)
    // The anchor for this image is the base of the flagpole at (0, 32).
    // anchor: new google.maps.Point(0, 32)
  };
  // Shapes define the clickable region of the icon. The type defines an HTML
  // <area> element 'poly' which traces out a polygon as a series of X,Y points.
  // The final coordinate closes the poly by connecting to the first coordinate.
  var shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: "poly"
  };
  for (var i = 0; i < beaches.length; i++) {
    var beach = beaches[i];
    var marker = new google.maps.Marker({
      position: { lat: beach[1], lng: beach[2] },
      map: map,
      icon: image,
      shape: shape,
      title: beach[0],
      zIndex: beach[3],
      draggable: true
    });
    // now attach the event
    google.maps.event.addListener(marker, "dragend", function() {
      console.log(marker.getPosition().lat());
      console.log(marker.getPosition().lng());
      updateStats();
    });
  }
}

function placeMarker(location) {
  var image = {
    url: "assets/pngfuel.com-1.png",
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(32, 68),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0)
    // The anchor for this image is the base of the flagpole at (0, 32).
    // anchor: new google.maps.Point(0, 32)
  };
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: image,
    draggable: true
  });
  // now attach the event
  google.maps.event.addListener(marker, "dragend", function() {
    console.log(marker.getPosition().lat());
    console.log(marker.getPosition().lng());
    updateStats();
  });
}

$(document).ready(function() {
  $(".marker_dragable").draggable({
    helper: "clone",
    stop: function(e) {
      var point = new google.maps.Point(e.pageX - xoff, e.pageY - yoff);
      var ll = overlay.getProjection().fromContainerPixelToLatLng(point);
      placeMarker(ll);
      // console.log($(this));
      $(this).remove();
      updateStats();
    }
  });

  var xoff = getOffset(document.getElementById("map")).left;
  var yoff = getOffset(document.getElementById("map")).top;
});

function updateStats() {
  var power = Math.floor(Math.random() * 10);
  var tempPower = parseInt($(".varPower").html());
  power >= 6 ? (tempPower -= power) : (tempPower += power);

  $(".varPower").html(tempPower);
}

function getOffset(el) {
  var _x = 0;
  var _y = 0;
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return { top: _y, left: _x };
}

//reverse geocoding

// https://0d6b3d9a.ngrok.io/api/v1/?format=json
