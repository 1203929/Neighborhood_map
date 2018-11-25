import React from 'react';
class placeItem extends React.Component{
  render() {
    return(
      <li role="button" className="box"onKeyPress={this.props.openInfoWindow.bind(this, this.props.data.marker)} onClick={this.props.openInfoWindow.bind(this,this.props.data.marker)} tabIndex="0" >{this.props.data.longname}</li>
    )
  }
}

export default placeItem;
