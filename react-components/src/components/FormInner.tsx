import React, { Component } from 'react';
import styled from 'styled-components';
import { SubmitContext } from '../Context/SubmitContext';

interface FormInnerProps {
  type?: string;
  label?: string;
  children?: React.ReactNode;
  isRequired?: boolean;
}

interface FormInnerState {
  isMistake: boolean;
}

class FormInner extends Component<FormInnerProps, FormInnerState> {
  input: React.RefObject<HTMLInputElement> = React.createRef();
  state = { isMistake: false };

  static contextType?: React.Context<boolean> = SubmitContext;

  validation = () => {
    if (this.input.current?.type === 'text') {
      return this.input.current.value.length > 3
        ? this.setState({ isMistake: false })
        : this.setState({ isMistake: true });
    }

    if (this.input.current?.type === 'email') {
      const inputValue = this.input.current?.value;

      if (!inputValue) return this.setState({ isMistake: true });
      console.log(inputValue);

      const [name, domain] = inputValue.split('@');
      const dotPosition = domain?.lastIndexOf('.');
      const region = domain?.slice(dotPosition);
      const domainLocal = domain?.length - region?.length;

      return name?.length >= 3 && domainLocal >= 3 && region?.length >= 2
        ? this.setState({ isMistake: false })
        : this.setState({ isMistake: true });
    }

    if (this.input.current?.type === 'password') {
      return this.input.current.value.length > 5 && this.input.current.value.length < 12
        ? this.setState({ isMistake: false })
        : this.setState({ isMistake: true });
    }
  };

  componentDidMount(): void {
    this.validation();
  }

  render() {
    const context = this.context;
    if (this.props.type?.toLowerCase() === 'select') {
      return this.props.children;
    }

    return (
      <>
        <StyledHeader>{`${this.props.label ? this.props.label + ':' : ''}`}</StyledHeader>
        <StyledLabel onChange={this.validation}>
          <>
            <input
              required={this.props.isRequired ? this.props.isRequired : false}
              type={this.props.type ? this.props.type : 'text'}
              ref={this.input}
            />
            {context && this.state.isMistake && <div>incorrect value</div>}
          </>
        </StyledLabel>
      </>
    );
  }
}

const StyledHeader = styled.h4`
  display: inline-block;
`;

const StyledLabel = styled.label`
	position relative;
  display: inline-flex;
	flex-direction:column;
  align-items: center;
	transition: 0.5s;
	
	& div {
		font-size:0.9rem;
		color:red;
		top:-10px;
		left:10px;
		z-index:10;
		transition: 0.5s;
	}
`;

export default FormInner;
