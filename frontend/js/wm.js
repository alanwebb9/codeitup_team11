var map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 53.454072, lng: -7.825874 },
    zoom: 7.1
  });
  setMarkers(map);
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
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
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
      zIndex: beach[3]
    });
  }
}

//reverse geocoding

// on page load
window.onload = function(){
  // let user_detail = document.cookie
  // if (user_detail == ""){
  //   new_user =
  //   document.cookie = "windgameid=";
  //   user_id = 1
  //   user_url = "http://0d6b3d9a.ngrok.io/api/v1/users/?format=json"
  //   score = fetch(user_url).
  // }
    // document.cookie = "windgameid=1";
    user_id = 1
    user_url = "http://0d6b3d9a.ngrok.io/api/v1/users/" + "{0}/?format=json"
    score = fetch(user_url).then(response => response.text())
      .then(user => {
        console.log(user)
        let score = document.querySelector("#score")
        let power = document.querySelector("#power")

      })

}
