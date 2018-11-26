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
    'map': '',
    'infoWindow':'',
    'prevmarker': ''
  };
  this.initMap = this.initMap.bind(this);
  this.openInfoWindow = this.openInfoWindow.bind(this);
  this.closeInfoWindow = this.closeInfoWindow.bind(this);
  }

  componentDidMount(){
        window.initMap = this.initMap;
        loadScript("https://maps.googleapis.com/maps/api/js?libraries=geometry&key=AIzaSyAcyPTUUECGcXAoDgx5YSSbmkJF0UZBIpU&v=3&callback=initMap")

  }

initMap() {
  var self = this;
  var mapview = document.getElementById('map');
  mapview.style.height = window.innerHeight + "px";
  var map = new window.google.maps.Map(mapview,{
    center:{lat:22.5726,lng:88.3639},
    zoom : 15,
    mapTypeControl: false
  });
  var InfoWindow = new window.google.maps.InfoWindow({});
  window.google.maps.event.addListener(InfoWindow, 'closeclick',function(){
    self.closeInfoWindow();
  });
  this.setState({
    'map':map,
    'infoWindow':InfoWindow
  });

  window.google.maps.event.addDomListenere(window, "resize",function(){
    var center = map.getCenter();
    window.google.maps.event.trigger(map,"resize");
    self.state.map.setCenter(center);
  });
  window.google.maps.event.addListener(map,'click', function(){
    self.closeInfoWindow();
  });

  var allocations = [];
  this.state.allocations.forEach(function(place){
    var longname = place.name + ' - ' + location.type;
    var marker = new window.google.maps.Marker({
      position: new window.google.maps.LatLng(location.latitude, location.longitude),
       animation: window.google.maps.Animation.DROP,
       map:map
    });
    marker.addListener('click', function(){
      self.openInfoWindow(marker);
    });
    place.longname = longname;
    place.marker = marker;
    place.display = true;
    allplaces.push(location);

  });
  this.setState({
    'allplaces': allplaces
  });


  /**getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore"
    const parameters = {
      client_id: "F0XRUQHKU4MAN5HY3JZ0JTQCINFUFAU3HZ1ABOQJCMEJTZZG",
      client_secret:"FZGSXY3EP4PC2IZV1ER23ZST4CTFMNPEH5ECHPHW53CXWEIQ",
      */

    }


  openInfoWindow(marker) {
    this.closeInfoWindow();
    this.state.infoWindow.open(this.state.map, marker);
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    this.setState({
      'prevmarker': marker
    });
    this.state.infoWindow.setContent('Loading content...');
    this.state.map.setCenter(marker.getPosition());
    this.state.map.panBy(0, -200);
    this.getMarkerInfo(marker);

  }


getMarkerInfo(marker){
  var self = this;
  var clientId = "F0XRUQHKU4MAN5HY3JZ0JTQCINFUFAU3HZ1ABOQJCMEJTZZG";
  var clientSecret = "FZGSXY3EP4PC2IZV1ER23ZST4CTFMNPEH5ECHPHW53CXWEIQ";
  var url = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20130815&ll=" + marker.getPosition().lat() + "," + marker.getPosition().lng() + "&limit=1";
  fetch(url)
        .then(
          function (response) {
            if(response.status !== 200) {
              self.state.infoWindow.setContent("Data Can't find");
              return;
            }


            response.json().then(function(data){
              var location_data = data.response.venues[0];
              var verified = '<b>verified Location::</b> +' + (location_data.verified ?'yes' : 'No') +'<br>';
              var checkinsCount = '<b>Number of CheckIn:</b>' + location_data.status.checkinsCount + '<br>';
              var usersCount = '<b>Number of Users: </b>' + location_data.stats.usersCount +'<br>';
              var tipCount = '<b>Number of Tips: </b>' + location_data.stats.tipCount + '<br>';
              var readMore ='<a href="https://foursquare.com/v/' + location_data.id +'" target="_blank">Read More on Foursquare Website</a>'
              self.state.infoWindow.setContent(checkinsCount + usersCount + tipCount + verified + readMore);

            });

          }
        )
        .catch(function(err) {
          self.state.infoWindow.setContent(" can't be loaded");
        });
}
closeInfoWindow(){
  if (this.state.prevmarker) {
    this.state.prevmarker.setAnimation(null);
  }
  this.setState({
    'prevmarker':''
  });
  this.state.infoWindow.close();


}

render() {
  return(
    <div>
    <placeList key="100" allocations={this.state.allocations} openInfoWindow={this.openInfoWindow}
          closeInfoWindow={this.closeInfoWindow}/>
          <div id= "map"></div>
      </div>
  );
}
}
