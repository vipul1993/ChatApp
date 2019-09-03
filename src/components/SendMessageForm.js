import React, {Component} from 'react';
import './sendmessageform.css';

class SendMessageForm extends Component {

	constructor(){
		super();
		// console.log("here",this);		
		this.state = {
			message: '',
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		// console.log("here",this);
		e.preventDefault();
		// console.log(e.target.value);
		this.setState({
			message: e.target.value, 
		})
	};

	handleSubmit(e) {
		e.preventDefault();
		// console.log('This is it...', this.state.message);
		this.props.sendMessage(this.state.message)
	}

	render() {
	return (
		<form onSubmit={this.handleSubmit} className="send-message-form">
			<input 
			onChange={this.handleChange}
			value={this.state.message}
			placeholder="Type your message and hit ENTER"
			type="text"
			/>
		</form>
	);
	}
}

export default SendMessageForm;		