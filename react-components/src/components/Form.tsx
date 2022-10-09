import React, { Component } from 'react';
import FormInner from './FormInner';
import { SubmitContext } from '../Context/SubmitContext';

interface FormProps {
  children?: React.ReactNode;
}

interface FormState {
  isCheck: boolean;
}

class Form extends Component<FormProps, FormState> {
  state = { isCheck: false };
  static Item = FormInner;

  static SubmitContext = React.createContext<boolean>(false);

  render() {
    return (
      <SubmitContext.Provider value={this.state.isCheck}>
        <form>{this.props.children}</form>
        <button type="button" onClick={() => this.setState({ isCheck: true })}>
          123
        </button>
      </SubmitContext.Provider>
    );
  }
}

export default Form;
