import React from "react";
import { Form, Field} from "react-final-form";
import {Row, Col} from 'react-bootstrap';

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
        <label>{label}</label>
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
          <Field name="title" component={renderInput} label="Enter Title" />
          <Field
            name="description"
            component={renderInput}
            label="Enter Description"
          />
          <Field name="creator" component={renderInput} label="Creator Name"/>
          <p><strong>Social Media Handles</strong></p>
          <Row>
              <Field name="instagramHandle" component={renderInput} label="Instagram"/>
              <Field name="youtubeHandle" component={renderInput} label="Youtube"/>
              <Field name="twitterHandle" component={renderInput} label="Twitter"/>
          </Row>
          <button className="ui button primary">Submit</button>
        </form>
      )}
    />
  );
};

export default StreamForm;
