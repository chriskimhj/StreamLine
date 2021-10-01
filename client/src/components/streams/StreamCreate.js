import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {createStream} from '../../actions';
import StreamForm from './StreamForm';
import "./StreamCreate.css";

class StreamCreate extends React.Component {

  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  }
  // initialValues={_.pick(this.props.stream, 'title', 'description')}
  // this.auth.currentUser.get().getBasicProfile().getName()
  render(){
    const defaultSocialMediaHandles = {'instagramHandle':"", 'youtubeHandle':"", 'twitterHandle':""};
    return(
      <div className="div-text-color">
        <br/><br/>
        <h3><strong>Create Stream</strong></h3>
        <StreamForm
          initialValues={
            _.pick(
              {...this.props.currentCreatorName, ...defaultSocialMediaHandles},
              'creator',
              'instagramHandle',
              'youtubeHandle',
              'twitterHandle'
            )
          }
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {currentCreatorName: {'creator':state.auth.creatorName}};
}

export default connect(mapStateToProps, {createStream})(StreamCreate);
