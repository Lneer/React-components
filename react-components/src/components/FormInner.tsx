import React, { Component } from 'react';
import styled from 'styled-components';
import { SubmitContext } from '../Context/SubmitContext';

interface FormInnerProps {
  type?: string;
  label?: string;
  children?: React.ReactNode;
  isRequired?: boolean;
  name?: string;
  onFinish?: (data?: [string?, string?]) => void;
}

interface FormInnerState {
  isMistake: boolean;
}

class FormInner extends Component<FormInnerProps, FormInnerState> {
  onFinish = (data?: [string?, string?]) => {
    if (this.props.onFinish) {
      this.props.onFinish(data);
    }
  };
  input: React.RefObject<HTMLInputElement> = React.createRef();
  select: React.RefObject<HTMLSelectElement> = React.createRef();

  state = { isMistake: false };

  static contextType?: React.Context<boolean> = SubmitContext;

  validation = () => {
    switch (this.input.current?.type) {
      case 'text':
        {
          if (this.input.current.value.length > 3) {
            this.setState({ isMistake: false });
            if (this.context) {
              this.onFinish([this.props.label, this.input.current.value]);
            }
          } else {
            this.setState({ isMistake: true });
          }
        }
        break;

      case 'password': {
        this.input.current.value.length > 5 && this.input.current.value.length < 12
          ? this.setState({ isMistake: false })
          : this.setState({ isMistake: true });
        break;
      }

      case 'email': {
        const emailRegx = /^[a-zA-Z0-9._-]{2,16}@[a-zA-Z0-9.-]{2,16}\.[a-zA-Z]{2,6}$/;
        emailRegx.test(this.input.current?.value)
          ? this.setState({ isMistake: false })
          : this.setState({ isMistake: true });
        break;
      }

      case 'date': {
        const date = new Date(this.input.current.value).getFullYear();
        const now = new Date().getFullYear();

        Number(now) - Number(date) > 5 && Number(now) - Number(date) < 100
          ? this.setState({ isMistake: false })
          : this.setState({ isMistake: true });
        break;
      }

      default:
        this.setState({ isMistake: false });
    }
  };

  componentDidMount(): void {
    this.validation();
  }

  render() {
    const context = this.context;
    if (this.props.type?.toLowerCase() === 'select') {
      return (
        <select ref={this.select} onChange={() => console.log(this.select.current?.value)}>
          {this.props.children}
        </select>
      );
    }

    return (
      <>
        {this.props.label && <StyledHeader>{`${this.props.label + ':'}`}</StyledHeader>}
        <StyledLabel onChange={this.validation}>
          <>
            {this.props.name && <span>{this.props?.name}</span>}
            <input
              name={this.props?.name}
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
  gap:5px;
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
