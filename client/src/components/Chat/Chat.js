import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

import './Chat.css';
let socket;

const Chat = ({location}) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState('');
  const [authState, setInValidity] = useState('idle');
  const ENDPOINT = 'https://e-skul.herokuapp.com/';

  useEffect(() => {
    const {name, room} = queryString.parse(location.search);
    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    // console.log(socket);
    socket.emit('join', {name, room}, (error) => {
      if (error) {
        alert(error);
        setInValidity('rejected');
        // ?return (<Redirect to="/" />);
      }
      setInValidity('valid');
    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages(messages => [...messages, message]);
    });

    socket.on('roomData', ({room, users}) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  switch (authState) {
    case 'idle':
      return (
        <div className="outerContainer">
        </div>
      )
    case 'valid':
    return (
      <div className="outerContainer">
        <div className="container">
          <InfoBar room={room}/>
          <Messages messages={messages} name={name}/>
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
        <TextContainer users={users}/>
      </div>
    )
    case 'rejected':
      return (<Redirect to="/" />)
      break;
    default:
      return (
        <div className="outerContainer">
        </div>
      )
  }

  // console.log(message, messages);
}

export default Chat;
