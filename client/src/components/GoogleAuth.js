import React from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions';
import {Button} from 'react-bootstrap';

class GoogleAuth extends React.Component {

  componentDidMount(){
    // Initializing OAuth library
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId:process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID,
        scope:'email'
      }).then(()=>{
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    if(isSignedIn){
      this.props.signIn(this.auth.currentUser.get().getId(), this.auth.currentUser.get().getBasicProfile().getName());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton(){
    if(this.props.isSignedIn === null){
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <Button variant="danger" onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon"/>
          Sign Out
        </Button>
      );
    } else {
      return (
        <Button variant="primary" onClick={this.onSignInClick} className="ui blue google button">
          <i className="google icon"/>
          Sign In
        </Button>
      );
    }
  }

  render() {
    return (
      <div>{this.renderAuthButton()}</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {isSignedIn: state.auth.isSignedIn};
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);
