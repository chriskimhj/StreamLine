import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import {Link} from 'react-router-dom';
import {Card, Button, Container, Row, Col, Jumbotron} from 'react-bootstrap';
import { MdPlayArrow } from 'react-icons/md';
import { IoPulseSharp } from 'react-icons/io5';
import "./StreamList.css";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdminEdit(stream){
    if(stream.userId === this.props.currentUserId){
      return(
        <Link to={`/streams/edit/${stream.id}`}>
          <Button variant="success">
              Edit
          </Button>
        </Link>
      );
    }
  }

  renderAdminDelete(stream){
    if(stream.userId === this.props.currentUserId){
      return(
        <Link to={`/streams/delete/${stream.id}`}>
          <Button variant="danger">
              Delete
          </Button>
        </Link>
      );
    }
  }

  renderList() {
    return this.props.streams.map(stream => {
      return (
        <Col xs={4} style={{"marginBottom":"30px"}}>
          <Card className="color-card">
              <Card.Body>
                <Card.Title className="color-text">{stream.title}</Card.Title>
                <Card.Text className="color-text"><em>{stream.creator}</em><IoPulseSharp/></Card.Text>
                <div style={{float:'left'}}>
                  <Link className="color-text" to={`/streams/${stream.id}`}>
                    <Button className="color-button">
                        Watch Stream <MdPlayArrow/>
                    </Button>
                  </Link>
                </div>
                <div style={{float:'right'}}>
                  {this.renderAdminEdit(stream)}
                  &nbsp;
                  {this.renderAdminDelete(stream)}
                </div>
              </Card.Body>
          </Card>
        </Col>
      );
    });
  }

  render() {
    return (
      <div>
        <Jumbotron className="color-jumbotron">
          <h1 style={{color:"white"}}>Streams</h1>
        </Jumbotron>
        <Container fluid>
          <Row >
            {this.renderList()}
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
    authState: state.auth
  };
};

export default connect(
  mapStateToProps,
  { fetchStreams }
)(StreamList);
