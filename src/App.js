import React, { Component } from 'react';
import Room from './components/Room';
import firebase from './firebase';
import firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { currentUser: null, loadingUI: true };

    // listen if the user is signed in
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
      // user is singed in, update currentUser
      this.setState({
        currentUser: {
          name: user.displayName,
          photo: user.photoURL,
          uid: user.uid
        }
      });
      } else {
        // user not signed in, have to show ui to to sign-in

        // sing-in UI config
        const uiConfig = {
          callbacks: {
            signInSuccessWithAuthResult: () => {
              // we don't want firebaseui to redirect after successful sign-in
              // So we return false
              return false;
            },
            uiShown: () => {
              // Sign-in UI finished loading
              this.setState({ loadingUI: false });
            }
          },
          signInFlow: 'popup',
          signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
        };
        const ui = new firebaseui.auth.AuthUI(firebase.auth());
        ui.start('#firebaseui-auth-container', uiConfig);
      }
    });
  }

  render() {
    if (this.state.currentUser === null) {
      return (
        <div>
          <h1>Welcome to Fire Adda!</h1>
          <div id="firebaseui-auth-container" />
          <div
            id="loader"
            style={{ display: !this.state.loadingUI ? 'none' : '' }}
          >
            Loading...
          </div>
        </div>
      );
    }
    return <Room currentUser={this.state.currentUser} />;
  }
}

export default App;
