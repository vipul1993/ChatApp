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
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    }
    this.sendMessage = this.sendMessage.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.fetchRooms = this.fetchRooms.bind(this);
  }
                
  componentDidMount() {

    const chatManager = new Chatkit.ChatManager({
        instanceLocator,
        userId : "vipul",
        tokenProvider : new Chatkit.TokenProvider({
          url: tokenUrl
        }) 
    });

    // console.log("currentUser",currentUser);

    chatManager.connect()
    .then(currentUser => {
      this.currentUser = currentUser
      this.fetchRooms()
      console.log("currentUser", currentUser);
    })  
    .catch(err => {console.log('Error on connection', err)}
    )
  }

  sendMessage(text) {
    this.currentUser.sendSimpleMessage({
      text,
      roomId: this.state.roomId,
    })
  }

  subscribeToRoom(roomId) {

        this.setState({messages: []})
        this.currentUser.subscribeToRoomMultipart({
        roomId,
        hooks: {
          onMessage: message => {
            this.setState({
                messages: [...this.state.messages, message]            
            })
          }
        }
      })
      .then(room => {
        this.setState({
          roomId: room.id
        })
        this.fetchRooms()
      })
      .catch(err => console.log("Error on joinable rooms: ", err)) 
  }

  fetchRooms() {
      this.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        })
        console.log("joinable rooms", this.state.joinableRooms);
        console.log("joined rooms", this.state.joinedRooms);
      })
      .catch(err => console.log("Error on joinableRooms: ", err))
  }

  render(){
  return (
    <div className="app">
      <RoomList 
        subscribeToRoom={this.subscribeToRoom} 
        rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} 
      />
      <MessageList messages={this.state.messages} />
      <NewRoomForm />
      <SendMessageForm sendMessage={this.sendMessage}/>
    </div>
  );
  }
}

export default App;
