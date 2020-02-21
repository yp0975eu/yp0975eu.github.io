const url = 'https://api.wheretheiss.at/v1/satellites/25544'
const updateInterval = 10000 * 60 * 5 // 5 minutes
const lat = document.getElementById('lat')
const long = document.getElementById('long')
const updateTime = document.getElementById('update-time')

let marker // to hold marker position
// I copied this it from the example
var map = L.map('iss-map').setView([0, 0], 1)  // Center at 0, 0 and max zoom out
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 7,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1IjoieXAwOTc1ZXUiLCJhIjoiY2s2cG91MTF6MW95czNka2czbTltb3hsaSJ9.dM5fZMq70DrbuDHGVyDA9g'
}).addTo(map)
// end copy

iss(3)

var icon = L.icon({
  iconUrl: 'iss.png',
  iconSize: [50, 50],
  iconAnchor: [25, 25]
})

function iss(retryAttempts) {
  fetch(url)
    .then(res => res.json())
    .then((issPosition) => {
      if (retryAttempts <= 0) {
        console.log('Too many failed attempts requests :( ')
        
        return
      }
      let latitude = issPosition.latitude
      let longitude = issPosition.longitude
      lat.innerHTML = latitude
      long.innerHTML = longitude

      updateTime.innerHTML = new Date(issPosition.timestamp)
      let position = [latitude, longitude]
      if (!marker) {
        marker = L.marker(position, { icon: icon }).addTo(map)
      } else {
        marker.setLatLng(position)
      }
    })
    .catch((err) => {
      retryAttempts--
      console.log(err)
    })
    .finally(setTimeout(iss, updateInterval, retryAttempts))
}
