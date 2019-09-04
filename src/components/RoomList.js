import React, {Component} from 'react';
import './roomlist.css';
import Room from './Room';

class RoomList extends Component{
	render() {
	return (
		<div className="room-list">
		<ul>
		<h3>Your rooms:</h3>
		{this.props.rooms.map((room, index) => {
			return(
				<li key={room.id} className="room">
					<a href="#"># {room.name} </a>
				</li>	
			)}
		)}
		</ul>
		</div>
	);
	}
}

export default RoomList;		