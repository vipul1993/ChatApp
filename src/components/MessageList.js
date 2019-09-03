import React, {Component} from 'react';
import './MessageList.css';
import Message from './Message';

class MessageList extends Component{

	render() {
	return (
		<div className="message-list">
			<h1>MessageList</h1>
			{this.props.messages.map((message, index) => {
				return(
					<Message key={index} username={message.senderId} message={message.text}/>	
					)}
					)
			}
		</div>
	);
	}
}

export default MessageList;