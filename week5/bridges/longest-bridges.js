let mapCenter = [44.96, -93.2]
let zoomLevel = 3
let map = L.map('longest-bridges').setView(mapCenter, zoomLevel)

L.tileLayer(
  'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
  ,
  id: 'mapbox.streets',
  accessToken: ''
}).addTo(map)


let bridges = [
  { name: 'Verrazano-Narrows Bridge', city: 'New York', state: 'Ny', span: '1298.4', location: [40.6066, -74.0447] },
  { name: 'Golden Gate Bridge', city: 'San Francisco and Marin', state: 'CA', span: '	1280.2', location: [37.8199, -122.4783] },
  { name: 'Mackinac Bridge', city: 'Mackinaw and St Ignace', state: 'MI', span: '1158.0 ', location: [45.8174, -84.7278] },
  { name: 'George Washington Bridge', city: 'New York', state: 'NJ', span: '1067.0 ', location: [40.8517, -73.9527] },
  { name: 'Tacoma Narrows Bridge', city: 'Tacoma and Kitsap', state: 'WA', span: '853.44', location: [47.2690, -122.5517] }
]

var bridgeIcon = L.icon({
  iconUrl: 'bridge.png',
  iconSize: [32, 32], // size of the icon
});

bridges.forEach(function (bridge) {
  L.marker(bridge.location, { icon: bridgeIcon })
    .bindPopup(`${bridge.name}<br>${bridge.span} meters`)
    .addTo(map)
})

// chart for longest bridges
const canvas = document.getElementById('longest-bridges-chart')
const ctx = canvas.getContext('2d')

const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: bridges.map(function (bridge) { // return array of bridge names
      return bridge.name
    }),
    datasets: [{
      label: 'Longest Bridges ',
      data: bridges.map(function (bridge) { // return array of bridge spans
        return bridge.span
      }),
      backgroundColor: ['red', 'blue', 'yellow', 'green', 'orange']
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
})