import React, {Component} from 'react';
import './MessageList.css';
import Message from './Message';

class MessageList extends Component{

	render() {
		// console.log("messages",this.props.messages);
	return (
		<div className="message-list">
			<h1>MessageList</h1>
			{this.props.messages.map((message, index) => {
				return(
					<Message key={index} username={message.senderId} message={message.parts[0].payload.content}/>
					)}
					)
			}
		</div>
	);
	}
}

export default MessageList;