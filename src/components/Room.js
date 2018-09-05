import React from 'react';

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Me" },
      messages: []
    };
  }

  sendMessage(e) {
    e.preventDefault();

    // construct the new message
    const message = {
      id: Math.random()
        .toString(36)
        .slice(2, 13), // a quick a way to generate random string
      user: this.state.currentUser,
      time: new Date(),
      text: e.target.message.value.trim()
    };

    // update messages without mutating
    this.setState({ messages: [...this.state.messages, message] });

    // clear the input field
    e.target.message.value = "";
  }

  render() {
    return (
      <div className="container">
        <div className="messages">
          {this.state.messages.map(m => (
            <div key={m.id} className="message">
              <div className="message-info">
                {m.user.name},
                {m.time.toLocaleDateString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  day: "numeric",
                  month: "short",
                  year: "numeric"
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
