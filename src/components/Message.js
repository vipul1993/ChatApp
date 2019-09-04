import React, {Component} from 'react';
import './message.css';
// import MessageList from './MessageList';

function Message(props) {
	return (
		<div className="message">
			<div className="message-username">{props.username} : </div>
			<div className="message-text">{props.message}</div>
		</div>
	);
	}

export default Message;