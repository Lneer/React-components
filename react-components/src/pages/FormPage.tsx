import { Form, PageHero, SimpleForm } from 'components';
import FormCard from 'components/FormCard/FormCard';
import React, { Component } from 'react';

class FormPage extends Component {
  render() {
    return (
      <>
        <PageHero label="Form"></PageHero>
        <Form>
          <Form.Item type="text" label="Name" onFinish={(data) => console.log(data)} />
          <Form.Item type="email" label="email" />
          <Form.Item type="date" label="birthday" />
          <Form.Item type="select" label="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Item>
          <Form.Item type="checkbox" name="birthday" />
          <Form.Item type="checkbox" name="dangeons" />
          <Form.Item type="checkbox" name="birthday" />
        </Form>
        <SimpleForm></SimpleForm>
        <FormCard></FormCard>
      </>
    );
  }
}

export default FormPage;
