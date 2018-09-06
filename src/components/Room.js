import React from 'react';
import firebase from '../firebase';

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: 'Me' },
      messages: []
    };

    // create firebase database instance
    this.db = firebase.database();
  }

  componentDidMount() {
    // listen for any child_added event on the /messages path
    this.db.ref('/messages').on('child_added', child => {
      // get the value and update state
      const message = {id: child.key, ...child.val()};
      const messages = this.state.messages;
      this.setState({messages: [...messages, message]});
    })
  }

  sendMessage(e) {
    e.preventDefault();

    // Get a reference to the '/message' path of the database
    // and create a new object with push() which also generates
    // an unique key
    const newMessage = this.db.ref('/messages').push();

    const user = this.state.currentUser;
    const text = e.target.message.value.trim();
    const time = new Date().getTime();

    // set the new object value
    newMessage.set({ user, text, time });

    // clear the input field
    e.target.message.value = '';
  }

  render() {
    return (
      <div className="container">
        <div className="messages">
          {this.state.messages.map(m => (
            <div key={m.id} className="message">
              <div className="message-info">
                {m.user.name},
                {/* we are not storing date object in state anymore.
                 So, have to create a date object */}
                {new Date(m.time).toLocaleDateString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </div>
              <div className="message-text">{m.text}</div>
            </div>
          ))}
        </div>
        <form className="send-form" onSubmit={e => this.sendMessage(e)}>
          <input className="message-field" name="message" type="text" />
        </form>
      </div>
    );
  }
}

export default Room;
