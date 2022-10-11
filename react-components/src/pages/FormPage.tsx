import { Form, PageHero, SimpleForm } from 'components';
import FormCard from 'components/FormCard/FormCard';
import React, { Component } from 'react';

class FormPage extends Component {
  render() {
    return (
      <>
        <PageHero label="Form"></PageHero>

        <SimpleForm sendCard={(data) => console.log(data)}></SimpleForm>
        <FormCard></FormCard>
      </>
    );
  }
}

export default FormPage;
