import React, { Component } from 'react';
import './App.css';
import placeList from './placeList.js';
import places from './places.json';
import Modal from './Modal';
class App extends Component {

  state = {
    destiny:[]
  }

  componentDidMount(){
    this.getVenues()
    this.renderMap()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?libraries=geometry&key=AIzaSyAcyPTUUECGcXAoDgx5YSSbmkJF0UZBIpU&v=3&callback=initMap")
    window.initMap = this.initMap
  }

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore"
    const parameters = {
      client_id: "F0XRUQHKU4MAN5HY3JZ0JTQCINFUFAU3HZ1ABOQJCMEJTZZG",
      client_secret:"FZGSXY3EP4PC2IZV1ER23ZST4CTFMNPEH5ECHPHW53CXWEIQ",

    }


    //to fetch FourSquare API request
    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response=> {
      this.setState({
        destiny: response.data.response.groups[0].items
      })
    })
    .catch(error =>{
      console.log("ERROR! " + error)
    })
  }

  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById('map'),{
      center: {lat: 22.572645, lng: 88.363892},
      zoom : 8
    })

      this.state.venues.destiny.map(myVenue => {
        var contentString = `${myVenue.destiny.name}`
        //info window
        var infoWindow = new window.google.maps.InfoWindow({
          content:contentString
        })
    var marker = new window.google.maps.Marker({
      position:{lat:myVenue.destiny.location.lat , lng:  myVenue.destiny.location.lng},
      map : map

    })
    marker.addListener('click',function(){
      infoWindow.setContent(contentString)
      infoWindow.open(map, marker)
    })
  })
  render() {
    return (
    <main>
      <div id="map"></div>
    </main>

    )
  }
}

function loadScript(url) {
  var index = window.document.getElementByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
  /*
  <script></script>
  */

}

export default App;
