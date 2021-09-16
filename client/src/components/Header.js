import React from 'react';
import GoogleAuth from './GoogleAuth';
import { connect } from 'react-redux';
import { Navbar, Nav, Container, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { IoPulseSharp } from 'react-icons/io5';
import "./Header.css";

class Header extends React.Component {

  renderCreate(){
    if(this.props.isSignedIn){
      return(
        <div style={{textAlign:'right'}}>
          <Link to="/streams/new">
            <Button className="color-createButton">
                Create
            </Button>
          </Link>
        </div>
      );
    }
  }
  render(){
    return (
      <Navbar className="color-nav" expand="lg">
        <Container>
          <Navbar.Brand href="/" style={{color:"white"}}>StreamLine<IoPulseSharp style={{'marginBottom':'2px'}}/></Navbar.Brand>
          {this.renderCreate()}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <GoogleAuth/>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
};

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  {}
)(Header);
