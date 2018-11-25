import React, { Component } from 'react';
import placeList from './placeList';
class App extends Component {

  constructor(props)  {
    super(props);
    this.state = {
      'allplaces' : [
        {
          'name' : "Aquatica",
          'type' : "Water Park",
          'latitude':22.562575,
          'longitude':88.46522,
          'streetAddress': "Rajarhat Township, Kolkata, West Bengal 700156"
        },
        {
          'name':"Nicco Park",
          'type':"Water Park",
          'latitude':22.57126,
          'longitude':88.420556,
          'streetAddress':"Salt Lake City, Kolkata, West Bengal 700106"
        },
        {
          'name': "Eco Park",
          'type': "Urban Park",
          'latitude': 22.603134,
          'longitude':88.467143,
          'streetAddress':"Action Area II, Newtown, Kolkata, West Bengal 700156"
        },
      {
        'name':"Md Ali Park",
        'type':"Public place",
        'latitude':22.577189,
        'longitude':88.360737,
        'streetAddress':"College Square, Kolkata, West Bengal 700073"
      },
      {
        'name':"Millenium Park",
        'type':"Romantic Park",
        'latitude':22.572821,
        'longitude':88.344549,
        'streetAddress':"BBD Bagh, Kolkata, West Bengal 700001"
      },
      {
        'name': "Victoria Memorial",
        'type': "Museum",
        'latitude':22.544808,
        'longitude':88.344549,
        'streetAddress':"Queens Way, Kolkata, West Bengal 700071"
      },
      {
        'name': "Science City",
        'type':"Science Centre",
        'latitude':22.539056,
        'longitude':88.395825,
        'streetAddress':"Topsia, Kolkata, West Bengal 700046"
      },
      {
        'name':"Birla Planetarium",
        'type':"Planetarium",
        'latitude':22.545514,
        'longitude':88.347316,
        'streetAddress': " Adjacent To St, Kolkata, West Bengal 700071"
      },
      {
        'name':"Alipore Zoo",
        'type':"Zoo",
        'latitude':88.33167,
        'longitude':22.537011,
        "streetAddress":"Alipore Road, Alipore, Kolkata"
      },
      {
        'name':"Eden Garden",
        'type':"Cricket Stadium",
        'latitude':22.564608,
        'longitude':88.343265,
        'streetAddress':"BBD Bagh, Kolkata, West Bengal 700021"
      }

    ],
    }
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
