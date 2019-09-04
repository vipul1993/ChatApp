import React, {Component} from 'react';
import './room.css';

class Room extends Component{
	render() {
	return (
		<div className="room-div">
			<h3>{this.props.room}</h3>
		</div>
	);
	}
}

export default Room;