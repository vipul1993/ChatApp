import React, {Component} from 'react';
import Chatkit from '@pusher/chatkit-client';
import './App.css';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';
import SendMessageForm from './components/SendMessageForm';
import MessageList from './components/MessageList';
import {instanceLocator, tokenUrl} from './config';

class App extends Component{

  constructor() {
    super();
    this.state = {
      messages: []
    }

    this.sendMessage = this.sendMessage.bind(this);
  }
                
  componentDidMount() {

    const chatManager = new Chatkit.ChatManager({
        instanceLocator,
        userId : 'Vipul',
        tokenProvider : new Chatkit.TokenProvider({
          url: tokenUrl
        }) 
    })

    // console.log(chatManager);

    chatManager.connect()
    .then(currentUser => {
      // console.log('here',this);
      this.currentUser = currentUser
      currentUser.subscribeToRoomMultipart({
        roomId: "cf77ae37-adaf-4785-babe-4364c7b26e61",
        hooks: {
          onNewMessage: message => {
            this.setState({
                messages: [...this.state.messages, message]            
            })
          }
        }
      })
      // console.log(currentUser.subscribeToRoom());
    })
    .catch(err => {
      console.log('Error on connection', err)
      })

  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: "cf77ae37-adaf-4785-babe-4364c7b26e61",
    })
  }

  render(){

    console.log('this.state.messages:', this.state.messages);

  return (
    <div className="app">
      <RoomList />
      <MessageList messages={this.state.messages} />
      <NewRoomForm />
      <SendMessageForm sendMessage={this.sendMessage}/>
    </div>
  );
  }
}

export default App;
