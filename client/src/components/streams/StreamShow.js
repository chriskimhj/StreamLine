import React from 'react';
import {connect} from 'react-redux';
import flv from 'flv.js';
import {fetchStream} from '../../actions';
import Carousel from 'react-bootstrap/Carousel';
import carouselBackground from "../../images/carouselBackground.jpg";
import { GrInstagram, GrYoutube, GrTwitter } from 'react-icons/gr';
import "./StreamShow.css";

class StreamShow extends React.Component{
  constructor(props){
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount(){
    const {id} = this.props.match.params;
    this.props.fetchStream(id);
    this.buildPlayer();
  }

  componentDidUpdate(){
    this.buildPlayer();
  }

  componentWillUnmount(){
    this.player.destroy();
  }

  buildPlayer(){
    if(this.player || !this.props.stream){
      return; // no need to build if we already have a player or stream is not fetched yet
    }
    const {id} = this.props.match.params;
    this.player = flv.createPlayer({
      type:'flv',
      url:`http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);  // Attaching to jsx video element
    this.player.load();
  }

  renderStreamDetails(stream){
    return(
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={carouselBackground}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>{stream.title}</h3>
            <h5>{stream.creator}</h5>
            <p>{stream.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={carouselBackground}
            alt="Second slide"
          />
          <Carousel.Caption>
            <div style={{'text-align':'right'}}>
              <h3>Connect with {stream.creator}</h3>
              <div>@{stream.instagramHandle} <GrInstagram/> </div>
              <div>@{stream.youtubeHandle} <GrYoutube/> </div>
              <div>@{stream.twitterHandle} <GrTwitter/> </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }

  render(){
    if(!this.props.stream){
      return (
        <div>Loading...</div>
      );
    }
    return (
      <div>
        <br/>
        {this.renderStreamDetails(this.props.stream)}
        <video className="video-border" ref={this.videoRef} style={{width:'100%'}} controls={true}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps,{fetchStream})(StreamShow);
