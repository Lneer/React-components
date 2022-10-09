import { Form, PageHero } from 'components';
import React, { Component } from 'react';

class FormPage extends Component {
  render() {
    return (
      <>
        <PageHero label="Form"></PageHero>
        <Form>
          <Form.Item type="text" label="Name" />
          <Form.Item type="password" label="password" />
          <Form.Item type="email" label="email" />
        </Form>
      </>
    );
  }
}

export default FormPage;
