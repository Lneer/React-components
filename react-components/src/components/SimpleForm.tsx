import React, { Component } from 'react';

class SimpleForm extends Component {
  name: React.RefObject<HTMLInputElement> = React.createRef();
  nickName: React.RefObject<HTMLInputElement> = React.createRef();
  birthday: React.RefObject<HTMLInputElement> = React.createRef();
  gender: React.RefObject<HTMLSelectElement> = React.createRef();

  submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const UserData = {
      name: this.name.current?.value,
      nickName: this.nickName.current?.value,
      birthday: this.birthday.current?.value,
      gender: this.gender.current?.value,
    };
    console.log(UserData);
  };
  render() {
    return (
      <form
        onSubmit={(e) => {
          this.submitHandler(e);
        }}
      >
        <fieldset>
          <legend>text fields</legend>
          <label>
            <h3>Name:</h3>
            <input type="text" ref={this.name} />
          </label>
          <label>
            <h3>NickName:</h3>
            <input type="text" ref={this.nickName} />
          </label>
          <label>
            <h3>Birthday:</h3>
            <input type="date" ref={this.birthday} />
          </label>
        </fieldset>

        <fieldset>
          <legend>select fields</legend>
          <select ref={this.gender}>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
          <label>
            раз
            <input type="checkbox" value="male" />
          </label>
          <label>
            два
            <input type="checkbox" value="female" />
          </label>
          <label>
            три
            <input type="checkbox" value="other" />
          </label>
        </fieldset>
        <label>
          <input type="submit" name="submit" />
        </label>
      </form>
    );
  }
}

export default SimpleForm;
