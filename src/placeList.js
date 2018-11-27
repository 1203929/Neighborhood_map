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
    var places = [];
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
  componentWillMount(){
    this.setState({
      'places': this.props.allplaces
    });
  }
 toggleSuggestions(){
   this.setState({
     'suggestions':!this.state.suggestions
   });
 }
//render function of placeList
render(){
  var placeList = this.state.places.map(function(listItem,index){
    return (
      <placeItem key={index} openInfoWindow={this.props.openInfoWindow.bind(this)} data={listItem}/>
    )
  },this);
  return (
    <div className="search">
      <input role="search" aria-labelledby="filter" id="search-field" className="search-field" type="text" placeholder="Filter Places"
      value={this.state.query} onChange={this.filterPlaces}/>
      <ul>
      {this.state.suggestions && placeList}
      </ul>

      <button className="button" onClick={this.toggleSuggestions}>Show/Hide Suggestions</button>
      </div>

  )
}

}
export default placeList;
