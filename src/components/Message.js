import React, {Component} from 'react';
import './message.css';
// import MessageList from './MessageList';

function Message (props) {
	return (
		<div className="message">
			<div className="message-username">{this.props.username} : </div>
			<div className="message-text">{this.props.message}</div>
		</div>
	);
	}

export default Message;