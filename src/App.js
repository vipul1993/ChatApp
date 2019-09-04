import React, {Component} from 'react';
import Chatkit from '@pusher/chatkit-client';
import './App.css';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';
import SendMessageForm from './components/SendMessageForm';
import MessageList from './components/MessageList';
// import RoomList from './components/RoomList';
import {instanceLocator, tokenUrl} from './config';

class App extends Component{

  constructor() {
    super();
    this.state = {
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    }
    this.sendMessage = this.sendMessage.bind(this);
  }
                
  componentDidMount() {

    // console.log("tokenUrl", tokenUrl);
     // console.log("Messages", this.state.messages)

    const chatManager = new Chatkit.ChatManager({
        instanceLocator,
        userId : "vipul",
        tokenProvider : new Chatkit.TokenProvider({
          url: tokenUrl
        }) 
    });

    // console.log("chatManager",chatManager);

    chatManager.connect()
    .then(currentUser => {
      console.log('currentUser',currentUser);
      this.currentUser = currentUser

      this.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        })
      })
      .catch(err => console.log("Error on joinableRooms: ", err))

      currentUser.subscribeToRoomMultipart({
        roomId: "f664e0b6-793e-4811-af8c-ceb3b05e4f7a",
        hooks: {
          onMessage: message => {
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
    console.log("currentUser", this.currentUser);
    this.currentUser.sendSimpleMessage({
      text,
      roomId: "f664e0b6-793e-4811-af8c-ceb3b05e4f7a",
    })
  }

  fetchRooms() {
    this.setState({
      rooms: [...this.state.rooms, this.currentUser.roomStore.rooms]
    }) 
    console.log("rooms", this.state.rooms)
  }

  render(){

    // console.log('this.state.messages:', this.state.messages);

  return (
    <div className="app">
      <RoomList rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
      <MessageList messages={this.state.messages} />
      <NewRoomForm />
      <SendMessageForm sendMessage={this.sendMessage}/>
    </div>
  );
  }
}

export default App;
