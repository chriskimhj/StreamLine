import React from "react";
import { Form, Field} from "react-final-form";
import {Row, Col} from 'react-bootstrap';
import "./StreamForm.css";

const StreamForm = (props) => {
  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };

  const renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <Col className={className}>
        <label style={{"color":"#f5f5f5"}}>{label}</label>
        <input {...input} autoComplete="off" />
        {renderError(meta)}
      </Col>
    );
  };

  const onSubmit = (formValues) => {
    if(!formValues.instagramHandle){
      formValues.instagramHandle = " ";
    }
    if(!formValues.youtubeHandle){
      formValues.youtubeHandle = " ";
    }
    if(!formValues.twitterHandle){
      formValues.twitterHandle = " ";
    }
    props.onSubmit(formValues);
  };

  return (
    <div style={{"border":"4px solid #0dbf1f", "padding":"3% 3% 3% 3%"}}>
      <Form
        initialValues={props.initialValues}
        onSubmit={onSubmit}
        validate={(formValues) => {
          const errors = {};
          if (!formValues.title) {
            errors.title = "You must enter a title";
          }
          if (!formValues.description) {
            errors.description = "You must enter a description";
          }
          if (!formValues.creator){
            errors.creator = "You must enter a creator name";
          }
          return errors;
        }}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="ui form error">
            <h5><strong>Stream Details</strong></h5><br/>
            <Field name="title" component={renderInput} label="Title"/>
            <Field
              name="description"
              component={renderInput}
              label="Description"
            />
            <Field name="creator" component={renderInput} label="Creator"/>
            <br/><br/><h5><strong>Social Media Handles</strong></h5><br/>
            <Row>
                <Field name="instagramHandle" component={renderInput} label="Instagram"/>
                <Field name="youtubeHandle" component={renderInput} label="Youtube"/>
                <Field name="twitterHandle" component={renderInput} label="Twitter"/>
            </Row><br/>
            <button className="ui button primary">Submit</button>
          </form>
        )}
      />
    </div>
  );
};

export default StreamForm;
