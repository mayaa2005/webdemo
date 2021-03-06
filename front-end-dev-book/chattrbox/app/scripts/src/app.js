import socket from './ws-client';
import {ChatForm, ChatList} from './dom';

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';

class ChatApp {
  constructor() {
    this.chatForm = new ChatForm(FORM_SELECTOR,INPUT_SELECTOR);
    this.chatList = new ChatList(LIST_SELECTOR,'wonderwoman');

    socket.init('ws://localhost:3001');
    socket.registerOpenHandler(() => {
      this.chatForm.init((data) => {
        let msg = new ChatMessage({message:data});
        socket.sendMessage(msg.serialize());
      });
    });
    socket.registerMessageHandler((data) => {
      console.log(data);
      let message = new ChatMessage(data);
      let msg = message.serialize();
      this.chatList.drawMessage(msg);
    });
  }
}

class ChatMessage {
  constructor({message:m,user:u='batman',timestamp:t = (new Date()).getTime()}){
    this.message = m;
    this.user = u;
    this.timestamp = t;
  }

  serialize() {
    return {
      message:this.message,
      user:this.user,
      timestamp:this.timestamp
    }
  }
}

export default ChatApp;
