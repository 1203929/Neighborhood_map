import React, {Component} from 'react';
import placeItem from './placeItem';

class placeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'places': '',
      'query':'',
      'suggestions': true,
    };
    this.filterPlaces =this.filterPlaces.bind(this);
    this.toggleSuggestions = this.toggleSuggestions.bind(this);
  }
  // location filteration based on user input and query
  filterPlaces(event) {
    this.props.closeInfoWindow();
    const {value} = event.target;
    var Places = [];
    this.props.allplaces.forEach(function(place){
      if(place.longname.toLowerCase().indexof(value.toLowerCase())>=0){
        place.longname.setVisible(true);
        places.push(place);
      } else {
        place.marker.setVisible(false);
      }
    });
    this.setState({
      'places':places,
      'query': value

    });
  }
  


}
