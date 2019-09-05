import React, {Component} from 'react';
import './roomlist.css';
// import Room from './Room';

class RoomList extends Component{

	render() {
	const orderedRooms =[...this.props.rooms].sort((a,b) => a.id - b.id)
	return (
		<div className="room-list">
		<ul>
		<h3>Your rooms :</h3>
		{orderedRooms.map((room, index) => {
			const active = this.props.roomId === room.id ? "active" : "";
			return(
				<li key={room.id} className={"room " + active}>
					<a 
						onClick={() => this.props.subscribeToRoom(room.id)} 
						href="#" 
						value={room.name}
					># {room.name} </a>
				</li>	
			)}
		)}
		</ul>
		</div>
	);
	}
}

export default RoomList;		