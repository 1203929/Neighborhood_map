import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {

  state = {
    venues:[]
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
      query:"Park",
      near:"Kolkata"
      v:"20182507"
    }
    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response=> {
      this.setState({
        venues: response.data.response.groups[0].items
      })
    })
    .catch(error =>{
      console.log("ERROR!" + error)
    })

  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById('map'),{
      center: {lat: 22.572645, lng: 88.363892},
      zoom : 8
    })
  }
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
