import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {fetchStream, editStream} from '../../actions';
import StreamForm from './StreamForm';
import "./StreamEdit.css";


class StreamEdit extends React.Component{
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render(){
    if(!this.props.stream){
      return <div>Loading...</div>;
    }
    return (
      <div className="div-text-color">
        <br/><br/>
        <h3><strong>Edit Stream</strong></h3>
        <StreamForm
          initialValues={
            _.pick(
              {...this.props.stream, ...this.props.currentCreatorName},
              'title',
              'description',
              'instagramHandle',
              'youtubeHandle',
              'twitterHandle',
              'creator'
            )
          }
          onSubmit={this.onSubmit}
        />
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
    currentCreatorName: {'creator':state.auth.creatorName}
  };
}

export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit);
